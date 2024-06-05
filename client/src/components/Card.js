import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import backgroundImage from "./background.png";

export default function Card({ settings, setSettings }) {
  const itemRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    console.log("card.js is executed");
  });
  useEffect(() => {
    console.log("setting have been changed : ", settings);
  }, [settings]);

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

  return (
    <div style={{ width: 250, position: "relative", marginTop: "150px" }}>
      <div>
        <img
          src={backgroundImage}
          className="img-fluid"
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />

        {isImageLoaded && (
          <div
            ref={itemRef}
            style={{
              transform: `translate(${translateX}px, ${translateY}px) rotate(${rotationAngle}deg)`,
            }}
            className="outer"
          >
            <div className="header">DAVETLİSİNİZ</div>
          </div>
        )}
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
