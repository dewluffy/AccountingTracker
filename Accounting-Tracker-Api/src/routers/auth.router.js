import express from "express";

import validate from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validators/validation.js";
import { loginController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", validate(loginSchema), loginController);

export default authRouter;