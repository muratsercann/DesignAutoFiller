import { SketchPicker } from "react-color";
import "./styles/fontColorSelector.css";
import { useEffect, useRef, useState } from "react";

export default function FontColorSelector({ color, onChange }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleClick = () => {
    setShowColorPicker(true);
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowColorPicker(false);
    }
  };

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="custom-button" onClick={handleClick}>
          <div className="letter">A</div>
          <div style={{ backgroundColor: color }} className="color"></div>
        </div>
        {showColorPicker && (
          <div
            ref={pickerRef}
            style={{
              position: "absolute",
              left: "0px",
              top: "100%",
              zIndex:"99999"
            }}
          >
            <SketchPicker color={color} onChange={onChange} />
          </div>
        )}
      </div>
    </>
  );
}
