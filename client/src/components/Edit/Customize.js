import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HorizontalAlignment from "./HorizontalAlignment";
import VerticalAlignment from "./VerticalAlignment";

export default function Customize({ item, onItemChanged }) {
  const [rotationAngle, setRotationAngle] = useState(item?.rotationAngle);
  const [translateX, setTranslateX] = useState(item?.translateX);
  const [translateY, setTranslateY] = useState(item?.translateY);

  useEffect(() => {
    if (!item) return;
    setTranslateX(item.translateX);
    setTranslateY(item.translateY);
    setRotationAngle(item.rotationAngle);
  }, [item]);

  const onChangeRotate = (e) => {
    const value = e.target.value;

    if (!item) {
      return;
    }

    if (value === "-" || value === "") {
      setRotationAngle(value);
      return;
    }

    const horAlignment =
      item.horizontalAlignment === "Center" ? item.horizontalAlignment : "";

    const verAlignment =
      item.verticalAlignment === "Center" ? item.verticalAlignment : "";

    onItemChanged({
      rotationAngle: Number(value),
      horizontalAlignment: horAlignment,
      verticalAlignment: verAlignment,
    });
  };

  const handleHorAlignment = (e) => {
    const value = e.target.value;
    if (!item) {
      return;
    }

    onItemChanged({
      horizontalAlignment: value,
    });
  };
  const handleVerAlignment = (e) => {
    const value = e.target.value;
    if (!item) {
      return;
    }
    onItemChanged({
      verticalAlignment: value,
    });
  };

  const handleTranslateX = (e) => {
    const value = e.target.value;
    if (!item) {
      return;
    }
    if (value === "-" || value === "") {
      setTranslateX(value);
      return;
    }

    onItemChanged({
      translateX: Number(value),
      horizontalAlignment: "",
    });
  };

  const handleTranslateY = (e) => {
    const value = e.target.value;

    if (!item) {
      return;
    }

    if (value === "-" || value === "") {
      setTranslateY(value);
      return;
    }
    onItemChanged({
      translateY: Number(value),
      verticalAlignment: "",
    });
  };

  let content = <></>;
  if (!item) {
    content = (
      <div style={{ width: "100%" }}>
        <p>No Item selected..</p>
      </div>
    );
  } else {
    content = (
      <div style={{ padding: "20px" }}>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="basic-url">Align</Form.Label>
              <HorizontalAlignment
                onChange={handleHorAlignment}
                value={item.horizontalAlignment}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <VerticalAlignment
                onChange={handleVerAlignment}
                value={item.verticalAlignment}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label>Rotate</Form.Label>
              <Form.Control
                type="number"
                value={rotationAngle}
                onChange={onChangeRotate}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Position X</Form.Label>

              <Form.Control
                type="number"
                value={translateX}
                onChange={handleTranslateX}
              />
            </Col>

            <Col>
              <Form.Label>Position Y</Form.Label>
              <Form.Control
                type="number"
                value={translateY}
                onChange={handleTranslateY}
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
  return <div>{content}</div>;
}
