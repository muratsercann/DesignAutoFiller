import { useEffect, useState } from "react";
import FontColorSelector from "../Shared/FontColorSelector";
import PositionSelector from "../Shared/PositionSelector";
import "./editor.css";
import Form from "react-bootstrap/Form";
import * as utils from "../../utils";

import TextAlignment from "../Shared/TextAlignment";

export default function Ribbon({
  selectedItemElement,
  selectedItem,
  onItemChanged,
  imageDetails,
  scale,
  isRibbonItemOpen,
  setIsRibbonItemOpen,
}) {
  const [rotationAngle, setRotationAngle] = useState(
    selectedItem?.rotationAngle || 0
  );

  const handleColorChange = (color) => {
    onItemChanged({
      fontColor: color,
    });
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
    onItemChanged({
      horizontalAlignment: value,
      translateX: newTranslateX / scale,
    });
  };

  const handleVerticalAlignmentChange = (value) => {
    const newTranslateY = utils.calculateTranslateY(
      selectedItemElement,
      selectedItem.rotationAngle,
      value,
      selectedItem.translateY
    );

    onItemChanged({
      verticalAlignment: value,
      translateY: newTranslateY / scale,
    });
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

    const newTranslateXY = utils.calculateTranslateXY_ForWidthChange(
      selectedItemElement.offsetWidth,
      selectedItemElement.offsetHeight,
      value,
      selectedItem.translateX,
      selectedItem.translateY,
      selectedItem.rotationAngle
    );

    onItemChanged({
      width: value,
      translateX: newTranslateXY.translateX,
      translateY: newTranslateXY.translateY,
    });
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
              setIsRibbonItemOpen={setIsRibbonItemOpen}
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

            <Form.Control
              type="number"
              title="Width"
              value={selectedItem?.width || 0}
              onChange={handleItemWidthChange}
              style={{ width: "74px" }}
              aria-label="Width(px)"
            />

            <Form.Control
              type="number"
              title="Rotation Angle (deg)"
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
              setIsRibbonItemOpen={setIsRibbonItemOpen}
            />
          </>
        )}
      </div>
    </>
  );
}
