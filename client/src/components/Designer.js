import { useEffect, useState } from "react";
import Editor from "./Editor";
import ImportData from "./ImportData";
import Preview from "./Preview";
import * as utils from "../utils";
import UploadImage from "./UploadImage";
import { Button, Spinner } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import Header from "./Header";
import SideMenu from "./SideMenu";
import PrintSettings from "./PrintSettings";
import Help from "./Help";
export default function Designer() {
  const [activePage, setActivePage] = useState("edit");
  const [page, setPage] = useState(null);
  const [dataSource, setDatasource] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const p = await utils.getPageInfo();
      const ds = await utils.getImportedDataFromStorage();
      const imgSt = await utils.getImageDetailsFromStorage();
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await wait(800);

      setPage(p);
      setDatasource(ds);
      setImageDetails(imgSt);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (imageDetails != null && page != null) {
      utils.setSettingsToStorage(page);
    }
  }, [page, imageDetails]);

  useEffect(() => {
    if (dataSource != null) utils.setImportedDataToStorage(dataSource);
  }, [dataSource]);

  useEffect(() => {
    if (imageDetails != null) utils.setImageDetailsToStorage(imageDetails);
  }, [imageDetails]);

  const handleCloseButton = () => {
    setActivePage("edit");
  };

  return (
    <div className="designer-container">
      <Header page={page} setPage={setPage} setImageDetails={setImageDetails} />

      <div className="designer-body">
        <div className="side-left">
          <SideMenu activePage={activePage} setActivePage={setActivePage} />

          {!loading && activePage !== "edit" && (
            <div className="side-container">
              <div className="close-button" onClick={handleCloseButton}>
                <IoClose size={21} />
              </div>
              {activePage === "data" && (
                <ImportData
                  dataSource={dataSource}
                  setDataSource={setDatasource}
                  page={page}
                  setPage={setPage}
                />
              )}

              {activePage === "preview" && (
                <Preview
                  dataset={dataSource?.dataset}
                  imageDetails={imageDetails}
                  settings={page}
                  lazyload={true}
                />
              )}

              {activePage === "print" && (
                <PrintSettings
                  imageDetails={imageDetails}
                  settings={page}
                  dataset={dataSource?.dataset}
                />
              )}
              {activePage === "help" && <Help />}
            </div>
          )}
        </div>

        <div className="component-container">
          {loading ? (
            <div className="spinner-container">
              <Spinner animation="border" variant="success" />
            </div>
          ) : (
            <>
              {imageDetails ? (
                <Editor
                  page={page}
                  setPage={setPage}
                  imageDetails={imageDetails}
                  setImageDetails={setImageDetails}
                  dataset={dataSource}
                />
              ) : (
                <div
                  style={{ width: "70%" }}
                  className="container gap-5 d-flex flex-column flex-center justify-items-center justify-content-center align-items-center h-100"
                >
                  <div style={{ fontSize: "32px", fontWeight: "600" }}>
                    Upload an image to start
                  </div>

                  <div style={{ height: "400px", width: "100%" }}>
                    <UploadImage
                      style={{ padding: "30px !important" }}
                      setImageDetails={setImageDetails}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
