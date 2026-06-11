import { useParams } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import TaxChecklist from "../../components/taxes/TaxChecklist";

export default function MonthlyTaxDetail() {
  const { month } = useParams();

  return (
    <div className="space-y-6">

      <PageHeader
        title="ABC Co.,Ltd."
        description={`Monthly Tax • ${month}`}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <TaxChecklist
          title="VAT (ภ.พ.30)"
          items={[
            "รับเอกสาร",
            "ตรวจสอบ",
            "จัดทำแบบ",
            "ยื่นภาษี",
            "ส่งหลักฐาน",
          ]}
        />

        <TaxChecklist
          title="PND3"
          items={[
            "รับเอกสาร",
            "ตรวจสอบ",
            "ยื่นภาษี",
          ]}
        />

        <TaxChecklist
          title="PND53"
          items={[
            "รับเอกสาร",
            "ตรวจสอบ",
            "ยื่นภาษี",
          ]}
        />

        <TaxChecklist
          title="SSO"
          items={[
            "ตรวจสอบเงินเดือน",
            "จัดทำรายงาน",
            "ยื่นประกันสังคม",
          ]}
        />

      </div>

    </div>
  );
}