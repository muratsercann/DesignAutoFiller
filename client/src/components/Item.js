import React from "react";

export default function Item({
  settings,
  originalWidth,
  originalHeight,
  previewWidth,
  previewHeight,
}) {
  const scaleX = previewWidth / originalWidth;
  const scaleY = previewHeight / originalHeight;

  const scaledTranslateX = settings.translateX * scaleX;
  const scaledTranslateY = settings.translateY * scaleY;

  const scaledFontSize = scaleX * settings.fontSize + "px";

  return (
    <div
      className="no-select"
      style={{
        fontSize: scaledFontSize,
        color: settings.fontColor,
        cursor: "inherit",
        transform: `translate(${scaledTranslateX}px, ${scaledTranslateY}px) rotate(${settings.rotationAngle}deg)`,
      }}
    >
      {settings.value}
    </div>
  );
}
