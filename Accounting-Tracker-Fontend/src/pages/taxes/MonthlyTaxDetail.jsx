import Breadcrumb from "../../components/common/Breadcrumb";
import InfoRow from "../../components/common/InfoRow";
import StatusBadge from "../../components/common/StatusBadge";

export default function MonthlyTaxDetail() {
  const tax = {
    customer: "ABC Co.,Ltd.",
    taxType: "VAT PP30",
    month: "May",
    year: 2026,
    dueDate: "15 Jun 2026",
    submittedDate: "10 Jun 2026",
    status: "Completed",
    remark: "Submitted successfully",
  };

  return (
    <div className="space-y-6">

      <Breadcrumb
        items={[
          {
            label: "Monthly Taxes",
            to: "/taxes/monthly",
          },
          {
            label: tax.customer,
          },
        ]}
      />

      <div className="bg-white rounded-2xl border p-6">

        <h2 className="text-2xl font-bold mb-6">
          Monthly Tax Detail
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <InfoRow
            label="Customer"
            value={tax.customer}
          />

          <InfoRow
            label="Tax Type"
            value={tax.taxType}
          />

          <InfoRow
            label="Period"
            value={`${tax.month} ${tax.year}`}
          />

          <InfoRow
            label="Due Date"
            value={tax.dueDate}
          />

          <InfoRow
            label="Submitted Date"
            value={tax.submittedDate}
          />

          <InfoRow
            label="Status"
            value={
              <StatusBadge
                status={tax.status}
              />
            }
          />

        </div>

        <div className="mt-8">

          <p className="text-sm text-slate-500 mb-2">
            Remark
          </p>

          <div className="bg-slate-50 rounded-xl p-4">
            {tax.remark}
          </div>

        </div>

      </div>

    </div>
  );
}