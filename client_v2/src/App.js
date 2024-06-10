import "./App.css";
import Home from "./components/Home";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import Resize from "./components/Resize";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/resize" element={<Resize />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
