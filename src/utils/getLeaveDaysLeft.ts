export const getLeaveDaysLeft = (startingDate: Date): number => {
  const startDate = new Date(startingDate);
  const currentDate = new Date();

  const diffInMonths =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth() + 1);

  if (diffInMonths >= 12) {
    const years = diffInMonths / 12;
    const months = diffInMonths - years * 12;
    return 20 * years + months * 1.667;
  }

  const leaveDaysLeft = parseFloat((diffInMonths * 1.667).toFixed(2));

  return leaveDaysLeft;
};
