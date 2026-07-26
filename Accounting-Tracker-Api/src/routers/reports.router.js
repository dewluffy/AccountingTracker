import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getReportsController } from "../controllers/reports.controller.js";

const reportsRouter = express.Router();

reportsRouter.get("/", authMiddleware, getReportsController);

export default reportsRouter;
