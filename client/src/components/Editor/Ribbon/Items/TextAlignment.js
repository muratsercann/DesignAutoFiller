import { useState } from "react";
import React from "react";
import "../styles/textAlignment.css";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa6";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function TextAlignment({ align, setAlign, disabled }) {
  const items = {
    left: 0,
    justify: 1,
    center: 2,
    right: 3,
  };

  const index = (items[align] + 1) % 4;
  const [selecteIndex, setNum] = useState(index);

  const handleClick = (index) => {
    if (disabled) {
      return;
    }

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

  const iconSize = "18";
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="text-alignment-tooltip">Align</Tooltip>}
    >
      <div
        className={`alignment ${disabled ? "disabled" : ""}`}
        onClick={() => {
          handleClick(selecteIndex);
        }}
      >
        {selecteIndex === items.left && (
          <div className="alignLeft">
            <FaAlignLeft size={iconSize} />
          </div>
        )}
        {selecteIndex === items.center && (
          <div className="alignCenter">
            <FaAlignCenter size={iconSize} />
          </div>
        )}
        {selecteIndex === items.right && (
          <div className="alignRight">
            <FaAlignRight size={iconSize} />
          </div>
        )}
        {selecteIndex === items.justify && (
          <div className="alignJustify">
            <FaAlignJustify size={iconSize} />
          </div>
        )}
      </div>
    </OverlayTrigger>
  );
}
