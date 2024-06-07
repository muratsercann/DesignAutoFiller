import "./App.css";
import Page from "./components/Edit/Page";

import { useState } from "react";
import Customize from "./components/Edit/Customize";
import Home from "./components/Home/Home";
import Edit from "./components/Edit/Edit";

function App() {
  const [settings, setSettings] = useState({
    horizontalAlignment: "Center",
    verticalAlignment: "Center",
    containerWidth: 250,
  });

  const changeSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return <Edit />;

  // return (
  //   <div className="App bg-dark">
  //     <div style={{ height: "100%" }} className="row">
  //       <div className="col-sm-4 bg-light">
  //         <Customize
  //           settings={settings}
  //           setSettings={changeSettings}
  //         ></Customize>
  //       </div>

  //       <div className="col">
  //         <Card settings={settings} setSettings={changeSettings}></Card>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
