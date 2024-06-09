import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import backgroundImage from "./background.png";
import ItemEdit from "./ItemEdit";

export default function Page({
  page,
  selectedItem,
  selectedItemElement,
  setSelectedItemElement,
  onItemChanged,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleImageClick = (e) => {
    setSelectedItemElement(null);
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
    setSelectedItemElement(e.target);
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

    const { startX, startY, initialTranslateX, initialTranslateY } =
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
      className="pageContent"
      style={{
        width: `${page.width}px`,
        position: "relative",
        display: "flex",
      }}
    >
      <img
        src={backgroundImage}
        className="img-fluid no-select"
        alt=""
        onLoad={() => setIsImageLoaded(true)}
        onClick={handleImageClick}
      />

      {isImageLoaded &&
        page.items.map((item, index) => (
          <ItemEdit
            item={item}
            selectedItemElement={selectedItemElement}
            setSelectedItemElement={setSelectedItemElement}
            key={index}
            onItemChanged={onItemChanged}
            onMouseDown={(e) => handleMouseDown(item, e)}
          />
        ))}
    </div>
  );
}
