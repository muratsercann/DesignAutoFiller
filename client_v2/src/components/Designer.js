import { useEffect, useState } from "react";
import Home from "./Home";
import Edit from "./Edit";
import ImportData from "./Edit/ImportData";
import Preview from "./Preview";
import { BsCollection, BsDatabase, BsEye, BsHouseDoor } from "react-icons/bs";
import { TbCirclesRelation } from "react-icons/tb";
import { FaImages } from "react-icons/fa6";
import TextColMatcher from "./Edit/TextColMatcher";
import { IoCloudUploadSharp } from "react-icons/io5";
import Upload from "./Edit/Upload";
import { Button } from "react-bootstrap";
import * as utils from "../utils";
import UploadImageModal from "./Edit/UploadImageModal";
import CreateNew from "./CreateNew";
export default function Designer({}) {
  const [activePage, setActivePage] = useState("edit");
  const [page, setPage] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [imageSettings, setImageSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(null);
  useEffect(() => {
    setLoading(true);
    const p = utils.getPageInfo();
    const ds = utils.getImportedDataFromStorage();
    const imgSt = utils.getImageSettingsFromStorage();

    setPage(p);
    setDataset(ds);
    setImageSettings(imgSt);
    setLoading(false);
  }, [refresh]);

  useEffect(() => {
    if (
      imageSettings !== null &&
      imageSettings !== undefined &&
      page !== null &&
      page !== undefined
    ) {
      utils.setSettingsToStorage(page);
    }
  }, [page]);

  useEffect(() => {
    if (dataset !== undefined && dataset !== null)
      utils.setImportedDataToStorage(dataset);
  }, [dataset]);

  useEffect(() => {
    if (imageSettings !== undefined && imageSettings !== null)
      utils.setImageSettingsToStorage(imageSettings);
  }, [imageSettings]);

  const pages = {
    edit: (
      <Edit
        page={page}
        setPage={setPage}
        imageSettings={imageSettings}
        setImageSettings={setImageSettings}
        dataset={dataset}
      />
    ),
    data: <ImportData dataset={dataset} setDataset={setDataset} />,
    preview: (
      <Preview
        dataset={dataset}
        imageSettings={imageSettings}
        settings={page}
      />
    ),
    match: (
      <TextColMatcher settings={page} setSettings={setPage} dataset={dataset} />
    ),
    uploadImage: <Upload setImageDetails={setImageSettings} />,
  };

  const children = pages[activePage];

  const handleCreateNew = () => {};

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
          {/* <div className="create-new-button" onClick={handleCreateNew}>
            Create New
          </div> */}
          <CreateNew
            setImageDetails={setImageSettings}
            onSuccess={setRefresh}
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
              {activePage === "data" && pages.data}

              {activePage === "preview" && (
                <Preview
                  dataset={dataset}
                  imageSettings={imageSettings}
                  settings={page}
                />
              )}

              {activePage === "match" && (
                <TextColMatcher
                  settings={page}
                  setSettings={setPage}
                  dataset={dataset}
                />
              )}
            </div>
          )}
        </div>
        <div className="component-container">
          <Edit
            page={page}
            setPage={setPage}
            imageSettings={imageSettings}
            setImageSettings={setImageSettings}
            dataset={dataset}
          />
        </div>
      </div>
    </div>
  );
}
