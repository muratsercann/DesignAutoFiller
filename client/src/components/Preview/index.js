import "./preview.css";
import Page from "./Page";
import { useMemo, useRef, useState } from "react";
export default function Preview({
  settings,
  imageDetails,
  dataset,
  width = 300,
}) {
  const refContainer = useRef(null);
  const [itemCount, setItemCount] = useState(100);

  const maxWidth = width;
  let scale = 1;

  if (imageDetails && imageDetails.customWidth > maxWidth) {
    scale = maxWidth / imageDetails.customWidth;
  }

  const pages = useMemo(() => {
    if (!dataset || dataset.length === 0) return [];
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
      {imageDetails && dataset && settings ? (
        <>
          {pages}
          {itemCount < dataset.length && (
            <div className="app-custom-button" onClick={handleShowMore}>
              Show More
            </div>
          )}
        </>
      ) : (
        <div style={{ color: "var(--bs-gray-500)" }}></div>
      )}
    </div>
  );
}
