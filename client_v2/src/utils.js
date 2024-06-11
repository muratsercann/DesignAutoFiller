import { defaultData } from "./data.js";

export const getPageInfo = () => {
  const savedData = localStorage.getItem("userData");
  if (savedData && savedData !== "") {
    const jsonData = JSON.parse(savedData);
    return jsonData;
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

const storageKeys = {
  imageSettings: "imageSettings",
  userSettings: "userData",
  importedData: "importedData",
  tagColumnMapping: "tagColumnMapping",
};

export function getImageSettingsFromStorage() {
  return JSON.parse(localStorage.getItem(storageKeys.imageSettings));
}

export function getSettingsFromStorage() {
  return JSON.parse(localStorage.getItem(storageKeys.userSettings));
}

export function getImportedDataFromStorage() {
  return JSON.parse(localStorage.getItem(storageKeys.importedData));
}

export function getTagColumnMappingToStorage() {
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
  clearUserSettingsFromStorage();
  clearImportedDataFromStorage();
  clearTagColumnMappingFromStorage();
  clearImageSettingsFormStorage();
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
