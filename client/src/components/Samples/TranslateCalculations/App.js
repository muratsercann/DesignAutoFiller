import { useState } from "react";
import "./style.css";
import Container from "./Container";

export default function App() {
  const [inputWidthValue, setInputWidthValue] = useState(150);
  const width = 150;

  const [item1, setItem1] = useState({
    width: width,
    height: 50,
    translateX: 0,
    translateY: 0,
    angle: 0,
  });

  const [item2, setItem2] = useState({
    width: width,
    height: 50,
    translateX: 0,
    translateY: 206,
    angle: 40,
  });

  const [item3, setItem3] = useState({
    width: width,
    height: 50,
    translateX: 0,
    translateY: 206,
    angle: -40,
  });

  const [item4, setItem4] = useState({
    width: width,
    height: 50,
    translateX: 165,
    translateY: 197,
    angle: -120,
  });

  const handleWidthChange = (e) => {
    console.log("e.target.value : ", e.target.value);
    setInputWidthValue(Number(e.target.value));
    handleCalculateClick();
  };

  const handleCalculateClick = (e) => {
    const t1 = calculateTranslateXY_ForWidthChange(
      item1.width,
      item1.height,
      inputWidthValue,
      item1.translateX,
      item1.translateY,
      item1.angle
    );
    const t2 = calculateTranslateXY_ForWidthChange(
      item2.width,
      item2.height,
      inputWidthValue,
      item2.translateX,
      item2.translateY,
      item2.angle
    );
    const t3 = calculateTranslateXY_ForWidthChange(
      item3.width,
      item3.height,
      inputWidthValue,
      item3.translateX,
      item3.translateY,
      item3.angle
    );

    const t4 = calculateTranslateXY_ForWidthChange(
      item4.width,
      item4.height,
      inputWidthValue,
      item4.translateX,
      item4.translateY,
      item4.angle
    );

    setItem1({
      ...item1,
      width: inputWidthValue,
      translateX: t1.translateX,
      translateY: t1.translateY,
    });
    setItem2({
      ...item2,
      width: inputWidthValue,
      translateX: t2.translateX,
      translateY: t2.translateY,
    });

    setItem3({
      ...item3,
      width: inputWidthValue,
      translateX: t3.translateX,
      translateY: t3.translateY,
    });

    setItem4({
      ...item4,
      width: inputWidthValue,
      translateX: t4.translateX,
      translateY: t4.translateY,
    });
  };

  return (
    <>
      <div className="translate_sample">
        <Container key={1} settings={item1} />

        <Container key={2} settings={item2} />

        <Container key={3} settings={item3} />

        <Container key={4} settings={item4} />
      </div>
      <div>
        <input
          type="number"
          onChange={handleWidthChange}
          value={inputWidthValue}
        />
        <button onClick={handleCalculateClick}>calculate</button>
      </div>
    </>
  );
}

export const calculateTranslateXY_ForWidthChange = (
  width,
  height,
  newWidth,
  translateX,
  translateY,
  angle
) => {
  const newTranslateX = calculateTranslateX_ForWidthChange(
    width,
    height,
    newWidth,
    translateX,
    angle
  );

  const newTranslateY = calculateTranslateY_ForWidthChange(
    width,
    height,
    newWidth,
    translateY,
    angle
  );

  return { translateX: newTranslateX, translateY: newTranslateY };
};

export const calculateTranslateX_ForWidthChange = (
  width,
  height,
  newWidth,
  translateX,
  angle
) => {
  const rad = (angle * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const centerX_new = newWidth / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  const c_new = cos * centerX_new + sin * centerY - centerX_new;
  const c_old = cos * centerX + sin * centerY - centerX;
  let diff = Math.abs(c_new - c_old);

  if (newWidth > width) diff *= -1;

  let result = translateX + diff;
  return result;
};

export const calculateTranslateY_ForWidthChange = (
  width,
  height,
  newWidth,
  translateY,
  angle
) => {
  const rad = (angle * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const centerX_new = newWidth / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  const c_new = sin * centerX_new + cos * centerY - centerY;
  const c_old = sin * centerX + cos * centerY - centerY;
  let diff = Math.abs(c_new - c_old);

  if (angle > 0) diff *= -1;
  if (newWidth > width) diff *= -1;

  let result = translateY + diff;
  return result;
};
