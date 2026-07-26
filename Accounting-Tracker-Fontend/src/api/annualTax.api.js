import api from "./axios";

export const getAnnualTaxGrid = async (year) => {
  const response = await api.get("/api/annual-taxes", {
    params: { year },
  });

  return response.data;
};

export const getAnnualTaxByCustomer = async (customerId, year) => {
  const response = await api.get(
    `/api/annual-taxes/customer/${customerId}`,
    { params: { year } }
  );

  return response.data;
};

export const updateAnnualTax = async (customerId, year, items) => {
  const response = await api.patch(
    `/api/annual-taxes/customer/${customerId}`,
    { items },
    { params: { year } }
  );

  return response.data;
};
