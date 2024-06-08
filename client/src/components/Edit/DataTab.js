import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export default function DataTab() {
  const [show, setShow] = useState(false);
  const [importedData, setImportedData] = useState(getImportedData());
  const [mappings, setMappings] = useState(() => {
    let tags = getTags();

    if (tags || tags.lenght == 0) return [];

    const map = tags.reduce((acc, tag) => ({ ...acc, [tag]: "" }), {});

    return map;
  });

  const userData = getSettingsFromStorage();

  const tags = getTags();

  function getTags() {
    var data = getSettingsFromStorage();
    if (!data || data.length === 0) return [];

    const tags = data.items
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

  function getSettingsFromStorage() {
    return JSON.parse(localStorage.getItem("userData"));
  }

  function getImportedData() {
    return JSON.parse(localStorage.getItem("importedData"));
  }

  const handleClose = () => setShow(false);
  const handleSave = () => {
    if (!importedData) {
      return;
    }

    localStorage.setItem("importedData", JSON.stringify(importedData));
    setShow(false);
  };

  const handleImportClick = () => {
    setShow(true);
  };

  const handleTextAriaChange = (e) => {
    const value = e.target.value;

    const rows = value.split("\n").map((row) => row.split("\t"));
    setImportedData(rows);
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

      {userData && userData.items?.length > 0 && (
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Copy&Paste Your Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="imortDataModal.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                onChange={handleTextAriaChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
