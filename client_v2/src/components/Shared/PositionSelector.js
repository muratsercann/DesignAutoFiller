import { useEffect, useRef, useState } from "react";
import "./styles/positionSelector.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import {
  CiAlignLeft,
  CiAlignCenterV,
  CiAlignRight,
  CiAlignBottom,
  CiAlignCenterH,
  CiAlignTop,
} from "react-icons/ci";

export default function PositionSelector({
  horizontalAlignment,
  verticalAlignment,
  setVerticalAlignment,
  setHorizontalAlignment,
}) {
  const [show, setShow] = useState(false);
  const refPosition = useRef(null);

  const handleClick = () => {
    setShow(true);
  };

  const handleHorizontalClick = (align) => {
    setHorizontalAlignment(align);
  };

  const handleVerticalClick = (align) => {
    setVerticalAlignment(align);
  };

  const handleClickOutside = (event) => {
    if (refPosition.current && !refPosition.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className="positionSelector" onClick={handleClick}>
      <div className="set-position">Object</div>

      {show && (
        <>
          <div ref={refPosition} className="align">
            <div className="container">
              <Row>
                <Col>
                  <Row
                    className={`button mb-3 ${
                      verticalAlignment === "Top" ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleVerticalClick("Top");
                    }}
                  >
                    <Col>
                      <CiAlignTop size={"30px"} />
                      <span>Top</span>
                    </Col>
                  </Row>
                  <Row
                    className={`button mb-3 ${
                      verticalAlignment === "Center" ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleVerticalClick("Center");
                    }}
                  >
                    <Col>
                      <CiAlignCenterV size={"30px"} />
                      <span>Center</span>
                    </Col>
                  </Row>
                  <Row
                    className={`button mb-3 ${
                      verticalAlignment === "Bottom" ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleVerticalClick("Bottom");
                    }}
                  >
                    <Col>
                      <CiAlignBottom size={"30px"} />
                      <span>Bottom</span>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row
                    className={`button mb-3 ${
                      horizontalAlignment === "Left" ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleHorizontalClick("Left");
                    }}
                  >
                    <Col>
                      <CiAlignLeft size={"30px"} />
                      <span>Left</span>
                    </Col>
                  </Row>
                  <Row
                    className={`button mb-3 ${
                      horizontalAlignment === "Center" ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleHorizontalClick("Center");
                    }}
                  >
                    <Col>
                      <CiAlignCenterH size={"30px"} />
                      <span>Center</span>
                    </Col>
                  </Row>
                  <Row
                    className={`button mb-3 ${
                      horizontalAlignment === "Right" ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleHorizontalClick("Right");
                    }}
                  >
                    <Col>
                      <CiAlignRight size={"30px"} />
                      <span>Right</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>

          <div className="arrow" />
        </>
      )}
    </div>
  );
}
