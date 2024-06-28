import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import * as utils from "../../utils";
import { Button, Form, Spinner, Table } from "react-bootstrap";

export default function ImportData({}) {
  const [data, setData] = useState(utils.getImportedDataFromStorage());
  const [fileType, setFileType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const parseExcel = (contents) => {
    const workbook = XLSX.read(contents, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
    setData(jsonData);
    setFileType("xlsx");
  };

  const parseData = async (fileExtension, contents) => {
    setIsLoading(true);
    await wait(800);
    switch (fileExtension) {
      case "xlsx":
        parseExcel(contents);
        break;
      case "csv":
        parseCSV(contents);
        break;
      case "json":
        parseJSON(contents);
        break;
      case "txt":
        parseText(contents);
        break;
      default:
        alert("Desteklenmeyen dosya türü.");
        break;
    }
  };

  const parseCSV = (contents) => {
    const { data } = Papa.parse(contents, { header: true });
    console.log("csv data : ");
    console.log(data);
    setData(data);
    setFileType("CSV");
  };

  const parseJSON = (contents) => {
    try {
      console.log("raw json content : ", contents);
      const jsonData = JSON.parse(contents);
      setData(jsonData);
      setFileType("json");
    } catch (error) {
      alert("Geçersiz JSON dosyası." + error);
    }
  };

  const parseText = (contents) => {
    console.log("text contents : ", contents);

    Papa.parse(contents, {
      header: true,
      delimiter: "\t",
      complete: (results) => {
        setData(results.data);
        setFileType("txt");
      },
      error: (error) => {
        console.error("Error parsing file:", error);
      },
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const contents = e.target.result;
      const extension = file.name.split(".").pop().toLowerCase();
      await parseData(extension, contents);
      setIsLoading(false);
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

  const handleSaveClick = async () => {
    setIsLoading(true);

    await (async () => {
      await wait(800);
      utils.setImportedDataToStorage(data);
    })();

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="spinner-container">
          <Spinner animation="border" variant="success" />
        </div>
      )}

      <Form.Control
        type="file"
        accept=".xlsx, .csv, .json, .txt"
        onChange={handleFileUpload}
      />
      {data !== null && data.length > 0 && (
        <Button className="mx-3" variant="success" onClick={handleSaveClick}>
          Save
        </Button>
      )}
      {data !== null && data.length > 0 && (
        <>
          <Table
            striped
            bordered
            hover
            style={{ fontSize: "12px", height: "500px", overflow: "auto" }}
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
        </>
      )}
    </>
  );
}
