import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HorizontalAlignment from "./HorizontalAlignment";
import VerticalAlignment from "./VerticalAlignment";

export default function Customize({ data, setdata }) {
  const translateX = data?.translateX ?? 0;
  const translateY = data?.translateY ?? 0;

  const onChangeRotate = (e) => {
    if (!data) {
      return;
    }

    const horAlignment =
      data.horizontalAlignment === "Center" ? data.horizontalAlignment : "";

    const verAlignment =
      data.verticalAlignment === "Center" ? data.verticalAlignment : "";

    setdata({
      ...data,
      rotate: e.target.value,
      horizontalAlignment: horAlignment,
      verticalAlignment: verAlignment,
    });
  };

  const handleHorAlignment = (e) => {
    if (!data) {
      return;
    }
    setdata({
      ...data,
      horizontalAlignment: e.target.value,
    });
  };
  const handleVerAlignment = (e) => {
    if (!data) {
      return;
    }
    setdata({
      ...data,
      verticalAlignment: e.target.value,
    });
  };

  const handleTranslateX = (e) => {
    if (!data) {
      return;
    }

    setdata({
      ...data,
      translateX: Number(e.target.value),
      horizontalAlignment: "",
    });
  };

  const handleTranslateY = (e) => {
    if (!data) {
      return;
    }
    setdata({
      ...data,
      translateY: Number(e.target.value),
      verticalAlignment: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label htmlFor="basic-url">Align</Form.Label>
            <HorizontalAlignment
              onChange={handleHorAlignment}
              value={data.horizontalAlignment}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <VerticalAlignment
              onChange={handleVerAlignment}
              value={data.verticalAlignment}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Rotation</Form.Label>
            <Form.Control type="number" onChange={onChangeRotate} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>TranslateX</Form.Label>

            <Form.Control
              type="number"
              value={translateX}
              onChange={handleTranslateX}
            />
          </Col>

          <Col>
            <Form.Label>TranslateY</Form.Label>
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
