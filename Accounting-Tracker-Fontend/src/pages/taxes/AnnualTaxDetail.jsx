import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

import PageHeader from "../../components/common/PageHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import {
  getAnnualTaxByCustomer,
  updateAnnualTax,
} from "../../api/annualTax.api";
import { ANNUAL_TAX_TYPES } from "../../utils/annualTaxTypes";
import { showError } from "../../utils/toast";

const toDateInputValue = (value) => {
  if (!value) return "";

  return value.slice(0, 10);
};

export default function AnnualTaxDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const year = searchParams.get("year");

  const [customer, setCustomer] = useState(null);
  const [responsible, setResponsible] = useState(null);
  const [taxes, setTaxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const result = await getAnnualTaxByCustomer(id, year);

        setCustomer(result.data.customer);
        setResponsible(result.data.responsible);

        setTaxes(
          ANNUAL_TAX_TYPES.map(({ taxType, label }) => {
            const record = result.data.items.find(
              (item) => item?.taxType === taxType
            );

            return {
              taxType,
              label,
              status: record?.status || "NOT_STARTED",
              submittedDate: toDateInputValue(record?.submittedAt),
              remark: record?.remark || "",
            };
          })
        );
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Failed to load annual tax detail"
        );

        navigate("/taxes/annual");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, year, navigate]);

  const handleChange = (index, field, value) => {
    const updated = [...taxes];

    updated[index][field] = value;

    if (field === "status" && isDateDisabled(value)) {
      updated[index].submittedDate = "";
    }

    setTaxes(updated);
  };

  const isDateDisabled = (status) =>
    status === "NOT_STARTED" ||
    status === "WAITING_DOCS" ||
    status === "WAITING_PAYMENT";

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

    if (!result.isConfirmed) return;

    setSaving(true);

    try {
      await updateAnnualTax(
        id,
        year,
        taxes.map((item) => ({
          taxType: item.taxType,
          status: item.status,
          submittedAt: item.submittedDate || null,
          remark: item.remark || null,
        }))
      );

      await Swal.fire({
        title: "Saved!",
        text: "Annual tax updated successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      navigate("/taxes/annual");
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to save annual tax"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Annual Taxes", to: "/taxes/annual" },
          { label: customer?.name || `Customer ${id}` },
        ]}
      />

      <PageHeader
        title="Annual Tax Detail"
        description={`${customer?.name || ""}`}
      />

      {/* Customer Information */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Customer Information</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium">{customer?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Year</p>
            <p className="font-medium">{year}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Responsible</p>
            <p className="font-medium">
              {responsible
                ? `${responsible.firstName} ${responsible.lastName}`
                : "-"}
            </p>
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
                  <td className="px-4 py-4 font-medium">{item.label}</td>

                  <td className="px-4 py-4">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleChange(index, "status", e.target.value)
                      }
                      className="border rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="NOT_STARTED">Not Started</option>
                      <option value="WAITING_DOCS">Waiting Docs</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="WAITING_PAYMENT">Waiting Payment</option>
                      <option value="COMPLETED">Completed</option>
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
