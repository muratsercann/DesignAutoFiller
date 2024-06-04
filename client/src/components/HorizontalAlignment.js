import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function HorizontalAlignment({ onChange }) {
  const [alignment, setAlignment] = useState("center");

  const handleChanges = (e) => {
    setAlignment(e.target.value);
    onChange(e);
  };

  return (
    <>
      <InputGroup className="mb-">
        <Form.Control type="button" onClick={handleChanges} value="Left" />

        <Form.Control type="button" onClick={handleChanges} value="Center" />

        <Form.Control type="button" onClick={handleChanges} value="Right" />
      </InputGroup>
    </>
  );
}
