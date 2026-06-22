import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import PageHeader from "../../components/common/PageHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";

export default function AnnualTaxDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [saving, setSaving] = useState(false);

  const [taxes, setTaxes] = useState([
    {
      taxType: "ภงด.50",
      status: "COMPLETED",
      submittedDate: "2026-05-30",
      remark: "",
    },
    {
      taxType: "ภงด.51",
      status: "IN_PROGRESS",
      submittedDate: "",
      remark: "",
    },
    {
      taxType: "งบการเงิน",
      status: "PENDING",
      submittedDate: "",
      remark: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...taxes];

    updated[index][field] = value;

    // ถ้าเปลี่ยน status เป็น NOT_REQUIRED ให้ clear submittedDate อัตโนมัติ
    if (field === "status" && value === "NOT_REQUIRED") {
      updated[index].submittedDate = "";
    }

    setTaxes(updated);
  };

  const isDateDisabled = (status) => {
    return status === "NOT_REQUIRED" || status === "NOT_STARTED";
  };

  const handleSave = async () => {
    const result = await Swal.fire({
      title: "Save Changes?",
      text: "Do you want to save annual tax status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      setSaving(true);

      // TODO: เรียก API จริงตรงนี้
      await new Promise((res) => setTimeout(res, 500));

      setSaving(false);

      await Swal.fire({
        title: "Saved!",
        text: "Annual tax updated successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      navigate("/taxes/annual");
    }
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
            label: `Customer ${id}`,
          },
        ]}
      />

      <PageHeader title="Annual Tax Detail" description={`Record #${id}`} />

      {/* Customer Information */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Customer Information</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium">ABC Co.,Ltd.</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Year</p>
            <p className="font-medium">2026</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Responsible</p>
            <p className="font-medium">John Smith</p>
          </div>
        </div>
      </div>

      {/* Tax Forms */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="px-4 py-4 text-left">Tax Form</th>
                <th className="px-4 py-4 text-left">Status</th>
                <th className="px-4 py-4 text-left">Submitted Date</th>
                <th className="px-4 py-4 text-left">Remark</th>
              </tr>
            </thead>

            <tbody>
              {taxes.map((item, index) => (
                <tr key={item.taxType} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium">{item.taxType}</td>

                  <td className="px-4 py-4">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleChange(index, "status", e.target.value)
                      }
                      className="border rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="NOT_STARTED">NOT_STARTED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="NOT_REQUIRED">NOT_REQUIRED</option>
                    </select>
                  </td>

                  <td className="px-4 py-4">
                    <input
                      type="date"
                      value={item.submittedDate}
                      onChange={(e) =>
                        handleChange(index, "submittedDate", e.target.value)
                      }
                      disabled={isDateDisabled(item.status)}
                      className="border rounded-lg px-3 py-2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <input
                      type="text"
                      value={item.remark}
                      onChange={(e) =>
                        handleChange(index, "remark", e.target.value)
                      }
                      placeholder="Remark..."
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("/taxes/annual")}
          disabled={saving}
        >
          Back
        </Button>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
