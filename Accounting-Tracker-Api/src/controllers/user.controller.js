import {
  createUserService,
  deactivateUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "../services/user.service.js";

export const getUsersController = async (req, res, next) => {
  try {
    const users = await getUsersService();

    return res.status(200).json({
      success: true,
      message: "Get users success",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await getUserByIdService(userId);

    return res.status(200).json({
      success: true,
      message: "Get user success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createUserController = async (req, res, next) => {
  try {
    const user = await createUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "Create user success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await updateUserService(userId, req.body);

    return res.status(200).json({
      success: true,
      message: "Update user success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deactivateUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await deactivateUserService(userId, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Deactivate user success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
