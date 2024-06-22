import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import * as utils from "./utils";
import { Table } from "react-bootstrap";
export default function ImportDataModal({ isOpen, setShow, setImportedData }) {
  const pasteAreaRef = useRef(null);
  const [data, setData] = useState([]);

  const onSaveClick = () => {
    if (data === null || data.length === 0) return;

    utils.setImportedDataToStorage(data);
    setImportedData(data);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

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

      setData(formattedData);
      e.preventDefault();
    };

    const pasteArea = pasteAreaRef.current;
    if (pasteArea) {
      pasteArea.addEventListener("paste", handlePaste);
    }

    return () => {
      if (pasteArea) {
        pasteArea.removeEventListener("paste", handlePaste);
      }
    };
  });

  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Copy&Paste Your Data</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "300px", overflow: "scroll" }}>
          {data.length === 0 && (
            <div ref={pasteAreaRef} className="paste-container">
              {/* <span>Paste Here</span> */}
            </div>
          )}

          {data !== null && data.length > 0 && (
            <Table
              striped
              bordered
              hover
              style={{ height: "300px", fontSize: "12px" }}
            >
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
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSaveClick}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
