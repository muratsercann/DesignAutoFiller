import { useState } from "react";
import Page from "./Page";
import Customize from "./Customize";
import "../../style/Edit.css";
import Ribbon from "./Ribbon";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { defaultData } from "../../data.js";
import DataTab from "./DataTab.js";
export default function Edit() {
  const [settings, setSettings] = useState(getData());
  const [selectedItemElement, setSelectedItemElement] = useState(null);
  const [activeCustomizeTab, setActiveCustomizeTab] = useState("Data");

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

  const handleSpaceClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    setSelectedItemElement(null);
  };

  return (
    <div className="edit">
      <div
        style={{ width: "100%", height: "60px", backgroundColor: "green" }}
      ></div>
      <div style={{ height: "100%" }} className="row">
        <div className="col-5 bg-light">
          <Tabs
            id="controlled-tab-example"
            activeKey={activeCustomizeTab}
            onSelect={(k) => setActiveCustomizeTab(k)}
            className="mb-3"
          >
            <Tab eventKey="Position" title="Position">
              <Customize item={selectedItem} onItemChanged={onItemChanged} />
            </Tab>
            <Tab eventKey="Data" title="Data">
              <DataTab />
            </Tab>
          </Tabs>
        </div>

        <div className="col-5">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            onClick={handleSpaceClick}
          >
            <Page
              settings={settings}
              selectedItem={selectedItem}
              selectedItemElement={selectedItemElement}
              setSelectedItemElement={setSelectedItemElement}
              onItemChanged={onItemChanged}
            />
          </div>
        </div>

        <div className="col bg-light" style={{ paddingLeft: "0" }}>
          <Ribbon selectedItem={selectedItem} onItemChanged={onItemChanged} />
        </div>
      </div>
    </div>
  );
}
