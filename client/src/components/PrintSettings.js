import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import * as utils from "../utils";
import Preview from "./Preview";
import { SlPrinter } from "react-icons/sl";

const minWidth = 3;
const defaultGap = 0.5;
const minGap = 0;
const maxGap = 3;

export default function PrintSettings({ settings, imageDetails, dataset }) {
  const imageNaturalWidth = utils.pixelToCm(imageDetails?.naturalWidth);
  const imageNaturalHeight = utils.pixelToCm(imageDetails?.naturalHeight);

  const [width, setWidth] = useState(
    imageNaturalWidth > 5 ? 5 : imageNaturalWidth
  );
  const [height, setHeight] = useState(
    imageNaturalWidth > 5
      ? parseFloat((5 / imageDetails.ratio).toFixed(2))
      : imageNaturalHeight
  );

  const [printSettings, setPrintSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const disabled = dataset == null || dataset.length === 0;

  const [gap, setGap] = useState(defaultGap);

  const lockRatioChecked = true;

  useEffect(() => {
    if (previewLoaded) {
      window.print();
    }
  }, [previewLoaded]);

  useEffect(() => {
    setPrintSettings(null);
  }, [dataset, imageDetails, settings]);

  if (imageDetails == null) return <>Not found an design to print.</>;

  if (settings == null) return <>Something is wrong.</>;

  if (dataset == null) return <>No dataset found.</>;

  const handleWidthChange = (e) => {
    if (e.target.value === "") {
      setWidth(e.target.value);
      setPrintSettings(null);
      return;
    }

    const value = parseFloat(Number(e.target.value).toFixed(2));
    setWidth(value);
    if (value > 0 && lockRatioChecked) {
      const newHeight = parseFloat((value / imageDetails.ratio).toFixed(2));
      setHeight(newHeight);
    }
    setPrintSettings(null);
  };

  const handleHeightChange = (e) => {
    const value = parseFloat(Number(e.target.value).toFixed(2));
    setHeight(value);
    if (value > 0 && lockRatioChecked) {
      const newWidth = parseFloat((value * imageDetails.ratio).toFixed(2));
      setWidth(newWidth);
    }
    setPrintSettings(null);
  };

  const handleBlur = () => {
    if (width === "" || width < minWidth) {
      setWidth(minWidth);
    } else if (width > utils.pixelToCm(imageDetails.naturalWidth)) {
      setWidth(utils.pixelToCm(imageDetails.naturalWidth));
      setHeight(utils.pixelToCm(imageDetails.naturalHeight));
    }
    setPrintSettings(null);
  };

  const handleGapChange = (e) => {
    if (e.target.value === "") {
      setGap(e.target.value);
      setPrintSettings(null);
      return;
    }

    setGap(parseFloat(Number(e.target.value).toFixed(2)));
  };

  const handleGapBlur = () => {
    if (gap === "" || gap < minGap) {
      setGap(minGap);
    } else if (gap > maxGap) {
      setGap(maxGap);
    }
    setPrintSettings(null);
  };

  const handlePrintClick = () => {
    if (disabled) return;
    setLoading(true);
    setPreviewLoaded(false);
    setPrintSettings({ width: utils.cmToPixel(width), gap: gap });
  };

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <Spinner animation="border" variant="success" />
        </div>
      )}
      <div
        className="print-settings"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyItems: "center",
        }}
      >
        <div className="d-flex justify-items-center w-100 align-center">
          <h5>Adjust size</h5>
        </div>
        <div>
          <Form.Label>Width (cm) : </Form.Label>
          <Form.Control
            className={`bg-dark text-light ${disabled ? "disabled" : ""}`}
            disabled={disabled}
            value={width}
            type="number"
            id="adjust-width"
            min={minWidth}
            max={utils.pixelToCm(imageDetails.naturalWidth)}
            onChange={handleWidthChange}
            onBlur={handleBlur}
          ></Form.Control>
        </div>
        <div>
          <Form.Label>Height (cm) : </Form.Label>
          <Form.Control
            className="bg-dark text-light disabled"
            disabled={true}
            value={height}
            type="number"
            id="adjust-width"
            onChange={handleHeightChange}
          ></Form.Control>
        </div>
        <div style={{ color: "var(--bs-gray-700)" }}>Ratio is locked</div>

        <div>
          <Form.Label>{`Gap between ${minGap}-${maxGap} cm :`}</Form.Label>
          <Form.Control
            value={gap}
            className={`bg-dark text-light ${disabled ? "disabled" : ""}`}
            disabled={disabled}
            type="number"
            id="adjust-gap"
            min={minGap}
            max={maxGap}
            onChange={handleGapChange}
            onBlur={handleGapBlur}
          ></Form.Control>
        </div>

        <div
          className={`app-custom-button blue mt-3 ${
            disabled ? "disabled" : ""
          }`}
          onClick={handlePrintClick}
        >
          <SlPrinter size={17} />
          Print
        </div>
        <div style={{ fontWeight: "400", color: "var(--bs-gray-600)" }}>
          <p>
            We will duplicate your design by your data source with size adjusted
            by you. The maximum size you can enter is{" "}
            <span style={{ fontWeight: "700", color: "var(--bs-gray-500)" }}>
              {utils.pixelToCm(imageDetails.naturalWidth)} cm x{" "}
              {utils.pixelToCm(imageDetails.naturalHeight)} cm.
            </span>{" "}
            This is natural size of your image.
          </p>

          <p>
            You can enter a value from{" "}
            <span style={{ fontWeight: "700", color: "var(--bs-gray-500)" }}>
              {" "}
              {minGap} to {maxGap} cm{" "}
            </span>{" "}
            for gap between each duplicated design.
          </p>

          <p>
            You can click the Print button to see how it looks like in printing.
            After that,if you want, you can change values again.
          </p>
        </div>
      </div>
      <div className="print-preview" style={{ display: "none" }}>
        {printSettings != null && (
          <Preview
            width={printSettings.width}
            gap={printSettings.gap}
            settings={settings}
            dataset={dataset}
            imageDetails={imageDetails}
            onLoaded={() => {
              setLoading(false);
              setPreviewLoaded(true);
            }}
          />
        )}
      </div>
    </>
  );
}
