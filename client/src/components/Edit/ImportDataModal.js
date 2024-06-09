import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as utils from "./utils";
export default function ImportDataModal({ isOpen, setShow, setImportedData }) {
  const [textAreaValue, setTextAreaValue] = useState("");

  const onSaveClick = () => {
    if (!textAreaValue || textAreaValue === "") return;

    const rows = textAreaValue.split("\n").map((row) => row.split("\t"));
    utils.setImportedDataToStorage(rows);
    setImportedData(rows);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleTextAriaChange = (e) => {
    const value = e.target.value;
    setTextAreaValue(value);
  };

  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
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
            Cancel
          </Button>
          <Button variant="primary" onClick={onSaveClick}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
