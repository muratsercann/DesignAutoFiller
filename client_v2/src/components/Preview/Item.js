import React from "react";

export default function Item({ item, mappings, datarow }) {
  let value = item.value;

  const column = mappings[item.value];

  if (column !== "") {
    value = datarow[column];
  }

  return (
    <div
      id={item.id}
      className="no-select"
      style={{
        position: "absolute",
        fontSize: item.fontSize + "px",
        width: item?.width + "px",
        height: item?.height,
        color: item.fontColor,
        textAlign: item.textAlign,
        cursor: "inherit",
        transform: `translate(${item.translateX}px, ${item.translateY}px) rotate(${item.rotationAngle}deg)`,
      }}
    >
      {value}
    </div>
  );
}
