import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Designer from "./components/Designer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Designer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
