import React, { useLayoutEffect, useRef } from "react";
import * as utils from "../../utils";

export default function Item({
  item,
  selectedItemElement,
  setSelectedItemElement,
  onItemChanged,
  onMouseDown,
}) {
  const itemRef = useRef(null);

  const handleClick = (e) => {
    setSelectedItemElement(e.target);
  };

  useLayoutEffect(() => {
    if (selectedItemElement !== itemRef.current) {
      return;
    }

    const rotationAngle = item?.rotationAngle || 0;
    const horAlign = item?.horizontalAlignment || "";
    const verAlign = item?.verticalAlignment || "";
    const translateX = item?.translateX || 0;
    const translateY = item?.translateY || 0;

    const newTranslateX = utils.calculateTranslateX(
      itemRef.current,
      rotationAngle,
      horAlign,
      translateX
    );

    const newTranslateY = utils.calculateTranslateY(
      itemRef.current,
      rotationAngle,
      verAlign,
      translateY
    );

    if (
      newTranslateX !== item.translateX ||
      newTranslateY !== item.translateY
    ) {
      onItemChanged({
        translateX: newTranslateX,
        translateY: newTranslateY,
      });
    }
  }, [item, onItemChanged]);

  return (
    <div
      id={item.id}
      ref={itemRef}
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
        outline:
          Number(selectedItemElement?.id) === item.id
            ? "2px dotted #a686ff"
            : "none",
      }}
      onClick={handleClick}
      onMouseDown={onMouseDown}
    >
      {item.value}
    </div>
  );
}
