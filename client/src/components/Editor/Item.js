import React, { useRef } from "react";

export default function Item({
  item,
  selectedItemElement,
  setSelectedItemElement,
  onItemChanged,
  onMouseDown,
  scale,
}) {
  const itemRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedItemElement(e.target);
  };

  return (
    <div
      id={item.id}
      ref={itemRef}
      className="no-select item-text"
      style={{
        position: "absolute",
        cursor: "inherit",
        fontSize: item.fontSize * scale + "px",
        width: item?.width * scale + "px",
        color: item.fontColor,
        textAlign: item.textAlign,
        transform: `translate(${item.translateX * scale}px, ${
          item.translateY * scale
        }px) rotate(${item.rotationAngle}deg)`,
        outline:
          Number(selectedItemElement?.id) === item.id
            ? "2px solid #a686ff"
            : "none",
      }}
      onClick={handleClick}
      onMouseDown={onMouseDown}
    >
      {item.value}
    </div>
  );
}
