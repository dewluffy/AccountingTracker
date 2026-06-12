import { FaInbox } from "react-icons/fa";

export default function EmptyState({
  title = "No Data",
  description = "No records found.",
  action,
}) {
  return (
    <div className="py-16 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <FaInbox className="text-2xl text-slate-400" />
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="text-slate-500 mt-2 max-w-md">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}