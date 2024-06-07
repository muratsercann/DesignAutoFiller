import React, { useState } from "react";

export default function DynamicTable() {
  const [columnCount, setColumnCount] = useState(0);
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");

  const handleColumnChange = (e) => {
    setColumnCount(Number(e.target.value));
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleGenerateTable = () => {
    const rows = inputData.split("\n").map((row) => row.split("\t"));
    setData(rows);
  };

  return (
    <div>
      <div>
        <label>Sütun Sayısı: </label>
        <input
          type="number"
          value={columnCount}
          onChange={handleColumnChange}
        />
      </div>
      <div>
        <textarea
          rows="10"
          cols="50"
          value={inputData}
          onChange={handleInputChange}
          placeholder="Veriyi buraya yapıştırın (satırlar için yeni satır, sütunlar için tab kullanın)"
        />
      </div>
      <button onClick={handleGenerateTable}>Tabloyu Oluştur</button>
      <Table data={data} columnCount={columnCount} />
    </div>
  );
}

function Table({ data, columnCount }) {
  if (data.length === 0) {
    return null;
  }

  return (
    <table border="1">
      <thead>
        <tr>
          {Array.from({ length: columnCount }, (_, index) => (
            <th key={index}>Sütun {index + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columnCount }, (_, colIndex) => (
              <td key={colIndex}>{row[colIndex] || ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
