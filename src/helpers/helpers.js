export const persistData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getData = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const getVariableFromRoot = varName => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName);
};
