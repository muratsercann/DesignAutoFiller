import React from "react";

export default function Item({ item, datarow, scale }) {
  let value = item.value;

  const column = item.dataColumn;

  if (column != null && column !== "") {
    value = datarow[column];
  }

  return (
    <div
      id={item.id}
      className="no-select"
      style={{
        position: "absolute",
        fontSize: item.fontSize * scale + "px",
        fontFamily: item.fontFamily,
        fontWeight: item.fontWeight,
        fontStyle: item.fontStyle,
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
