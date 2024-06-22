import { FaTabletScreenButton } from "react-icons/fa6";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Edit from ".";
import ImportData from "./ImportData";

export default function Settings() {
  return (
    <>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Scheme">
          <Edit />
        </Tab>
        <Tab eventKey="profile" title="Data">
          <ImportData />
        </Tab>
        <Tab eventKey="contact" title="Preview">
          Tab content for Contact
        </Tab>
      </Tabs>
    </>
  );
}
