import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createCustomerSchema, getCustomerByIdSchema, updateCustomerSchema } from "../validators/validation.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createCustomerController,
  deleteCustomerController,
  getCustomerByIdController,
  getCustomersController,
  updateCustomerController,
} from "../controllers/customer.controller.js";

const customerRouter = express.Router();

customerRouter.get("/", authMiddleware, getCustomersController);
customerRouter.get(
  "/:customerId",
  authMiddleware,
  validate(getCustomerByIdSchema),
  getCustomerByIdController,
);

customerRouter.post(
  "/",
  authMiddleware,
  validate(createCustomerSchema),
  createCustomerController,
);
customerRouter.patch(
  "/:customerId",
  authMiddleware,
  validate(updateCustomerSchema),
  updateCustomerController
);
customerRouter.delete(
  "/:customerId",
  authMiddleware,
  validate(getCustomerByIdSchema),
  deleteCustomerController
);



export default customerRouter;
