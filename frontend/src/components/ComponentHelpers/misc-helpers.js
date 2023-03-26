export const formatTimestamp = (timestamp) => {
  const dateObj = new Date(timestamp);
  const now = new Date();
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const formattedTime = dateObj.toLocaleTimeString("en-US", timeOptions);

  const isToday = dateObj.toLocaleDateString() === now.toLocaleDateString();
  const isYesterday =
    dateObj.toLocaleDateString() ===
    new Date(now - 86400000).toLocaleDateString();
  if (isToday) {
    return `Today ${formattedTime}`;
  } else if (isYesterday) {
    return `Yesterday ${formattedTime}`;
  } else {
    const dateOptions = { weekday: "long", month: "short", day: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", dateOptions);
    return `${formattedDate} ${formattedTime}`;
  }
}
