import { useState } from "react";
import UploadImageModal from "./UploadImageModal";
import * as utils from "../utils";
export default function CreateNew({
  page,
  setPage,
  setImageDetails,
  onSuccess,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleContinue = (imageDetails) => {
    utils.clearUserSettingsFromStorage();
    utils.setImageDetailsToStorage(imageDetails);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      <div className="create-new-button" onClick={handleUploadClick}>
        Open an Image
      </div>

      <UploadImageModal
        show={showModal}
        setShow={setShowModal}
        onContinue={handleContinue}
      />
    </>
  );
}
