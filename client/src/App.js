import logo from "./logo.svg";
import "./App.css";
import Card from "./components/Card";

import { useState } from "react";
import Customize from "./components/Customize";

function App() {
  const [formData, setFormData] = useState({});

  return (
    <div className="App bg-dark">
      <div style={{ height: "100%" }} className="row">
        <div className="col-sm-4 bg-light">
          <Customize data={formData} setdata={setFormData}></Customize>
        </div>

        <div className="col">
          <Card formData={formData}></Card>
        </div>
      </div>
    </div>
  );
}

export default App;
