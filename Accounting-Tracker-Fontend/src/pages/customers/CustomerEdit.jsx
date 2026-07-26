import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Breadcrumb from "../../components/common/Breadcrumb";
import CustomerForm from "../../components/customer/CustomerForm";
import { getCustomerById, updateCustomer } from "../../api/customer.api";
import {
  createAssignment,
  deleteAssignment,
  getAssignments,
} from "../../api/customerAssignment.api";
import { showSuccess, showError } from "../../utils/toast";

export default function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const [customerResult, assignmentsResult] = await Promise.all([
          getCustomerById(id),
          getAssignments(id),
        ]);

        if (!ignore) {
          const primary = assignmentsResult.data.assignments.find(
            (item) => item.staffRole === "PRIMARY"
          );
          const secondary = assignmentsResult.data.assignments.find(
            (item) => item.staffRole === "SECONDARY"
          );

          setCustomer({
            ...customerResult.data.customer,
            primaryStaffId: primary?.userId,
            secondaryStaffId: secondary?.userId,
          });
          setAssignments(assignmentsResult.data.assignments);
        }
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Failed to load customer"
        );

        navigate("/customers");
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [id, navigate]);

  const syncAssignment = async (staffRole, selectedUserId) => {
    const existing = assignments.find(
      (item) => item.staffRole === staffRole
    );

    if (selectedUserId) {
      await createAssignment(id, {
        userId: selectedUserId,
        staffRole,
      });
    } else if (existing) {
      await deleteAssignment(id, existing.id);
    }
  };

  const handleUpdate = async (data) => {
    const { primaryStaffId, secondaryStaffId, ...customerData } = data;

    try {
      await updateCustomer(id, customerData);

      await syncAssignment("PRIMARY", primaryStaffId);
      await syncAssignment("SECONDARY", secondaryStaffId);

      showSuccess(
        "Customer updated successfully"
      );

      navigate(`/customers/${id}`);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to update customer"
      );
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
          {
            label: "Customers",
            to: "/customers",
          },
          {
            label: customer?.name,
            to: `/customers/${id}`,
          },
          {
            label: "Edit",
          },
        ]}
      />

      <h1 className="text-3xl font-bold">
        Edit Customer
      </h1>

      <CustomerForm
        initialData={customer}
        onSubmit={handleUpdate}
      />

    </div>
  );
}
