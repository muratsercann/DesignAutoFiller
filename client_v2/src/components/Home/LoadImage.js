import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function LoadImage({ onSave }) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageBlobSrc, setImageSrc] = useState(null);
  const [imageRatio, setImageRatio] = useState(null);
  const [originalWidthCm, setOriginialWidthCm] = useState();
  const [originalHeightCm, setOriginialHeightCm] = useState();

  const [error, setError] = useState("");

  const hangleImageUrlChange = (e) => {
    checkImage(e);
  };

  const clearImageSettings = () => {
    setImageSrc(null);
    setOriginialWidthCm(null);
    setOriginialHeightCm(null);
    setImageRatio(null);
    setOriginialWidthCm(null);
    setOriginialHeightCm(null);
  };

  const checkImage = (e) => {
    const url = e.target.value;

    const img = new Image();

    img.onload = (event) => {
      setError("");
      setImageUrl(url);

      const { naturalWidth, naturalHeight } = event.target;
      const naturalwidthCm = (naturalWidth * (2.54 / 96)).toFixed(2);
      const naturalHeightCm = (naturalHeight * (2.54 / 96)).toFixed(2);
      const ratio = naturalWidth / naturalHeight;

      setImageRatio(ratio);
      setOriginialWidthCm(naturalwidthCm);
      setOriginialHeightCm(naturalHeightCm);

      console.log("calculated aspect ratio : " + ratio);

      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const imageObjectUrl = URL.createObjectURL(blob);
          setImageSrc(imageObjectUrl);
        })
        .catch(() => {
          setError("Invalid image source!");
          clearImageSettings();
        });
    };
    img.onerror = () => {
      setImageUrl("");
      setError("Invalid image source12!");
      clearImageSettings();
    };
    img.src = url;
  };

  const handleStartClick = () => {
    if (
      imageBlobSrc &&
      imageUrl &&
      imageRatio &&
      originalWidthCm &&
      originalHeightCm
    ) {
      onSave(
        imageBlobSrc,
        imageUrl,
        imageRatio,
        originalWidthCm,
        originalHeightCm
      );
    }
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Control
            placeholder="http://example.com/image.png"
            onChange={hangleImageUrlChange}
          />
        </Row>
        <Row className="mb-3 red">
          <Form.Control
            type="button"
            value={"Start"}
            onClick={handleStartClick}
          />
        </Row>
      </Form>
      {!error && imageBlobSrc && (
        <img
          alt=""
          src={imageBlobSrc}
          width={"120px"}
          className="image-fluid"
        />
      )}

      {error && <div className="error">{error}</div>}
    </>
  );
}
