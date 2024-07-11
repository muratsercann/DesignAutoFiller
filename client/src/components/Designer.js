import { useEffect, useState } from "react";
import Editor from "./Editor";
import ImportData from "./ImportData";
import Preview from "./Preview";
import { BsCollection, BsDatabase, BsEye } from "react-icons/bs";
import { FaImages } from "react-icons/fa6";
import * as utils from "../utils";
import CreateNew from "./CreateNew";
import UploadImage from "./UploadImage";
import { Spinner } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
export default function Designer() {
  const [activePage, setActivePage] = useState("edit");
  const [page, setPage] = useState(null);
  const [dataSource, setDatasource] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

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
  }, [refresh]);

  useEffect(() => {
    if (imageDetails != null && page != null) {
      utils.setSettingsToStorage(page);
    }
  }, [page, imageDetails]);

  useEffect(() => {
    if (dataSource != null) utils.setImportedDataToStorage(dataSource);

    //todo if data source changes, reset databindings.

    // if (page != null) {
    //   const newSettings = {
    //     ...page,
    //     items: page.items.map((i) => {
    //       return { ...i, dataColumn: null };
    //     }),
    //   };

    //   setPage(newSettings);
    // }
  }, [dataSource]);

  useEffect(() => {
    if (imageDetails != null) utils.setImageDetailsToStorage(imageDetails);
  }, [imageDetails]);

  const iconSize = 24;

  const refreshPage = () => {
    setRefresh((prev) => prev + 1);
  };

  // if (loading)
  //   return (
  //     <div className="spinner-container">
  //       <Spinner animation="border" variant="success" />
  //     </div>
  //   );
  // else {
  //   console.log("loading false..");
  // }

  const handleCloseButton = () => {
    setActivePage("edit");
  };

  return (
    <div className="designer-container">
      <div className="header">
        <div className="d-flex">
          <FaImages size={24} />
        </div>
        <div>
          <h2>Designify</h2>
        </div>
        <div className="header-right">
          <CreateNew
            page={page}
            setPage={setPage}
            setImageDetails={setImageDetails}
            onSuccess={refreshPage}
          />
        </div>
      </div>
      <div className="designer-body">
        <div className="side-left">
          <div className="side-menu">
            <div
              className={`menu-item ${activePage === "edit" ? "selected" : ""}`}
              title="Editor"
              onClick={() => {
                setActivePage("edit");
              }}
            >
              <div className="icon">
                <BsCollection size={iconSize} />
              </div>
              <div className="label">Editor</div>
            </div>
            <div
              title="Data Set"
              className={`menu-item ${activePage === "data" ? "selected" : ""}`}
              onClick={() => {
                setActivePage("data");
              }}
            >
              <div className="icon">
                <BsDatabase size={iconSize} />
              </div>
              <div className="label">Data Source</div>
            </div>

            <div
              title="Preview"
              className={`menu-item ${
                activePage === "preview" ? "selected" : ""
              }`}
              onClick={() => {
                setActivePage("preview");
              }}
            >
              <div className="icon">
                <BsEye size={iconSize} />
              </div>
              <div className="label">Preview</div>
            </div>
          </div>

          {activePage !== "edit" && (
            <div className="side-container">
              <div className="close-button" onClick={handleCloseButton}>
                <IoCloseSharp size={18} />
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
                />
              )}
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
