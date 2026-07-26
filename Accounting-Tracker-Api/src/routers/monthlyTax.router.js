import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  monthlyTaxCustomerQuerySchema,
  monthlyTaxQuerySchema,
  updateMonthlyTaxSchema,
} from "../validators/validation.js";
import {
  getMonthlyTaxByCustomerController,
  getMonthlyTaxGridController,
  updateMonthlyTaxController,
} from "../controllers/monthlyTax.controller.js";

const monthlyTaxRouter = express.Router();

monthlyTaxRouter.use(authMiddleware);

monthlyTaxRouter.get(
  "/",
  validate(monthlyTaxQuerySchema),
  getMonthlyTaxGridController,
);

monthlyTaxRouter.get(
  "/customer/:customerId",
  validate(monthlyTaxCustomerQuerySchema),
  getMonthlyTaxByCustomerController,
);

monthlyTaxRouter.patch(
  "/customer/:customerId",
  validate(updateMonthlyTaxSchema),
  updateMonthlyTaxController,
);

export default monthlyTaxRouter;
