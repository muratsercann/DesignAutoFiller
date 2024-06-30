import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UploadImage from "./UploadImage";
import UploadImageModal from "./UploadImageModal";

export default function Upload() {
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleContinue = (imageDetails) => {
    setShowModal(false);
    setImageDetails(imageDetails);
    localStorage.setItem("imageDetails", JSON.stringify(imageDetails));
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

      {imageDetails && (
        <div>
          <img alt="" src={imageDetails.src}></img>
        </div>
      )}
    </div>
  );
}
