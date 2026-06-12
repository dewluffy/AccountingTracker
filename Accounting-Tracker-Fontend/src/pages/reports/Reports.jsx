import PageHeader from "../../components/common/PageHeader";

import ReportCard from "../../components/reports/ReportCard";
import ReportTable from "../../components/reports/ReportTable";

export default function Reports() {
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
          value="120"
          subtitle="Active clients"
        />

        <ReportCard
          title="Monthly Tax Completed"
          value="98"
          subtitle="June 2026"
        />

        <ReportCard
          title="Annual Tax Completed"
          value="75"
          subtitle="Year 2026"
        />

        <ReportCard
          title="Pending Tasks"
          value="18"
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
        data={[
          ["ABC Co.,Ltd.", "June 2026", "Completed"],
          ["XYZ Co.,Ltd.", "June 2026", "Pending"],
          ["DEF Trading", "June 2026", "In Progress"],
        ]}
      />

      {/* Annual Tax */}

      <ReportTable
        title="Annual Tax Status"
        columns={[
          "Customer",
          "Year",
          "Status",
        ]}
        data={[
          ["ABC Co.,Ltd.", "2026", "Completed"],
          ["XYZ Co.,Ltd.", "2026", "In Progress"],
          ["DEF Trading", "2026", "Pending"],
        ]}
      />

      {/* Staff */}

      <ReportTable
        title="Staff Workload"
        columns={[
          "Staff",
          "Assigned",
          "Completed",
        ]}
        data={[
          ["John Smith", "30", "24"],
          ["Jane Doe", "28", "26"],
          ["Admin", "15", "12"],
        ]}
      />

    </div>
  );
}