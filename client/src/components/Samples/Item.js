import React from "react";

export default function Item({ item }) {
  return (
    <div
      className="no-select"
      style={{
        fontSize: item.fontSize + "px",
        color: item.fontColor,
        width : item.width,
        cursor: "inherit",
        transform: `translate(${item.translateX}px, ${item.translateY}px) rotate(${item.rotationAngle}deg)`,
      }}
    >
      {item.value}
    </div>
  );
}
