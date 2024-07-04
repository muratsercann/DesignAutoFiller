import "./preview.css";
import * as utils from "../../utils";
import Page from "./Page";
export default function Preview({ settings, imageDetails, dataset }) {
  const scale =
    imageDetails.customWidth > 150 ? 150 / imageDetails.customWidth : 1;

  return (
    <div className="preview-container">
      {imageDetails &&
        dataset &&
        settings &&
        dataset.map((row, index) => (
          <Page
            key={index}
            page={settings}
            imageDetails={imageDetails}
            datarow={row}
            scale={scale}
          />
        ))}
    </div>
  );
}
