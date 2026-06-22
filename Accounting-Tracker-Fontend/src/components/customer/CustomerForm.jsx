import { useState } from "react";

export default function CustomerForm({
  initialData = {},
  onSubmit,
}) {
  const [form, setForm] = useState({
    code: initialData.code || "",
    name: initialData.name || "",
    taxId: initialData.taxId || "",
    businessType:
      initialData.businessType || "",

    phone: initialData.phone || "",
    email: initialData.email || "",

    address: initialData.address || "",

    primaryStaff:
      initialData.primaryStaff || "",

    secondaryStaff:
      initialData.secondaryStaff || "",

    status:
      initialData.status || "Active",

    remark: initialData.remark || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    onSubmit?.(form);
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

          <div>
            <label className="block mb-2 text-sm font-medium">
              Business Type
            </label>

            <input
              name="businessType"
              value={form.businessType}
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

      {/* Assignment */}

      <div className="bg-white border rounded-2xl p-6">

        <h3 className="text-lg font-semibold mb-6">
          Assigned Staff
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 text-sm font-medium">
              Primary Staff
            </label>

            <input
              name="primaryStaff"
              value={form.primaryStaff}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Secondary Staff
            </label>

            <input
              name="secondaryStaff"
              value={form.secondaryStaff}
              onChange={handleChange}
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            />
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
              <option>
                Active
              </option>

              <option>
                Inactive
              </option>

            </select>
          </div>

        </div>

        <div className="mt-6">

          <label className="block mb-2 text-sm font-medium">
            Remark
          </label>

          <textarea
            rows="4"
            name="remark"
            value={form.remark}
            onChange={handleChange}
            className="
              w-full border rounded-xl
              px-4 py-3
            "
          />

        </div>

      </div>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          className="
            px-5 py-3
            border rounded-xl
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
            px-5 py-3
            bg-blue-600
            text-white
            rounded-xl
          "
        >
          Save Customer
        </button>

      </div>

    </form>
  );
}