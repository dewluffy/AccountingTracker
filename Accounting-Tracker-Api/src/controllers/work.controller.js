import {
  getWorkBoardService,
  getWorkByCustomerService,
  updateWorkService,
} from "../services/work.service.js";

export const getWorkBoardController = async (req, res, next) => {
  try {
    const board = await getWorkBoardService();

    return res.status(200).json({
      success: true,
      message: "Get work board success",
      data: {
        board,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkByCustomerController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const result = await getWorkByCustomerService(customerId);

    return res.status(200).json({
      success: true,
      message: "Get work detail success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateWorkController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const work = await updateWorkService(customerId, req.body, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Update work success",
      data: {
        work,
      },
    });
  } catch (error) {
    next(error);
  }
};
