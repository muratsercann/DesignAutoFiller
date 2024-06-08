import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import VerticalAlignment from "./VerticalAlignment";

export default function Ribbon({ selectedItem, onItemChanged }) {
  const handleCreateTextField = (e) => {
    console.log("add new text field..");
  };

  // const handleEditClick = () => {
  //   console.log("edit clicked for item id : ", selectedItem.id);
  // };

  return (
    <div
      className="container fluid"
      style={{
        height: "50px",
      }}
    >
      <div className="row mt-3">
        <div className="col">
          <Button
            style={{ width: "100%" }}
            variant="primary"
            onClick={handleCreateTextField}
          >
            <span>Add Text Field</span>
          </Button>
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="row mt-3">
            <div className="col">
              <Form.Label>Font Color (px) :</Form.Label>
              <Form.Control
                type="color"
                id="exampleColorInput"
                value={selectedItem?.fontColor}
                title="Choose text color"
                onChange={(e) => {
                  onItemChanged({ fontColor: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Form.Label>Font Size (px) :</Form.Label>
              <Form.Control
                type="number"
                value={selectedItem.fontSize}
                onChange={(e) => {
                  onItemChanged({ fontSize: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Form.Label>Align text :</Form.Label>
              <Form.Control
                as="select"
                value={selectedItem.textAlign}
                onChange={(e) => {
                  onItemChanged({ textAlign: e.target.value });
                }}
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="center">Center</option>
              </Form.Control>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Form.Label>Width (px) :</Form.Label>
              <Form.Control
                type="number"
                value={selectedItem.width}
                onChange={(e) => {
                  onItemChanged({ width: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Form.Label>Text :</Form.Label>
              <Form.Control
                type="text"
                value={selectedItem.value}
                onChange={(e) => {
                  onItemChanged({ value: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Form.Label>Tag :</Form.Label>
              <Form.Control
                type="text"
                value={selectedItem.tag}
                onChange={(e) => {
                  onItemChanged({ tag: e.target.value });
                }}
              />
            </div>
          </div>
        </>
      )}

      <div className="row mt-3">
        <div className="col">
          {/* {selectedItem && (
          <Button variant="primary" onClick={handleEditClick}>
            <span>Edit</span>
          </Button>
        )} */}
        </div>
      </div>
    </div>
  );
}
