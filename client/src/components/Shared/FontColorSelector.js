import { SketchPicker } from "react-color";
import "./styles/fontColorSelector.css";
import { useEffect, useRef, useState } from "react";

export default function FontColorSelector({
  color,
  onChange,
  disabled,
  setIsRibbonItemOpen,
  changeLog,
  setChangeLog,
  addToChangeLog,
}) {
  const [show, setShow] = useState(false);
  const [unchangedValue, setUnchangedValue] = useState(color);

  // console.log("unchanged color : ", unchangedValue);
  console.log("changeLog: ", changeLog);

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

  const handleChangeComplete = (color) => {
    addToChangeLog({
      operation: "update",
      field: "fontColor",
      newValue: `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
      oldValue: unchangedValue,
    });

    setUnchangedValue(
      `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    );
  };

  const pickerRef = useRef(null);
  const pickerButtonRef = useRef(null);

  const handleClick = (e) => {
    if (disabled) {
      return;
    }

    setShow(!show);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        !pickerButtonRef.current.contains(event.target)
      ) {
        setShow(false);
        setIsRibbonItemOpen(show);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          className={`custom-button ${disabled ? "disabled" : ""}`}
          onClick={handleClick}
          ref={pickerButtonRef}
        >
          <div className="letter">A</div>
          <div style={{ backgroundColor: color }} className="color"></div>
        </div>
        {show && (
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
              onChangeComplete={handleChangeComplete}
            />
          </div>
        )}
      </div>
    </>
  );
}
