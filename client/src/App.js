import "./App.css";
import Page from "./components/Edit/Page";

import { useState } from "react";
import Customize from "./components/Edit/Customize";
import Home from "./components/Home/Home";
import Edit from "./components/Edit/Edit";
import DynamicTable from "./components/Samples/DynamicTable";
import ImageRatioApp from "./components/Samples/ImageRatioApp";
import MultiplyImage from "./components/Samples/MultiplyImage";
import List from "./components/Samples/List";

import * as utils from "./components/Edit/utils";
import TextColMatcher from "./components/Samples/TextColMatcher";
import Range from "./components/Samples/Range";

function App() {
  //  utils.clearUserSettingsFromStorage();
  // utils.clearImportedDataFromStorage();
  return <Range />;
}

export default App;
