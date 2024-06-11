import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function LoadImage({ onSave }) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageBlobSrc, setImageSrc] = useState(null);
  const [error, setError] = useState("");

  const hangleImageUrlChange = (e) => {
    checkImage(e.target.value);
  };

  const checkImage = (url) => {
    const img = new Image();
    img.onload = () => {
      setError("");
      setImageUrl(url);

      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const imageObjectUrl = URL.createObjectURL(blob);
          setImageSrc(imageObjectUrl);
        })
        .catch(() => {
          setError("Invalid image source!");
          setImageSrc(null);
        });
    };
    img.onerror = () => {
      setImageUrl("");
      setError("Invalid image source!");
      setImageSrc(null);
    };
    img.src = url;
  };

  const handleStartClick = () => {
    if (imageBlobSrc && imageUrl) {
      onSave(imageUrl, imageBlobSrc);
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
