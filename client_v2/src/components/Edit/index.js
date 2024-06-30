import { useEffect, useRef, useState } from "react";
import Page from "./Page";
import "./Edit.css";
import Ribbon from "./Ribbon";
import * as utils from "../../utils.js";
import Button from "react-bootstrap/Button";
import Range from "../Shared/Range.js";

export default function Edit() {
  const [page, setPage] = useState(utils.getPageInfo());
  const [selectedItemElement, setSelectedItemElement] = useState(null);
  const [scale, setScale] = useState(1.0);
  const pageContainerRef = useRef(null);

  const getSelectedItem = () => {
    let selected = null;
    if (selectedItemElement) {
      selected = page.items.find(
        (item) => item.id === Number(selectedItemElement.id)
      );
    }
    return selected;
  };

  const imageSettings = utils.getImageSettingsFromStorage();
  const selectedItem = getSelectedItem();

  const onItemChanged = (newItem) => {
    const itemId = selectedItem.id;

    const newData = {
      ...page,
      items: page.items.map((item) =>
        item.id === itemId ? { ...item, ...newItem } : item
      ),
    };

    setPage(newData);
  };

  useEffect(() => {
    if (imageSettings) {
      utils.setSettingsToStorage(page);
    }
  }, [page, imageSettings]);

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.ctrlKey) {
        // console.log(`event.elientXY (${event.clientX},${event.clientY})`);

        event.preventDefault();

        // let container = document.getElementById("pageContainer");
        // let page = document.getElementById("pageContent");
        // const scrollHeight = container.scrollHeight;
        // const scrollWidth = container.scrollWidth;

        // const diff = (container.offsetWidth - page.offsetWidth) / 2;

        // const scrollX = event.clientX + diff - 10;
        // container.scrollLeft = scrollX;
        // console.log("scroll left : ", scrollX);
        // container.scrollTop = event.clientY;

        if (event.deltaY < 0) {
          if (scale + 0.18 >= 5.0) {
            setScale(5.0);
            return;
          }
          setScale(scale + 0.18);
        } else {
          if (scale - 0.18 <= 0.1) {
            setScale(0.1);
            return;
          }
          setScale(scale - 0.18);
        }
      }
    };

    if (pageContainerRef && pageContainerRef.current) {
      pageContainerRef.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }
    return () => {
      if (pageContainerRef && pageContainerRef.current) {
        pageContainerRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  });

  const handleSpaceClick = (e) => {
    if (e.target !== e.currentTarget || selectedItem === null) {
      return;
    }

    unSelect();
  };

  const unSelect = () => {
    if (selectedItem === null) {
      return;
    }
    if (selectedItem.value === "") {
      deleteItem(selectedItem.id);
    }
    setSelectedItemElement(null);
  };

  const handleSaveContinue = () => {
    alert("Save and continue..");
  };

  const addNewTextField = () => {
    let newId = 1;

    if (page.items.length > 0) {
      const lastId = page.items[page.items.length - 1].id;
      newId = lastId + 1;
    }
    const newTextField = {
      id: newId,
      pageId: page.id,
      type: "text",
      value: "Add Something Here",
      rotationAngle: 0,
      translateX: 0,
      translateY: 0,
      fontSize: 24,
      fontColor: "black",
      fontFamily: "",
      width: 200,
      horizontalAlignment: "",
      verticalAlignment: "",
      textAlign: "right",
    };

    setPage((prevPage) => ({
      ...prevPage,
      items: [...prevPage.items, newTextField],
    }));
  };

  const deleteSelectedText = () => {
    if (selectedItem === null) {
      return;
    }
    deleteItem(selectedItem.id);

    unSelect();
  };

  const deleteItem = (id) => {
    if (id === null || id === 0) {
      return;
    }
    setPage((prevPage) => ({
      ...prevPage,
      items: prevPage.items.filter((item) => item.id !== id),
    }));
  };

  return (
    <>
      {imageSettings ? (
        <div className="edit">
          <Ribbon
            selectedItemElement={selectedItemElement}
            selectedItem={selectedItem}
            onItemChanged={onItemChanged}
            imageSettings={imageSettings}
            scale={scale}
          />
          <div
            id="pageContainer"
            className="pageContainer"
            ref={pageContainerRef}
            onClick={handleSpaceClick}
          >
            <Page
              scale={scale}
              setScale={setScale}
              page={page}
              selectedItem={selectedItem}
              selectedItemElement={selectedItemElement}
              setSelectedItemElement={setSelectedItemElement}
              onItemChanged={onItemChanged}
              handleSpaceClick={handleSpaceClick}
              setPage={setPage}
              handleAddNewText={addNewTextField}
              handleDeleteSelectedText={deleteSelectedText}
              imageSettings={imageSettings}
            />
          </div>
          {/* <Button
        className="save-continue-button"
        variant="primary"
        onClick={handleSaveContinue}
      >
        Save and Continue
      </Button> */}

          <div className="edit-footer">
            <Range scale={scale} setScale={setScale} />
          </div>
        </div>
      ) : (
        <div>Not uploaded image</div>
      )}
    </>
  );
}
