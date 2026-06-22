export default function StatusBadge({ status }) {
  const map = {
    PENDING: "bg-red-100 text-red-600",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${map[status]}`}>
      {status}
    </span>
  );
}