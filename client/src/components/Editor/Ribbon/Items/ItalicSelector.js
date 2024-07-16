import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BiItalic } from "react-icons/bi";
export default function ItalicSelector({ fontStyle, onChange }) {
  const handleclick = (e) => {
    if (fontStyle === "normal") onChange("italic");
    else onChange("normal");
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="italic-tooltip">Italic</Tooltip>}
    >
      <div
        className={`custom-button ${fontStyle === "italic" ? "selected" : ""}`}
        onClick={handleclick}
      >
        <div className="letter">
          <BiItalic size="24px" />
        </div>
      </div>
    </OverlayTrigger>
  );
}
