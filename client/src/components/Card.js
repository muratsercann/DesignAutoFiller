import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import backgroundImage from "./background.png";

export default function Card({ formData }) {
  let rotate = 0;

  if (formData?.rotate) {
    rotate = formData.rotate;
  }

  const rotationStyle = `translate(0%, 0%) rotate(${rotate}deg)`;
  console.log("rotation : ", rotationStyle);
  return (
    <div style={{ width: 250, position: "relative" }}>
      <div style={{ width: "auto", backgroundColor: "red" }}>
        <img src={backgroundImage} className="img-fluid" alt="" />

        <div style={{ transform: rotationStyle }} className="outer">
          <div className="header">DAVETLİSİNİZ</div>
        </div>

        {/* <div className="outer">
          <div className="text">Sn Murat Sercan</div>
        </div> */}
      </div>
    </div>
  );
}
