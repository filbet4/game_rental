export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isOverdue = (dueDate, returnedDate) => {
  if (returnedDate) return false;
  return new Date() > new Date(dueDate);
};

export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};
