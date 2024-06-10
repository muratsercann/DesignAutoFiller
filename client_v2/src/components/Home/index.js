import React, { useState } from "react";
import "./Home.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
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
    alert("Start Clicked..");
  };

  return (
    <div className="home">
      <div className="header">
        <h1>Welcome</h1>

        <span>
          We're excited to have you here. Let's get started on your journey with
          us.
        </span>
        <p>Enter your image link and click the start</p>
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
        {!error && imageSrc && (
          <img alt="" src={imageSrc} width={"120px"} className="image-fluid" />
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}
