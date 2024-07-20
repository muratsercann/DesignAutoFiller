import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Designer from "./components/Designer";
import GetStarted from "./components/GetStarted";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/get-started" />} />
          <Route exact path="/get-started" element={<GetStarted />} />
          <Route exact path="/editor" element={<Designer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
