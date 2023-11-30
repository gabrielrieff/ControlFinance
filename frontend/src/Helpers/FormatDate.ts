export function FormatDate(date: Date) {
  const data = new Date(date);
  const newDate = data.toLocaleDateString();
  return newDate;
}
