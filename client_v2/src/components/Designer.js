import { useState } from "react";
import Home from "./Home";
import Edit from "./Edit";
import ImportData from "./Edit/ImportData";
import Preview from "./Preview";
import { BsCollection, BsDatabase, BsEye, BsHouseDoor } from "react-icons/bs";
import { TbCirclesRelation } from "react-icons/tb";
import { FaImages } from "react-icons/fa6";
import TextColMatcher from "./Edit/TextColMatcher";

export default function Designer({}) {
  const [activePage, setActivePage] = useState("home");

  const pages = {
    home: <Home />,
    edit: <Edit />,
    data: <ImportData />,
    preview: <Preview />,
    match: <TextColMatcher />,
  };

  const children = pages[activePage];

  const iconSize = 20;
  return (
    <div className="designer-container">
      <div className="header">
        <div className="d-flex">
          <FaImages size={24} color="rgb(45 101 142)" />
        </div>
        <div>
          <h2>Designify</h2>
        </div>
      </div>
      <div className="designer-body">
        <div className="side-menu">
          <div
            className="menu-item"
            onClick={() => {
              setActivePage("home");
            }}
          >
            <div>
              <BsHouseDoor size={iconSize} />
            </div>

            <span>Home page</span>
          </div>
          <div
            className="menu-item"
            onClick={() => {
              setActivePage("edit");
            }}
          >
            <div>
              <BsCollection size={iconSize} />
            </div>
            <span>Your Templates</span>
          </div>
          <div
            className="menu-item"
            onClick={() => {
              setActivePage("data");
            }}
          >
            <div>
              <BsDatabase size={iconSize} />
            </div>
            <span>Data Set</span>
          </div>

          <div
            className="menu-item"
            onClick={() => {
              setActivePage("match");
            }}
          >
            <div>
              <TbCirclesRelation size={iconSize} />
            </div>
            <span>Bind Data Columns</span>
          </div>

          <div
            className="menu-item"
            onClick={() => {
              setActivePage("preview");
            }}
          >
            <div>
              <BsEye size={iconSize} />
            </div>
            <span>Preview</span>
          </div>
        </div>
        <div className="component-container">{children}</div>
      </div>
    </div>
  );
}
