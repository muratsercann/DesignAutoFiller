import { SketchPicker } from "react-color";
import "../styles/fontColorSelector.css";
import { useEffect, useRef, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function FontColorSelector({
  color,
  onChange,
  disabled,
  setIsRibbonItemOpen,
}) {
  const [show, setShow] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
  const pickerButtonRef = useRef(null);

  const handleClick = (e) => {
    if (disabled) {
      return;
    }

    setShow(!show);

    if (!show) {
      setShowTooltip(false);
    }
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

  const handleToggle = (toggled) => {
    if (show && toggled) setShowTooltip(false);
    else {
      setShowTooltip(toggled);
    }
  };

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip className="custom-tooltip" id="font-color-tooltip">
            Font Color
          </Tooltip>
        }
        show={showTooltip}
        onToggle={handleToggle}
      >
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
                onChangeComplete={handleChange}
              />
            </div>
          )}
        </div>
      </OverlayTrigger>
    </>
  );
}
