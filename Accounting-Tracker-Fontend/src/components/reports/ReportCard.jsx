export default function ReportCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-sm text-gray-400 mt-2">
        {subtitle}
      </p>

    </div>
  );
}