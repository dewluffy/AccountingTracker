import { loginService } from "../services/auth.service.js";

export const loginController = async (req, res, next) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const result = await loginService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
