import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import Tabs from "../../components/common/Tabs";
import InfoRow from "../../components/common/InfoRow";
import StatusBadge from "../../components/common/StatusBadge";

export default function CustomerDetail() {
  const [activeTab, setActiveTab] =
    useState("Overview");

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
    remark:
      "Important customer with monthly accounting service.",
  };

  const tabs = [
    "Overview",
    "Tax",
    "Current Work",
    "Documents",
    "History",
  ];

  return (
    <div className="space-y-6">

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

      <div className="bg-white rounded-2xl border shadow-sm">

        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="p-6">

          {activeTab === "Overview" && (
            <div className="space-y-8">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <InfoRow
                  label="Customer Code"
                  value={customer.code}
                />

                <InfoRow
                  label="Business Type"
                  value={customer.businessType}
                />

                <InfoRow
                  label="Status"
                  value={
                    <StatusBadge
                      status={customer.status}
                    />
                  }
                />

                <InfoRow
                  label="Phone"
                  value={customer.phone}
                />

                <InfoRow
                  label="Email"
                  value={customer.email}
                />

                <InfoRow
                  label="Contact Person"
                  value={customer.contactPerson}
                />

                <InfoRow
                  label="Primary Staff"
                  value={customer.primaryStaff}
                />

                <InfoRow
                  label="Secondary Staff"
                  value={customer.secondaryStaff}
                />

              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Remark
                </p>

                <p className="mt-2">
                  {customer.remark}
                </p>
              </div>

            </div>
          )}

          {activeTab === "Tax" && (
            <div className="text-gray-500">
              Tax information coming soon...
            </div>
          )}

          {activeTab === "Current Work" && (
            <div className="text-gray-500">
              Current work coming soon...
            </div>
          )}

          {activeTab === "Documents" && (
            <div className="text-gray-500">
              Documents coming soon...
            </div>
          )}

          {activeTab === "History" && (
            <div className="text-gray-500">
              History coming soon...
            </div>
          )}

        </div>

      </div>

    </div>
  );
}