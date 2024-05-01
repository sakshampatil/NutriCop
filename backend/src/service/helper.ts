export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const getToday = (): string => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const day = dayOfWeek - 1 < 0 ? 6 : dayOfWeek - 1;
  return daysOfWeek[day];
};
