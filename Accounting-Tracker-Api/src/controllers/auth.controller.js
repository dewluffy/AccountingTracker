import { loginService } from "../services/auth.service.js";

export const loginController = async (req, res, next) => {
  try {
    const result = await loginService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMeController = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Get current user success",
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};