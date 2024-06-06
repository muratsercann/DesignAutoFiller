import React, { useState } from "react";
import backgroundImage from "./background.png";
import Item from "./Item";

export default function PagePreview({ settings, previewWidth, previewHeight }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      style={{
        width: `${previewWidth}px`,
        height: `${previewHeight}px`,
      }}
    >
      <div>
        <img
          src={backgroundImage}
          className="img-fluid"
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />

        {isImageLoaded &&
          settings.items.map((page) => {
            return (
              <Item
                settings={page}
                originalWidth={settings.width}
                originalHeight={settings.height}
                previewWidth={previewWidth}
                previewHeight={previewHeight}
              ></Item>
            );
          })}
      </div>
    </div>
  );
}
