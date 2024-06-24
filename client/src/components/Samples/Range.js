import Form from "react-bootstrap/Form";
import React, { useState } from "react";
export default function Range({}) {
  const [value, setValue] = useState(24);

  const handleRangeChange = (e) => {
    const val = e.target.value;
    setValue(val);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px",
        }}
      >
        <div style={{ width: "450px", display: "flex", gap: "20px" }}>
          <Form.Range min={10} max={500} value={value} onChange={handleRangeChange} />
          <span style={{ width: "100px", fontWeight: "bold" }}>{value} %</span>
        </div>
      </div>
    </>
  );
}
