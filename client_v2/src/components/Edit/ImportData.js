import { useEffect, useRef, useState } from "react";
import * as utils from "../../utils";
import { Table } from "react-bootstrap";
import TagFieldMatcher from "./TagFieldMatcher";
import TextColMatcher from "./TextColMatcher";
export default function ImportData({}) {
  const [data, setData] = useState(utils.getImportedDataFromStorage());

  useEffect(() => {
    const handlePaste = (e) => {
      const pasteData = e.clipboardData.getData("Text");
      const rows = pasteData.split("\n").filter((row) => row.trim() !== "");

      const formattedData = rows.map((row) => {
        const columns = row.split("\t");
        const formattedRow = {};
        columns.forEach((col, index) => {
          formattedRow[`Col${index + 1}`] = col;
        });
        return formattedRow;
      });

      utils.setImportedDataToStorage(data);
      setData(formattedData);
      e.preventDefault();
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div className="data-container">
      {data !== null && data.length > 0 && (
        <>
          <Table striped bordered hover style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th key={0}>No</th>
                {Object.keys(data[0]).map((colName, index) => (
                  <th key={index}>{colName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>

                  {Object.keys(data[0]).map((key, index) => (
                    <td key={index}>{row[key] || ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

          <TextColMatcher />
        </>
      )}
    </div>
  );
}
