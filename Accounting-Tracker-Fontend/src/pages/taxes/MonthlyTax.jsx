import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";

export default function MonthlyTax() {
  const rows = [
    {
      id: 1,
      customer: "ABC Co.,Ltd.",
      vat: true,
      pnd3: true,
      pnd53: false,
      sso: true,
      status: "Done",
    },
    {
      id: 2,
      customer: "XYZ Co.,Ltd.",
      vat: true,
      pnd3: false,
      pnd53: true,
      sso: false,
      status: "Pending",
    },
    {
      id: 3,
      customer: "DEF Trading",
      vat: false,
      pnd3: false,
      pnd53: false,
      sso: false,
      status: "Not Started",
    },
  ];

  const renderMark = (value) =>
    value ? "✓" : "-";

  return (
    <div className="space-y-6">

      <PageHeader
        title="Monthly Tax"
        description="Track monthly tax submissions"
      />

      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="p-6 border-b flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

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
                  VAT
                </th>

                <th className="px-6 py-4 text-center">
                  PND3
                </th>

                <th className="px-6 py-4 text-center">
                  PND53
                </th>

                <th className="px-6 py-4 text-center">
                  SSO
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
                  className="border-b last:border-0 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    {row.customer}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {renderMark(row.vat)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {renderMark(row.pnd3)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {renderMark(row.pnd53)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {renderMark(row.sso)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {row.status}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">

                      <Link
                        to={`/taxes/monthly/2026-06/customer/${row.id}`}
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