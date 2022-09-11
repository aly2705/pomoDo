export const persistData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getData = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const getVariableFromRoot = varName => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName);
};

export const dateIsToday = date => {
  if (!date) return;
  const today = new Date().toISOString();
  if (date.slice(0, 10) === today.slice(0, 10)) return true;
  return false;
};
