import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function BoldSelector({ fontWeight, onChange }) {
  const handleclick = (e) => {
    if (fontWeight !== "bold") onChange("bold");
    else onChange("normal");
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="bold-button-tooltip">Bold</Tooltip>}
    >
      <div
        className={`custom-button ${fontWeight === "bold" ? "selected" : ""}`}
        onClick={handleclick}
      >
        <div className="letter" style={{ fontSize: "23px" }}>
          B
        </div>
      </div>
    </OverlayTrigger>
  );
}
