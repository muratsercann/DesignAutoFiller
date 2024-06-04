import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function VerticalAlignment({ onChange, value }) {
  const [alignment, setAlignment] = useState(value ? value : "Center");

  const handleChanges = (e) => {
    setAlignment(e.target.value);
    onChange(e);
  };

  const focusedButton = "bg-secondary text-white";
  return (
    <>
      <InputGroup className="mb-">
        <Form.Control
          className={alignment === "Top" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Top"
        />

        <Form.Control
          className={alignment === "Center" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Center"
        />

        <Form.Control
          className={alignment === "Bottom" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Bottom"
        />
      </InputGroup>
    </>
  );
}
