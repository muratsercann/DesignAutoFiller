import { useEffect, useState } from "react";
import Editor from "./Editor";
import ImportData from "./Editor/ImportData";
import Preview from "./Preview";
import { BsCollection, BsDatabase, BsEye } from "react-icons/bs";
import { TbCirclesRelation } from "react-icons/tb";
import { FaImages } from "react-icons/fa6";
import TextColMatcher from "./Editor/TextColMatcher";
import * as utils from "../utils";
import CreateNew from "./CreateNew";
export default function Designer() {
  const [activePage, setActivePage] = useState("edit");
  const [page, setPage] = useState(null);
  const [dataSource, setDatasource] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(null);
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
    if (
      imageDetails !== null &&
      imageDetails !== undefined &&
      page !== null &&
      page !== undefined
    ) {
      utils.setSettingsToStorage(page);
    }
  }, [page, imageDetails]);

  useEffect(() => {
    if (dataSource !== undefined && dataSource !== null)
      utils.setImportedDataToStorage(dataSource);
  }, [dataSource]);

  useEffect(() => {
    if (imageDetails !== undefined && imageDetails !== null)
      utils.setImageDetailsToStorage(imageDetails);
  }, [imageDetails]);

  const iconSize = 24;

  if (loading) return <>loading</>;

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
          <CreateNew setImageDetails={setImageDetails} onSuccess={setRefresh} />
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
              title="Bind Data Columns"
              className={`menu-item ${
                activePage === "match" ? "selected" : ""
              }`}
              onClick={() => {
                setActivePage("match");
              }}
            >
              <div className="icon">
                <TbCirclesRelation size={iconSize} />
              </div>
              <div className="label">Bind Data</div>
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
                  setDataset={setDatasource}
                />
              )}

              {activePage === "preview" && (
                <Preview
                  dataset={dataSource?.dataset}
                  imageDetails={imageDetails}
                  settings={page}
                />
              )}

              {activePage === "match" && (
                <TextColMatcher
                  settings={page}
                  setSettings={setPage}
                  dataset={dataSource?.dataset}
                />
              )}
            </div>
          )}
        </div>
        <div className="component-container">
          <Editor
            page={page}
            setPage={setPage}
            imageDetails={imageDetails}
            setImageDetails={setImageDetails}
            dataset={dataSource}
          />
        </div>
      </div>
    </div>
  );
}
