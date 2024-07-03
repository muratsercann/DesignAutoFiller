import React from "react";

export default function Item({ item, datarow, scale }) {
  let value = item.value;

  const column = item.dataColumn;

  if (column !== undefined && column !== "") {
    value = datarow[column];
  }

  return (
    <div
      id={item.id}
      className="no-select"
      style={{
        position: "absolute",
        fontSize: item.fontSize * scale + "px",
        width: item?.width * scale + "px",
        color: item.fontColor,
        textAlign: item.textAlign,
        cursor: "inherit",
        transform: `translate(${item.translateX * scale}px, ${
          item.translateY * scale
        }px) rotate(${item.rotationAngle}deg)`,
      }}
    >
      {value}
    </div>
  );
}
