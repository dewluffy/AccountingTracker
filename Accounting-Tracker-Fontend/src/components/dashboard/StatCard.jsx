export default function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>

      {subtitle && (
        <p className="text-sm text-gray-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}