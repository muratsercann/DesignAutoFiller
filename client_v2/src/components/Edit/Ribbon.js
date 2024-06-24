import { useEffect, useState } from "react";
import FontColorSelector from "../Shared/FontColorSelector";
import PositionSelector from "../Shared/PositionSelector";
import "./Edit.css";
import Form from "react-bootstrap/Form";
import * as utils from "../../utils";

import TextAlignment from "../Shared/TextAlignment";

export default function Ribbon({
  selectedItemElement,
  selectedItem,
  onItemChanged,
  imageSettings,
  scale,
}) {
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
    const newTranslateX = utils.calculateTranslateX(
      selectedItemElement,
      selectedItem.rotationAngle,
      value,
      selectedItem.translateX
    );
    onItemChanged({ horizontalAlignment: value, translateX: newTranslateX/scale });
  };

  const handleVerticalAlignmentChange = (value) => {
    const newTranslateY = utils.calculateTranslateY(
      selectedItemElement,
      selectedItem.rotationAngle,
      value,
      selectedItem.translateY
    );

    onItemChanged({ verticalAlignment: value, translateY: newTranslateY/scale });
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

  return (
    <>
      <div className="ribbon">
        {selectedItem && (
          <>
            <Form.Select
              aria-label="Default select example"
              style={{ width: "150px" }}
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
            />

            <TextAlignment
              align={selectedItem?.textAlign || "left"}
              setAlign={handleTextAlignment}
            />

            <Form.Control
              type="text"
              value={selectedItem?.value || ""}
              onChange={handleTextChange}
            />
            <span>Width :</span>
            <Form.Control
              type="number"
              value={selectedItem?.width || 0}
              onChange={handleItemWidthChange}
              style={{ width: "74px" }}
              aria-label="Width(px)"
            />

            <span>Rotate :</span>
            <Form.Control
              type="number"
              value={rotationAngle}
              onChange={handleRotationChange}
              style={{ width: "74px" }}
              aria-label="rotationAngle"
              as={"input"}
            />

            <PositionSelector
              verticalAlignment={selectedItem?.verticalAlignment || "Left"}
              horizontalAlignment={selectedItem?.horizontalAlignment || "Left"}
              setVerticalAlignment={handleVerticalAlignmentChange}
              setHorizontalAlignment={handleHorizontalAlignmentChange}
            />
          </>
        )}
      </div>
    </>
  );
}
