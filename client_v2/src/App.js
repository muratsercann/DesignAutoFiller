import "./App.css";
import Home from "./components/Home";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import Sizing from "./components/Sizing";
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sizing" element={<Sizing />} />
        <Route exact path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
