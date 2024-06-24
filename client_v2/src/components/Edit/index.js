import { useEffect, useState } from "react";
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
    utils.setSettingsToStorage(page);
  }, [page]);

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
    <div className="edit">
      <Ribbon selectedItem={selectedItem} onItemChanged={onItemChanged} />
      <div className="pageContainer" onClick={handleSpaceClick}>
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
  );
}
