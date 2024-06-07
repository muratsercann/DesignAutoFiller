import React, { useState } from "react";

const ImageComponent = ({ imageUrl, onImageLoad }) => {
  return (
    <div style={{}}>
      <img
        src={imageUrl}
        alt="Loaded content"
        onLoad={onImageLoad}
        onError={() => alert("Geçersiz resim URL'si")}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

const ImageRatioApp = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [aspectRatio, setAspectRatio] = useState(null);

  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setImageUrl(inputUrl);
    setAspectRatio(null); // Yeni URL için en-boy oranını sıfırla
  };

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    const ratio = naturalWidth / naturalHeight;
    setAspectRatio(ratio);
  };

  return (
    <div>
      <h1>Resmin En-Boy Oranını Öğren</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputUrl}
          onChange={handleInputChange}
          placeholder="Resim URL'si girin"
          required
        />
        <button type="submit">Gönder</button>
      </form>
      {imageUrl && (
        <div>
          <ImageComponent imageUrl={imageUrl} onImageLoad={handleImageLoad} />
          {aspectRatio && <p>En-boy oranı: {aspectRatio.toFixed(4)}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageRatioApp;
