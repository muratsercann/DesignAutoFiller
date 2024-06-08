import React, { useLayoutEffect, useRef } from "react";

export default function ItemEdit({
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
    const rotationAngle = item?.rotationAngle || 0;
    const horAlign = item?.horizontalAlignment || "";
    const verAlign = item?.verticalAlignment || "";
    const translateX = item?.translateX || 0;
    const translateY = item?.translateY || 0;

    const newTranslateX = calculateTranslateX(
      itemRef.current,
      rotationAngle,
      horAlign,
      translateX
    );

    const newTranslateY = calculateTranslateY(
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

function calculateTranslateX(
  element,
  rotationAngle,
  horizantalAlignment,
  translateX
) {
  let newTranslateX = translateX;

  const rad = (Math.abs(rotationAngle) * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const centerX = element.offsetWidth / 2;
  const centerY = element.offsetHeight / 2;

  const parentWidth = element.offsetParent.offsetWidth;

  //Horizontal
  if (horizantalAlignment === "Left") {
    newTranslateX = Math.abs(cos * centerX) + Math.abs(sin * centerY) - centerX;
  } else if (horizantalAlignment === "Right") {
    newTranslateX =
      centerX - (Math.abs(cos * centerX) + Math.abs(sin * centerY));
    newTranslateX += parentWidth - element.offsetWidth;
  } else if (horizantalAlignment === "Center") {
    newTranslateX = (parentWidth - element.offsetWidth) / 2;
  }

  return newTranslateX;
}

function calculateTranslateY(
  element,
  rotationAngle,
  verticalAlignment,
  translateY
) {
  let newTranslateY = translateY;

  const rad = (Math.abs(rotationAngle) * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const centerX = element.offsetWidth / 2;
  const centerY = element.offsetHeight / 2;

  const parentHeight = element.offsetParent.offsetHeight;

  //Vertical
  if (verticalAlignment === "Top") {
    newTranslateY = Math.abs(sin * centerX) + Math.abs(cos * centerY) - centerY;
    newTranslateY -= parentHeight;
  } else if (verticalAlignment === "Bottom") {
    newTranslateY =
      centerY - (Math.abs(sin * centerX) + Math.abs(cos * centerY));
    newTranslateY -= element.offsetHeight;
  } else if (verticalAlignment === "Center") {
    newTranslateY = 0;
    newTranslateY -= (parentHeight + element.offsetHeight) / 2;
  }

  return newTranslateY;
}
