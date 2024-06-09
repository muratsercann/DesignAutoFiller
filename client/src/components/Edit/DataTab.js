import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import * as utils from "./utils";
import ImportDataModal from "./ImportDataModal";

export default function DataTab({
  page,
  tagColumnMapping,
  setTagColumnMapping,
}) {
  const [importedData, setImportedData] = useState(
    utils.getImportedDataFromStorage() /* todo : msercan get importedData as a prop from parent (Edit) component*/
  );
  const [showModal, setShowModal] = useState(false);

  const [mappings, setMappings] = useState(() => {
    let tags = getTags();

    if (tags || tags.lenght == 0) return [];

    const map = tags.reduce((acc, tag) => ({ ...acc, [tag]: "" }), {});

    return map;
  });

  const tags = getTags();

  function getTags() {
    if (!page || page.items?.length === 0) return [];

    const tags = page.items
      .filter((item) => item.tag && item.tag !== "")
      .map((item) => item.tag);

    return tags;
  }

  const handleMappingChange = (tag, field) => {
    setMappings((prevMappings) => ({
      ...prevMappings,
      [tag]: field,
    }));
  };

  const handleImportClick = () => {
    setShowModal(true);
  };

  let columns = [];
  if (importedData && importedData.length > 0) {
    for (let i = 1; i <= importedData[0].length; i++) {
      columns.push("Field_" + i);
    }
  }

  return (
    <div>
      <Button variant="link" onClick={handleImportClick}>
        Import Data
      </Button>

      {importedData && importedData.length > 0 && (
        <div style={{ height: "250px", overflow: "auto" }}>
          <Table striped bordered hover style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th key={0}>No</th>
                {Array.from({ length: importedData[0].length }, (_, index) => (
                  <th key={index}>Field_{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {importedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>
                  {Array.from(
                    { length: importedData[0].length },
                    (_, colIndex) => (
                      <td key={colIndex}>{row[colIndex] || ""}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {importedData &&
        importedData.length > 0 &&
        page &&
        page.items?.length > 0 && (
          <div>
            {tags.map((tag) => (
              <Form.Group key={tag} className="mb-3">
                <Form.Label>{tag}:</Form.Label>
                <Form.Control
                  as="select"
                  value={mappings[tag]}
                  onChange={(e) => handleMappingChange(tag, e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {columns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            ))}
          </div>
        )}

      <ImportDataModal
        isOpen={showModal}
        setShow={setShowModal}
        setImportedData={setImportedData}
      />
    </div>
  );
}
