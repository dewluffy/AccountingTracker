export default function SimpleTable({
  headers = [],
  rows = [],
}) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-6">
        No data
      </p>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          {headers.map((header) => (
            <th
              key={header}
              className="text-left px-2 py-2 text-sm text-gray-500"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr
            key={index}
            className="border-b last:border-0"
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-2 py-3"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
