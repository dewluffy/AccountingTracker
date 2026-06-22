import toast from "react-hot-toast";

import Breadcrumb from "../../components/common/Breadcrumb";
import CustomerForm from "../../components/customer/CustomerForm";

export default function CustomerCreate() {

  const handleCreate = (data) => {
    console.log(data);

    toast.success(
      "Customer created successfully"
    );
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