import { useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import "./editor.css";
import { IoCloudUploadSharp } from "react-icons/io5";

import { Spinner } from "react-bootstrap";

export default function ImportModal({
  isOpen,
  setShow,
  setDataSource,
  onContinue,
}) {
  const pasteAreaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const inputRef = useRef(null);

  const parseExcel = (contents) => {
    const workbook = XLSX.read(contents, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
    return jsonData;
  };

  const parseData = async (fileExtension, contents) => {
    switch (fileExtension) {
      case "xlsx":
        return parseExcel(contents);
      case "csv":
        return parseCSV(contents);
      case "json":
        return parseJSON(contents);
      case "txt":
        return parseText(contents);
      default:
        setError("This file is not in valid format !");
        break;
    }
  };

  const parseCSV = (contents) => {
    const { data } = Papa.parse(contents, { header: true });
    return data;
  };

  const parseJSON = (contents) => {
    const jsonData = JSON.parse(contents);
    return jsonData;
  };

  const parseText = (contents) => {
    return new Promise((resolve, reject) => {
      Papa.parse(contents, {
        header: true,
        delimiter: "\t",
        complete: (results) => {
          resolve(results.data); // Başarılı tamamlama durumunda veriyi resolve eder
        },
        error: (error) => {
          console.error("Error parsing file:", error);
          reject(error); // Hata durumunda reject eder
        },
      });
    });
  };

  const handleFileUpload = async (e) => {
    setError(null);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const contents = e.target.result;
      const extension = file.name.split(".").pop().toLowerCase();

      const parsedData = await parseData(extension, contents);

      setFileName(file.name);
      setData(parsedData);
    };

    if (file) {
      if (file.name.endsWith(".xlsx")) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClose = () => {
    setData(null);
    setFileType(null);
    setError(null);
    setFileName(null);
    setIsLoading(false);
    setShow(false);
  };
  const handleClose = () => {
    onClose();
  };

  const handleContinue = () => {
    if (error !== null) {
      return;
    }
    setIsLoading(false);
    setDataSource({
      filename: fileName,
      dataset: data,
    });
    onClose();
    if (onContinue) {
      onContinue();
    }
  };

  const handleBrowseClick = () => {
    if (inputRef !== null) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <Modal show={isOpen} onHide={handleClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Upload File</Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto" }}>
          <div ref={pasteAreaRef} className="upload-file-body">
            <div className="upload-container">
              <div className="mb-3">
                <IoCloudUploadSharp size={65} color="#7a859091" />
              </div>
              <div className="file-input-wrapper mb-3">
                <button
                  className="file-input-button"
                  onClick={handleBrowseClick}
                >
                  Browse
                </button>
                <input
                  ref={inputRef}
                  onChange={handleFileUpload}
                  id="my-file-input"
                  type="file"
                  accept=".xlsx, .csv, .json, .txt"
                />
              </div>

              {fileName && (
                <>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                    Selected File Name :{" "}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "",
                      color: "#4d4d4d",
                    }}
                  >
                    <span>{fileName}</span>
                  </div>
                </>
              )}

              <div
                className="upload-error"
                style={{ color: "firebrick", fontSize: "smaller" }}
              >
                <span>{error || ""}</span>
              </div>
            </div>
          </div>

          <div className="mt-3" style={{ fontSize: "14px", fontWeight: "500" }}>
            <span>Supported File Formats :</span>
            <span className="mx-1">XLSX, CSV, JSON, TXT</span>
          </div>
          {isLoading && (
            <div className="spinner-container">
              <Spinner animation="border" variant="success" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleContinue}
            disabled={error !== null || data === null}
          >
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
