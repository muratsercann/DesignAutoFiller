import { defaultData } from "./data.js";

export const getPageInfo = () => {
  const savedData = getSettingsFromStorage();
  if (savedData && savedData !== "") {
    return savedData;
  } else {
    return defaultData;
  }
};

export const calculateTranslateX = (
  element,
  rotationAngle,
  horizantalAlignment,
  translateX
) => {
  let newTranslateX = translateX;

  const rad = (Math.abs(rotationAngle) * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const centerX = element.offsetWidth / 2;
  const centerY = element.offsetHeight / 2;

  const parentWidth = element.offsetParent.offsetWidth;

  //Horizontal
  if (horizantalAlignment === "Left") {
    newTranslateX = Math.abs(cos * centerX) + Math.abs(sin * centerY) - centerX;
  } else if (horizantalAlignment === "Right") {
    newTranslateX =
      centerX - (Math.abs(cos * centerX) + Math.abs(sin * centerY));
    newTranslateX += parentWidth - element.offsetWidth;
  } else if (horizantalAlignment === "Center") {
    newTranslateX = (parentWidth - element.offsetWidth) / 2;
  }

  return newTranslateX;
};

export const calculateTranslateY = (
  element,
  rotationAngle,
  verticalAlignment,
  translateY
) => {
  let newTranslateY = translateY;

  const rad = (Math.abs(rotationAngle) * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const centerX = element.offsetWidth / 2;
  const centerY = element.offsetHeight / 2;

  const parentHeight = element.offsetParent.offsetHeight;

  //Vertical
  if (verticalAlignment === "Top") {
    newTranslateY = Math.abs(sin * centerX) + Math.abs(cos * centerY) - centerY;
    // newTranslateY -= parentHeight;
  } else if (verticalAlignment === "Bottom") {
    newTranslateY =
      centerY - (Math.abs(sin * centerX) + Math.abs(cos * centerY));
    newTranslateY += parentHeight - element.offsetHeight;
  } else if (verticalAlignment === "Center") {
    newTranslateY = 0;
    newTranslateY += (parentHeight - element.offsetHeight) / 2;
  }

  return newTranslateY;
};

export const pixelToCm = (value) => {
  const cm = Number((value * (2.54 / 96)).toFixed(2));
  return cm;
};

export const cmToPixel = (value) => {
  const px = Number((value * (96 / 2.54)).toFixed(2));
  return px;
};

const storageKeys = {
  imageSettings: "imageSettings",
  userSettings: "userSettings",
  importedData: "importedData",
  tagColumnMapping: "tagColumnMapping",
};

export function getImageSettingsFromStorage() {
  return JSON.parse(localStorage.getItem(storageKeys.imageSettings));
}

export function getSettingsFromStorage() {
  return JSON.parse(localStorage.getItem(storageKeys.userSettings));
}

export function getTextValuesFromStorage() {
  const settings = getSettingsFromStorage();
  if (settings !== null && settings.items.length > 0) {
    const textValues = settings.items.map((item) => item.value);
    return textValues;
  } else {
    return [];
  }
}

export function getImportedDataFromStorage() {
  return JSON.parse(localStorage.getItem(storageKeys.importedData));
}

export function getColNamesFromStorage() {
  const data = getImportedDataFromStorage();
  if (data !== null && data.length > 0) {
    const cols = Object.keys(data[0]);
    return cols;
  } else {
    return [];
  }
}

export function getTagColumnMappingFromStorage() {
  return JSON.parse(localStorage.getItem(storageKeys.tagColumnMapping));
}

export function setImageSettingsToStorage(data) {
  localStorage.setItem(storageKeys.imageSettings, JSON.stringify(data));
}

export function setSettingsToStorage(data) {
  localStorage.setItem(storageKeys.userSettings, JSON.stringify(data));
}

export function setImportedDataToStorage(data) {
  localStorage.setItem(storageKeys.importedData, JSON.stringify(data));
}

export function setTagColumnMappingToStorage(data) {
  localStorage.setItem(storageKeys.tagColumnMapping, JSON.stringify(data));
}

export function clearAllDataFromStorage() {
  Object.values(storageKeys).forEach((key) => {
    localStorage.removeItem(key);
  });
}

export function clearUserSettingsFromStorage() {
  localStorage.removeItem(storageKeys.userSettings);
}

export function clearImportedDataFromStorage() {
  localStorage.removeItem(storageKeys.importedData);
}

export function clearTagColumnMappingFromStorage() {
  localStorage.removeItem(storageKeys.tagColumnMapping);
}

export function clearImageSettingsFormStorage() {
  localStorage.removeItem(storageKeys.imageSettings);
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
  const rad = (Math.abs(angle) * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const centerX_new = newWidth / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  const c_new =
    Math.abs(cos * centerX_new) + Math.abs(sin * centerY) - centerX_new;

  const c_old = Math.abs(cos * centerX) + Math.abs(sin * centerY) - centerX;

  if (newWidth > width) return translateX - Math.abs(c_new - c_old);
  else {
    return translateX + Math.abs(c_old - c_new);
  }
};

export const calculateTranslateY_ForWidthChange = (
  width,
  height,
  newWidth,
  translateY,
  angle
) => {
  const rad = (Math.abs(angle) * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const centerX_new = newWidth / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  let newTranslateY = 0;

  const c_new = Math.abs(sin * centerX_new) + Math.abs(cos * centerY) - centerY;

  const c_old = Math.abs(sin * centerX) + Math.abs(cos * centerY) - centerY;

  if (newWidth > width) {
    if (angle > 0) return translateY + Math.abs(c_new - c_old);
    else return translateY - Math.abs(c_new - c_old);
  } else {
    if (angle > 0) {
      return translateY - Math.abs(c_old - c_new);
    } else {
      return translateY + Math.abs(c_old - c_new);
    }
  }
};
