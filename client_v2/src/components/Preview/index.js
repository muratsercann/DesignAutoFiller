import "./styles/preview.css";
import * as utils from "../../utils";
import Page from "./Page";
export default function Preview({}) {
  const imageSettings = utils.getImageSettingsFromStorage();
  const imageWidth = utils.cmToPixel(imageSettings.customWidthCm);
  const imageHeight = utils.cmToPixel(imageSettings.customHeightCm);
  const importedData = utils.getImportedDataFromStorage();
  const mappings = utils.getTagColumnMappingFromStorage();
  const settings = utils.getSettingsFromStorage();

  return (
    <div className="preview-container">
      {importedData.map((row, index) => (
        <Page
          key={index}
          page={settings}
          imageSettings={imageSettings}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          mappings={mappings}
          datarow={row}
        />
      ))}
      <div className="mb-5" style={{ width: "100%" }}></div>
    </div>
  );
}
