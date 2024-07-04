import Form from "react-bootstrap/Form";
import React, { useState } from "react";
export default function Range({ scale, setScale }) {
  // const [value, setValue] = useState(24);

  const value = Math.ceil(scale * 100);
  const handleRangeChange = (e) => {
    const val = e.target.value;
    setScale(Number(val / 100));
  };

  return (
    <>
      <div style={{ width: "450px", display: "flex", gap: "20px" }}>
        <Form.Range
          min={10}
          max={500}
          value={value}
          onChange={handleRangeChange}
        />
        <span style={{ width: "100px", fontWeight: "bold" }}>{value} %</span>
      </div>
    </>
  );
}
