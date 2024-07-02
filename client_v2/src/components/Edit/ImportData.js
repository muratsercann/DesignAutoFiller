import { useEffect, useRef, useState } from "react";
import * as utils from "../../utils";
import { Button, Spinner, Table } from "react-bootstrap";
import TextColMatcher from "./TextColMatcher";
import ImportModal from "./ImportModal";
import { memo } from "react";
import { BiPlusCircle, BiCloudUpload } from "react-icons/bi";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export const ImportData = memo(function ImportData({ dataset, setDataset }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImportClick = (e) => {
    setIsModalOpen(true);
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleContinue = async () => {
    if (dataset != null) {
      setIsLoading(true);
      await wait(800);
      utils.setImportedDataToStorage(dataset);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="spinner-container">
          <Spinner animation="border" variant="success" />
        </div>
      )}

      <div className="data-container">
        {
          <ImportModal
            isOpen={isModalOpen}
            setImportedData={setDataset}
            setShow={setIsModalOpen}
            onContinue={handleContinue}
          />
        }
        <div>
          <div className="custom-icon-button" onClick={handleImportClick}>
            <BiPlusCircle size={24} />
            <span>Add</span>
          </div>
        </div>
        {dataset !== null && dataset.length > 0 && (
          <>
            <Table
              striped
              bordered
              hover
              style={{ fontSize: "12px", height: "500px", overflow: "auto" }}
              variant="dark"
            >
              <thead>
                <tr>
                  {Object.keys(dataset[0]).map((colName, index) => (
                    <th key={index}>{colName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(dataset[0]).map((key, index) => (
                      <td key={index}>{row[key] || ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
});
export default ImportData;
