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

  let imgPreviewWidth = imageDetails.naturalWidth;

  if (imgPreviewWidth > 150) imgPreviewWidth = 150;
  if (ratio < 1) imgPreviewWidth = 150 * ratio;

  const handleWidthChange = (e) => {
    const width = utils.cmToPixel(Number(e.target.value));
    const height = Number((width / ratio).toFixed(2));

    setImageDetails({
      ...imageDetails,
      customWidth: width,
      customHeight: height,
    });
  };

  return (
    <div ref={thisRef} className="sizing">
      {src && (
        <img
          alt=""
          src={src}
          width={`${imgPreviewWidth}px`}
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
            value={
              utils.pixelToCm(imageDetails?.customWidth) ??
              utils.pixelToCm(imageDetails.naturalWidth)
            }
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
            value={
              utils.pixelToCm(imageDetails?.customHeight) ??
              utils.pixelToCm(imageDetails.naturalHeight)
            }
          />

          <div>cm</div>
        </div>
      </div>
    </div>
  );
}
