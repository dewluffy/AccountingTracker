import api from "./axios";

export const getCustomers = async () => {
  const response = await api.get("/api/customers");

  return response.data;
};

export const getCustomerById = async (customerId) => {
  const response = await api.get(`/api/customers/${customerId}`);

  return response.data;
};

export const createCustomer = async (data) => {
  const response = await api.post("/api/customers", data);

  return response.data;
};

export const updateCustomer = async (customerId, data) => {
  const response = await api.patch(`/api/customers/${customerId}`, data);

  return response.data;
};

export const deleteCustomer = async (customerId) => {
  const response = await api.delete(`/api/customers/${customerId}`);

  return response.data;
};
