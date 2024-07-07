import "./preview.css";
import Page from "./Page";
import { useMemo, useRef, useState } from "react";
export default function Preview({ settings, imageDetails, dataset }) {
  const refContainer = useRef(null);
  const [itemCount, setItemCount] = useState(100);

  const maxWidth = 300;
  let scale = 1;

  console.log("scale :", scale);

  if (imageDetails.customWidth > maxWidth) {
    scale = maxWidth / imageDetails.customWidth;
  }

  const pages = useMemo(() => {
    return dataset
      .slice(0, itemCount)
      .map((row, index) => (
        <Page
          key={index}
          page={settings}
          imageDetails={imageDetails}
          datarow={row}
          scale={scale}
        />
      ));
  }, [dataset, settings, imageDetails, scale, itemCount]);

  const handleShowMore = () => {
    setItemCount((prev) => {
      if (prev + 100 > dataset.length) return dataset.length - 1;
      else return prev + 100;
    });
  };

  return (
    <div ref={refContainer} className="preview-container">
      {imageDetails && dataset && settings && (
        <>
          {pages}
          {itemCount < dataset.length && (
            <div className="app-custom-button" onClick={handleShowMore}>
              Show More
            </div>
          )}
        </>
      )}
    </div>
  );
}
