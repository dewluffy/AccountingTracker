import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import { getUsers } from "../../api/user.api";

export default function CustomerForm({
  initialData = {},
  onSubmit,
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: initialData.code || "",
    name: initialData.name || "",
    taxId: initialData.taxId || "",

    phone: initialData.phone || "",
    email: initialData.email || "",
    address: initialData.address || "",

    status: initialData.status || "ACTIVE",

    primaryStaffId: initialData.primaryStaffId
      ? String(initialData.primaryStaffId)
      : "",
    secondaryStaffId: initialData.secondaryStaffId
      ? String(initialData.secondaryStaffId)
      : "",
  });

  const [staffOptions, setStaffOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const result = await getUsers();

        setStaffOptions(
          result.data.users.filter((user) => user.isActive)
        );
      } catch {
        setStaffOptions([]);
      }
    };

    fetchStaff();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await onSubmit?.({
        ...form,
        primaryStaffId: form.primaryStaffId
          ? Number(form.primaryStaffId)
          : null,
        secondaryStaffId: form.secondaryStaffId
          ? Number(form.secondaryStaffId)
          : null,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* General Information */}

      <div className="bg-white border rounded-2xl p-6">

        <h3 className="text-lg font-semibold mb-6">
          General Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 text-sm font-medium">
              Customer Code
            </label>

            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Customer Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Tax ID
            </label>

            <input
              name="taxId"
              value={form.taxId}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            />
          </div>

        </div>

      </div>

      {/* Contact Information */}

      <div className="bg-white border rounded-2xl p-6">

        <h3 className="text-lg font-semibold mb-6">
          Contact Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 text-sm font-medium">
              Phone
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            />
          </div>

        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium">
            Address
          </label>

          <textarea
            rows="4"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="
              w-full border rounded-xl
              px-4 py-3
            "
          />
        </div>

      </div>

      {/* Assigned Staff */}

      <div className="bg-white border rounded-2xl p-6">

        <h3 className="text-lg font-semibold mb-6">
          Assigned Staff
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 text-sm font-medium">
              Primary Staff
            </label>

            <select
              name="primaryStaffId"
              value={form.primaryStaffId}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            >
              <option value="">-- Not assigned --</option>

              {staffOptions
                .filter(
                  (user) =>
                    String(user.id) !== form.secondaryStaffId
                )
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Secondary Staff
            </label>

            <select
              name="secondaryStaffId"
              value={form.secondaryStaffId}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            >
              <option value="">-- Not assigned --</option>

              {staffOptions
                .filter(
                  (user) =>
                    String(user.id) !== form.primaryStaffId
                )
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
            </select>
          </div>

        </div>

      </div>

      {/* Other */}

      <div className="bg-white border rounded-2xl p-6">

        <h3 className="text-lg font-semibold mb-6">
          Other Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            >
              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>

            </select>
          </div>

        </div>

      </div>

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Customer"}
        </Button>

      </div>

    </form>
  );
}
