import "./preview.css";
import Page from "./Page";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { Spinner } from "react-bootstrap";
import * as utils from "../../utils";
import { BiRefresh } from "react-icons/bi";
export default function Preview({
  width = 300,
  gap = "0.5",
  lazyload = false,

  onLoaded = () => {
    console.log("Content has fully loaded!");
  },
}) {
  const [scale, setScale] = useState(1);
  const [itemCount, setItemCount] = useState(10);
  const refContainer = useRef(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const [settings, setSettings] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [dataLoaded, setDataLoaded] = useState("");
  const [deferredDataLoaded] = useDeferredValue(dataLoaded);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const p = await utils.getPageInfo();
      const ds = await utils.getImportedDataFromStorage();
      const imgSt = await utils.getImageDetailsFromStorage();
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await wait(800);

      setSettings(p);
      setDataset(ds?.dataset);
      setImageDetails(imgSt);
      setItemCount(lazyload ? 10 : ds.dataset.length);

      const maxWidth = width;
      if (imgSt && imgSt.customWidth > maxWidth) {
        setScale(maxWidth / imgSt.customWidth);
      }

      setDataLoaded("1");
    };

    fetchData();
  }, [lazyload, width, refresh]);

  useEffect(() => {
    if (deferredDataLoaded === "1") {
      setQuery("1");
    }
  }, [deferredDataLoaded]);

  const Pages = useCallback(
    (query) => {
      if (query.query === "") {
        console.log("query is empty");
        return (
          <div className="spinner-container">
            <Spinner animation="border" variant="success" />
          </div>
        );
      }
      if (!dataset || dataset.length === 0) return [];
      const result = dataset
        .slice(0, itemCount)
        .map((row, index) => (
          <Page
            key={index}
            page={settings}
            imageDetails={imageDetails}
            datarow={row}
            scale={scale}
          />
        ));

      return result;
    },
    [dataset, settings, imageDetails, scale, itemCount]
  );

  const handleShowMore = () => {
    setItemCount((prev) => {
      if (prev + 10 > dataset.length) return dataset.length - 1;
      else return prev + 10;
    });
  };

  useEffect(() => {
    if (deferredQuery !== "") {
      onLoaded();
    }
  }, [deferredQuery, onLoaded]);

  const handleRefreshClick = () => {
    setDataLoaded("");
    setRefresh((prev) => prev + 1);
  };

  return (
    <div
      ref={refContainer}
      className="preview-container"
      style={{ gap: `${gap}cm` }}
    >
      {dataLoaded === "" && (
        <div className="spinner-container">
          <Spinner animation="border" variant="success" />
        </div>
      )}
      {imageDetails && dataset && settings ? (
        <>
          <div className="app-custom-button" onClick={handleRefreshClick}>
            <BiRefresh size={24} color="var(--bs-light)" />
            Refresh
          </div>
          <Pages query={deferredQuery} />

          {deferredQuery !== "" && itemCount < dataset.length && (
            <div className="app-custom-button" onClick={handleShowMore}>
              Show More
            </div>
          )}
        </>
      ) : (
        dataLoaded !== "" && (
          <div style={{ color: "var(--bs-gray-500)", fontWeight: 400 }}>
            Sorry! Nothing to show here.
          </div>
        )
      )}
    </div>
  );
}
