const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getToday = (): string => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  return daysOfWeek[dayOfWeek];
};
