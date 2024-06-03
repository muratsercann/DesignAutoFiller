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
    const rad = (Math.abs(angle) * Math.PI) / 180;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);

    const centerX = element.offsetWidth / 2;
    const centerY = element.offsetHeight / 2;

    let translateX = 0;
    let translateY = 0;

    //for left alignment
    translateX = Math.abs(cos * centerX) + Math.abs(sin * centerY) - centerX;

    //for right alignment
    //translateX = centerX - (Math.abs(cos * centerX) + Math.abs(sin * centerY));

    //for top alignment
    //translateY = Math.abs(sin * centerX) + Math.abs(cos * centerY) - centerY;

    //for bottom alignment
    translateY = centerY - (Math.abs(sin * centerX) + Math.abs(cos * centerY));

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
          murat
          {/* <div className="header">DAVETLİSİNİZ</div> */}
        </div>
      </div>
    </div>
  );
}
