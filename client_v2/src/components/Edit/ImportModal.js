import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { Spinner, Table } from "react-bootstrap";

export default function ImportModal({ isOpen, setShow, setImportedData }) {
  const pasteAreaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const handlePaste = (e) => {
    setIsLoading(true);

    const pasteData = e.clipboardData.getData("Text");

    if (pasteData === "" || pasteData.trim() === "") {
      const err =
        "Not found dataset in your clipboard. Please copy a dataset before paste..";
      setError(err);
      setIsLoading(false);
      alert(err);
      return;
    }

    const rows = pasteData.split("\n").filter((row) => row.trim() !== "");

    const formattedData = rows.map((row) => {
      const columns = row.split("\t");
      const formattedRow = {};
      columns.forEach((col, index) => {
        formattedRow[`Col${index + 1}`] = col;
      });
      return formattedRow;
    });

    console.log("dataset : ", formattedData);
    setData(formattedData);
    e.preventDefault();
  };

  useEffect(() => {
    if (isLoading && error !== null) {
      setError(null);
    }
    if (isLoading) {
      const timeout = setTimeout(() => {
        setImportedData(data);
        setIsLoading(false);
        setShow(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  useEffect(() => {
    const pasteArea = pasteAreaRef.current;
    if (pasteArea) {
      window.addEventListener("paste", handlePaste);
    }

    return () => {
      if (pasteArea) {
        window.removeEventListener("paste", handlePaste);
      }
    };
  });

  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Copy&Paste Your Data</Modal.Title>
        </Modal.Header>
        <Modal.Body
          onPaste={handlePaste}
          style={{ height: "300px", overflow: "auto" }}
        >
          <div ref={pasteAreaRef} className="paste-body">
            <div className="paste-container">
              <span>Paste Here</span>
            </div>
          </div>
          {isLoading && (
            <div className="spinner-container">
              <Spinner animation="border" variant="success" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
