import { useEffect, useState } from "react";
import * as utils from "../../utils";
import "./Edit.css";
export default function TextColMatcher({}) {
  const columns = utils.getColNamesFromStorage();
  const texts = utils.getTextValuesFromStorage();

  const [mappings, setMappings] = useState(
    Object.fromEntries(texts.map((key) => [key, ""]))
  );

  const handleChanges = (text, e) => {
    console.log(text + ":" + e.target.value);
    const value = e.target.value === "none" ? "" : e.target.value;
    setMappings({ ...mappings, [text]: value });
  };

  useEffect(() => {
    console.log("mappings changed : ", mappings);
    utils.setTagColumnMappingToStorage(mappings);
  }, [mappings]);

  return (
    <>
      <div className="matcher">
        <div className="container">
          <div className="row mb-3 text-center">
            <h6>Match Text - Column</h6>
            <hr></hr>
          </div>
          {texts.map((text, index) => (
            <div key={index} className="row mb-3">
              <div className="col-5">{text}</div>
              <span className="col-1">=</span>
              <div className="col">
                <select
                  className="form-select"
                  onChange={(e) => handleChanges(text, e)}
                >
                  <option value={""}>none</option>
                  {columns.map((col, index) => (
                    <option value={col} key={index}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
