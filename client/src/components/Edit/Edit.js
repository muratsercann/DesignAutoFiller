import { useState } from "react";
import Page from "./Page";
import Customize from "./Customize";
import "../../style/Edit.css";
import Ribbon from "./Ribbon";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import * as utils from "./utils.js";

import DataTab from "./DataTab.js";

export default function Edit() {
  const [page, setPage] = useState(utils.getPageInfo());
  const [selectedItemElement, setSelectedItemElement] = useState(null);
  const [activeCustomizeTab, setActiveCustomizeTab] = useState("Data");
  const [tagColumnMapping, setTagColumnMapping] = useState([]);

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
              <DataTab
                page={page}
                tagFieldMatchings={tagColumnMapping}
                setTagFieldMatchings={setTagColumnMapping}
              />
            </Tab>
          </Tabs>
        </div>

        <div
          className="pageContainer col-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
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

        <div className="col bg-light" style={{}}>
          <Ribbon selectedItem={selectedItem} onItemChanged={onItemChanged} />
        </div>
      </div>
    </div>
  );
}
