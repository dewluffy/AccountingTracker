export const formatRelativeDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  const now = new Date();

  const diffDays = Math.floor(
    (now.setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 Day Ago";

  return `${diffDays} Days Ago`;
};
