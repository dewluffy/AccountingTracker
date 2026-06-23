import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";

export default function AnnualTaxList() {
  const navigate = useNavigate();

  const [year, setYear] = useState("2026");
  const [search, setSearch] = useState("");

  const taxes = [
    {
      id: 1,
      customer: "ABC Co.,Ltd.",
      responsible: "John Smith",
      pnd50: "COMPLETED",
      pnd51: "COMPLETED",
      financial: "IN_PROGRESS",
    },
    {
      id: 2,
      customer: "XYZ Co.,Ltd.",
      responsible: "Jane Doe",
      pnd50: "PENDING",
      pnd51: "COMPLETED",
      financial: "PENDING",
    },
    {
      id: 3,
      customer: "DEF Trading",
      responsible: "Admin",
      pnd50: "COMPLETED",
      pnd51: "COMPLETED",
      financial: "COMPLETED",
    },
  ];

  const filtered = taxes.filter((t) =>
    t.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Annual Tax" },
        ]}
      /> */}

      <PageHeader
        title="Annual Tax Filing"
        description="Track annual tax submission status"
      />

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
                <th className="px-4 py-4 text-center">ภงด.50</th>
                <th className="px-4 py-4 text-center">ภงด.51</th>
                <th className="px-4 py-4 text-center">Financial Statement</th>
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4 font-medium">{item.customer}</td>
                    <td className="px-4 py-4">{item.responsible}</td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={item.pnd50} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={item.pnd51} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={item.financial} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/taxes/annual/${item.id}`)}
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
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