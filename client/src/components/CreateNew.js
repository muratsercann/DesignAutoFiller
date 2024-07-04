import { useState } from "react";
import UploadImageModal from "./Editor/UploadImageModal";
import * as utils from "../utils";
export default function CreateNew({ setImageDetails, onSuccess }) {
  const [showModal, setShowModal] = useState(false);

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleContinue = (imageDetails) => {
    setShowModal(false);
    setImageDetails(imageDetails);
    utils.setImageDetailsToStorage(imageDetails);
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
