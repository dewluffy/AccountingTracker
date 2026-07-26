import { getActivityLogsByRecordService } from "../services/activityLog.service.js";

export const getCustomerActivityLogsController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const logs = await getActivityLogsByRecordService("customer", customerId);

    return res.status(200).json({
      success: true,
      message: "Get activity logs success",
      data: {
        logs,
      },
    });
  } catch (error) {
    next(error);
  }
};
