import "./App.css";
import Home from "./components/Home";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import Sizing from "./components/Sizing";
import Edit from "./components/Edit";
import TextPreferences from "./components/Edit/TextPreferences";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sizing" element={<Sizing />} />
        <Route exact path="/edit" element={<Edit />} />
        <Route exact path="/ribbon" element={<TextPreferences />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
