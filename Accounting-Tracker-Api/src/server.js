import express from "express";
import morgan from "morgan";
import cors from "cors";
import notFound from "./utils/notFound.js";
import { error } from "./utils/error.js";
import authRouter from "./routers/auth.router.js";
import customerRouter from "./routers/customer.router.js";
import userRouter from "./routers/user.router.js";
import monthlyTaxRouter from "./routers/monthlyTax.router.js";
import annualTaxRouter from "./routers/annualTax.router.js";
import workRouter from "./routers/work.router.js";
import dashboardRouter from "./routers/dashboard.router.js";
import reportsRouter from "./routers/reports.router.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/customers", customerRouter);
app.use("/api/users", userRouter);
app.use("/api/monthly-taxes", monthlyTaxRouter);
app.use("/api/annual-taxes", annualTaxRouter);
app.use("/api/work", workRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/reports", reportsRouter);

app.use(notFound);
app.use(error);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
