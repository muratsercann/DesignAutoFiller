import { useEffect, useState } from "react";
import Page from "./Page";
import Customize from "./Customize";
import "../../style/Edit.css";
import Ribbon from "./Ribbon";

export default function Edit() {
  const [settings, setSettings] = useState({
    id: 101,
    designId: 1,
    width: 250,
    height: 400,
    bgColor: "red",
    bgImageUri: "https://r.resimlink.com/u-A1rvJDjhe.png",
    items: [
      {
        id: 1001,
        pageId: 101,
        type: "text",
        value: "Hi !",
        rotationAngle: -45,
        translateX: 0,
        translateY: -358,
        fontSize: 24,
        fontColor: "red",
        fontFamily: "",
      },

      {
        id: 1002,
        pageId: 101,
        type: "text",
        value: "Welcome",
        rotationAngle: -45,
        translateX: 100,
        translateY: -358,
        fontSize: 24,
        fontColor: "blue",
        fontFamily: "",
      },

      {
        id: 1003,
        pageId: 101,
        type: "text",
        value: "People",
        rotationAngle: 0,
        translateX: 40,
        translateY: -180,
        fontSize: 24,
        fontColor: "blue",
        fontFamily: "",
      },
    ],
  });
  const [isEditClicked, setIsEditClicked] = useState(false);

  const [selectedItemElement, setSelectedItemElement] = useState(null);

  const changeSettings = (newSettings) => {
    setSettings(newSettings);
  };

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

    setSettings((prevData) => {
      return {
        ...prevData,
        items: prevData.items.map((item) =>
          item.id === itemId ? { ...item, ...newItem } : item
        ),
      };
    });
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
            setSettings={changeSettings}
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
