import { OverlayTrigger, Tooltip, Form } from "react-bootstrap";

export default function TextWidthSelector({ value, onChange }) {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip className="custom-tooltip" id="text-width-tooltip">
          Width
        </Tooltip>
      }
    >
      <Form.Control
        type="number"
        value={value || 0}
        onChange={onChange}
        style={{ width: "74px" }}
        aria-label="Width(px)"
      />
    </OverlayTrigger>
  );
}
