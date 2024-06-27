import React, { useRef, useState } from "react";

const MultiplyImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [imageCount, setImageCount] = useState(1);
  const [images, setImages] = useState([]);
  const [naturalWidth, setNaturalWidth] = useState(null);
  const [naturalHeight, setNaturalHeight] = useState(null);
  const printRef = useRef(null);

  const handleImageLoad = (e) => {
    setNaturalWidth(e.target.naturalWidth);
    setNaturalHeight(e.target.naturalHeight);
    setImageWidth(((e.target.naturalWidth / 96) * 2.54).toFixed(3)); // cm cinsinden genişlik
    setImageHeight(((e.target.naturalHeight / 96) * 2.54).toFixed(3)); // cm cinsinden yükseklik
  };

  const handleWidthChange = (e) => {
    const width = e.target.value;
    setImageWidth(width);
    if (naturalWidth && naturalHeight) {
      const aspectRatio = naturalHeight / naturalWidth;
      setImageHeight((width * aspectRatio).toFixed(2));
    }
  };

  const handleHeightChange = (e) => {
    const height = e.target.value;
    setImageHeight(height);
    if (naturalWidth && naturalHeight) {
      const aspectRatio = naturalWidth / naturalHeight;
      setImageWidth((height * aspectRatio).toFixed(2));
    }
  };

  const handleDuplicateImages = () => {
    const newImages = Array(parseInt(imageCount)).fill(imageUrl);
    setImages(newImages);
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "", "height=500,width=800");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      `
       <style>
        @media print {
          body, html {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0 !important;
            padding: 0 !important;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          /* Diğer gerekli yazdırma stillerini buraya ekleyin */
        }
      </style>
      `
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <form>
        <div>
          <label>Resim URL'si:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="button" onClick={() => setImageUrl(imageUrl)}>
            Resmi Yükle
          </button>
          {imageUrl && (
            <img
              src={imageUrl}
              style={{ display: "none" }}
              onLoad={handleImageLoad}
              alt=""
            />
          )}
        </div>
        <div>
          <label>Genişlik (cm):</label>
          <input
            type="number"
            value={imageWidth}
            onChange={handleWidthChange}
          />
        </div>
        <div>
          <label>Yükseklik (cm):</label>
          <input
            type="number"
            value={imageHeight}
            onChange={handleHeightChange}
          />
        </div>
        <div>
          <label>Çoğaltma Sayısı:</label>
          <input
            type="number"
            value={imageCount}
            onChange={(e) => setImageCount(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleDuplicateImages}>
          Çoğalt
        </button>
      </form>

      <button onClick={handlePrint}>Yazdır</button>

      <div ref={printRef}>
        <div
          className="image-container"
          style={{ display: "flex", flexWrap: "wrap", gap: "1cm" }}
        >
          {images.map((url, index) => (
            <div>
              <img
                key={index}
                src={url}
                style={{ width: `${imageWidth}cm`, height: `${imageHeight}cm` }}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiplyImage;
