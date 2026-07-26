import StatusDot from "./StatusDot";
import { STATUS_META } from "../../utils/statusMeta";

export default function StatusLegend({ statuses }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
      {statuses.map((status) => (
        <div key={status} className="flex items-center gap-2">
          <StatusDot status={status} />

          <span>{STATUS_META[status]?.label || status}</span>
        </div>
      ))}
    </div>
  );
}
