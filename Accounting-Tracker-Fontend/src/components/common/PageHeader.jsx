export default function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="text-gray-500 mt-1">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}