import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "./background.png";

export default function Card({ formData }) {
  const [style, setStyle] = useState({});
  const outerRef = useRef(null);
  const rotate = formData?.rotate || 0;
  const align = formData?.align || "top-left"; // Varsayılan olarak center hizalanır

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

    //for left alignment
    if (align.includes("left")) {
      style.left = "0px";
      translateX = Math.abs(cos * centerX) + Math.abs(sin * centerY) - centerX;
    }

    //for right alignment
    if (align.includes("right")) {
      style.right = "0px";

      translateX =
        centerX - (Math.abs(cos * centerX) + Math.abs(sin * centerY));
    }

    //for top alignment
    if (align.includes("top")) {
      style.top = "0px";

      translateY = Math.abs(sin * centerX) + Math.abs(cos * centerY) - centerY;
    }

    //for bottom alignment
    if (align.includes("bottom")) {
      style.bottom = "0px";

      translateY =
        centerY - (Math.abs(sin * centerX) + Math.abs(cos * centerY));
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
