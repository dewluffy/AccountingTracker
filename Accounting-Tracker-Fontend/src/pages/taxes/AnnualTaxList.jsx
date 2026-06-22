import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";
import StatusBadge from "../../components/common/StatusBadge";

export default function AnnualTaxList() {
  const taxes = [
    {
      id: 1,
      customer: "ABC Co.,Ltd.",
      taxType: "PND50",
      year: 2026,
      dueDate: "30 May 2027",
      status: "Completed",
    },
    {
      id: 2,
      customer: "XYZ Co.,Ltd.",
      taxType: "PND51",
      year: 2026,
      dueDate: "31 Aug 2026",
      status: "Pending",
    },
    {
      id: 3,
      customer: "DEF Trading",
      taxType: "Financial Statement",
      year: 2026,
      dueDate: "31 May 2027",
      status: "In Progress",
    },
  ];

  return (
    <div className="space-y-6">

      <PageHeader
        title="Annual Taxes"
        description="Manage annual tax submissions"
      />

      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="p-6 border-b">
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

                <th className="px-6 py-4 text-left">
                  Tax Type
                </th>

                <th className="px-6 py-4 text-left">
                  Year
                </th>

                <th className="px-6 py-4 text-left">
                  Due Date
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {taxes.map((tax) => (
                <tr
                  key={tax.id}
                  className="
                    border-b
                    hover:bg-slate-50
                  "
                >

                  <td className="px-6 py-4">
                    {tax.customer}
                  </td>

                  <td className="px-6 py-4">
                    {tax.taxType}
                  </td>

                  <td className="px-6 py-4">
                    {tax.year}
                  </td>

                  <td className="px-6 py-4">
                    {tax.dueDate}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={tax.status}
                    />
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center">

                      <Link
                        to={`/taxes/annual/${tax.id}`}
                        className="
                          p-2 rounded-lg
                          text-green-600
                          hover:bg-green-100
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