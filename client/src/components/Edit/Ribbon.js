import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default function Ribbon({ selectedItem, onClick }) {
  const handleCreateTextField = (e) => {
    console.log("add new text field..");
  };

  const handleEditClick = () => {
    console.log("edit clicked for item id : ", selectedItem.id);
    onClick(selectedItem.id);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        borderBottom: "2px solid #ffffff",
        borderLeft: "2px solid #ffffff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ButtonGroup>
        <Button variant="primary" onClick={handleCreateTextField}>
          <span>Add Text Field</span>
        </Button>

        {selectedItem && (
          <Button variant="primary" onClick={handleEditClick}>
            <span>Edit</span>
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}
