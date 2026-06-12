import { useParams } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import AnnualChecklist from "../../components/taxes/AnnualChecklist";

export default function AnnualTaxDetail() {
  const { year } = useParams();

  return (
    <div className="space-y-6">

      <PageHeader
        title="ABC Co.,Ltd."
        description={`Annual Tax • ${year}`}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <AnnualChecklist
          title="PND50"
          items={[
            "จัดทำงบการเงิน",
            "ตรวจสอบรายการ",
            "ยื่น PND50",
          ]}
        />

        <AnnualChecklist
          title="PND51"
          items={[
            "จัดทำประมาณการ",
            "ตรวจสอบข้อมูล",
            "ยื่น PND51",
          ]}
        />

        <AnnualChecklist
          title="DBD"
          items={[
            "ประชุมผู้ถือหุ้น",
            "ยื่น DBD",
            "จัดเก็บเอกสาร",
          ]}
        />

      </div>

    </div>
  );
}