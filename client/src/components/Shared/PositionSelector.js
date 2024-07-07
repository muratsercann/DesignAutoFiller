import { useEffect, useRef, useState } from "react";
import "./styles/positionSelector.css";
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
  setIsRibbonItemOpen,
}) {
  const [show, setShow] = useState(false);
  const refPosition = useRef(null);
  const refPositionButton = useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  const handleHorizontalClick = (align) => {
    setHorizontalAlignment(align);
  };

  const handleVerticalClick = (align) => {
    setVerticalAlignment(align);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refPosition.current &&
        !refPosition.current.contains(event.target) &&
        !refPositionButton.current.contains(event.target)
      ) {
        setShow(false);
        setIsRibbonItemOpen(true);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const iconsize = 24;
  return (
    <div className="positionSelector">
      <div
        ref={refPositionButton}
        onClick={handleClick}
        className="set-position"
      >
        Position
      </div>

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
                    onClick={(e) => {
                      handleVerticalClick("Top");
                    }}
                  >
                    <Col>
                      <CiAlignTop size={iconsize} />
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
                      <CiAlignCenterV size={iconsize} />
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
                      <CiAlignBottom size={iconsize} />
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
                      <CiAlignLeft size={iconsize} />
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
                      <CiAlignCenterH size={iconsize} />
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
                      <CiAlignRight size={iconsize} />
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
