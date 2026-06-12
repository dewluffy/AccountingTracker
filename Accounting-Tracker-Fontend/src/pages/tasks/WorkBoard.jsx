import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";

export default function WorkBoard() {
  const customers = [
    {
      id: 1,
      customer: "ABC Co.,Ltd.",
      completed: 6,
      total: 8,
      status: "In Progress",
    },
    {
      id: 2,
      customer: "XYZ Co.,Ltd.",
      completed: 8,
      total: 8,
      status: "Completed",
    },
    {
      id: 3,
      customer: "DEF Trading",
      completed: 2,
      total: 8,
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">

      <PageHeader
        title="Current Work"
        description="Track monthly accounting work"
      />

      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="p-6 border-b flex flex-col md:flex-row gap-4 md:justify-between">

          <select
            className="
              rounded-xl border px-4 py-3
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
            "
          >
            <option>June 2026</option>
            <option>May 2026</option>
            <option>April 2026</option>
          </select>

          <SearchInput
            placeholder="Search customer..."
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b">

                <th className="px-6 py-4 text-left">
                  Customer
                </th>

                <th className="px-6 py-4 text-center">
                  Progress
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {customers.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b last:border-0
                    hover:bg-slate-50
                  "
                >
                  <td className="px-6 py-4">
                    {item.customer}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.completed}/{item.total}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.status}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">

                      <Link
                        to={`/tasks/2026-06/customer/${item.id}`}
                        className="
                          p-2 rounded-lg
                          hover:bg-green-100
                          text-green-600
                        "
                      >
                        <FaEye />
                      </Link>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}