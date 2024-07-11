import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function FontSizeSelector({ fontSize, onChange }) {
  const fontSizes = [
    6, 7, 9, 10, 11, 12, 14, 15, 16, 18, 20, 21, 22, 24, 28, 32, 34, 36, 38, 44,
    55, 62,
  ];

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="font-size-tooltip">Font Size</Tooltip>}
    >
      <Form.Select
        aria-label="Font size"
        style={{ width: "75px" }}
        value={fontSize || 12}
        onChange={onChange}
      >
        {fontSizes.map((item, index) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </Form.Select>
    </OverlayTrigger>
  );
}
