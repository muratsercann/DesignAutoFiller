import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function TextIntput({ value, onChange }) {
  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip className="custom-tooltip" id="text-input-tooltip">
            Text value
          </Tooltip>
        }
      >
        <Form.Control type="text" value={value || ""} onChange={onChange} />
      </OverlayTrigger>
    </>
  );
}
