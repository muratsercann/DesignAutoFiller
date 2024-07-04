import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UploadImageModal from "./UploadImageModal";
import * as utils from "../../utils";
export default function Upload({ setImageDetails, onSuccess }) {
  const [showModal, setShowModal] = useState(false);

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleContinue = (imageDetails) => {
    setShowModal(false);
    setImageDetails(imageDetails);
    utils.setImageDetailsToStorage(imageDetails);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="upload-image-page-container">
      <Button variant="success" onClick={handleUploadClick}>
        Upload
      </Button>

      <UploadImageModal
        show={showModal}
        setShow={setShowModal}
        onContinue={handleContinue}
      />
    </div>
  );
}
