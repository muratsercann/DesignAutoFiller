import { useState } from "react";
import FontColorSelector from "../Shared/FontColorSelector";
import PositionSelector from "../Shared/PositionSelector";
import "./Edit.css";
import Form from "react-bootstrap/Form";

import TextAlignment from "../Shared/TextAlignment";

export default function Ribbon({}) {
  const [color, setColor] = useState("#513841");
  const [alignment, setAlignment] = useState("Left");
  const [fontSize, setFontSize] = useState(12);
  const [vertiacalAlignment, setVerticalAlignment] = useState("Bottom");
  const [horizontalalAlignment, setHorizontalAlignment] = useState("Left");

  const handleColorChange = (color) => {
    console.log("selected color : " + color.hex);
    setColor(color.hex);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
  };

  const fontSizes = [7, 9, 11, 12, 15, 18, 20, 21, 24, 28, 32, 44, 55];

  console.log("font-size : " + fontSize);
  console.log("font-color : " + color);
  console.log("text-align : " + alignment);
  console.log("hor-align : " + horizontalalAlignment);
  console.log("ver-align : " + vertiacalAlignment);
  return (
    <>
      <div className="ribbon">
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
          value={fontSize}
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

        <FontColorSelector color={color} onChange={handleColorChange} />

        <TextAlignment align={alignment} setAlign={setAlignment} />

        <PositionSelector
          verticalAlignment={vertiacalAlignment}
          horizontalAlignment={horizontalalAlignment}
          setVerticalAlignment={setVerticalAlignment}
          setHorizontalAlignment={setHorizontalAlignment}
        />
      </div>
    </>
  );
}
