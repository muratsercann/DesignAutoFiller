import { useNavigate } from "react-router-dom";
import step1 from "./images/step1.gif";
import step2 from "./images/step2.gif";
import step3 from "./images/step3.gif";
import step4 from "./images/step4.gif";

export default function GetStarted() {
  const navigate = useNavigate();
  const steps = [
    { message: "Step 1 : Upload an image", imageSrc: step1 },

    {
      message: "Step 2 : Add text items and customize them",
      imageSrc: step2,
    },

    {
      message:
        "Step 3 : Add your data source as xlsx, csv, json or txt file and bind columns with text items that you added",
      imageSrc: step3,
    },

    {
      message: "Step 4 : Adjust size and print dublicated designs",
      imageSrc: step4,
    },
  ];

  const handleStartClick = () => {
    navigate("/editor");
  };

  return (
    <>
      <div className="get-started">
        <div className="get-started-header">
          <p style={{ fontSize: "65px" }}>Welcome to Design Duplicator.</p>
          <p>Here are the guides on how to use it.</p>
        </div>
        <div className="quick-start-button" onClick={handleStartClick}>
          Quick Start
        </div>
        {steps.map((step) => (
          <div className="step">
            <img alt="" src={step.imageSrc} />
            <div className="get-started-step">{step.message}</div>
          </div>
        ))}
      </div>
    </>
  );
}
