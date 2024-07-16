import { OverlayTrigger, Tooltip, Form } from "react-bootstrap";

export default function RotationSelector({ value, onChange }) {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="rotation-tooltip">Rotate</Tooltip>}
    >
      <Form.Control
        type="number"
        title="Rotation Angle (deg)"
        value={value}
        onChange={onChange}
        style={{ width: "74px" }}
        aria-label="rotationAngle"
        as={"input"}
      />
    </OverlayTrigger>
  );
}
