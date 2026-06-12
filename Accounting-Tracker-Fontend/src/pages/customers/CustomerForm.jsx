import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";

export default function CustomerForm() {
  const { id } = useParams();

  const isEdit = Boolean(id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={
          isEdit
            ? "Edit Customer"
            : "Add Customer"
        }
        description={
          isEdit
            ? "Update customer information"
            : "Create a new customer"
        }
      />

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-6">
          Customer Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Customer Code */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Customer Code
            </label>

            <input
              type="text"
              placeholder="C001"
              className="
                w-full rounded-xl border
                px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Customer Name
            </label>

            <input
              type="text"
              placeholder="ABC Co.,Ltd."
              className="
                w-full rounded-xl border
                px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Tax ID */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tax ID
            </label>

            <input
              type="text"
              placeholder="0105551234567"
              className="
                w-full rounded-xl border
                px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Business Type
            </label>

            <select
              className="
                w-full rounded-xl border
                px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option>Company Limited</option>
              <option>Partnership</option>
              <option>Individual</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone
            </label>

            <input
              type="text"
              placeholder="0812345678"
              className="
                w-full rounded-xl border
                px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="contact@abc.com"
              className="
                w-full rounded-xl border
                px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Primary Staff */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Primary Staff
            </label>

            <select
              className="
                w-full rounded-xl border
                px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option>John Smith</option>
              <option>Jane Doe</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Secondary Staff */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Secondary Staff
            </label>

            <select
              className="
                w-full rounded-xl border
                px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option>-</option>
              <option>John Smith</option>
              <option>Jane Doe</option>
            </select>
          </div>

        </div>

        {/* Remark */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Remark
          </label>

          <textarea
            rows={4}
            placeholder="Additional notes..."
            className="
              w-full rounded-xl border
              px-4 py-3
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />
        </div>

        {/* Action */}
        <div className="flex justify-end gap-3 mt-8">

          <Link
            to="/customers"
            className="
              px-5 py-3 rounded-xl border
              hover:bg-gray-50
            "
          >
            Cancel
          </Link>

          <button
            className="
              px-5 py-3 rounded-xl
              bg-blue-600 text-white
              hover:bg-blue-700
            "
          >
            {isEdit ? "Update" : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}