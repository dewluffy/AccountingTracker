import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";

export default function AnnualTax() {
  const rows = [
    {
      id: 1,
      customer: "ABC Co.,Ltd.",
      pnd50: true,
      pnd51: true,
      dbd: false,
      status: "In Progress",
    },
    {
      id: 2,
      customer: "XYZ Co.,Ltd.",
      pnd50: true,
      pnd51: true,
      dbd: true,
      status: "Completed",
    },
    {
      id: 3,
      customer: "DEF Trading",
      pnd50: false,
      pnd51: false,
      dbd: false,
      status: "Pending",
    },
  ];

  const mark = (value) => (value ? "✓" : "-");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Annual Tax"
        description="Track annual tax submissions"
      />

      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="p-6 border-b flex flex-col md:flex-row gap-4 md:justify-between">

          <select className="rounded-xl border px-4 py-3">
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>

          <SearchInput placeholder="Search customer..." />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b">

                <th className="px-6 py-4 text-left">
                  Customer
                </th>

                <th className="px-6 py-4 text-center">
                  PND50
                </th>

                <th className="px-6 py-4 text-center">
                  PND51
                </th>

                <th className="px-6 py-4 text-center">
                  DBD
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

              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    {row.customer}
                  </td>

                  <td className="text-center">
                    {mark(row.pnd50)}
                  </td>

                  <td className="text-center">
                    {mark(row.pnd51)}
                  </td>

                  <td className="text-center">
                    {mark(row.dbd)}
                  </td>

                  <td className="text-center">
                    {row.status}
                  </td>

                  <td className="text-center">
                    <Link
                      to={`/taxes/annual/2026/customer/${row.id}`}
                      className="
                        inline-flex p-2 rounded-lg
                        hover:bg-green-100
                        text-green-600
                      "
                    >
                      <FaEye />
                    </Link>
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