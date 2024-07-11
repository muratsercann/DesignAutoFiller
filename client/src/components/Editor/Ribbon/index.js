import { useEffect, useState } from "react";
import FontColorSelector from "./Items/FontColorSelector";
import PositionSelector from "./Items/PositionSelector";
import "../editor.css";
import * as utils from "../../../utils";
import "./styles/ribbon.css";
import TextAlignment from "./Items/TextAlignment";
import BoldSelector from "./Items/BoldSelector";
import ItalicSelector from "./Items/ItalicSelector";

import FontFamilySelector from "./Items/FontFamilySelector";
import FontSizeSelector from "./Items/FontSizeSelector";
import TextWidthSelector from "./Items/TextWidthSelector";
import RotationSelector from "./Items/RotationSelector";
import TextIntput from "./Items/TextInput";

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

  const handleFontWeightChange = (weight) => {
    onItemChanged({ fontWeight: weight });
  };
  const handleItalicChange = (style) => {
    onItemChanged({ fontStyle: style });
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

  const handleTextChange = (e) => {
    onItemChanged({ value: e.target.value });
  };

  const handleItemWidthChange = (e) => {
    const value = Number(e.target.value);

    const newTranslateXY = utils.calculateTranslateXY_ForWidthChange(
      selectedItemElement.offsetWidth / scale,
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
    if (!selectedItem) {
      return;
    }
    setRotationAngle(selectedItem.rotationAngle);
  }, [selectedItem]);

  const handleFontChange = (e) => {
    onItemChanged({
      fontFamily: e.target.value,
      fontWeight: "normal",
    });
  };

  return (
    <div>
      <div className="ribbon">
        {selectedItem && (
          <>
            <FontFamilySelector
              fontFamily={selectedItem.fontFamily}
              onChange={handleFontChange}
            />

            <FontSizeSelector
              fontSize={selectedItem.fontSize}
              onChange={handleFontSizeChange}
            />

            <FontColorSelector
              color={selectedItem?.fontColor || "black"}
              onChange={handleColorChange}
              setIsRibbonItemOpen={setIsRibbonItemOpen}
            />

            <BoldSelector
              fontWeight={selectedItem?.fontWeight}
              onChange={handleFontWeightChange}
            />

            <ItalicSelector
              fontStyle={selectedItem?.fontStyle}
              onChange={handleItalicChange}
            />

            <TextAlignment
              align={selectedItem?.textAlign || "left"}
              setAlign={handleTextAlignment}
            />

            <TextIntput
              value={selectedItem.value}
              onChange={handleTextChange}
            />

            <TextWidthSelector
              value={selectedItem.width}
              onChange={handleItemWidthChange}
            />

            <RotationSelector
              value={rotationAngle}
              onChange={handleRotationChange}
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
    </div>
  );
}
