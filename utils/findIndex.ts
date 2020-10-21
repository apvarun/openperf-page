export const findIndex = (data, key) =>
  (data || []).findIndex((value) => value.name === key);
