import { useNavigate } from "react-router-dom";

import Breadcrumb from "../../components/common/Breadcrumb";
import CustomerForm from "../../components/customer/CustomerForm";
import { createCustomer } from "../../api/customer.api";
import { createAssignment } from "../../api/customerAssignment.api";
import { showSuccess, showError } from "../../utils/toast";

export default function CustomerCreate() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const { primaryStaffId, secondaryStaffId, ...customerData } = data;

    try {
      const result = await createCustomer(customerData);

      const customerId = result.data.customer.id;

      if (primaryStaffId) {
        await createAssignment(customerId, {
          userId: primaryStaffId,
          staffRole: "PRIMARY",
        });
      }

      if (secondaryStaffId) {
        await createAssignment(customerId, {
          userId: secondaryStaffId,
          staffRole: "SECONDARY",
        });
      }

      showSuccess(
        "Customer created successfully"
      );

      navigate("/customers");
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to create customer"
      );
    }
  };

  return (
    <div className="space-y-6">

      <Breadcrumb
        items={[
          {
            label: "Customers",
            to: "/customers",
          },
          {
            label: "Create",
          },
        ]}
      />

      <h1 className="text-3xl font-bold">
        Create Customer
      </h1>

      <CustomerForm
        onSubmit={handleCreate}
      />

    </div>
  );
}
