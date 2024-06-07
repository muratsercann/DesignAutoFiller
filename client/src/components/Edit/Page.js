import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import backgroundImage from "./background.png";
import ItemEdit from "./ItemEdit";

export default function Page({
  settings,
  selectedItem,
  selectedItemElement,
  setSelectedItem,
  onItemChanged,
}) {
  const itemRef = useRef(null);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [draggingItem, setDraggingItem] = useState(null);

  const dragStart = useRef({ x: 0, y: 0 });
  const initialTranslate = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const rotationAngle = settings?.rotationAngle || 0;
    const horAlign = settings?.horizontalAlignment || "";
    const verAlign = settings?.verticalAlignment || "";
    const translateX = settings?.translateX || 0;
    const translateY = settings?.translateY || 0;

    if (itemRef.current && isImageLoaded) {
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
        newTranslateX !== settings.translateX ||
        newTranslateY !== settings.translateY
      ) {
        onItemChanged({
          translateX: newTranslateX,
          translateY: newTranslateY,
        });
      }
    }
  }, [isImageLoaded, settings, onItemChanged]);

  const handleNonSelectedClick = (e) => {
    setSelectedItem(null);
  };

  const handleKeyDown = (e) => {
    if (selectedItem) {
      const step = 5;
      let newTranslateX;
      let newTranslateY;

      switch (e.key) {
        case "ArrowLeft":
          newTranslateX = selectedItem.translateX - step;
          onItemChanged({
            translateX: newTranslateX,
            horizontalAlignment: "",
          });
          break;
        case "ArrowRight":
          newTranslateX = selectedItem.translateX + step;
          onItemChanged({
            translateX: newTranslateX,
            horizontalAlignment: "",
          });
          break;
        case "ArrowUp":
          newTranslateY = selectedItem.translateY - step;
          onItemChanged({
            translateY: newTranslateY,
            verticalAlignment: "",
          });
          break;
        case "ArrowDown":
          newTranslateY = selectedItem.translateY + step;
          onItemChanged({
            translateY: newTranslateY,
            verticalAlignment: "",
          });
          break;

        default:
          break;
      }
    }
  };

  const handleMouseDown = (item, e) => {
    setSelectedItem(e.target);
    setDraggingItem({
      item,
      startX: e.clientX,
      startY: e.clientY,
      initialTranslateX: item.translateX,
      initialTranslateY: item.translateY,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingItem) return;

    const { item, startX, startY, initialTranslateX, initialTranslateY } =
      draggingItem;
    const newTranslateX = initialTranslateX + (e.clientX - startX);
    const newTranslateY = initialTranslateY + (e.clientY - startY);

    onItemChanged({
      translateX: newTranslateX,
      translateY: newTranslateY,
      horizontalAlignment: "",
      verticalAlignment: "",
    });
  };

  const handleMouseUp = () => {
    setDraggingItem(null);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#ebecf0",
      }}
    >
      <div style={{ width: `${settings.width}px`, position: "relative" }}>
        <div>
          <img
            src={backgroundImage}
            className="img-fluid"
            alt=""
            onLoad={() => setIsImageLoaded(true)}
            onClick={handleNonSelectedClick}
          />

          {isImageLoaded &&
            settings.items.map((item, index) => (
              <ItemEdit
                item={item}
                selectedItemElement={selectedItemElement}
                setSelectedItemElement={setSelectedItem}
                key={index}
                onItemChanged={onItemChanged}
                onMouseDown={(e) => handleMouseDown(item, e)}
              />
            ))}
        </div>
      </div>
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
