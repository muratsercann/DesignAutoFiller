import { useState } from "react";
import "./styles/textAlignment.css";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa6";

export default function TextAlignment({ align, setAlign }) {
  const items = {
    left: 0,
    justify: 1,
    center: 2,
    right: 3,
  };

  const index = (items[align] + 1) % 4;
  const [selecteIndex, setNum] = useState(index);

  const handleClick = (index) => {
    switch (index) {
      case items.left:
        setAlign("left");
        break;

      case items.center:
        setAlign("center");
        break;

      case items.right:
        setAlign("right");
        break;

      case items.justify:
        setAlign("justify");
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
      {selecteIndex === items.left && (
        <div className="alignLeft">
          <FaAlignLeft />
        </div>
      )}
      {selecteIndex === items.center && (
        <div className="alignCenter">
          <FaAlignCenter />
        </div>
      )}
      {selecteIndex === items.right && (
        <div className="alignRight">
          <FaAlignRight />
        </div>
      )}
      {selecteIndex === items.justify && (
        <div className="alignJustify">
          <FaAlignJustify />
        </div>
      )}
    </div>
  );
}
