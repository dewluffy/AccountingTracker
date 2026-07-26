import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import StatCard from "../../components/dashboard/StatCard";
import SectionCard from "../../components/dashboard/SectionCard";
import SimpleTable from "../../components/dashboard/SimpleTable";
import MonthlyStatusChart from "../../components/dashboard/MonthlyStatusChart";
import { getDashboard } from "../../api/dashboard.api";
import { showError } from "../../utils/toast";

const MY_TASKS_PREVIEW_COUNT = 5;

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllMyTasks, setShowAllMyTasks] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getDashboard();

        setData(result.data);
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Loading...
      </div>
    );
  }

  const stats = [
    {
      title: "ลูกค้าทั้งหมด",
      value: data?.stats.totalCustomers ?? 0,
      subtitle: "Active Customers",
    },
    {
      title: "ภาษีรายเดือนค้างยื่น",
      value: data?.stats.pendingMonthlyTax ?? 0,
      subtitle: "Pending This Month",
    },
    {
      title: "ภาษีประจำปีค้างยื่น",
      value: data?.stats.pendingAnnualTax ?? 0,
      subtitle: "Pending This Year",
    },
    {
      title: "งานค้าง",
      value: data?.stats.currentTasks ?? 0,
      subtitle: "Open Work Items",
    },
  ];

  const dueTasks = (data?.pendingThisMonth || []).map((item) => [
    item.customerName,
    item.taxType,
    item.period,
  ]);

  const allMyTasks = (data?.myTasks || []).map((item) => [
    item.customerName,
    item.section,
  ]);

  const myTasks = showAllMyTasks
    ? allMyTasks
    : allMyTasks.slice(0, MY_TASKS_PREVIEW_COUNT);

  const topCustomers = (data?.topCustomers || []).map((item) => [
    item.customerName,
    item.pendingCount,
  ]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          ภาพรวมสถานะงานบัญชีและภาษี
        </p>
      </div>

      {/* KPI */}
      <div
        className="
          grid
          gap-4
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((item) => (
          <StatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      {/* Tables */}
      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >
        <SectionCard
          title="งานที่ยังไม่เสร็จเดือนนี้"
          action={
            <Link
              to="/taxes/monthly"
              className="text-sm text-blue-600 hover:underline whitespace-nowrap"
            >
              View All
            </Link>
          }
        >
          <SimpleTable
            headers={[
              "ลูกค้า",
              "รายการ",
              "งวด",
            ]}
            rows={dueTasks}
          />
        </SectionCard>

        <SectionCard title="งานของฉัน">
          <SimpleTable
            headers={[
              "ลูกค้า",
              "งาน",
            ]}
            rows={myTasks}
          />

          {allMyTasks.length > MY_TASKS_PREVIEW_COUNT && (
            <button
              onClick={() => setShowAllMyTasks((prev) => !prev)}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              {showAllMyTasks
                ? "Show Less"
                : `Show All (${allMyTasks.length})`}
            </button>
          )}
        </SectionCard>
      </div>

      {/* Chart */}
      <SectionCard title="กราฟสถานะงานรายเดือน">
        <MonthlyStatusChart data={data?.workStatusBreakdown || []} />
      </SectionCard>

      {/* Top Customers */}
      <SectionCard title="Top 5 ลูกค้าที่มีงานค้าง">
        <SimpleTable
          headers={[
            "ลูกค้า",
            "จำนวนงานค้าง",
          ]}
          rows={topCustomers}
        />
      </SectionCard>

    </div>
  );
}
