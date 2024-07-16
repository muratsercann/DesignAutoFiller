import "./preview.css";
import Page from "./Page";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { Spinner } from "react-bootstrap";
export default function Preview({
  settings,
  imageDetails,
  dataset,
  width = 300,
  gap = "0.5",
  lazyload = false,

  onLoaded = () => {
    console.log("Content has fully loaded!");
  },
}) {
  const maxWidth = width;
  let scale = 1;

  const refContainer = useRef(null);
  const [itemCount, setItemCount] = useState(lazyload ? 10 : dataset.length);

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  if (imageDetails && imageDetails.customWidth > maxWidth) {
    scale = maxWidth / imageDetails.customWidth;
  }

  useEffect(() => {
    setQuery("1");
  }, []);

  const Result = useCallback(
    (query) => {
      if (query.query === "") {
        console.log("query is empty");
        return (
          <div className="spinner-container">
            <Spinner animation="border" variant="success" />
          </div>
        );
      }
      if (!dataset || dataset.length === 0) return [];
      const result = dataset
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

      return result;
    },
    [dataset, settings, imageDetails, scale, itemCount]
  );

  const handleShowMore = () => {
    setItemCount((prev) => {
      if (prev + 10 > dataset.length) return dataset.length - 1;
      else return prev + 10;
    });
  };

  useEffect(() => {
    if (deferredQuery !== "") {
      onLoaded();
    }
  }, [deferredQuery, onLoaded]);

  return (
    <div
      ref={refContainer}
      className="preview-container"
      style={{ gap: `${gap}cm` }}
    >
      {imageDetails && dataset && settings ? (
        <>
          {<Result query={deferredQuery} />}

          {deferredQuery !== "" && itemCount < dataset.length && (
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
