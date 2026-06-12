import {
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";
import StatusBadge from "../../components/common/StatusBadge";

export default function UserManagement() {
  const users = [
    {
      id: 1,
      name: "Admin",
      email: "admin@test.com",
      role: "ADMIN",
      status: "Active",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@test.com",
      role: "STAFF",
      status: "Active",
    },
    {
      id: 3,
      name: "Jane Doe",
      email: "jane@test.com",
      role: "STAFF",
      status: "Inactive",
    },
  ];

  return (
    <div className="space-y-6">

      <PageHeader
        title="User Management"
        description="Manage system users"
        action={
          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5 py-3
              rounded-xl
              flex items-center gap-2
            "
          >
            <FaPlus />

            Add User
          </button>
        }
      />

      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="p-6 border-b">
          <SearchInput
            placeholder="Search users..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left px-6 py-4">
                  Name
                </th>

                <th className="text-left px-6 py-4">
                  Email
                </th>

                <th className="text-left px-6 py-4">
                  Role
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-0"
                >
                  <td className="px-6 py-4">
                    {user.name}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    {user.role}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={user.status}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">

                      <button
                        className="
                          p-2 rounded-lg
                          hover:bg-blue-100
                          text-blue-600
                        "
                      >
                        <FaEdit />
                      </button>

                      <button
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

      </div>

    </div>
  );
}