import "./App.css";
import Home from "./components/Home";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import Resize from "./components/Resize";
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/resize" element={<Resize />} />
        <Route exact path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
