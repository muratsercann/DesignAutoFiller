import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HorizontalAlignment from "./HorizontalAlignment";
import VerticalAlignment from "./VerticalAlignment";

export default function Customize({ data, setdata }) {

  const onChangeRotate = (e) => {
    if (!data) {
      return;
    }
    setdata({ ...data, rotate: e.target.value });
  };

  const handleHorAlignment = (e) => {
    if (!data) {
      return;
    }
    setdata({ ...data, horizontalAlignment: e.target.value });
  };
  const handleVerAlignment = (e) => {
    if (!data) {
      return;
    }
    setdata({ ...data, verticalAlignment: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label htmlFor="basic-url">Align</Form.Label>
            <HorizontalAlignment onChange={handleHorAlignment} value="Left" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <VerticalAlignment onChange={handleVerAlignment} value="Top" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Rotation</Form.Label>
            <Form.Control type="number" onChange={onChangeRotate} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
