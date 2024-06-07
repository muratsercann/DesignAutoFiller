import React, { useState } from "react";
import backgroundImage from "./background.png";
import Item from "./Item";

export default function PagePreview({ settings, scale }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className="preview"
      style={{
        transform: `scale(${scale})`
      }}
    >
      <div className="content" style={{ width: settings.width, height: settings.height }}>
        <img
          src={backgroundImage}
          className="img-fluid"
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />

        {isImageLoaded &&
          settings.items.map((item) => {
            return (
              <Item
                key={item.id}
                settings={item}
                originalWidth={settings.width}
                originalHeight={settings.height}
              ></Item>
            );
          })}
      </div>
    </div>
  );
}
