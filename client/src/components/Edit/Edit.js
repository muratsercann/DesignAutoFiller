import { useEffect, useState } from "react";
import Page from "./Page";
import Customize from "./Customize";
import "../../style/Edit.css";
import Ribbon from "./Ribbon";
import { defaultData } from "../../data.js";
export default function Edit() {
  const [settings, setSettings] = useState(getData());
  const [isEditClicked, setIsEditClicked] = useState(false);
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

  useEffect(() => {
    if (!selectedItem) {
      setIsEditClicked(false);
    }
  }, [selectedItem]);

  const handleEditButtonClick = () => {
    setIsEditClicked(true);
  };

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
      <div style={{ height: "100%" }} className="row">
        {selectedItemElement && isEditClicked && (
          <div className="col-sm-4 bg-light">
            <Customize item={selectedItem} onItemChanged={onItemChanged} />
          </div>
        )}

        <div className="col" style={{ paddingLeft: "0px" }}>
          <Ribbon onClick={handleEditButtonClick} selectedItem={selectedItem} />

          <Page
            settings={settings}
            selectedItem={selectedItem}
            selectedItemElement={selectedItemElement}
            setSelectedItem={setSelectedItemElement}
            onItemChanged={onItemChanged}
          />
        </div>
      </div>
    </div>
  );
}
