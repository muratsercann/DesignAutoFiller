import { useState } from "react";
import UploadImageModal from "./Editor/UploadImageModal";
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
    setShowModal(false);
    setImageDetails(imageDetails);
    setPage({ ...page, items: [] });
    utils.clearUserSettingsFromStorage();
    utils.setImageDetailsToStorage(imageDetails);

    if (onSuccess) {
      onSuccess();
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
