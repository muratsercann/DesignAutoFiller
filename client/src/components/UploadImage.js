import { useRef, useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";

const maxFilesize = 1200;
export default function UploadImage({ setImageDetails, style = {} }) {
  const pasteAreaRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFileUpload = async (e) => {
    setError(null);
    setFileName(null);
    setImageDetails(null);

    const file = e.target.files[0];

    if (file == null) {
      return;
    }

    if (file.size > maxFilesize * 1024) {
      setError(
        `File size exceeds the maximum allowed limit of ${maxFilesize} KB. Please choose a smaller file.`
      );
      return;
    }

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
    };

    img.onerror = () => {
      setError("Invalid image source!");
    };

    img.src = dataUrl;
  };

  const handleBrowseClick = () => {
    if (inputRef != null) {
      inputRef.current.click();
    }
  };

  return (
    <div style={{ ...style, padding: "10px" }} className="w-100 h-100">
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
                <span> {fileName}</span>
              </div>
            </>
          )}

          <div className="upload-error">
            <p> {error || ""}</p>
          </div>
        </div>
      </div>

      <div className="mt-3" style={{ fontSize: "14px", fontWeight: "500" }}>
        <span>Maximum allowed limit:</span>
        <span className="mx-1">{maxFilesize} KB </span>
      </div>
    </div>
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
