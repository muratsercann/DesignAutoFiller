import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import backgroundImage from "./background.png";

export default function Card({ settings, setSettings }) {
  const itemRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialTranslate = useRef({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const rotationAngle = settings?.rotate || 0;
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
        setSettings({
          ...settings,
          translateX: newTranslateX,
          translateY: newTranslateY,
        });
      }
    }
  }, [isImageLoaded, settings, setSettings]);

  const translateX = settings?.translateX ?? 0;
  const translateY = settings?.translateY ?? 0;
  const rotationAngle = settings?.rotate ?? 0;

  const handleClick = (e) => {
    setSelectedDiv(e.target);
  };

  const handleNonSelectedClick = (e) => {
    setSelectedDiv(null);
  };

  const handleKeyDown = (e) => {
    if (selectedDiv) {
      const step = 5;
      let newTranslateX;
      let newTranslateY;

      switch (e.key) {
        case "ArrowUp":
          newTranslateY = settings.translateY - step;
          setSettings({
            ...settings,
            translateY: newTranslateY,
            verticalAlignment: "",
          });
          break;
        case "ArrowDown":
          newTranslateY = settings.translateY + step;
          setSettings({
            ...settings,
            translateY: newTranslateY,
            verticalAlignment: "",
          });
          break;
        case "ArrowLeft":
          newTranslateX = settings.translateX - step;
          setSettings({
            ...settings,
            translateX: newTranslateX,
            horizontalAlignment: "",
          });
          break;
        case "ArrowRight":
          newTranslateX = settings.translateX + step;
          setSettings({
            ...settings,
            translateX: newTranslateX,
            horizontalAlignment: "",
          });
          break;
        default:
          break;
      }
    }
  };

  const handleMouseDown = (e) => {
    setSelectedDiv(e.target);
    setIsDragging(true);

    dragStart.current = { x: e.clientX, y: e.clientY };

    initialTranslate.current = {
      x: settings.translateX,
      y: settings.translateY,
    };
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      console.log(`(dx,dy) : ${dx},${dy}`);

      const newTranslateX = initialTranslate.current.x + dx;
      const newTranslateY = initialTranslate.current.y + dy;

      setSettings({
        ...settings,
        translateX: newTranslateX,
        translateY: newTranslateY,
        horizontalAlignment: "",
        verticalAlignment: "",
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
      }}
    >
      <div
        style={{ width: `${settings.containerWidth}px`, position: "relative" }}
      >
        <div>
          <img
            src={backgroundImage}
            className="img-fluid"
            alt=""
            onLoad={() => setIsImageLoaded(true)}
            onClick={handleNonSelectedClick}
          />

          {isImageLoaded && (
            <div
              ref={itemRef}
              style={{
                transform: `translate(${translateX}px, ${translateY}px) rotate(${rotationAngle}deg)`,
                border:
                  selectedDiv === itemRef.current
                    ? "2px dotted #a686ff"
                    : "none",
                cursor: "move",
              }}
              className="outer"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
            >
              Invitation For You
            </div>
          )}
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
