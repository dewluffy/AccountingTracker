import api from "./axios";

export const getContacts = async (customerId) => {
  const response = await api.get(`/api/customers/${customerId}/contacts`);

  return response.data;
};

export const createContact = async (customerId, data) => {
  const response = await api.post(
    `/api/customers/${customerId}/contacts`,
    data
  );

  return response.data;
};

export const updateContact = async (customerId, contactId, data) => {
  const response = await api.patch(
    `/api/customers/${customerId}/contacts/${contactId}`,
    data
  );

  return response.data;
};

export const deleteContact = async (customerId, contactId) => {
  const response = await api.delete(
    `/api/customers/${customerId}/contacts/${contactId}`
  );

  return response.data;
};
