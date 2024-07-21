import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as utils from "../utils";
import { Spinner } from "react-bootstrap";
export default function GetImageFromUrl() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const imageUrl = queryParams.get("image");
    const decodedImageUrl = decodeURIComponent(imageUrl);

    const processImage = async () => {
      try {
        // Yeni bir img nesnesi oluştur
        const img = new Image();
        img.crossOrigin = "Anonymous"; // CORS hatalarını önlemek için

        img.onload = async () => {
          // Resmi fetch ile blob olarak al
          const response = await fetch(decodedImageUrl);
          const blob = await response.blob();

          // Resmi FileReader ile base64 formatına çevir
          const reader = new FileReader();
          reader.onloadend = async () => {
            const imageDetails = {
              base64: false,
              src: decodedImageUrl,
              ratio: Number(img.width / img.height),
              naturalWidth: img.width,
              naturalHeight: img.height,
              customWidth: img.width,
              customHeight: img.height,
            };

            // localStorage işlemleri
            await utils.clearAllDataFromStorage();
            await utils.setImageDetailsToStorage(imageDetails);

            navigate("/editor");
          };
          reader.readAsDataURL(blob);
        };

        img.onerror = () => {
          alert("An error occured when loading image. !");
          navigate("/");
        };

        img.src = decodedImageUrl;
      } catch (error) {
        alert("An error occured. The image coming from url is invalid !");
        console.error("Resmi işlerken hata oluştu:", error);
        navigate("/");
      }
    };

    if (decodedImageUrl) {
      processImage();
    }
  }, [location.search, navigate]);

  return (
    <div className="spinner-container">
      <Spinner animation="border" variant="success" />
      <strong>Loading..</strong>
    </div>
  );
}
