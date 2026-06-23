import express from "express";

import validate from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validators/validation.js";
import { getMeController, loginController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", validate(loginSchema), loginController);
authRouter.get("/me", authMiddleware, getMeController);

export default authRouter;