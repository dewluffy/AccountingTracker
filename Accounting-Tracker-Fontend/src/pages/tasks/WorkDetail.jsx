import { useParams } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import WorkSection from "../../components/tasks/WorkSection";

export default function WorkDetail() {
  const { month } = useParams();

  return (
    <div className="space-y-6">

      <PageHeader
        title="ABC Co.,Ltd."
        description={`Current Work • ${month}`}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <WorkSection
          title="ค่าใช้จ่าย"
          items={[
            "บันทึกค่าใช้จ่าย",
            "ตรวจสอบเอกสาร",
          ]}
        />

        <WorkSection
          title="รายได้"
          items={[
            "บันทึกรายได้",
            "ตรวจสอบยอดขาย",
          ]}
        />

        <WorkSection
          title="รับชำระ"
          items={[
            "บันทึกรับชำระ",
          ]}
        />

        <WorkSection
          title="จ่ายชำระ"
          items={[
            "บันทึกจ่ายชำระ",
          ]}
        />

        <WorkSection
          title="กระทบธนาคาร"
          items={[
            "กระทบยอดธนาคาร",
          ]}
        />

        <WorkSection
          title="เงินเดือน"
          items={[
            "คำนวณเงินเดือน",
            "ตรวจสอบประกันสังคม",
          ]}
        />

        <WorkSection
          title="สินทรัพย์"
          items={[
            "ตรวจสอบสินทรัพย์",
          ]}
        />

        <WorkSection
          title="ปิดบัญชี"
          items={[
            "ตรวจสอบงบทดลอง",
            "ปิดบัญชีประจำเดือน",
          ]}
        />

      </div>

    </div>
  );
}