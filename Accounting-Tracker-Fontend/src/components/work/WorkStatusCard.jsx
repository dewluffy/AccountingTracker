export default function WorkStatusCard({
  title,
  value,
  onChange,
}) {
  const handleChange = (e) => {
    const { name, value: fieldValue } = e.target;

    onChange?.({
      ...value,
      [name]: fieldValue,
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
            value={value?.month || ""}
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
            value={value?.year || ""}
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
          value={value?.status || "PENDING"}
          onChange={handleChange}
          className="w-full border rounded-xl px-3 py-2"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="WAITING">Waiting</option>
        </select>
      </div>

      {/* Remark */}
      <div>
        <label className="text-sm text-gray-500">
          Remark
        </label>

        <textarea
          name="remark"
          value={value?.remark || ""}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-xl px-3 py-2"
        />
      </div>

    </div>
  );
}
