import Breadcrumb from "../../components/common/Breadcrumb";
import InfoRow from "../../components/common/InfoRow";
import StatusBadge from "../../components/common/StatusBadge";

export default function AnnualTaxDetail() {
  const tax = {
    customer: "ABC Co.,Ltd.",
    taxType: "PND50",
    year: 2026,
    dueDate: "30 May 2027",
    submittedDate: "20 May 2027",
    status: "Completed",
    remark:
      "Annual corporate income tax submitted successfully.",
  };

  return (
    <div className="space-y-6">

      <Breadcrumb
        items={[
          {
            label: "Annual Taxes",
            to: "/taxes/annual",
          },
          {
            label: tax.customer,
          },
        ]}
      />

      <div className="bg-white rounded-2xl border p-6">

        <h2 className="text-2xl font-bold mb-6">
          Annual Tax Detail
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
            label="Year"
            value={tax.year}
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