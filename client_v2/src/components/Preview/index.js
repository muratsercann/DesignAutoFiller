import "./styles/preview.css";
import * as utils from "../../utils";
import Page from "./Page";
export default function Preview({}) {
  const imageSettings = utils.getImageSettingsFromStorage();
  const imageWidth = imageSettings
    ? utils.cmToPixel(imageSettings.customWidthCm)
    : 0;
  const imageHeight = imageSettings
    ? utils.cmToPixel(imageSettings.customHeightCm)
    : 0;
  const importedData = utils.getImportedDataFromStorage();
  const mappings = utils.getTagColumnMappingFromStorage();
  const settings = utils.getSettingsFromStorage();

  return (
    <div className="preview-container">
      {imageSettings &&
        importedData &&
        settings &&
        importedData.map((row, index) => (
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
