import { useEffect, useState } from "react";
import FontColorSelector from "../Shared/FontColorSelector";
import PositionSelector from "../Shared/PositionSelector";
import "./Edit.css";
import Form from "react-bootstrap/Form";

import TextAlignment from "../Shared/TextAlignment";

export default function Ribbon({ selectedItem, onItemChanged }) {
  const [rotationAngle, setRotationAngle] = useState(
    selectedItem?.rotationAngle || 0
  );

  const handleColorChange = (color) => {
    onItemChanged({ fontColor: color.hex });
  };

  const handleFontSizeChange = (e) => {
    onItemChanged({ fontSize: Number(e.target.value) });
  };

  const handleHorizontalAlignmentChange = (value) => {
    onItemChanged({ horizontalAlignment: value });
  };

  const handleVerticalAlignmentChange = (value) => {
    onItemChanged({ verticalAlignment: value });
  };

  const handleTextAlignment = (value) => {
    onItemChanged({ textAlign: value });
  };

  const fontSizes = [7, 9, 11, 12, 15, 18, 20, 21, 24, 28, 32, 44, 55];

  const handleTextChange = (e) => {
    onItemChanged({ value: e.target.value });
  };

  const handleItemWidthChange = (e) => {
    const value = Number(e.target.value);
    onItemChanged({ width: value });
  };

  const handleRotationChange = (e) => {
    const value = e.target.value;

    if (!selectedItem) return;

    if (value === "-" || value === "") {
      setRotationAngle(value);
      return;
    }

    const horAlignment =
      selectedItem.horizontalAlignment === "Center"
        ? selectedItem.horizontalAlignment
        : "";

    const verAlignment =
      selectedItem.verticalAlignment === "Center"
        ? selectedItem.verticalAlignment
        : "";

    onItemChanged({
      rotationAngle: Number(value),
      horizontalAlignment: horAlignment,
      verticalAlignment: verAlignment,
    });
  };

  useEffect(() => {
    if (selectedItem === null) {
      return;
    }
    setRotationAngle(selectedItem.rotationAngle);
  }, [selectedItem]);

  const isDisabled = selectedItem === null || selectedItem === undefined;

  return (
    <>
      <div className="ribbon">
        {(
          <>
            <Form.Select
              aria-label="Default select example"
              style={{ width: "150px" }}
              className={isDisabled ? "disabled" : ""}
              disabled={isDisabled}
            >
              <option value="1">Calibri</option>
              <option value="2">Open Sans</option>
              <option value="3">Time</option>
            </Form.Select>

            <Form.Select
              aria-label="Default select example"
              style={{ width: "75px" }}
              value={selectedItem?.fontSize || 12}
              onChange={handleFontSizeChange}
              disabled={isDisabled}
              className={isDisabled ? "disabled" : ""}
            >
              {fontSizes.map((item, index) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Select>

            <FontColorSelector
              color={selectedItem?.fontColor || "black"}
              onChange={handleColorChange}
              disabled={isDisabled}
            />

            <TextAlignment
              align={selectedItem?.textAlign || "left"}
              setAlign={handleTextAlignment}
              disabled={isDisabled}
            />

            <Form.Control
              type="text"
              value={selectedItem?.value || ""}
              onChange={handleTextChange}
              disabled={isDisabled}
              className={isDisabled ? "disabled" : ""}
            />
            <span>Width :</span>
            <Form.Control
              type="number"
              value={selectedItem?.width || 0}
              onChange={handleItemWidthChange}
              style={{ width: "74px" }}
              aria-label="Width(px)"
              disabled={isDisabled}
              className={isDisabled ? "disabled" : ""}
            />

            <span>Rotate :</span>
            <Form.Control
              type="number"
              value={rotationAngle}
              onChange={handleRotationChange}
              style={{ width: "74px" }}
              aria-label="rotationAngle"
              as={"input"}
              disabled={isDisabled}
              className={isDisabled ? "disabled" : ""}
            />

            <PositionSelector
              verticalAlignment={selectedItem?.verticalAlignment || "Left"}
              horizontalAlignment={selectedItem?.horizontalAlignment || "Left"}
              setVerticalAlignment={handleVerticalAlignmentChange}
              setHorizontalAlignment={handleHorizontalAlignmentChange}
              disabled={isDisabled}
            />
          </>
        )}
      </div>
    </>
  );
}
