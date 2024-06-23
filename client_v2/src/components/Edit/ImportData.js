import { useEffect, useRef, useState } from "react";
import * as utils from "../../utils";
import { Button, Spinner, Table } from "react-bootstrap";
import TextColMatcher from "./TextColMatcher";
import ImportModal from "./ImportModal";
export default function ImportData({}) {
  const [data, setData] = useState(utils.getImportedDataFromStorage());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImportClick = (e) => {
    setIsModalOpen(true);
  };

  const handleSaveClick = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading && error !== null) {
      setError(null);
      return;
    }
    if (isLoading) {
      const timeout = setTimeout(() => {
        utils.setImportedDataToStorage(data);
        setIsLoading(false);
      }, 800);

      // useEffect temizleme fonksiyonu, component unmount olduğunda zamanlayıcıyı temizler
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="spinner-container">
          <Spinner animation="border" variant="success" />
        </div>
      )}

      <div className="data-container">
        <ImportModal
          isOpen={isModalOpen}
          setImportedData={setData}
          setShow={setIsModalOpen}
        />
        <div>
          <Button
            className="mx-3"
            variant="secondary"
            onClick={handleImportClick}
          >
            Import
          </Button>
          {data !== null && data.length > 0 && (
            <Button variant="success" onClick={handleSaveClick}>
              Save
            </Button>
          )}
        </div>
        {data !== null && data.length > 0 && (
          <>
            <Table
              striped
              bordered
              hover
              style={{ fontSize: "12px", height: "500px", overflow: "auto" }}
            >
              <thead>
                <tr>
                  <th key={0}>No</th>
                  {Object.keys(data[0]).map((colName, index) => (
                    <th key={index}>{colName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{rowIndex + 1}</td>

                    {Object.keys(data[0]).map((key, index) => (
                      <td key={index}>{row[key] || ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
}
