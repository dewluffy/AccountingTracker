import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import ReportCard from "../../components/reports/ReportCard";
import ReportTable from "../../components/reports/ReportTable";
import { getReports } from "../../api/reports.api";
import { showError } from "../../utils/toast";

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const result = await getReports();

        setData(result.data);
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Failed to load reports"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Loading...
      </div>
    );
  }

  const now = new Date();
  const monthLabel = now.toLocaleString("en-US", { month: "long" });
  const yearLabel = now.getFullYear();

  return (
    <div className="space-y-6">

      <PageHeader
        title="Reports"
        description="Accounting reports and summaries"
      />

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <ReportCard
          title="Total Customers"
          value={data?.summary.totalCustomers}
          subtitle="Active clients"
        />

        <ReportCard
          title="Monthly Tax Completed"
          value={data?.summary.monthlyTaxCompleted}
          subtitle={`${monthLabel} ${yearLabel}`}
        />

        <ReportCard
          title="Annual Tax Completed"
          value={data?.summary.annualTaxCompleted}
          subtitle={`Year ${yearLabel}`}
        />

        <ReportCard
          title="Pending Tasks"
          value={data?.summary.pendingTasks}
          subtitle="Need follow-up"
        />

      </div>

      {/* Monthly Tax */}

      <ReportTable
        title="Monthly Tax Status"
        columns={[
          "Customer",
          "Month",
          "Status",
        ]}
        data={(data?.monthlyTaxStatus || []).map((item) => [
          item.customerName,
          item.period,
          item.status,
        ])}
      />

      {/* Annual Tax */}

      <ReportTable
        title="Annual Tax Status"
        columns={[
          "Customer",
          "Year",
          "Status",
        ]}
        data={(data?.annualTaxStatus || []).map((item) => [
          item.customerName,
          item.period,
          item.status,
        ])}
      />

      {/* Staff */}

      <ReportTable
        title="Staff Workload"
        columns={[
          "Staff",
          "Assigned",
          "Completed",
        ]}
        data={(data?.staffWorkload || []).map((item) => [
          item.staffName,
          item.assigned,
          item.completed,
        ])}
      />

    </div>
  );
}
