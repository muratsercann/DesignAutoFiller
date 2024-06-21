import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Item from "./Item";
import * as utils from "../../utils";
export default function Page({
  page,
  setPage,
  selectedItem,
  selectedItemElement,
  setSelectedItemElement,
  onItemChanged,
  handleSpaceClick,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);
  const [scale, setScale] = useState(1.0);
  const itemRef = useRef(null);

  const imageSettings = utils.getImageSettingsFromStorage();

  const imageWidth = utils.cmToPixel(imageSettings.customWidthCm);
  const imageHeight = utils.cmToPixel(imageSettings.customHeightCm);

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

  const handleAddText = () => {
    let newId = 1;

    if (page.items.length > 0) {
      const lastId = page.items[page.items.length - 1].id;
      newId = lastId + 1;
    }
    const newTextField = {
      id: newId,
      pageId: page.id,
      type: "text",
      value: "Add Something Here",
      rotationAngle: 0,
      translateX: 0,
      translateY: 0,
      fontSize: 24,
      fontColor: "black",
      fontFamily: "",
      width: 150,
      horizontalAlignment: "Center",
      verticalAlignment: "Center",
      textAlign: "center",
    };

    setPage((prevPage) => ({
      ...prevPage,
      items: [...prevPage.items, newTextField],
    }));
  };

  const handleDeleteText = () => {
    if (selectedItem === null) {
      return;
    }
    setPage((prevPage) => ({
      ...prevPage,
      items: prevPage.items.filter((item) => item.id !== selectedItem.id),
    }));

    setSelectedItemElement(null);
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

  useLayoutEffect(() => {
    if (itemRef === null) {
      return;
    }

    const pageContentHeigt = itemRef.current.offsetHeight;
    const pageContainerHeight = itemRef.current.offsetParent.offsetHeight;

    // console.log(pageContentHeigt, pageContainerHeight);

    if (pageContentHeigt > pageContainerHeight - 20) {
      const scale = (pageContainerHeight / pageContentHeigt).toFixed(2);

      setScale(scale - 0.05);
    }
  });

  return (
    <>
      <div
        className="pageContent"
        ref={itemRef}
        style={{
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `scale(${scale})`,
        }}
        onClick={handleSpaceClick}
      >
        <img
          src={imageSettings.blobSrc}
          className="img-fluid no-select"
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />
        <span className="img-info">{`${imageSettings.customWidthCm}cm x ${imageSettings.customHeightCm}cm`}</span>

        <div title="" className="page-buttons-container">
          <span
            title="Add new text"
            className="add-text-button"
            onClick={handleAddText}
          >
            +
          </span>
          {selectedItem !== null && (
            <span
              title="Delete"
              className="remove-text-button"
              onClick={handleDeleteText}
            >
              x
            </span>
          )}
        </div>

        {isImageLoaded &&
          page.items.map((item, index) => (
            <Item
              item={item}
              selectedItemElement={selectedItemElement}
              setSelectedItemElement={setSelectedItemElement}
              key={index}
              onItemChanged={onItemChanged}
              onMouseDown={(e) => handleMouseDown(item, e)}
            />
          ))}
      </div>
    </>
  );
}
