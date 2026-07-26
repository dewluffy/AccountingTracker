import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  assignmentParamsSchema,
  contactParamsSchema,
  createAssignmentSchema,
  createContactSchema,
  createCustomerSchema,
  documentParamsSchema,
  getCustomerByIdSchema,
  updateAssignmentSchema,
  updateContactSchema,
  updateCustomerSchema,
  uploadDocumentSchema,
} from "../validators/validation.js";
import validate from "../middlewares/validate.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  createCustomerController,
  deleteCustomerController,
  getCustomerByIdController,
  getCustomersController,
  updateCustomerController,
} from "../controllers/customer.controller.js";
import {
  createAssignmentController,
  deleteAssignmentController,
  getAssignmentsController,
  updateAssignmentController,
} from "../controllers/customerAssignment.controller.js";
import {
  createContactController,
  deleteContactController,
  getContactsController,
  updateContactController,
} from "../controllers/contactPerson.controller.js";
import { getCustomerActivityLogsController } from "../controllers/activityLog.controller.js";
import {
  deleteDocumentController,
  downloadDocumentController,
  getDocumentsController,
  uploadDocumentController,
} from "../controllers/customerDocument.controller.js";

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

// Staff assignment
customerRouter.get(
  "/:customerId/assignments",
  authMiddleware,
  validate(getCustomerByIdSchema),
  getAssignmentsController,
);
customerRouter.post(
  "/:customerId/assignments",
  authMiddleware,
  validate(createAssignmentSchema),
  createAssignmentController,
);
customerRouter.patch(
  "/:customerId/assignments/:assignmentId",
  authMiddleware,
  validate(updateAssignmentSchema),
  updateAssignmentController,
);
customerRouter.delete(
  "/:customerId/assignments/:assignmentId",
  authMiddleware,
  validate(assignmentParamsSchema),
  deleteAssignmentController,
);

// Contact persons
customerRouter.get(
  "/:customerId/contacts",
  authMiddleware,
  validate(getCustomerByIdSchema),
  getContactsController,
);
customerRouter.post(
  "/:customerId/contacts",
  authMiddleware,
  validate(createContactSchema),
  createContactController,
);
customerRouter.patch(
  "/:customerId/contacts/:contactId",
  authMiddleware,
  validate(updateContactSchema),
  updateContactController,
);
customerRouter.delete(
  "/:customerId/contacts/:contactId",
  authMiddleware,
  validate(contactParamsSchema),
  deleteContactController,
);

// Activity log
customerRouter.get(
  "/:customerId/activity-logs",
  authMiddleware,
  validate(getCustomerByIdSchema),
  getCustomerActivityLogsController,
);

// Documents
customerRouter.get(
  "/:customerId/documents",
  authMiddleware,
  validate(getCustomerByIdSchema),
  getDocumentsController,
);
customerRouter.post(
  "/:customerId/documents",
  authMiddleware,
  upload.single("file"),
  validate(uploadDocumentSchema),
  uploadDocumentController,
);
customerRouter.get(
  "/:customerId/documents/:documentId/download",
  authMiddleware,
  validate(documentParamsSchema),
  downloadDocumentController,
);
customerRouter.delete(
  "/:customerId/documents/:documentId",
  authMiddleware,
  validate(documentParamsSchema),
  deleteDocumentController,
);

export default customerRouter;
