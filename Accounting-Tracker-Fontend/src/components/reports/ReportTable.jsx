export default function ReportTable({
  title,
  columns,
  data,
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">

      <div className="p-6 border-b">
        <h2 className="font-semibold">
          {title}
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">

              {columns.map((column) => (
                <th
                  key={column}
                  className="
                    px-6 py-4 text-left
                  "
                >
                  {column}
                </th>
              ))}

            </tr>
          </thead>

          <tbody>

            {data.map((row, index) => (
              <tr
                key={index}
                className="
                  border-b last:border-0
                  hover:bg-slate-50
                "
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}