import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import Tabs from "../../components/common/Tabs";
import InfoRow from "../../components/common/InfoRow";
import StatusBadge from "../../components/common/StatusBadge";

export default function CustomerDetail() {
  const [activeTab, setActiveTab] = useState("Overview");

  const customer = {
    id: 1,
    code: "C001",
    name: "ABC Co.,Ltd.",
    taxId: "0105551234567",
    businessType: "Company Limited",
    phone: "0812345678",
    email: "contact@abc.com",
    contactPerson: "Mr. John",
    primaryStaff: "John Smith",
    secondaryStaff: "Jane Doe",
    status: "Active",
    remark: "Important customer with monthly accounting service.",
  };

  const tabs = ["Overview", "Tax", "Current Work", "Documents", "Activity Log"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{customer.name}</h1>

        <StatusBadge status={customer.status} />
      </div>

      <PageHeader
        title={customer.name}
        description={`Tax ID : ${customer.taxId}`}
        action={
          <Link
            to={`/customers/${customer.id}/edit`}
            className="
              bg-blue-600 text-white
              px-5 py-3 rounded-xl
              flex items-center gap-2
              hover:bg-blue-700
            "
          >
            <FaEdit />
            Edit Customer
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Monthly Tax Pending</p>

          <h3 className="text-3xl font-bold mt-2">3</h3>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Annual Tax Pending</p>

          <h3 className="text-3xl font-bold mt-2">1</h3>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Open Tasks</p>

          <h3 className="text-3xl font-bold mt-2">5</h3>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Documents</p>

          <h3 className="text-3xl font-bold mt-2">12</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="p-6">
          {activeTab === "Overview" && (
            <div className="space-y-10">
              {/* General Information */}

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  General Information
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <InfoRow label="Customer Code" value={customer.code} />

                  <InfoRow
                    label="Business Type"
                    value={customer.businessType}
                  />

                  <InfoRow label="Tax ID" value={customer.taxId} />

                  <InfoRow label="Phone" value={customer.phone} />

                  <InfoRow label="Email" value={customer.email} />

                  <InfoRow
                    label="Status"
                    value={<StatusBadge status={customer.status} />}
                  />
                </div>
              </div>

              {/* Assigned Staff */}

              <div>
                <h3 className="font-semibold text-lg mb-4">Assigned Staff</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <InfoRow
                    label="Primary Staff"
                    value={customer.primaryStaff}
                  />

                  <InfoRow
                    label="Secondary Staff"
                    value={customer.secondaryStaff}
                  />
                </div>
              </div>

              {/* Contact Person */}

              <div>
                <h3 className="font-semibold text-lg mb-4">Contact Person</h3>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="font-medium">{customer.contactPerson}</p>

                  <p className="text-sm text-slate-500">Managing Director</p>

                  <p className="mt-2">0812345678</p>
                </div>
              </div>

              {/* Remark */}

              <div>
                <h3 className="font-semibold text-lg mb-4">Remark</h3>

                <div className="bg-yellow-50 border rounded-xl p-4">
                  {customer.remark}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Tax" && (
            <div className="text-gray-500">
              <div className="space-y-6">
                <div className="bg-white border rounded-xl">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Tax Type</th>

                        <th className="px-4 py-3 text-left">Period</th>

                        <th className="px-4 py-3 text-left">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="px-4 py-3">VAT PP30</td>

                        <td className="px-4 py-3">May 2026</td>

                        <td className="px-4 py-3">
                          <StatusBadge status="Completed" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Current Work" && (
            <div className="text-gray-500">
              <div className="space-y-4">
                <div className="border rounded-xl p-4">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">Bank Reconciliation</h4>

                    <StatusBadge status="In Progress" />
                  </div>

                  <p className="text-sm text-slate-500 mt-2">
                    Assigned to John Smith
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Documents" && (
            <div className="text-gray-500">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button
                    className="
        bg-blue-600
        text-white
        px-4 py-2
        rounded-xl
      "
                  >
                    Upload Document
                  </button>
                </div>

                <table className="w-full border rounded-xl">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left">File Name</th>

                      <th className="px-4 py-3 text-left">Type</th>

                      <th className="px-4 py-3 text-left">Uploaded Date</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Activity Log" && (
            <div className="text-gray-500">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">Customer updated</p>

                  <p className="text-sm text-slate-500">
                    John Smith • 15 May 2026
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium">VAT PP30 submitted</p>

                  <p className="text-sm text-slate-500">
                    Jane Doe • 10 May 2026
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
