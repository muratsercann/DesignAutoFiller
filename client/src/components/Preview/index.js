import "./preview.css";
import Page from "./Page";
import { useMemo, useRef, useState } from "react";
export default function Preview({
  settings,
  imageDetails,
  dataset,
  width = 300,
  gap = "0.5",
  lazyload = false,
}) {
  const refContainer = useRef(null);
  const [itemCount, setItemCount] = useState(lazyload ? 10 : dataset.length);

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
      if (prev + 10 > dataset.length) return dataset.length - 1;
      else return prev + 10;
    });
  };

  return (
    <div
      ref={refContainer}
      className="preview-container"
      style={{ gap: `${gap}cm` }}
    >
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
        <div style={{ color: "var(--bs-gray-500)", fontWeight: 400 }}>
          Sorry! Nothing to show here.
        </div>
      )}
    </div>
  );
}
