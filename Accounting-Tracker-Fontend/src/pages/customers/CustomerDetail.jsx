import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaDownload, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import Tabs from "../../components/common/Tabs";
import InfoRow from "../../components/common/InfoRow";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import ContactFormModal from "../../components/customer/ContactFormModal";
import DocumentUploadModal from "../../components/customer/DocumentUploadModal";
import { getCustomerById } from "../../api/customer.api";
import { getAssignments } from "../../api/customerAssignment.api";
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../../api/contactPerson.api";
import { getCustomerActivityLogs } from "../../api/activityLog.api";
import {
  deleteDocument,
  downloadDocument,
  getDocuments,
  uploadDocument,
} from "../../api/customerDocument.api";
import { showError, showSuccess } from "../../utils/toast";

export default function CustomerDetail() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("Overview");
  const [customer, setCustomer] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactFormMode, setContactFormMode] = useState("create");
  const [contactFormKey, setContactFormKey] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteContactOpen, setDeleteContactOpen] = useState(false);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadModalKey, setUploadModalKey] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [deleteDocumentOpen, setDeleteDocumentOpen] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const [
          customerResult,
          assignmentsResult,
          contactsResult,
          activityLogsResult,
          documentsResult,
        ] = await Promise.all([
          getCustomerById(id),
          getAssignments(id),
          getContacts(id),
          getCustomerActivityLogs(id),
          getDocuments(id),
        ]);

        setCustomer(customerResult.data.customer);
        setAssignments(assignmentsResult.data.assignments);
        setContacts(contactsResult.data.contacts);
        setActivityLogs(activityLogsResult.data.logs);
        setDocuments(documentsResult.data.documents);
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Failed to load customer"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const primaryStaff = assignments.find(
    (item) => item.staffRole === "PRIMARY"
  );
  const secondaryStaff = assignments.find(
    (item) => item.staffRole === "SECONDARY"
  );

  const handleAddContactClick = () => {
    setContactFormMode("create");
    setSelectedContact(null);
    setContactFormKey((key) => key + 1);
    setContactFormOpen(true);
  };

  const handleEditContactClick = (contact) => {
    setContactFormMode("edit");
    setSelectedContact(contact);
    setContactFormKey((key) => key + 1);
    setContactFormOpen(true);
  };

  const handleContactFormSubmit = async (data) => {
    try {
      if (contactFormMode === "edit") {
        const result = await updateContact(id, selectedContact.id, data);

        setContacts((prev) =>
          prev.map((item) =>
            item.id === selectedContact.id ? result.data.contact : item
          )
        );

        showSuccess("Contact updated successfully");
      } else {
        const result = await createContact(id, data);

        setContacts((prev) => [...prev, result.data.contact]);

        showSuccess("Contact added successfully");
      }

      setContactFormOpen(false);
      setSelectedContact(null);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to save contact"
      );
    }
  };

  const handleDeleteContactClick = (contact) => {
    setSelectedContact(contact);
    setDeleteContactOpen(true);
  };

  const handleConfirmDeleteContact = async () => {
    try {
      await deleteContact(id, selectedContact.id);

      setContacts((prev) =>
        prev.filter((item) => item.id !== selectedContact.id)
      );

      showSuccess("Contact deleted successfully");
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to delete contact"
      );
    } finally {
      setDeleteContactOpen(false);
      setSelectedContact(null);
    }
  };

  const handleUploadClick = () => {
    setUploadModalKey((key) => key + 1);
    setUploadModalOpen(true);
  };

  const handleUploadSubmit = async (file, documentType) => {
    try {
      const result = await uploadDocument(id, file, documentType);

      setDocuments((prev) => [result.data.document, ...prev]);

      showSuccess("Document uploaded successfully");

      setUploadModalOpen(false);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to upload document"
      );
    }
  };

  const handleDownloadClick = async (doc) => {
    try {
      await downloadDocument(id, doc.id, doc.fileName);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to download document"
      );
    }
  };

  const handleDeleteDocumentClick = (doc) => {
    setSelectedDocument(doc);
    setDeleteDocumentOpen(true);
  };

  const handleConfirmDeleteDocument = async () => {
    try {
      await deleteDocument(id, selectedDocument.id);

      setDocuments((prev) =>
        prev.filter((item) => item.id !== selectedDocument.id)
      );

      showSuccess("Document deleted successfully");
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to delete document"
      );
    } finally {
      setDeleteDocumentOpen(false);
      setSelectedDocument(null);
    }
  };

  const tabs = ["Overview", "Tax", "Current Work", "Documents", "Activity Log"];

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="py-10 text-center text-slate-500">
        Customer not found.
      </div>
    );
  }

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

          <h3 className="text-3xl font-bold mt-2">{documents.length}</h3>
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

                  <InfoRow label="Tax ID" value={customer.taxId} />

                  <InfoRow label="Phone" value={customer.phone || "-"} />

                  <InfoRow label="Email" value={customer.email || "-"} />

                  <InfoRow label="Address" value={customer.address || "-"} />

                  <InfoRow
                    label="Status"
                    value={<StatusBadge status={customer.status} />}
                  />
                </div>
              </div>

              {/* Assigned Staff */}

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Assigned Staff
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <InfoRow
                    label="Primary Staff"
                    value={
                      primaryStaff
                        ? `${primaryStaff.user.firstName} ${primaryStaff.user.lastName}`
                        : "-"
                    }
                  />

                  <InfoRow
                    label="Secondary Staff"
                    value={
                      secondaryStaff
                        ? `${secondaryStaff.user.firstName} ${secondaryStaff.user.lastName}`
                        : "-"
                    }
                  />
                </div>
              </div>

              {/* Contact Persons */}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">
                    Contact Persons
                  </h3>

                  <Button
                    variant="secondary"
                    onClick={handleAddContactClick}
                  >
                    <span className="flex items-center gap-2">
                      <FaPlus />
                      Add Contact
                    </span>
                  </Button>
                </div>

                {contacts.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No contact persons yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="bg-slate-50 rounded-xl p-4 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{contact.name}</p>

                          {contact.position && (
                            <p className="text-sm text-slate-500">
                              {contact.position}
                            </p>
                          )}

                          <p className="mt-1 text-sm text-slate-600">
                            {[contact.phone, contact.email]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditContactClick(contact)}
                            className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => handleDeleteContactClick(contact)}
                            className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                          <StatusBadge status="COMPLETED" />
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

                    <StatusBadge status="IN_PROGRESS" />
                  </div>

                  <p className="text-sm text-slate-500 mt-2">
                    Assigned to John Smith
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Documents" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={handleUploadClick}>
                  Upload Document
                </Button>
              </div>

              {documents.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">
                  No documents uploaded yet.
                </p>
              ) : (
                <table className="w-full border rounded-xl">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left">File Name</th>

                      <th className="px-4 py-3 text-left">Type</th>

                      <th className="px-4 py-3 text-left">Uploaded Date</th>

                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b last:border-0">
                        <td className="px-4 py-3">{doc.fileName}</td>

                        <td className="px-4 py-3">{doc.documentType}</td>

                        <td className="px-4 py-3">
                          {new Date(doc.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleDownloadClick(doc)}
                              className="p-2 rounded-lg hover:bg-green-100 text-green-600"
                            >
                              <FaDownload />
                            </button>

                            <button
                              onClick={() => handleDeleteDocumentClick(doc)}
                              className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "Activity Log" && (
            <div className="text-gray-500">
              {activityLogs.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No activity recorded yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {activityLogs.map((log) => (
                    <div
                      key={log.id}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <p className="font-medium">{log.description}</p>

                      <p className="text-sm text-slate-500">
                        {log.user
                          ? `${log.user.firstName} ${log.user.lastName}`
                          : "System"}{" "}
                        •{" "}
                        {new Date(log.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ContactFormModal
        key={contactFormKey}
        open={contactFormOpen}
        mode={contactFormMode}
        initialData={selectedContact}
        onClose={() => {
          setContactFormOpen(false);
          setSelectedContact(null);
        }}
        onSubmit={handleContactFormSubmit}
      />

      <ConfirmModal
        open={deleteContactOpen}
        title="Delete Contact"
        message={`Are you sure you want to delete ${
          selectedContact?.name || ""
        } ?`}
        onClose={() => {
          setDeleteContactOpen(false);
          setSelectedContact(null);
        }}
        onConfirm={handleConfirmDeleteContact}
      />

      <DocumentUploadModal
        key={uploadModalKey}
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSubmit={handleUploadSubmit}
      />

      <ConfirmModal
        open={deleteDocumentOpen}
        title="Delete Document"
        message={`Are you sure you want to delete ${
          selectedDocument?.fileName || ""
        } ?`}
        onClose={() => {
          setDeleteDocumentOpen(false);
          setSelectedDocument(null);
        }}
        onConfirm={handleConfirmDeleteDocument}
      />
    </div>
  );
}
