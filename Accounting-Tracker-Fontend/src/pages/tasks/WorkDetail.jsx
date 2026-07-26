import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import PageHeader from "../../components/common/PageHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import WorkStatusCard from "../../components/work/WorkStatusCard";
import Button from "../../components/common/Button";
import { getWorkByCustomer, updateWork } from "../../api/work.api";
import { showError } from "../../utils/toast";

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [expense, setExpense] = useState({});
  const [income, setIncome] = useState({});
  const [bank, setBank] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const result = await getWorkByCustomer(id);

        setCustomer(result.data.customer);
        setExpense(result.data.expense);
        setIncome(result.data.income);
        setBank(result.data.bank);
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Failed to load work detail"
        );

        navigate("/tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  const handleSave = () => {
    Swal.fire({
      title: "ยืนยันการบันทึก?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
    }).then((result) => {
      if (!result.isConfirmed) return;

      setSaving(true);

      updateWork(id, { expense, income, bank })
        .then(() => {
          Swal.fire({
            title: "สำเร็จ",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate("/tasks");
          }, 1000);
        })
        .catch((err) => {
          showError(
            err.response?.data?.message ||
              "Failed to save work detail"
          );
        })
        .finally(() => {
          setSaving(false);
        });
    });
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
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Current Work",
            to: "/tasks",
          },
          {
            label: customer?.name || `Customer #${id}`,
          },
        ]}
      />

      {/* Header */}
      <PageHeader
        title="Work Detail"
        description="Update monthly accounting progress"
      />

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <WorkStatusCard
          title="Expense Recording"
          value={expense}
          onChange={setExpense}
        />

        <WorkStatusCard
          title="Income Recording"
          value={income}
          onChange={setIncome}
        />

        <WorkStatusCard
          title="Bank Reconciliation"
          value={bank}
          onChange={setBank}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/tasks")}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
