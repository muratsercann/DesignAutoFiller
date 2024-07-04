import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UploadImageModal from "./Edit/UploadImageModal";
import * as utils from "../utils";
export default function CreateNew({ setImageDetails, onSuccess }) {
  const [showModal, setShowModal] = useState(false);

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleContinue = (imageDetails) => {
    setShowModal(false);
    setImageDetails(imageDetails);
    utils.setImageSettingsToStorage(imageDetails);
    utils.clearUserSettingsFromStorage();

    if (onSuccess) {
      onSuccess(true);
    }
  };

  return (
    <>
      <div className="create-new-button" onClick={handleUploadClick}>
        Create New
      </div>

      <UploadImageModal
        show={showModal}
        setShow={setShowModal}
        onContinue={handleContinue}
      />
    </>
  );
}
