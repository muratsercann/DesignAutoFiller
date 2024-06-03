import React from "react";
import Form from "react-bootstrap/Form";

export default function Customize({ data, setdata }) {
  const onChangeRotate = (e) => {
    if (!data) {
      return;
    }
    setdata({ ...data, rotate: e.target.value });
  };

  const onChangeAlignment = (e) => {
    if (!data) {
      return;
    }
    setdata({ ...data, align: e.target.value });
  };

  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>rotation</Form.Label>
      <Form.Control type="number" onChange={onChangeRotate} />

      <Form.Label>alignment</Form.Label>
      <Form.Control type="text" onChange={onChangeAlignment} />
    </Form.Group>
  );
}
