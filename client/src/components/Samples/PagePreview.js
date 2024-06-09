import React, { useState } from "react";
import Item from "./Item";

export default function PagePreview({ data, scale }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className="preview"
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <div
        className="content"
        style={{ width: data.width, height: data.height }}
      >
        <img
          src={data.bgImageUri}
          className="img-fluid"
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />

        {isImageLoaded &&
          data.items.map((item) => {
            return (
              <Item
                key={item.id}
                item={item}
                originalWidth={data.width}
                originalHeight={data.height}
              ></Item>
            );
          })}
      </div>
    </div>
  );
}
