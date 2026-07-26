import api from "./axios";

export const getMonthlyTaxGrid = async (year, month) => {
  const response = await api.get("/api/monthly-taxes", {
    params: { year, month },
  });

  return response.data;
};

export const getMonthlyTaxByCustomer = async (customerId, year, month) => {
  const response = await api.get(
    `/api/monthly-taxes/customer/${customerId}`,
    { params: { year, month } }
  );

  return response.data;
};

export const updateMonthlyTax = async (customerId, year, month, items) => {
  const response = await api.patch(
    `/api/monthly-taxes/customer/${customerId}`,
    { items },
    { params: { year, month } }
  );

  return response.data;
};
