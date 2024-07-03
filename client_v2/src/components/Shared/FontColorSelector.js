import { SketchPicker } from "react-color";
import "./styles/fontColorSelector.css";
import { useEffect, useRef, useState } from "react";

export default function FontColorSelector({ color, onChange, disabled }) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  function convertcolor(colorStr) {
    var rgba = colorStr
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((i) => Number(i));
    return {
      r: rgba[0],
      g: rgba[1],
      b: rgba[2],
      a: rgba[3],
    };
  }

  const handleChange = (color) => {
    onChange(
      `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    );
  };

  const pickerRef = useRef(null);

  const handleClick = () => {
    if (disabled) {
      return;
    }
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
        <div
          className={`custom-button ${disabled ? "disabled" : ""}`}
          onClick={handleClick}
        >
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
              zIndex: "99999",
            }}
          >
            <SketchPicker
              color={convertcolor(color)}
              onChange={handleChange}
              onChangeComplete={handleChange}
            />
          </div>
        )}
      </div>
    </>
  );
}
