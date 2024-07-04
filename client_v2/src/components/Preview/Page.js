import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Item from "./Item";
import * as utils from "../../utils";
export default function Page({
  page,
  imageSettings,
  imageWidth,
  imageHeight,
  datarow,
  scale = 1,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div
        className="pageContent"
        style={{
          width: `${imageWidth * scale}px`,
          height: `${imageHeight * scale}px`,
        }}
      >
        <img
          src={imageSettings.src}
          className="img-fluid no-select"
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />

        {isImageLoaded &&
          page.items.map((item, index) => (
            <Item key={index} item={item} datarow={datarow} scale={scale} />
          ))}
      </div>
    </>
  );
}
