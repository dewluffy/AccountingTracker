import api from "./axios";

export const getDocuments = async (customerId) => {
  const response = await api.get(`/api/customers/${customerId}/documents`);

  return response.data;
};

export const uploadDocument = async (customerId, file, documentType) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("documentType", documentType);

  const response = await api.post(
    `/api/customers/${customerId}/documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const downloadDocument = async (customerId, documentId, fileName) => {
  const response = await api.get(
    `/api/customers/${customerId}/documents/${documentId}/download`,
    { responseType: "blob" }
  );

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};

export const deleteDocument = async (customerId, documentId) => {
  const response = await api.delete(
    `/api/customers/${customerId}/documents/${documentId}`
  );

  return response.data;
};
