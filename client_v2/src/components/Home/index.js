import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import * as utils from "../../utils";
import LoadImage from "./LoadImage";

export default function Home() {
  const navigate = useNavigate();

  const handleImageSave = (
    imageBlobSrc,
    imageUrl,
    ratio,
    naturalWidth,
    naturalHeight
  ) => {
    utils.setImageSettingsToStorage({
      blobSrc: imageBlobSrc,
      url: imageUrl,
      ratio: ratio,
      naturalWidthCm: naturalWidth,
      naturalHeightCm: naturalHeight,
    });

    navigate("/resize");
  };

  return (
    <div className="home">
      <div className="header">
        <h1>Welcome</h1>

        <span>
          We're excited to have you here. Let's get started on your journey with
          us.
        </span>
        <p>Enter your image link and click the start</p>
      </div>
      <div className="home-content">
        <LoadImage onSave={handleImageSave} />
      </div>
    </div>
  );
}
