import { useState } from "react";

export default function WorkStatusCard({
  title,
  value,
  onChange,
}) {
  const [form, setForm] = useState({
    month: value?.month || "",
    year: value?.year || "",
    status: value?.status || "PENDING",
    remark: value?.remark || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    onChange?.({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="border rounded-2xl p-5 bg-white space-y-4">

      {/* Title */}
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      {/* Month / Year */}
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="text-sm text-gray-500">
            Month
          </label>

          <select
            name="month"
            value={form.month}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
          >
            <option value="">Select</option>
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Year
          </label>

          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="2026"
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

      </div>

      {/* Status */}
      <div>
        <label className="text-sm text-gray-500">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-xl px-3 py-2"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Remark */}
      <div>
        <label className="text-sm text-gray-500">
          Remark
        </label>

        <textarea
          name="remark"
          value={form.remark}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-xl px-3 py-2"
        />
      </div>

    </div>
  );
}