import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Item from "./Item";
import * as utils from "../../utils";
export default function Page({
  page,
  imageSettings,
  imageWidth,
  imageHeight,
  mappings,
  datarow,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div
        className="pageContent"
        style={{
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
        }}
      >
        <img
          src={imageSettings.url}
          className="img-fluid no-select"
          alt=""
          onLoad={() => setIsImageLoaded(true)}
        />

        

        {isImageLoaded &&
          page.items.map((item, index) => (
            <Item
              key={index}
              item={item}
              mappings={mappings}
              datarow={datarow}
            />
          ))}
      </div>
    </>
  );
}
