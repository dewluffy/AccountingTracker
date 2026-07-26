import { STATUS_META } from "../../utils/statusMeta";

export default function StatusDot({ status }) {
  const meta = STATUS_META[status] || {
    color: "bg-slate-300",
    label: status,
  };

  return (
    <span
      title={meta.label}
      className={`inline-block w-3 h-3 rounded-full ${meta.color}`}
    />
  );
}
