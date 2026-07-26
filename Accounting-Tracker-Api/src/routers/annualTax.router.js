import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  annualTaxCustomerQuerySchema,
  annualTaxQuerySchema,
  updateAnnualTaxSchema,
} from "../validators/validation.js";
import {
  getAnnualTaxByCustomerController,
  getAnnualTaxGridController,
  updateAnnualTaxController,
} from "../controllers/annualTax.controller.js";

const annualTaxRouter = express.Router();

annualTaxRouter.use(authMiddleware);

annualTaxRouter.get(
  "/",
  validate(annualTaxQuerySchema),
  getAnnualTaxGridController,
);

annualTaxRouter.get(
  "/customer/:customerId",
  validate(annualTaxCustomerQuerySchema),
  getAnnualTaxByCustomerController,
);

annualTaxRouter.patch(
  "/customer/:customerId",
  validate(updateAnnualTaxSchema),
  updateAnnualTaxController,
);

export default annualTaxRouter;
