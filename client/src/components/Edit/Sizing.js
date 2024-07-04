import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as utils from "../../utils";
import { useRef, useState } from "react";

export default function Sizing({ imageDetails, setImageDetails }) {
  const thisRef = useRef(null);
  const src = imageDetails.src;
  const ratio = imageDetails.ratio;
  const naturalWidthCm = imageDetails.naturalWidthCm;
  const naturalHeightCm = imageDetails.naturalHeightCm;

  let imgPreviewWidthPx = utils.cmToPixel(naturalWidthCm);

  if (imgPreviewWidthPx > 150) imgPreviewWidthPx = 150;
  if (ratio < 1) imgPreviewWidthPx = 150 * ratio;

  const handleWidthChange = (e) => {
    const width = Number(e.target.value);
    const height = Number((e.target.value / ratio).toFixed(2));

    setImageDetails({
      ...imageDetails,
      customWidthCm: width,
      customHeightCm: height,
    });
  };

  return (
    <div ref={thisRef} className="sizing">
      {src && (
        <img
          alt=""
          src={src}
          width={`${imgPreviewWidthPx}px`}
          className="image-fluid"
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "clumn",
            gap: "0.5rem",
            alignItems: "center",
            justifyItems: "center",
            width: "auto",
          }}
        >
          <div>Width:</div>
          <Form.Control
            id="width"
            style={{ width: "120px" }}
            type="number"
            placeholder="Width (cm)"
            value={imageDetails?.customWidthCm ?? imageDetails.naturalWidthCm}
            onChange={handleWidthChange}
          />
          <div>cm</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            alignItems: "center",
            justifyItems: "center",
            width: "auto",
          }}
        >
          <div>Height:</div>
          <Form.Control
            style={{ width: "120px" }}
            disabled
            id="height"
            type="number"
            placeholder="Height (cm)"
            value={imageDetails?.customHeightCm ?? imageDetails.naturalHeightCm}
          />

          <div>cm</div>
        </div>
      </div>
    </div>
  );
}
