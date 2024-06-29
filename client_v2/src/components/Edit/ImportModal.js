import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import "./Edit.css";
import { BsCloudUpload } from "react-icons/bs";
import { Form, Spinner, Table } from "react-bootstrap";

export default function ImportModal({ isOpen, setShow, setImportedData }) {
  const pasteAreaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fileType, setFileType] = useState("");
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);

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
        alert("Desteklenmeyen dosya türü.");
        break;
    }
  };

  const parseCSV = (contents) => {
    const { data } = Papa.parse(contents, { header: true });
    console.log("csv data : ");
    console.log(data);
    return data;
  };

  const parseJSON = (contents) => {
    try {
      console.log("raw json content : ", contents);
      const jsonData = JSON.parse(contents);
      return jsonData;
    } catch (error) {
      alert("Geçersiz JSON dosyası." + error);
    }
  };

  const parseText = (contents) => {
    console.log("text contents : ", contents);

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
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const contents = e.target.result;
      const extension = file.name.split(".").pop().toLowerCase();

      setFileName(file.name);

      setIsLoading(true);
      const parsedData = await parseData(extension, contents);
      await wait(800);
      setIsLoading(false);
      setImportedData(parsedData);
      setShow(false);
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

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={isOpen} onHide={handleClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Upload File</Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={{ height: "300px", overflow: "auto" }}>
          <div ref={pasteAreaRef} className="upload-file-body">
            <div className="upload-container">
              <div className="mb-3">
                <BsCloudUpload size={52} color="#7a859091" />
              </div>
              <div
                className="file-input-wrapper mb-3"
                onChange={handleFileUpload}
              >
                <button className="file-input-button">Browse</button>
                <input type="file" accept=".xlsx, .csv, .json, .txt" />
              </div>
              <div>
                <span>{fileName || ""}</span>
              </div>
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
