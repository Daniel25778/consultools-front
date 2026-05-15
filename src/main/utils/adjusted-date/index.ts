export const adjustedDate = (date: Date): Date => {
  const offsetUTC3 = -180;

  const newDate = new Date(date);
  const dateOffset = newDate.getTimezoneOffset();

  if (dateOffset !== offsetUTC3) newDate.setHours(newDate.getHours() - 3);

  return newDate;
};
