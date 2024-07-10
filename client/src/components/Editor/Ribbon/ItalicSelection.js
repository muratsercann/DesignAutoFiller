import { BiItalic } from "react-icons/bi";
export default function ItalicSelection({ fontStyle, onChange }) {
  const handleclick = (e) => {
    if (fontStyle === "normal") onChange("italic");
    else onChange("normal");
  };

  return (
    <div
      class={`custom-button ${fontStyle === "italic" ? "selected" : ""}`}
      onClick={handleclick}
    >
      <div class="letter">
        <BiItalic size="24px" />
      </div>
    </div>
  );
}
