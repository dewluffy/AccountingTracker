import express from "express";

import { authMiddleware, requireRole } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "../validators/validation.js";
import {
  createUserController,
  deactivateUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.use(authMiddleware);

// Listing staff is needed by any logged-in user (e.g. customer staff assignment picker),
// only mutating a user account is restricted to ADMIN.
userRouter.get("/", getUsersController);
userRouter.get(
  "/:userId",
  validate(getUserByIdSchema),
  getUserByIdController,
);

userRouter.post(
  "/",
  requireRole("ADMIN"),
  validate(createUserSchema),
  createUserController,
);
userRouter.patch(
  "/:userId",
  requireRole("ADMIN"),
  validate(updateUserSchema),
  updateUserController,
);
userRouter.delete(
  "/:userId",
  requireRole("ADMIN"),
  validate(getUserByIdSchema),
  deactivateUserController,
);

export default userRouter;
