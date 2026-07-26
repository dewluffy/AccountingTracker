import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import StatusDot from "../../components/common/StatusDot";
import StatusLegend from "../../components/common/StatusLegend";
import Button from "../../components/common/Button";
import { getWorkBoard } from "../../api/work.api";
import { WORK_STATUSES } from "../../utils/workStatuses";
import { formatRelativeDate } from "../../utils/formatRelativeDate";
import { showError } from "../../utils/toast";

const formatMonthYear = (section) => {
  if (!section?.month || !section?.year) return "-";

  return `${String(section.month).padStart(2, "0")}/${String(
    section.year
  ).slice(-2)}`;
};

export default function WorkBoard() {
  const navigate = useNavigate();

  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setLoading(true);

        const result = await getWorkBoard();

        setWorks(result.data.board);
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Failed to load work board"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, []);

  const filtered = works.filter((item) =>
    item.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Current Work"
        description="Track your assigned accounting work"
      />

      {/* Legend */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <StatusLegend statuses={WORK_STATUSES} />
      </div>

      {/* Search */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <tr key={item.customerId} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4 font-medium">{item.customerName}</td>

                    <td className="px-6 py-4 text-gray-700">
                      {item.responsible
                        ? `${item.responsible.firstName} ${item.responsible.lastName}`
                        : "-"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {formatMonthYear(item.expense)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {formatMonthYear(item.income)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {formatMonthYear(item.bank)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <StatusDot status={item.status} />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {formatRelativeDate(item.updatedAt)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <Button
                        onClick={() => navigate(`/tasks/${item.customerId}`)}
                        className="
  bg-blue-600 text-white
  p-2 rounded-lg
  hover:bg-blue-700
  transition
  hover:scale-105
  cursor-pointer
"
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-gray-400">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
