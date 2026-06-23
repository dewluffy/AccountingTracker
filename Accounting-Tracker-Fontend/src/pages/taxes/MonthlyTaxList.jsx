import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function MonthlyTaxList() {
  const navigate = useNavigate();

  const [month, setMonth] = useState("05");
  const [year, setYear] = useState("2026");
  const [search, setSearch] = useState("");

  const taxes = [
    {
      id: 1,
      customer: "ABC Co.,Ltd.",
      responsible: "John Smith",
      pnd1: "COMPLETED",
      pnd3: "COMPLETED",
      pnd53: "COMPLETED",
      pnd54: "NOT_REQUIRED",
      pp30: "COMPLETED",
      pp36: "NOT_REQUIRED",
      sso: "COMPLETED",
    },
    {
      id: 2,
      customer: "XYZ Co.,Ltd.",
      responsible: "Jane Doe",
      pnd1: "IN_PROGRESS",
      pnd3: "COMPLETED",
      pnd53: "PENDING",
      pnd54: "NOT_REQUIRED",
      pp30: "PENDING",
      pp36: "NOT_REQUIRED",
      sso: "COMPLETED",
    },
    {
      id: 3,
      customer: "DEF Trading",
      responsible: "Admin",
      pnd1: "NOT_REQUIRED",
      pnd3: "COMPLETED",
      pnd53: "COMPLETED",
      pnd54: "NOT_REQUIRED",
      pp30: "COMPLETED",
      pp36: "NOT_REQUIRED",
      sso: "NOT_REQUIRED",
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
          { label: "Monthly Tax" },
        ]}
      /> */}

      <PageHeader
        title="Monthly Tax Filing"
        description="Track monthly tax submission status"
      />

      {/* Filter */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>

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

          <div className="md:col-span-2">
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
          <table className="w-full min-w-[1500px]">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="px-4 py-4 text-left">#</th>
                <th className="px-4 py-4 text-left">Customer</th>
                <th className="px-4 py-4 text-left">Responsible</th>
                <th className="px-4 py-4 text-center">ภงด.1</th>
                <th className="px-4 py-4 text-center">ภงด.3</th>
                <th className="px-4 py-4 text-center">ภงด.53</th>
                <th className="px-4 py-4 text-center">ภงด.54</th>
                <th className="px-4 py-4 text-center">ภพ.30</th>
                <th className="px-4 py-4 text-center">ภพ.36</th>
                <th className="px-4 py-4 text-center">SSO</th>
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
                      <StatusBadge status={item.pnd1} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={item.pnd3} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={item.pnd53} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={item.pnd54} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={item.pp30} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={item.pp36} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={item.sso} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/taxes/monthly/${item.id}`)}
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={11}
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