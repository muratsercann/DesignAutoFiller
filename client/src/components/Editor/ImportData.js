import { useEffect, useRef, useState } from "react";
import * as utils from "../../utils";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import TextColMatcher from "./TextColMatcher";
import ImportModal from "./ImportModal";
import { memo } from "react";
import { BiPlusCircle, BiCloudUpload } from "react-icons/bi";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export const ImportData = memo(function ImportData({
  page,
  setPage,
  dataSource,
  setDataSource,
}) {
  const dataset = dataSource?.dataset;
  const filename = dataSource?.filename || "Endefined File";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showData, setShowData] = useState(false);

  const handleImportClick = (e) => {
    setIsModalOpen(true);
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
            setDataSource={setDataSource}
            setShow={setIsModalOpen}
          />
        }
        <div>
          <div className="custom-icon-button" onClick={handleImportClick}>
            <BiPlusCircle size={24} />
            <span>Add</span>
          </div>
        </div>

        {dataset != null && dataset.length > 0 && (
          <>
            <Modal
              style={{ overflow: "auto", maxHeight: "80%" }}
              size="lg"
              show={showData}
              fullscreen={true}
              onHide={() => {
                setShowData(false);
              }}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Datasource : {filename}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table
                  striped
                  bordered
                  hover
                  style={{
                    fontSize: "12px",
                    height: "500px",
                    overflow: "auto",
                  }}
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
              </Modal.Body>
            </Modal>
            <div
              className="app-custom-button"
              onClick={() => setShowData(true)}
            >
              {filename}
            </div>

            <TextColMatcher
              settings={page}
              setSettings={setPage}
              dataset={dataSource?.dataset}
            />
          </>
        )}
      </div>
    </>
  );
});
export default ImportData;
