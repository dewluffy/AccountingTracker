import api from "./axios";

export const getAssignments = async (customerId) => {
  const response = await api.get(`/api/customers/${customerId}/assignments`);

  return response.data;
};

export const createAssignment = async (customerId, data) => {
  const response = await api.post(
    `/api/customers/${customerId}/assignments`,
    data
  );

  return response.data;
};

export const updateAssignment = async (customerId, assignmentId, data) => {
  const response = await api.patch(
    `/api/customers/${customerId}/assignments/${assignmentId}`,
    data
  );

  return response.data;
};

export const deleteAssignment = async (customerId, assignmentId) => {
  const response = await api.delete(
    `/api/customers/${customerId}/assignments/${assignmentId}`
  );

  return response.data;
};
