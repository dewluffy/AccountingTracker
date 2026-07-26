import { getDashboardService } from "../services/dashboard.service.js";

export const getDashboardController = async (req, res, next) => {
  try {
    const result = await getDashboardService(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Get dashboard success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
