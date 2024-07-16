import { Button, Modal } from "react-bootstrap";
import UploadImage from "./UploadImage";
import { useState } from "react";

export default function UploadImageModal({ show, setShow, onContinue }) {
  const [imageDetails, setImageDetails] = useState(null);

  const handleClose = () => {
    setShow(false);
    setImageDetails(null);
  };

  const handleUpload = () => {
    onContinue(imageDetails);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <h5>Upload an image</h5>
        </Modal.Header>

        <Modal.Body style={{ height: "400px" }}>
          <UploadImage setImageDetails={setImageDetails} />
        </Modal.Body>

        <Modal.Footer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "84%",
              gap: "1rem",
              placeItems: "flex-end",
            }}
          >
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={imageDetails === null}
            >
              Upload
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
