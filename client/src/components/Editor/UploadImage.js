import { useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import "./editor.css";
import { IoCloudUploadSharp } from "react-icons/io5";
import { Spinner } from "react-bootstrap";
import * as utils from "../../utils";
export default function UploadImage({ setImageDetails }) {
  const pasteAreaRef = useRef(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const handleFileUpload = async (e) => {
    // setIsLoading(true);
    setError(null);
    const file = e.target.files[0];

    const base64String = await convertToBase64(file);
    const dataUrl = `data:${file.type};base64,${base64String}`;
    setFileName(file.name);

    const img = new Image();
    img.onload = function () {
      const imageDetails = {
        src: dataUrl,
        ratio: Number(img.width / img.height),
        naturalWidth: img.width,
        naturalHeight: img.height,
        customWidth: img.width,
        customHeight: img.height,
      };

      setImageDetails(imageDetails);
      //   setIsLoading(false);
    };

    img.onerror = () => {
      setError("Invalid image source!");
    };

    img.src = dataUrl;
  };

  const handleBrowseClick = () => {
    if (inputRef !== null) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div ref={pasteAreaRef} className="upload-file-body">
        <div className="upload-container">
          <div className="mb-3">
            <IoCloudUploadSharp size={65} color="#7a859091" />
          </div>
          <div className="file-input-wrapper mb-3">
            <button className="file-input-button" onClick={handleBrowseClick}>
              Browse
            </button>
            <input
              ref={inputRef}
              onChange={handleFileUpload}
              id="my-file-input"
              type="file"
              accept="image/*"
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
        <span className="mx-1">PNG, JPEG, </span>
      </div>
    </>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = e.target.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = function (error) {
      console.log("Converting Error :", error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
