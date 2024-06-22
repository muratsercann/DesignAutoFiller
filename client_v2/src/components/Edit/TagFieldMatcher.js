import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import * as utils from "../../utils";
export default function TagFieldMatcher({}) {
  const [tagColumnMapping, setTagColumnMapping] = useState([]);
  let columns = [];
  let texts = [];
  let importedData = utils.getImportedDataFromStorage();
  let userSettings = utils.getSettingsFromStorage();

  if (
    importedData !== null &&
    importedData.length > 0 &&
    userSettings !== null
  ) {
    columns = Object.keys(importedData[0]);
    texts = userSettings.items.map((item) => item.value);
  }

  const [mappings, setMappings] = useState(() => {
    if (texts || texts.lenght === 0) return [];
    const map = texts.reduce((acc, text) => ({ ...acc, [text]: "" }), {});
    return map;
  });

  const handleMappingChange = (tag, field) => {
    var newValue = { ...tagColumnMapping, [tag]: field };
    utils.setTagColumnMappingToStorage(newValue);
    setTagColumnMapping(newValue);
  };

  console.log("columns : ", columns);
  console.log("texts: ", texts);
  return (
    <>
      <div className="text-column-match">

        {texts.length > 0 &&
          texts.map((tag) => (
            <Form.Group key={tag} className="mb-3">
              <Form.Label>{tag}:</Form.Label>
              <Form.Control
                as="select"
                value={tagColumnMapping[tag]}
                onChange={(e) => handleMappingChange(tag, e.target.value)}
              >
                <option value="">Seçiniz</option>
                {columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          ))}
      </div>
    </>
  );
}
