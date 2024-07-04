import { FaTabletScreenButton } from "react-icons/fa6";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Edit from ".";
import ImportData from "./ImportData";
import Preview from "../Preview";
import { useState } from "react";

export default function Settings() {
  const [activePage, setActivePage] = useState("edit");

  const pages = {
    edit: <Edit />,
    data: <ImportData />,
    preview: <Preview />,
  };

  return (
    <>
      <div className="nav">
        <button onClick={() => setActivePage("edit")}>Edit</button>
        <button onClick={() => setActivePage("data")}>Data</button>
        <button onClick={() => setActivePage("preview")}>Preview</button>
      </div>
      {pages[activePage]}
    </>
  );
}
