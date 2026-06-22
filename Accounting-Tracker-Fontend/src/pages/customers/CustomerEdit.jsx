import toast from "react-hot-toast";

import Breadcrumb from "../../components/common/Breadcrumb";
import CustomerForm from "../../components/customer/CustomerForm";

export default function CustomerEdit() {

  const customer = {
    code: "C001",
    name: "ABC Co.,Ltd.",
    taxId: "0105551234567",

    businessType:
      "Company Limited",

    phone: "0812345678",

    email: "contact@abc.com",

    address:
      "Bangkok Thailand",

    primaryStaff:
      "John Smith",

    secondaryStaff:
      "Jane Doe",

    status: "Active",

    remark:
      "Important customer",
  };

  const handleUpdate = (data) => {
    console.log(data);

    toast.success(
      "Customer updated successfully"
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
            label: customer.name,
            to: "/customers/1",
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