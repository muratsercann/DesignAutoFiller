import "./styles/preview.css";
import * as utils from "../../utils";
import Page from "./Page";
export default function Preview({ settings, imageSettings, dataset }) {
  const imageWidth = imageSettings
    ? utils.cmToPixel(imageSettings.customWidthCm)
    : 0;
  const imageHeight = imageSettings
    ? utils.cmToPixel(imageSettings.customHeightCm)
    : 0;

  return (
    <div className="preview-container">
      {imageSettings &&
        dataset &&
        settings &&
        dataset.map((row, index) => (
          <Page
            key={index}
            page={settings}
            imageSettings={imageSettings}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            datarow={row}
          />
        ))}
    </div>
  );
}
