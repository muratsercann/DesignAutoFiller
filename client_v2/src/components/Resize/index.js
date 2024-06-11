import "./Resize.css";
import * as utils from "../../utils";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function Resize({}) {
  const imageSettings = utils.getImageSettingsFromStorage();
  const url = imageSettings?.url || "";
  const blobSrc = imageSettings?.blobSrc || "";

  const navigate = useNavigate();

  if (!url && !blobSrc) {
    navigate("/");
  }

  return (
    <div className="resize">
        
        {blobSrc && (
          <img alt="" src={blobSrc} width={"120px"} className="image-fluid" />
        )}
        
      <Form className="mt-3">
        <Row className="mb-3">
          <Form.Control type="button" value={"Continue"} />
        </Row>
      </Form>
    </div>
  );
}
