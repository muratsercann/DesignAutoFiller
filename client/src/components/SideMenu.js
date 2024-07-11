import { BsCollection, BsDatabase, BsEye } from "react-icons/bs";

export default function SideMenu({ setActivePage, activePage }) {
  const iconSize = 24;

  return (
    <div className="side-menu">
      <div
        className={`menu-item ${activePage === "edit" ? "selected" : ""}`}
        title="Editor"
        onClick={() => {
          setActivePage("edit");
        }}
      >
        <div className="icon">
          <BsCollection size={iconSize} />
        </div>
        <div className="label">Editor</div>
      </div>
      <div
        title="Data Set"
        className={`menu-item ${activePage === "data" ? "selected" : ""}`}
        onClick={() => {
          setActivePage("data");
        }}
      >
        <div className="icon">
          <BsDatabase size={iconSize} />
        </div>
        <div className="label">Data Source</div>
      </div>

      <div
        title="Preview"
        className={`menu-item ${activePage === "preview" ? "selected" : ""}`}
        onClick={() => {
          setActivePage("preview");
        }}
      >
        <div className="icon">
          <BsEye size={iconSize} />
        </div>
        <div className="label">Preview</div>
      </div>
    </div>
  );
}
