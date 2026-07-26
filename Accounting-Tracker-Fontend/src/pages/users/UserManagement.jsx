import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";
import UserFormModal from "../../components/users/UserFormModal";
import useAuthStore from "../../store/auth.store";
import {
  getUsers,
  createUser,
  updateUser,
  deactivateUser,
} from "../../api/user.api";
import { showSuccess, showError } from "../../utils/toast";

export default function UserManagement() {
  const currentUser = useAuthStore((state) => state.user);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [formKey, setFormKey] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const [deactivateOpen, setDeactivateOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const result = await getUsers();

        setUsers(result.data.users);
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClick = () => {
    setFormMode("create");
    setSelectedUser(null);
    setFormKey((key) => key + 1);
    setFormOpen(true);
  };

  const handleEditClick = (user) => {
    setFormMode("edit");
    setSelectedUser(user);
    setFormKey((key) => key + 1);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (formMode === "edit") {
        const result = await updateUser(selectedUser.id, data);

        setUsers((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id ? result.data.user : user
          )
        );

        showSuccess("User updated successfully");
      } else {
        const result = await createUser(data);

        setUsers((prev) => [result.data.user, ...prev]);

        showSuccess("User created successfully");
      }

      setFormOpen(false);
      setSelectedUser(null);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to save user"
      );
    }
  };

  const handleDeactivateClick = (user) => {
    setSelectedUser(user);
    setDeactivateOpen(true);
  };

  const handleConfirmDeactivate = async () => {
    try {
      const result = await deactivateUser(selectedUser.id);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? result.data.user : user
        )
      );

      showSuccess(
        `${selectedUser.firstName} ${selectedUser.lastName} deactivated successfully`
      );
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to deactivate user"
      );
    } finally {
      setDeactivateOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6">

      <PageHeader
        title="User Management"
        description="Manage system users"
        action={
          <button
            onClick={handleAddClick}
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="py-10 text-center text-slate-500">
            Loading...
          </div>
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            title="No Users Found"
            description={
              search
                ? "No users match your search criteria."
                : "No user found. Click Add User to create your first account."
            }
          />
        ) : (
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
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-0"
                  >
                    <td className="px-6 py-4">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="px-6 py-4">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      {user.role}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge
                        status={user.isActive ? "ACTIVE" : "INACTIVE"}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => handleEditClick(user)}
                          className="
                            p-2 rounded-lg
                            hover:bg-blue-100
                            text-blue-600
                          "
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDeactivateClick(user)}
                          disabled={user.id === currentUser?.id}
                          className="
                            p-2 rounded-lg
                            hover:bg-red-100
                            text-red-600
                            disabled:opacity-30
                            disabled:cursor-not-allowed
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
        )}

      </div>

      <UserFormModal
        key={formKey}
        open={formOpen}
        mode={formMode}
        initialData={selectedUser}
        onClose={() => {
          setFormOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        open={deactivateOpen}
        title="Deactivate User"
        message={`Are you sure you want to deactivate ${
          selectedUser
            ? `${selectedUser.firstName} ${selectedUser.lastName}`
            : ""
        } ?`}
        onClose={() => {
          setDeactivateOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirmDeactivate}
      />

    </div>
  );
}
