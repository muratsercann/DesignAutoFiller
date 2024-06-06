import { useState } from "react";
import Card from "./Card";
import Customize from "./Customize";
import "../style/Edit.css"

export default function Edit() {
  const [settings, setSettings] = useState({
    horizontalAlignment: "Center",
    verticalAlignment: "Center",
    containerWidth: 250,
  });

  const changeSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="edit">
      <div style={{ height: "100%" }} className="row">
        <div className="col-sm-4 bg-light">
          <Customize settings={settings} setSettings={changeSettings} />
        </div>

        <div className="col">
          <Card settings={settings} setSettings={changeSettings} />
        </div>
      </div>
    </div>
  );
}
