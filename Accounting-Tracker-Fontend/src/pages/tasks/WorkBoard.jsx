import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { FaEdit } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";

export default function WorkBoard() {
  const navigate = useNavigate();

  const works = [
    {
      id: 1,
      customer: "ABC Co.,Ltd.",
      assignee: "John Smith",
      expenseMonth: "05/26",
      incomeMonth: "05/26",
      bankMonth: "05/26",
      status: "IN_PROGRESS",
      updatedAt: "Today",
    },
    {
      id: 2,
      customer: "XYZ Co.,Ltd.",
      assignee: "John Smith",
      expenseMonth: "05/26",
      incomeMonth: "-",
      bankMonth: "-",
      status: "PENDING",
      updatedAt: "Today",
    },
    {
      id: 3,
      customer: "DEF Trading",
      assignee: "John Smith",
      expenseMonth: "04/26",
      incomeMonth: "04/26",
      bankMonth: "04/26",
      status: "COMPLETED",
      updatedAt: "2 Days Ago",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Current Work"
        description="Track your assigned accounting work"
      />

      {/* Search */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search customer..."
            className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Responsible</th>
                <th className="px-6 py-4 text-center">Expense</th>
                <th className="px-6 py-4 text-center">Income</th>
                <th className="px-6 py-4 text-center">Bank Recon</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Updated</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {works.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4 font-medium">{item.customer}</td>

                  <td className="px-6 py-4 text-gray-700">{item.assignee}</td>

                  <td className="px-6 py-4 text-center">{item.expenseMonth}</td>

                  <td className="px-6 py-4 text-center">{item.incomeMonth}</td>

                  <td className="px-6 py-4 text-center">{item.bankMonth}</td>

                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-6 py-4 text-center">{item.updatedAt}</td>

                  <td className="px-6 py-4 text-center">
                    <Button
                      onClick={() => navigate(`/tasks/${item.id}`)}
                      className="
  bg-blue-600 text-white
  p-2 rounded-lg
  hover:bg-blue-700
  transition
  hover:scale-105
  cursor-pointer
"
                    >
                      <FaEdit />
                    </Button>
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
