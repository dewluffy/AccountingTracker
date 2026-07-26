import api from "./axios";

export const getReports = async () => {
  const response = await api.get("/api/reports");

  return response.data;
};
