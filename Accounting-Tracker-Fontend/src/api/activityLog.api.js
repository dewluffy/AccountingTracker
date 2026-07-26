import api from "./axios";

export const getCustomerActivityLogs = async (customerId) => {
  const response = await api.get(
    `/api/customers/${customerId}/activity-logs`
  );

  return response.data;
};
