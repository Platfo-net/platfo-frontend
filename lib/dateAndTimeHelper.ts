export const getFormattedDate = (value: string) => {
  return value.split('T')[0].replaceAll('-', '/');
};

export const getFormattedTime = (value: string) => {
  return value.split('T')[1].substring(0, 5);
};
