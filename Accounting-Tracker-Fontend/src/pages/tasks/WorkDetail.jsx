import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import WorkStatusCard from "../../components/work/WorkStatusCard";
import Button from "../../components/common/Button";
import Swal from "sweetalert2";

export default function WorkDetail() {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    month: 5,
    year: 2026,
    status: "COMPLETED",
  });

  const [income, setIncome] = useState({
    month: 5,
    year: 2026,
    status: "IN_PROGRESS",
  });

  const [bank, setBank] = useState({
    month: 4,
    year: 2026,
    status: "PENDING",
  });

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
            label: `Customer #${customerId}`,
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
      <div className="flex justify-end">
        <div className="flex justify-end gap-3">
          {/* Cancel / Back */}
          <Button
            type="button"
            onClick={() => navigate("/tasks")}
            className="
      px-5 py-3
      bg-red-600 text-white
      rounded-xl
      hover:bg-red-700
      transition
      cursor-pointer
    "
          >
            Cancel
          </Button>

          {/* Save */}
          <Button
            onClick={() => {
              Swal.fire({
                title: "ยืนยันการบันทึก?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                confirmButtonColor: "#2563eb",
                cancelButtonColor: "#dc2626",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "สำเร็จ",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                  });

                  setTimeout(() => {
                    navigate("/tasks");
                  }, 1000);
                }
              });
            }}
            className="
      px-5 py-3
      bg-blue-600 text-white
      rounded-xl
      hover:bg-blue-700
      transition
      cursor-pointer
    "
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
