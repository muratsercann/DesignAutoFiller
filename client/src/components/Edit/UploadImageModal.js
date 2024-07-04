import { Button, Modal } from "react-bootstrap";
import UploadImage from "./UploadImage";
import { useState } from "react";
import Sizing from "./Sizing";
import Upload from "./Upload";

export default function UploadImageModal({ show, setShow, onContinue }) {
  const pages = {
    upload: "upload",
    sizing: "sizing",
  };

  const [imageDetails, setImageDetails] = useState(null);
  const [page, setPage] = useState(pages.upload);

  const handleClose = () => {
    setShow(false);
    setImageDetails(null);
    setPage(pages.upload);
  };

  const handleContinue = () => {
    if (page === pages.upload) {
      setPage(pages.sizing);
    } else if (page === pages.sizing) {
      onContinue(imageDetails);
      handleClose();
    }
  };

  const handleBack = () => {
    setPage(pages.upload);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body style={{ height: "400px", overflowX: "hidden" }}>
          {page === pages.upload && (
            <UploadImage setImageDetails={setImageDetails} />
          )}
          {imageDetails && page === pages.sizing && (
            <Sizing
              imageDetails={imageDetails}
              setImageDetails={setImageDetails}
            />
          )}
        </Modal.Body>

        <Modal.Footer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="secondary"
              onClick={handleBack}
              style={{ float: "left" }}
              disabled={page === pages.upload}
            >
              Back
            </Button>
          </div>
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
              onClick={handleContinue}
              disabled={imageDetails === null}
            >
              Continue
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
