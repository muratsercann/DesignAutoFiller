import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UploadImage from "./UploadImage";
import UploadImageModal from "./UploadImageModal";

export default function Upload({ setImageDetails, onSuccess }) {
  const [showModal, setShowModal] = useState(false);

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleContinue = (imageDetails) => {
    setShowModal(false);
    setImageDetails(imageDetails);
    localStorage.setItem("imageDetails", JSON.stringify(imageDetails));

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
