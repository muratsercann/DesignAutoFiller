import "./App.css";
import Home from "./components/Home";
import {
  Router,
  Route,
  BrowserRouter,
  Routes,
  useNavigate,
} from "react-router-dom";
import Sizing from "./components/Sizing";
import Edit from "./components/Edit";
import Ribbon from "./components/Edit/Ribbon";
import Settings from "./components/Edit/Settings";
import ImportData from "./components/Edit/ImportData";
import Preview from "./components/Preview";
import TextColMatcher from "./components/Edit/TextColMatcher";
import Designer from "./components/Designer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Designer />} />
          <Route exact path="/sizing" element={<Sizing />} />
          <Route exact path="/edit" element={<Edit />} />
          <Route exact path="/ribbon" element={<Ribbon />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/data" element={<ImportData />} />
          <Route exact path="/match" element={<TextColMatcher />} />
          <Route exact path="/preview" element={<Preview />} />
          <Route exact path="/designer" element={<Designer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
