import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import StatusDot from "../../components/common/StatusDot";
import StatusLegend from "../../components/common/StatusLegend";
import Button from "../../components/common/Button";
import { getAnnualTaxGrid } from "../../api/annualTax.api";
import { ANNUAL_TAX_TYPES } from "../../utils/annualTaxTypes";
import { TAX_STATUSES } from "../../utils/taxStatuses";
import { showError } from "../../utils/toast";

export default function AnnualTaxList() {
  const navigate = useNavigate();

  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [search, setSearch] = useState("");

  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrid = async () => {
      try {
        setLoading(true);

        const result = await getAnnualTaxGrid(year);

        setGrid(result.data.grid);
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Failed to load annual tax data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGrid();
  }, [year]);

  const filtered = grid.filter((item) =>
    item.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Annual Tax Filing"
        description="Track annual tax submission status"
      />

      {/* Legend */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <StatusLegend statuses={TAX_STATUSES} />
      </div>

      {/* Filter */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              {[2024, 2025, 2026, 2027].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Search Customer
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer..."
                className="w-full border rounded-xl pl-11 pr-4 py-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="px-4 py-4 text-left">#</th>
                <th className="px-4 py-4 text-left">Customer</th>
                <th className="px-4 py-4 text-left">Responsible</th>
                {ANNUAL_TAX_TYPES.map(({ taxType, label }) => (
                  <th key={taxType} className="px-4 py-4 text-center">
                    {label}
                  </th>
                ))}
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4 + ANNUAL_TAX_TYPES.length}
                    className="px-4 py-10 text-center text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <tr
                    key={item.customerId}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4 font-medium">
                      {item.customerName}
                    </td>
                    <td className="px-4 py-4">
                      {item.responsible
                        ? `${item.responsible.firstName} ${item.responsible.lastName}`
                        : "-"}
                    </td>

                    {ANNUAL_TAX_TYPES.map(({ taxType }) => {
                      const tax = item.taxes.find(
                        (t) => t.taxType === taxType
                      );

                      return (
                        <td
                          key={taxType}
                          className="px-4 py-4 text-center"
                        >
                          <StatusDot status={tax?.status} />
                        </td>
                      );
                    })}

                    <td className="px-4 py-4 text-center">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/taxes/annual/${item.customerId}?year=${year}`
                          )
                        }
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4 + ANNUAL_TAX_TYPES.length}
                    className="px-4 py-10 text-center text-gray-400"
                  >
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
