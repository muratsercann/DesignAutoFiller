import { useEffect, useState } from "react";
import Editor from "./Editor";
import ImportData from "./ImportData";
import Preview from "./Preview";
import { BsCollection, BsDatabase, BsEye } from "react-icons/bs";
import { FaImages } from "react-icons/fa6";
import * as utils from "../utils";
import CreateNew from "./CreateNew";
import Upload from "./Upload";
export default function Designer() {
  const [activePage, setActivePage] = useState("edit");
  const [page, setPage] = useState(null);
  const [dataSource, setDatasource] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    setLoading(true);
    const p = utils.getPageInfo();
    const ds = utils.getImportedDataFromStorage();
    const imgSt = utils.getImageDetailsFromStorage();

    setPage(p);
    setDatasource(ds);
    setImageDetails(imgSt);
    setLoading(false);
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

  if (loading) return <>loading</>;

  const refreshPage = () => {
    setRefresh((prev) => prev + 1);
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
          {imageDetails ? (
            <Editor
              page={page}
              setPage={setPage}
              imageDetails={imageDetails}
              setImageDetails={setImageDetails}
              dataset={dataSource}
            />
          ) : (
            <Upload setImageDetails={setImageDetails} onSuccess={setRefresh} />
          )}
        </div>
      </div>
    </div>
  );
}
