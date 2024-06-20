import { useState } from "react";
import "./styles/textAlignment.css";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa6";

export default function TextAlignment({ align, setAlign }) {
  const [selecteIndex, setNum] = useState(0);

  const handleClick = (index) => {
    switch (index) {
      case 0:
        setAlign("Left");
        break;

      case 1:
        setAlign("Center");
        break;

      case 2:
        setAlign("Right");
        break;

      case 3:
        setAlign("Justify");
        break;

      default:
        break;
    }

    const n = (index + 1) % 4;
    setNum(n);
  };

  return (
    <div
      className="alignment"
      onClick={() => {
        handleClick(selecteIndex);
      }}
    >
      {selecteIndex === 0 && (
        <div className="alignLeft">
          <FaAlignLeft />
        </div>
      )}
      {selecteIndex === 1 && (
        <div className="alignCenter">
          <FaAlignCenter />
        </div>
      )}
      {selecteIndex === 2 && (
        <div className="alignRight">
          <FaAlignRight />
        </div>
      )}
      {selecteIndex === 3 && (
        <div className="alignJustify">
          <FaAlignJustify />
        </div>
      )}
    </div>
  );
}
