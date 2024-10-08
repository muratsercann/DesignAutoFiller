import { useEffect, useState } from "react";
import * as utils from "../utils";
export default function TextColMatcher({ settings, setSettings, dataset }) {
  const dataColumns = utils.getColNamesFromDataset(dataset);

  const handleChanges = (item, e) => {
    const value = e.target.value === "none" ? "" : e.target.value;

    const newSettings = {
      ...settings,
      items: settings.items.map((i) => {
        if (i.id === item.id) {
          return { ...i, dataColumn: value };
        } else return i;
      }),
    };

    setSettings(newSettings);
  };

  return (
    <>
      {dataset && settings ? (
        <div className="matcher">
          <div className="container">
            <div className="row mb-3 text-center">
              <h6>Match Text - Column</h6>
              <hr style={{ opacity: "0.1" }}></hr>
            </div>
            {settings.items.map((item, index) => (
              <div key={index} className="row mb-3">
                <div className="col-5" title={item.value}>
                  {item.value}
                </div>
                <span className="col-1">=</span>
                <div className="col">
                  <select
                    title={item.dataColumn}
                    value={item.dataColumn}
                    className="form-select bg-dark text-light"
                    onChange={(e) => handleChanges(item, e)}
                  >
                    <option value={""}>none</option>
                    {dataColumns.map((col, index) => {
                      return (
                        <option value={col} key={index}>
                          {col}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
