import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { STATUS_META } from "../../utils/statusMeta";

const STATUS_HEX = {
  PENDING: "#94a3b8",
  IN_PROGRESS: "#facc15",
  COMPLETED: "#22c55e",
  WAITING: "#c084fc",
};

export default function MonthlyStatusChart({ data = [] }) {
  const chartData = data.map((item) => ({
    status: item.status,
    label: STATUS_META[item.status]?.label || item.status,
    count: item.count,
  }));

  if (chartData.every((item) => item.count === 0)) {
    return (
      <div
        className="
          h-80
          rounded-xl
          border-2
          border-dashed
          flex
          items-center
          justify-center
          text-gray-400
        "
      >
        No work data yet
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="label" tick={{ fontSize: 12 }} />

          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />

          <Tooltip />

          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {chartData.map((item) => (
              <Cell
                key={item.status}
                fill={STATUS_HEX[item.status] || "#94a3b8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
