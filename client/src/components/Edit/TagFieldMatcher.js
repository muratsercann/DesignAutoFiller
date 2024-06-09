import { useState } from "react";
import Form from "react-bootstrap/Form";
import * as utils from "./utils";
export default function TagFieldMatcher({
  tags,
  columns,
  tagColumnMapping,
  setTagColumnMapping,
}) {
  const handleMappingChange = (tag, field) => {
    var newValue = { ...tagColumnMapping, [tag]: field };
    utils.setTagColumnMappingToStorage(newValue);
    setTagColumnMapping(newValue);
  };

  return (
    <div>
      {tags.map((tag) => (
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
  );
}
