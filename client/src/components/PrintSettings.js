import { useState } from "react";
import { Form } from "react-bootstrap";
import { BiColor } from "react-icons/bi";
import * as utils from "../utils";
import { BsJustify } from "react-icons/bs";

const minWidth = 3;

const defaultGap = 0.5;
const minGap = 0;
const maxGap = 3;

export default function PrintSettings({ imageDetails }) {
  const [width, setWidth] = useState(
    utils.pixelToCm(imageDetails?.naturalWidth)
  );
  const [height, setHeight] = useState(
    utils.pixelToCm(imageDetails?.naturalHeight)
  );

  const [gap, setGap] = useState(defaultGap);

  const [lockRatioChecked, setLockRatioChecked] = useState(true);

  if (imageDetails == null) {
    return <></>;
  }

  const handleWidthChange = (e) => {
    if (e.target.value === "") {
      setWidth(e.target.value);
      return;
    }

    const value = parseFloat(Number(e.target.value).toFixed(2));
    setWidth(value);
    if (value > 0 && lockRatioChecked) {
      const newHeight = parseFloat((value / imageDetails.ratio).toFixed(2));
      setHeight(newHeight);
    }
  };

  const handleHeightChange = (e) => {
    const value = parseFloat(Number(e.target.value).toFixed(2));
    setHeight(value);
    if (value > 0 && lockRatioChecked) {
      const newWidth = parseFloat((value * imageDetails.ratio).toFixed(2));
      setWidth(newWidth);
    }
  };

  const handleSaveRatioChange = (e) => {
    setLockRatioChecked(e.target.checked);

    if (e.target.checked) {
      const newHeight = parseFloat((width / imageDetails.ratio).toFixed(2));
      setHeight(newHeight);
    }
  };
  const handleBlur = () => {
    if (width === "" || width < minWidth) {
      setWidth(minWidth);
    } else if (width > utils.pixelToCm(imageDetails.naturalWidth)) {
      setWidth(utils.pixelToCm(imageDetails.naturalWidth));
      setHeight(utils.pixelToCm(imageDetails.naturalHeight));
    }
  };

  const handleGapChange = (e) => {
    if (e.target.value === "") {
      setGap(e.target.value);
      return;
    }

    setGap(parseFloat(Number(e.target.value).toFixed(2)));
  };

  const handleGapBlur = () => {
    if (gap === "" || gap < minGap) {
      setGap(minGap);
    } else if (gap > maxGap) setGap(maxGap);
  };

  return (
    <div
      className="print-settings"
      style={{
        color: "var(--bs-gray-400)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyItems: "center",
      }}
    >
      <div className="d-flex justify-items-center w-100 align-center">
        <h5>Adjust size</h5>
      </div>
      {/* <br></br> */}
      <div>
        <Form.Label>Width (cm) : </Form.Label>
        {/* {"  "} */}
        <Form.Control
          value={width}
          type="number"
          id="adjust-width"
          min={minWidth}
          max={utils.pixelToCm(imageDetails.naturalWidth)}
          onChange={handleWidthChange}
          onBlur={handleBlur}
        ></Form.Control>
      </div>
      {/* <br></br> */}
      <div>
        <Form.Label>Height (cm) : </Form.Label>
        {/* {"  "} */}
        <Form.Control
          disabled={true}
          value={height}
          type="number"
          id="adjust-width"
          onChange={handleHeightChange}
        ></Form.Control>
      </div>
      {/* <br></br> */}
      <div style={{ color: "var(--bs-gray-700)" }}>Ratio is locked</div>

      <div>
        {/* <Form.Check
          type={"checkbox"}
          id={"save-ratio"}
          label={`Save Ratio`}
          checked={lockRatioChecked}
          onChange={handleSaveRatioChange}
        /> */}
      </div>

      {/* <br></br> */}
      <div>
        <Form.Label>{`Gap between ${minGap}-${maxGap} cm :`}</Form.Label>
        {/* {"  "} */}
        <Form.Control
          value={gap}
          type="number"
          id="adjust-gap"
          min={minGap}
          max={maxGap}
          onChange={handleGapChange}
          onBlur={handleGapBlur}
        ></Form.Control>
      </div>
    </div>
  );
}
