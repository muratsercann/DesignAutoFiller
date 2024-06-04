import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "./background.png";

export default function Card({ formData }) {
  const [style, setStyle] = useState({});
  const outerRef = useRef(null);
  const rotate = formData?.rotate || 0;
  const align = formData?.align || "top-left"; // Varsayılan olarak center hizalanır
  const horAlign = formData?.horizontalAlignment || "Left"; // Varsayılan olarak center hizalanır
  const verAlign = formData?.verticalAlignment || "Top"; // Varsayılan olarak center hizalanır

  useEffect(() => {
    if (outerRef.current) {
      const newStyle = getRotatedStyle(outerRef.current, rotate, align);
      setStyle(newStyle);
    }
  }, [formData, rotate, align]);

  function getRotatedStyle(element, angle, align) {
    let style = {};

    const rad = (Math.abs(angle) * Math.PI) / 180;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);

    const centerX = element.offsetWidth / 2;
    const centerY = element.offsetHeight / 2;

    let translateX = 0;
    let translateY = 0;

    if (horAlign === "Left") {
      style.left = "0px";
      translateX = Math.abs(cos * centerX) + Math.abs(sin * centerY) - centerX;
    } else if (horAlign === "Right") {
      style.right = "0px";

      translateX =
        centerX - (Math.abs(cos * centerX) + Math.abs(sin * centerY));
    } else if (horAlign === "Center") {
      translateX = 0;
      style.left = `calc(50% - ${centerX}px)`;
    }

    if (verAlign === "Top") {
      style.top = "0px";
      translateY = Math.abs(sin * centerX) + Math.abs(cos * centerY) - centerY;
    } else if (verAlign === "Bottom") {
      style.bottom = "0px";

      translateY =
        centerY - (Math.abs(sin * centerX) + Math.abs(cos * centerY));
    } else if (verAlign === "Center") {
      translateY = 0;
      style.top = `calc(50% - ${centerY}px )`;
    }

    // Return the new transform style

    style.transform = `translate(${translateX}px, ${translateY}px) rotate(${angle}deg)`;

    return style;
  }

  return (
    <div style={{ width: 250, position: "relative", marginTop: "150px" }}>
      <div>
        <img src={backgroundImage} className="img-fluid" alt="" />

        <div ref={outerRef} style={style} className="outer">
          murat
          {/* <div className="header">DAVETLİSİNİZ</div> */}
        </div>
      </div>
    </div>
  );
}
