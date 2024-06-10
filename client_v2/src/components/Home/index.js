import React, { useState } from "react";
import "./Home.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [imageElement, setImageElement] = useState(null);

  const hangleImageUrlChange = (e) => {
    checkImage(e.target.value);
  };

  const checkImage = (url) => {
    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setError("");
      setImageElement(img);
    };
    img.onerror = () => {
      setImageUrl("");
      setError("Invalid image source!");
      setImageElement(null);
    };
    img.src = url;
  };

  const handleStartClick = () => {
    alert("Start Clicked..");
  };

  return (
    <div className="home">
      <div className="header">
        <h1>Welcome</h1>
        <p>Enter your image link and start</p>
      </div>
      <div className="home-content">
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
        {!error && imageElement && (
          // <img alt="" src={imageElement.src} width={"120px"} className="image-fluid" />
          {imageElement}
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}
