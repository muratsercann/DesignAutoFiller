export default function BoldSelection({ fontWeight, onChange }) {
  const handleclick = (e) => {
    if (fontWeight === "normal") onChange("bold");
    else onChange("normal");
  };

  return (
    <div
      class={`custom-button ${fontWeight === "bold" ? "selected" : ""}`}
      onClick={handleclick}
    >
      <div class="letter" style={{ fontSize: "23px" }}>
        B
      </div>
    </div>
  );
}
