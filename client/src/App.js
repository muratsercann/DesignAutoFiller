import "./App.css";
import Page from "./components/Edit/Page";

import { useState } from "react";
import Customize from "./components/Edit/Customize";
import Home from "./components/Home/Home";
import Edit from "./components/Edit/Edit";
import DynamicTable from "./components/Samples/DynamicTable";
import ImageRatioApp from "./components/Samples/ImageRatioApp";
import MultiplyImage from "./components/Samples/MultiplyImage";

function App() {
  const [settings, setSettings] = useState({
    horizontalAlignment: "Center",
    verticalAlignment: "Center",
    containerWidth: 250,
  });

  const changeSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return <MultiplyImage />;

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
