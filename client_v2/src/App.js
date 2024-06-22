import "./App.css";
import Home from "./components/Home";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import Sizing from "./components/Sizing";
import Edit from "./components/Edit";
import Ribbon from "./components/Edit/Ribbon";
import Settings from "./components/Edit/Settings";
import ImportData from "./components/Edit/ImportData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sizing" element={<Sizing />} />
        <Route exact path="/edit" element={<Edit />} />
        <Route exact path="/ribbon" element={<Ribbon />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/data" element={<ImportData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
