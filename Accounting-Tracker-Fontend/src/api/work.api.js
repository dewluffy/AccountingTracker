import api from "./axios";

export const getWorkBoard = async () => {
  const response = await api.get("/api/work");

  return response.data;
};

export const getWorkByCustomer = async (customerId) => {
  const response = await api.get(`/api/work/customer/${customerId}`);

  return response.data;
};

export const updateWork = async (customerId, data) => {
  const response = await api.patch(`/api/work/customer/${customerId}`, data);

  return response.data;
};
