import StatCard from "../../components/dashboard/StatCard";
import SectionCard from "../../components/dashboard/SectionCard";
import SimpleTable from "../../components/dashboard/SimpleTable";
import ChartPlaceholder from "../../components/dashboard/ChartPlaceholder";

export default function Dashboard() {
  const stats = [
    {
      title: "ลูกค้าทั้งหมด",
      value: 120,
      subtitle: "Active Customers",
    },
    {
      title: "ภาษีค้างยื่น",
      value: 15,
      subtitle: "Pending Submission",
    },
    {
      title: "งานค้าง",
      value: 23,
      subtitle: "Open Tasks",
    },
    {
      title: "Overdue",
      value: 4,
      subtitle: "Need Attention",
    },
  ];

  const dueTasks = [
    ["ABC Co.,Ltd.", "ภ.พ.30", "15 มิ.ย. 2026"],
    ["XYZ Co.,Ltd.", "ภ.ง.ด.53", "16 มิ.ย. 2026"],
    ["DEF Co.,Ltd.", "ประกันสังคม", "18 มิ.ย. 2026"],
  ];

  const myTasks = [
    ["ABC Co.,Ltd.", "กระทบธนาคาร"],
    ["XYZ Co.,Ltd.", "รายได้"],
    ["LMN Co.,Ltd.", "ค่าใช้จ่าย"],
  ];

  const topCustomers = [
    ["ABC Co.,Ltd.", 8],
    ["XYZ Co.,Ltd.", 6],
    ["DEF Co.,Ltd.", 5],
    ["AAA Co.,Ltd.", 4],
    ["BBB Co.,Ltd.", 3],
  ];

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
        <SectionCard title="งานที่ใกล้ครบกำหนด">
          <SimpleTable
            headers={[
              "ลูกค้า",
              "รายการ",
              "กำหนดส่ง",
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
        </SectionCard>
      </div>

      {/* Chart */}
      <SectionCard title="กราฟสถานะงานรายเดือน">
        <ChartPlaceholder />
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