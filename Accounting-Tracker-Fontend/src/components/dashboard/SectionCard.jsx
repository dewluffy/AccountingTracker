export default function SectionCard({
  title,
  action,
  children,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border">
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">
          {title}
        </h2>

        {action}
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}