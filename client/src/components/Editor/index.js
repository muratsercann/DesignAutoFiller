import { useEffect, useRef, useState } from "react";
import Page from "./Page";
import "./editor.css";
import Ribbon from "./Ribbon";
import Range from "../Shared/Range.js";
import Upload from "./Upload.js";

export default function Editor({
  page,
  setPage,
  imageDetails,
  setImageDetails,
  dataset,
}) {
  const [selectedItemElement, setSelectedItemElement] = useState(null);
  const [scale, setScale] = useState(1.0);
  const pageContainerRef = useRef(null);
  const [refresh, setRefresh] = useState(null);
  const [isRibbonItemOpen, setIsRibbonItemOpen] = useState(false);
  const [changeLog, setChangeLog] = useState([]);
  const [activeChangeIndex, setActiveChangeIndex] = useState(-1);

  const [oldSelectedItem, setOldSelectedItem] = useState({});

  useEffect(() => {
    if (!selectedItem) {
      return;
    }
    setOldSelectedItem(selectedItem);
    console.log("Selected Item Old Color : ", selectedItem.fontColor);
  }, [selectedItemElement]);

  const getSelectedItem = () => {
    let selected = null;
    if (selectedItemElement) {
      selected = page.items.find(
        (item) => item.id === Number(selectedItemElement.id)
      );
    }
    return selected;
  };

  const selectedItem = getSelectedItem();

  const onItemChanged = (newItem, id) => {
    if (!selectedItem && !id) return;
    const itemId = id ?? selectedItem.id;

    const newData = {
      ...page,
      items: page.items.map((item) =>
        item.id === itemId ? { ...item, ...newItem } : item
      ),
    };

    setPage(newData);
  };

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
  useEffect(() => {
    const currentPage = pageContainerRef?.current;
    if (currentPage) {
      currentPage.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }
    return () => {
      if (currentPage) {
        currentPage.removeEventListener("wheel", handleWheel);
      }
    };
  });

  const handleSpaceClick = (e) => {
    if (!isRibbonItemOpen) {
      unSelect();
    } else {
      setIsRibbonItemOpen(false);
    }
  };

  const unSelect = () => {
    if (!selectedItem) {
      return;
    }

    if (selectedItem.value === "") {
      deleteItem(selectedItem.id);
    }
    setSelectedItemElement(null);
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
      fontSize: 12,
      fontColor: "grey",
      fontFamily: "",
      width: 130,
      horizontalAlignment: "",
      verticalAlignment: "",
      textAlign: "left",
    };

    setPage((prevPage) => ({
      ...prevPage,
      items: [...prevPage.items, newTextField],
    }));
  };

  const deleteSelectedText = () => {
    if (!selectedItem) {
      return;
    }
    deleteItem(selectedItem.id);

    unSelect();
  };

  const deleteItem = (id) => {
    if (!id || id === 0) {
      return;
    }
    setPage((prevPage) => ({
      ...prevPage,
      items: prevPage.items.filter((item) => item.id !== id),
    }));
  };

  const undo = () => {
    if (activeChangeIndex < 0) {
      return;
    }
    const change = changeLog[activeChangeIndex];

    if (change.operation === "update") {
      const newItem = {
        [change.field]: change.oldValue,
      };

      onItemChanged(newItem, change.itemId);

      setActiveChangeIndex((prev) => prev - 1);
    }
  };

  const redo = () => {
    // if (activeChangeIndex >= changeLog.length) {
    //   return;
    // }
    // const change = changeLog[activeChangeIndex];
    // if (change.operation === "update") {
    //   const newItem = {
    //     [change.field]: change.oldValue,
    //   };
    //   onItemChanged(newItem, change.itemId);
    //   setActiveChangeIndex((prev) => prev - 1);
    // }
  };

  const addToChangeLog = (change) => {
    console.log("selected item id :", selectedItem.id);
    if (change.operation === "update") {
      setChangeLog((prev) => [
        ...prev,
        {
          ...change,
          oldValue: oldSelectedItem[change.field],
          itemId: selectedItem.id,
        },
      ]);
    }

    setActiveChangeIndex(changeLog.length);
  };

  return (
    <>
      {imageDetails ? (
        <div className="edit">
          <Ribbon
            selectedItemElement={selectedItemElement}
            selectedItem={selectedItem}
            onItemChanged={onItemChanged}
            imageDetails={imageDetails}
            scale={scale}
            isRibbonItemOpen={isRibbonItemOpen}
            setIsRibbonItemOpen={setIsRibbonItemOpen}
            activeChangeIndex={activeChangeIndex}
            setActiveChangeIndex={setActiveChangeIndex}
            changeLog={changeLog}
            setChangeLog={setChangeLog}
            addToChangeLog={addToChangeLog}
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
              imageDetails={imageDetails}
              undo={undo}
              redo={redo}
            />
          </div>
          <div className="edit-footer">
            <Range scale={scale} setScale={setScale} />
          </div>
        </div>
      ) : (
        <Upload setImageDetails={setImageDetails} onSuccess={setRefresh} />
      )}
    </>
  );
}
