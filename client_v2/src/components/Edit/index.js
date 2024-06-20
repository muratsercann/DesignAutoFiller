import { useState } from "react";
import Page from "./Page";
import "./Edit.css";
import Ribbon from "./Ribbon";
import * as utils from "../../utils.js";

export default function Edit() {
  const [page, setPage] = useState(utils.getPageInfo());
  const [selectedItemElement, setSelectedItemElement] = useState(null);
  
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

    utils.setSettingsToStorage(newData);
    setPage(newData);
  };

  const handleSpaceClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    setSelectedItemElement(null);
  };

  return (
    <div className="edit">
      <div style={{ height: "100%" }} className="row">
        <div className="col" style={{}}>
          <Ribbon selectedItem={selectedItem} onItemChanged={onItemChanged} />
        </div>

        <div
          className="pageContainer"
          onClick={handleSpaceClick}
        >
          <Page
            page={page}
            selectedItem={selectedItem}
            selectedItemElement={selectedItemElement}
            setSelectedItemElement={setSelectedItemElement}
            onItemChanged={onItemChanged}
          />
        </div>
      </div>
    </div>
  );
}
