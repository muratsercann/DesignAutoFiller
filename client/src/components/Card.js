import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import backgroundImage from "./background.png";

export default function Card({ formData, setFormData }) {
  const itemRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    console.log("car.js is executed");
  });
  useEffect(() => {
    console.log("formData is changed in Card.js : ", formData);
  }, [formData]);

  // let now = performance.now();
  // while (performance.now() - now < 100) {
  //   // Do nothing for a bit...
  // }

  useLayoutEffect(() => {
    const rotationAngle = formData?.rotate || 0;
    const horAlign = formData?.horizontalAlignment || "";
    const verAlign = formData?.verticalAlignment || "";
    const translateX = formData?.translateX || 0;
    const translateY = formData?.translateY || 0;

    function getRotatedStyle(
      element,
      angle,
      horAlign,
      verAlign,
      translateX,
      translateY
    ) {
      let data = {
        translateX: 0,
        translateY: 0,
      };

      const rad = (Math.abs(angle) * Math.PI) / 180;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);

      const centerX = element.offsetWidth / 2;
      const centerY = element.offsetHeight / 2;

      const parentWidth = element.offsetParent.offsetWidth;
      const parentHeight = element.offsetParent.offsetHeight;

      if (horAlign === "Left") {
        translateX =
          Math.abs(cos * centerX) + Math.abs(sin * centerY) - centerX;
      } else if (horAlign === "Right") {
        translateX =
          centerX - (Math.abs(cos * centerX) + Math.abs(sin * centerY));
        translateX += parentWidth - element.offsetWidth;
      } else if (horAlign === "Center") {
        translateX = (parentWidth - element.offsetWidth) / 2;
      }

      if (verAlign === "Top") {
        translateY =
          Math.abs(sin * centerX) + Math.abs(cos * centerY) - centerY;
        translateY -= parentHeight;
      } else if (verAlign === "Bottom") {
        translateY =
          centerY - (Math.abs(sin * centerX) + Math.abs(cos * centerY));
        translateY -= element.offsetHeight;
      } else if (verAlign === "Center") {
        translateY = 0;
        translateY -= (parentHeight + element.offsetHeight) / 2;
      }

      data.translateX = translateX;
      data.translateY = translateY;

      return data;
    }

    if (itemRef.current && isImageLoaded) {
      const newStyle = getRotatedStyle(
        itemRef.current,
        rotationAngle,
        horAlign,
        verAlign,
        translateX,
        translateY
      );

      if (
        newStyle.translateX !== formData.translateX ||
        newStyle.translateY !== formData.translateY
      ) {
        setFormData({
          ...formData,
          translateX: newStyle.translateX,
          translateY: newStyle.translateY,
        });
      }
    }
  }, [isImageLoaded, formData, setFormData]);

  const translateX = formData?.translateX ?? 0;
  const translateY = formData?.translateY ?? 0;
  const rotationAngle = formData?.rotate ?? 0;

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
