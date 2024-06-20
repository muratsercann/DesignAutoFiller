import { useState } from "react";
import FontColorSelector from "../Shared/FontColorSelector";
import PositionSelector from "../Shared/PositionSelector";
import "./Edit.css";
import Form from "react-bootstrap/Form";

import TextAlignment from "../Shared/TextAlignment";

export default function Ribbon({ selectedItem, onItemChanged }) {
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
              value={selectedItem.fontSize}
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
              color={selectedItem.fontColor}
              onChange={handleColorChange}
            />

            <TextAlignment
              align={selectedItem.textAlign}
              setAlign={handleTextAlignment}
            />

            <PositionSelector
              verticalAlignment={selectedItem.verticalAlignment}
              horizontalAlignment={selectedItem.horizontalAlignment}
              setVerticalAlignment={handleVerticalAlignmentChange}
              setHorizontalAlignment={handleHorizontalAlignmentChange}
            />
          </>
        )}
      </div>
    </>
  );
}
