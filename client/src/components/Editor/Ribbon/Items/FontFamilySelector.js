import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import fonts from "../fonts";

export default function FontFamilySelector({ fontFamily, onChange }) {
  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="font-family-tooltip">Fonts</Tooltip>}
      >
        <Form.Select
          aria-label="Select a font"
          style={{ width: "150px" }}
          onChange={onChange}
          value={fontFamily}
        >
          {fonts.sort().map((font, index) => (
            <option key={index} style={{ fontFamily: font }} value={font}>
              {font.split(",")[0].replace(/"/g, "")}
            </option>
          ))}
        </Form.Select>
      </OverlayTrigger>
    </>
  );
}
