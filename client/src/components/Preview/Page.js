import React, { useState } from "react";
import Item from "./Item";
export default function Page({ page, imageDetails, datarow, scale = 1 }) {
  return (
    <>
      <div
        className="pageContent"
        style={{
          width: `${imageDetails.customWidth * scale}px`,
          height: `${imageDetails.customHeight * scale}px`,
        }}
      >
        <img src={imageDetails.src} className="img-fluid no-select" alt="" />

        {page.items.map((item, index) => (
          <Item key={index} item={item} datarow={datarow} scale={scale} />
        ))}
      </div>
    </>
  );
}
