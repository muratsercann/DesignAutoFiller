import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function HorizontalAlignment({ onChange, value }) {
  const [alignment, setAlignment] = useState(value ? value : "Left");

  
  const handleChanges = (e) => {
    setAlignment(e.target.value);
    onChange(e);
  };

  const focusedButton = "bg-secondary text-white";

  return (
    <>
      <InputGroup className="mb-">
        <Form.Control
          className={alignment === "Left" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Left"
        />

        <Form.Control
          className={alignment === "Center" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Center"
        />

        <Form.Control
          className={alignment === "Right" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Right"
        />
      </InputGroup>
    </>
  );
}
