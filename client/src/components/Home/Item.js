import React from "react";

export default function Item({ settings }) {
  return (
    <div
      className="no-select"
      style={{
        fontSize: settings.fontSize + "px",
        color: settings.fontColor,
        cursor: "inherit",
        transform: `translate(${settings.translateX}px, ${settings.translateY}px) rotate(${settings.rotationAngle}deg)`,
      }}
    >
      {settings.value}
    </div>
  );
}
