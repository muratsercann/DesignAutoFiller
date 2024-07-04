import "./Sizing.css";
import * as utils from "../../utils";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";

export default function Sizing({}) {
  const imageSettings = utils.getImageSettingsFromStorage();
  const url = imageSettings.url;
  const blobSrc = imageSettings.blobSrc;
  const ratio = imageSettings.ratio;
  const naturalWidthCm = imageSettings.naturalWidthCm;
  const naturalHeightCm = imageSettings.naturalHeightCm;

  const [customWidthCm, setCustomImgWidthCm] = useState(naturalWidthCm);
  const [customHeightCm, setCustomImgHeightCm] = useState(naturalHeightCm);

  const navigate = useNavigate();

  let imgPreviewWidthPx = naturalWidthCm * (96 / 2.54);
  if (imgPreviewWidthPx > 150) imgPreviewWidthPx = 150;

  if (!url && !blobSrc) {
    navigate("/");
  }

  const handleWidthChange = (e) => {
    const width = Number(e.target.value);
    const height = Number((e.target.value / ratio).toFixed(2));

    setCustomImgWidthCm(width);
    setCustomImgHeightCm(height);
  };

  const handleContinueClick = () => {
    utils.setImageSettingsToStorage({
      ...imageSettings,
      customWidthCm: customWidthCm,
      customHeightCm: customHeightCm,
    });
    navigate("/edit");
  };

  return (
    <div className="sizing">
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
              value={customWidthCm}
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
            value={customHeightCm}
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
