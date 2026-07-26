import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  updateWorkSchema,
  workCustomerParamsSchema,
} from "../validators/validation.js";
import {
  getWorkBoardController,
  getWorkByCustomerController,
  updateWorkController,
} from "../controllers/work.controller.js";

const workRouter = express.Router();

workRouter.use(authMiddleware);

workRouter.get("/", getWorkBoardController);

workRouter.get(
  "/customer/:customerId",
  validate(workCustomerParamsSchema),
  getWorkByCustomerController,
);

workRouter.patch(
  "/customer/:customerId",
  validate(updateWorkSchema),
  updateWorkController,
);

export default workRouter;
