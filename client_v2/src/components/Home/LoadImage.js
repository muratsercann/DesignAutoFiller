import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { BiLinkAlt } from "react-icons/bi";
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
      const naturalWidthCm = Number((naturalWidth * (2.54 / 96)).toFixed(2));
      const naturalHeightCm = Number((naturalHeight * (2.54 / 96)).toFixed(2));
      const ratio = Number((naturalWidth / naturalHeight).toFixed(2));

      setImageRatio(ratio);
      setOriginialWidthCm(naturalWidthCm);
      setOriginialHeightCm(naturalHeightCm);

      console.log("calculated aspect ratio : " + ratio);

      // if (url.startsWith("data:image")) {
      setImageSrc(url);
      // } else {
      //   fetch(url)
      //     .then((response) => response.blob())
      //     .then((blob) => {
      //       const imageObjectUrl = URL.createObjectURL(blob);
      //       setImageSrc(imageObjectUrl);
      //     })
      //     .catch(() => {
      //       setError("Invalid image source!");
      //       clearImageSettings();
      //     });
      // }
    };
    img.onerror = () => {
      setImageUrl("");
      setError("Invalid image source!");
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
          <div class="input-container">
            <Form.Control
              placeholder="http://example.com/image.png"
              onChange={hangleImageUrlChange}
              type="url"
            />
            <span class="icon d-flex">
              <BiLinkAlt />
            </span>
          </div>
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
