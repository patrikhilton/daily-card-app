// "2026-11-18" -> "Wed 18 Nov"
export function formatDate(dateText) {
  const [year, month, day] = dateText.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}