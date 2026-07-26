import { getReportsService } from "../services/reports.service.js";

export const getReportsController = async (req, res, next) => {
  try {
    const result = await getReportsService();

    return res.status(200).json({
      success: true,
      message: "Get reports success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
