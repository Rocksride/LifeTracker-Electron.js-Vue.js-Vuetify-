export const calculateMinutes = ( { startDate, startTime }, { endDate, endTime } ) => {
  let totalMinutes = 0;

  const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
  const [endYear, endMonth, endDay] = endDate.split("-").map(Number);

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  totalMinutes += (endHours - startHours) * 60;
  totalMinutes += endMinutes - startMinutes;

  if (endYear > startYear) {
    totalMinutes += (endYear - startYear) * 365 * 24 * 60;
  }
  if (endMonth > startMonth) {
    totalMinutes += (endMonth - startMonth) * 30 * 24 * 60;
  }
  if (endDay > startDay) {
    totalMinutes += (endDay - startDay) * 24 * 60;
  }

  return totalMinutes;
};
