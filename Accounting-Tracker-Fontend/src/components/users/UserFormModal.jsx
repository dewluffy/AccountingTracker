import { useState } from "react";

import Modal from "../common/Modal";
import Button from "../common/Button";

export default function UserFormModal({
  open,
  mode = "create",
  initialData = null,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(() => ({
    email: initialData?.email || "",
    password: "",
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    role: initialData?.role || "STAFF",
    isActive: initialData?.isActive ?? true,
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const payload = { ...form };

      if (mode === "edit" && !payload.password) {
        delete payload.password;
      }

      await onSubmit?.(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      title={mode === "edit" ? "Edit User" : "Add User"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            {mode === "edit"
              ? "Password (leave blank to keep current)"
              : "Password"}
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required={mode !== "edit"}
            minLength={6}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              First Name
            </label>

            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Last Name
            </label>

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>

          {mode === "edit" && (
            <div>
              <label className="block mb-2 text-sm font-medium">
                Status
              </label>

              <select
                name="isActive"
                value={String(form.isActive)}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
