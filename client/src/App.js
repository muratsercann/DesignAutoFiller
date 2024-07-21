import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Designer from "./components/Designer";
import GetStarted from "./components/GetStarted";
import GetImageFromUrl from "./components/GetImageFromUrl";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/get-started" />} />
          <Route exact path="/get-started" element={<GetStarted />} />
          <Route exact path="/editor" element={<Designer />} />
          <Route exact path="/url-image" element={<GetImageFromUrl />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
