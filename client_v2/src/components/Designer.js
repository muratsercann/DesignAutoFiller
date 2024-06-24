import { useState } from "react";
import Home from "./Home";
import Edit from "./Edit";
import ImportData from "./Edit/ImportData";
import Preview from "./Preview";

export default function Designer({}) {
  const [activePage, setActivePage] = useState("home");

  const pages = {
    home: <Home />,
    edit: <Edit />,
    data: <ImportData />,
    preview: <Preview />,
  };

  const children = pages[activePage];

  return (
    <div className="designer-container">
      <div className="header">
        <h2>Designify</h2>
      </div>
      <div className="designer-body">
        <div className="side-menu">
          <div
            className="menu-item"
            onClick={() => {
              setActivePage("home");
            }}
          >
            Home Page
          </div>
          <div
            className="menu-item"
            onClick={() => {
              setActivePage("edit");
            }}
          >
            Your Templates
          </div>
          <div
            className="menu-item"
            onClick={() => {
              setActivePage("data");
            }}
          >
            Data Set
          </div>

          <div
            className="menu-item"
            onClick={() => {
              setActivePage("preview");
            }}
          >
            Preview
          </div>
        </div>
        <div className="component-container">{children}</div>
      </div>
    </div>
  );
}
