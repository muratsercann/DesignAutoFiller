import "./App.css";
import Card from "./components/Card";

import { useState } from "react";
import Customize from "./components/Customize";

function App() {
  const [settings, setSettings] = useState({
    horizontalAlignment: "Left",
    verticalAlignment: "Top",
  });

  const changeSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="App bg-dark">
      <div style={{ height: "100%" }} className="row">
        <div className="col-sm-4 bg-light">
          <Customize
            settings={settings}
            setSettings={changeSettings}
          ></Customize>
        </div>

        <div className="col">
          <Card settings={settings} setSettings={changeSettings}></Card>
        </div>
      </div>
    </div>
  );
}

export default App;
