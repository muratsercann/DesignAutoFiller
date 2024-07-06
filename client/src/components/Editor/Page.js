import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Item from "./Item";
import * as utils from "../../utils";
export default function Page({
  page,
  handleAddNewText,
  handleDeleteSelectedText,
  selectedItem,
  selectedItemElement,
  setSelectedItemElement,
  onItemChanged,
  handleSpaceClick,
  scale,
  setScale,
  imageDetails,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);
  // const [scale, setScale] = useState(1.0);
  const itemRef = useRef(null);

  const handleKeyDown = (e) => {
    if (selectedItem) {
      const step = 1;
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
      initialTranslateX: item.translateX * scale,
      initialTranslateY: item.translateY * scale,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingItem) return;
    const { startX, startY, initialTranslateX, initialTranslateY } =
      draggingItem;
    const newTranslateX = initialTranslateX + (e.clientX - startX);
    const newTranslateY = initialTranslateY + (e.clientY - startY);

    onItemChanged({
      translateX: newTranslateX / scale,
      translateY: newTranslateY / scale,
      horizontalAlignment: "",
      verticalAlignment: "",
    });
  };

  const handleMouseUp = (e) => {
    setDraggingItem(null);
  };

  const handleMouseOver = (e) => {
    if (e.target?.classList?.length > 0) {
      const classlist = Array.from(e.target.classList);
      if (
        Array.from(classlist).some((i) =>
          ["pageContent", "item-text"].includes(i)
        )
      ) {
        e.target.classList.add("hovered");
      }
    }
  };

  const handleMouseOut = (e) => {
    if (e.target?.classList?.length > 0) {
      const classlist = Array.from(e.target.classList);
      if (
        Array.from(classlist).some((i) =>
          ["pageContent", "item-text"].includes(i)
        )
      ) {
        e.target.classList.remove("hovered");
      }
    }
  };
  useEffect(() => {
    const currentPage = itemRef?.current;
    if (currentPage) {
      currentPage.addEventListener("mousemove", handleMouseMove);
      currentPage.addEventListener("mouseup", handleMouseUp);
      currentPage.addEventListener("keydown", handleKeyDown);
      currentPage.addEventListener("mouseover", handleMouseOver);
      currentPage.addEventListener("mouseout", handleMouseOut);
    }
    return () => {
      if (currentPage) {
        currentPage.removeEventListener("mousemove", handleMouseMove);
        currentPage.removeEventListener("mouseup", handleMouseUp);
        currentPage.removeEventListener("keydown", handleKeyDown);
        currentPage.removeEventListener("mouseover", handleMouseOver);
        currentPage.removeEventListener("mouseout", handleMouseOut);
      }
    };
  });

  useLayoutEffect(() => {
    if (itemRef === null || itemRef.current.offsetParent === null) {
      return;
    }

    const pageContentWidth = itemRef.current.offsetWidth;
    const pageContentHeigt = itemRef.current.offsetHeight;
    const pageContainerWidth =
      document.getElementById("pageContainer").offsetWidth;
    const pageContainerHeight =
      document.getElementById("pageContainer").offsetHeight;

    let ratio;
    if (pageContainerWidth > pageContainerHeight) {
      ratio = (pageContainerWidth / pageContentWidth).toFixed(2);
    } else {
      ratio = (pageContainerHeight / pageContentHeigt).toFixed(2);
    }

    if (ratio > 2) {
      let newScale = scale * (ratio / 2);
      if (newScale > 5) setScale(5);
      else {
        setScale(newScale);
      }
    } else if (ratio < 1) {
      setScale(ratio - 0.3);
    }
  }, [imageDetails]);

  useLayoutEffect(() => {
    const pageContentWidth = itemRef.current.offsetWidth;
    const pageContainerWidth =
      document.getElementById("pageContainer").offsetWidth;

    if (pageContentWidth >= pageContainerWidth) {
      document.getElementById("pageContainer").style.justifyContent =
        "flex-start";
    } else {
      document.getElementById("pageContainer").style.justifyContent = "center";
    }
  });

  return (
    <div className="pageSubContainer">
      <div className="pageContentParent">
        <div
          id="pageContent"
          className="pageContent"
          ref={itemRef}
          style={{
            width: `${imageDetails.customWidth * scale}px`,
            height: `${imageDetails.customHeight * scale}px`,
          }}
          // onClick={handleSpaceClick}
        >
          <img
            src={imageDetails.src}
            className="img-fluid no-select"
            alt=""
            onLoad={() => setIsImageLoaded(true)}
          />
          <span className="img-info">{`${utils.pixelToCm(
            imageDetails.customWidth
          )}cm x ${utils.pixelToCm(imageDetails.customHeight)}cm`}</span>

          <div title="" className="page-buttons-container">
            <span
              title="Add new text"
              className="add-text-button"
              onClick={handleAddNewText}
            >
              +
            </span>
            {selectedItem !== null && (
              <span
                title="Delete"
                className="remove-text-button"
                onClick={handleDeleteSelectedText}
              >
                x
              </span>
            )}
          </div>

          {isImageLoaded &&
            page.items.map((item, index) => (
              <Item
                scale={scale}
                item={item}
                selectedItemElement={selectedItemElement}
                setSelectedItemElement={setSelectedItemElement}
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
