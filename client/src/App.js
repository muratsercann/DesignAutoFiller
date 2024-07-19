import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Designer from "./components/Designer";
import GetStarted from "./components/GetStarted";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/get-started" element={<GetStarted />} />
          <Route exact path="/" element={<Designer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
