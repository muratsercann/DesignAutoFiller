import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HorizontalAlignment from "./HorizontalAlignment";
import VerticalAlignment from "./VerticalAlignment";

export default function Customize({ settings, setSettings }) {
  const translateX = settings?.translateX ?? 0;
  const translateY = settings?.translateY ?? 0;

  const onChangeRotate = (e) => {
    if (!settings) {
      return;
    }

    const horAlignment =
      settings.horizontalAlignment === "Center" ? settings.horizontalAlignment : "";

    const verAlignment =
      settings.verticalAlignment === "Center" ? settings.verticalAlignment : "";

    setSettings({
      ...settings,
      rotate: e.target.value,
      horizontalAlignment: horAlignment,
      verticalAlignment: verAlignment,
    });
  };

  const handleHorAlignment = (e) => {
    if (!settings) {
      return;
    }
    setSettings({
      ...settings,
      horizontalAlignment: e.target.value,
    });
  };
  const handleVerAlignment = (e) => {
    if (!settings) {
      return;
    }
    setSettings({
      ...settings,
      verticalAlignment: e.target.value,
    });
  };

  const handleTranslateX = (e) => {
    if (!settings) {
      return;
    }

    setSettings({
      ...settings,
      translateX: Number(e.target.value),
      horizontalAlignment: "",
    });
  };

  const handleTranslateY = (e) => {
    if (!settings) {
      return;
    }
    setSettings({
      ...settings,
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
              value={settings.horizontalAlignment}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <VerticalAlignment
              onChange={handleVerAlignment}
              value={settings.verticalAlignment}
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
