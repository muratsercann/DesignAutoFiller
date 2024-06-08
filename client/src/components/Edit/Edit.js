import { useState } from "react";
import Page from "./Page";
import Customize from "./Customize";
import "../../style/Edit.css";
import Ribbon from "./Ribbon";
import { defaultData } from "../../data.js";
export default function Edit() {
  const [settings, setSettings] = useState(getData());
  const [selectedItemElement, setSelectedItemElement] = useState(null);

  function getData() {
    const savedData = localStorage.getItem("userData");
    if (savedData && savedData !== "") {
      const jsonData = JSON.parse(savedData);
      return jsonData;
    } else {
      return defaultData;
    }
  }

  let selectedItem = null;

  if (selectedItemElement) {
    selectedItem = settings.items.find(
      (item) => item.id === Number(selectedItemElement.id)
    );
  }

  const onItemChanged = (newItem) => {
    const itemId = selectedItem.id;

    const newData = {
      ...settings,
      items: settings.items.map((item) =>
        item.id === itemId ? { ...item, ...newItem } : item
      ),
    };

    localStorage.setItem("userData", JSON.stringify(newData));
    setSettings(newData);
  };

  return (
    <div className="edit">
      <div
        style={{ width: "100%", height: "60px", backgroundColor: "green" }}
      ></div>
      <div style={{ height: "100%" }} className="row">
        {/* {selectedItemElement && isEditClicked && ( */}
        <div className="col-5 bg-light">
          <Customize item={selectedItem} onItemChanged={onItemChanged} />
        </div>
        {/* )} */}

        <div className="col-5">
          <Page
            settings={settings}
            selectedItem={selectedItem}
            selectedItemElement={selectedItemElement}
            setSelectedItem={setSelectedItemElement}
            onItemChanged={onItemChanged}
          />
        </div>

        <div className="col bg-light" style={{ paddingLeft: "0" }}>
          <Ribbon selectedItem={selectedItem} onItemChanged={onItemChanged} />
        </div>
      </div>
    </div>
  );
}
