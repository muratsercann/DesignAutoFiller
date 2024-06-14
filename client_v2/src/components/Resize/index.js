import "./Resize.css";
import * as utils from "../../utils";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";

export default function Resize({}) {
  const imageSettings = utils.getImageSettingsFromStorage();
  const url = imageSettings.url;
  const blobSrc = imageSettings.blobSrc;
  const ratio = imageSettings.ratio;
  const naturalWidthCm = imageSettings.naturalWidthCm;
  const naturalHeightCm = imageSettings.naturalHeightCm;

  const [imgWidth, setImgWidth] = useState(naturalWidthCm);
  const [imgHeight, setImgHeight] = useState(naturalHeightCm);

  const navigate = useNavigate();

  let imgPreviewWidthPx = naturalWidthCm * (96 / 2.54);
  if (imgPreviewWidthPx > 150) imgPreviewWidthPx = 150;

  if (!url && !blobSrc) {
    navigate("/");
  }

  const handleWidthChange = (e) => {
    const width = e.target.value;
    const height = (Number(e.target.value) / ratio).toFixed(2);

    setImgWidth(width);
    setImgHeight(height);
  };

  const handleContinueClick = () => {
    //handle save operations
    navigate("/edit");
  };

  return (
    <div className="resize">
      {blobSrc && (
        <img
          alt=""
          src={blobSrc}
          width={`${imgPreviewWidthPx}px`}
          className="image-fluid"
        />
      )}

      <Row>
        <Col>
          <Form className="mt-3">
            {" "}
            <Form.Control
              id="width"
              type="number"
              placeholder="Width (cm)"
              value={imgWidth}
              onChange={handleWidthChange}
            />
          </Form>{" "}
        </Col>
      </Row>

      <Row>
        <Form className="mt-3">
          <Form.Control
            disabled
            id="height"
            type="number"
            placeholder="Height (cm)"
            value={imgHeight}
          />
        </Form>
      </Row>

      <Row className="mt-3">
        <Form.Control
          type="button"
          value={"Continue"}
          onClick={handleContinueClick}
        />
      </Row>
    </div>
  );
}
