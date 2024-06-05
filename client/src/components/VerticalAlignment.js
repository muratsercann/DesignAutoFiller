import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function VerticalAlignment({ value, onChange }) {
  const handleChanges = (e) => {
    onChange(e);
  };

  const focusedButton = "bg-secondary text-white";
  return (
    <>
      <InputGroup className="mb-">
        <Form.Control
          className={value === "Top" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Top"
        />

        <Form.Control
          className={value === "Center" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Center"
        />

        <Form.Control
          className={value === "Bottom" && focusedButton}
          type="button"
          onClick={handleChanges}
          value="Bottom"
        />
      </InputGroup>
    </>
  );
}
