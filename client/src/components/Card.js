import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "./background.png";

export default function Card({ formData }) {
  const [rotationStyle, setRotationStyle] = useState("");
  const outerRef = useRef(null);
  const rotate = formData?.rotate || 0;
  const align = formData?.align || "top-left"; // Varsayılan olarak center hizalanır

  useEffect(() => {
    if (outerRef.current) {
      const newStyle = getRotatedStyle(outerRef.current, rotate, align);
      setRotationStyle(newStyle);
    }
  }, [formData, rotate, align]);

  function getRotatedStyle(element, angle, align) {
    // Calculate the initial transform
    // if (angle === 0) {
    //   return `translate(${0}px, ${0}px) rotate(${-45}deg)`;
    // }


    const rad = ((90 - Math.abs(angle)) * Math.PI) / 180;
    const rad2 = (Math.abs(angle) * Math.PI) / 180;
    const sin = Math.sin(rad);
    const sin2 = Math.sin(rad2);
    const cos = Math.cos(rad);

    // Calculate the bounding box after rotation
    const newWidth =
      Math.abs(element.offsetWidth * cos) +
      Math.abs(element.offsetHeight * sin);
    const newHeight =
      Math.abs(element.offsetWidth * sin) +
      Math.abs(element.offsetHeight * cos);

    const centerX = element.offsetWidth / 2;
    const centerY = element.offsetHeight / 2;

    let translateX = 0;
    let translateY = 0;

    translateX = Math.abs(sin * centerX) + Math.abs(sin2 * centerY) - centerX;

    // Return the new transform style
    return `translate(${translateX}px, ${translateY}px) rotate(${angle}deg)`;
  }

  return (
    <div style={{ width: 250, position: "relative", marginTop: "150px" }}>
      <div>
        <img src={backgroundImage} className="img-fluid" alt="" />

        <div
          ref={outerRef}
          style={{ transform: rotationStyle }}
          className="outer"
        >
          {/* <div className="header">DAVETLİSİNİZ</div> */}
        </div>
      </div>
    </div>
  );
}
