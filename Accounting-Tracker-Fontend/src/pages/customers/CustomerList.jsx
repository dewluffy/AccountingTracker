import {
  FaPlus,
  FaEdit,
  FaEye,
  FaTrash,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function CustomerList() {
  const [openDelete, setOpenDelete] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      code: "C001",
      name: "ABC Co.,Ltd.",
      taxId: "0105551234567",
      staff: "John Smith",
      status: "Active",
    },
    {
      id: 2,
      code: "C002",
      name: "XYZ Co.,Ltd.",
      taxId: "0105559876543",
      staff: "Jane Doe",
      status: "Active",
    },
    {
      id: 3,
      code: "C003",
      name: "DEF Trading",
      taxId: "0105557777777",
      staff: "Admin",
      status: "Inactive",
    },
  ]);

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setOpenDelete(true);
  };

  const handleConfirmDelete = () => {
    setCustomers((prev) =>
      prev.filter(
        (item) => item.id !== selectedCustomer.id
      )
    );

    setOpenDelete(false);
    setSelectedCustomer(null);
  };



  return (
    <div className="space-y-6">

      <PageHeader
        title="Customer Management"
        description="Manage accounting clients"
        action={
          <Link
            to="/customers/new"
            className="
              bg-blue-600 hover:bg-blue-700
              text-white px-5 py-3 rounded-xl
              flex items-center gap-2
            "
          >
            <FaPlus />
            Add Customer
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="p-6 border-b">
          <SearchInput
            placeholder="Search customer..."
          />
        </div>

        {
          customers.length === 0 ? (
            <EmptyState
              title="No Customers"
              description="No customer found. Click Add Customer to create your first client."
              action={
                <Link
                  to="/customers/new"
                  className="
            bg-blue-600 hover:bg-blue-700
            text-white px-4 py-2 rounded-xl
          "
                >
                  Add Customer
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b">
                    <th className="text-left px-6 py-4">
                      Code
                    </th>

                    <th className="text-left px-6 py-4">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4">
                      Tax ID
                    </th>

                    <th className="text-left px-6 py-4">
                      Responsible
                    </th>

                    <th className="text-left px-6 py-4">
                      Status
                    </th>

                    <th className="text-center px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="
                border-b last:border-0
                hover:bg-slate-50
              "
                    >
                      <td className="px-6 py-4 font-medium">
                        {customer.code}
                      </td>

                      <td className="px-6 py-4">
                        {customer.name}
                      </td>

                      <td className="px-6 py-4">
                        {customer.taxId}
                      </td>

                      <td className="px-6 py-4">
                        {customer.staff}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge
                          status={customer.status}
                        />
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-2">

                          <Link
                            to={`/customers/${customer.id}`}
                            className="
                      p-2 rounded-lg
                      hover:bg-green-100
                      text-green-600
                    "
                          >
                            <FaEye />
                          </Link>

                          <Link
                            to={`/customers/${customer.id}/edit`}
                            className="
                      p-2 rounded-lg
                      hover:bg-blue-100
                      text-blue-600
                    "
                          >
                            <FaEdit />
                          </Link>

                          <button
                            onClick={() =>
                              handleDeleteClick(customer)
                            }
                            className="
                      p-2 rounded-lg
                      hover:bg-red-100
                      text-red-600
                    "
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>
            </div>
          )
        }

      </div>
      <ConfirmModal
        open={openDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${selectedCustomer?.name || ""
          } ?`}
        onClose={() => {
          setOpenDelete(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleConfirmDelete}
      />

    </div>

  );
}