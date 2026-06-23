import express from "express";
import morgan from "morgan";
import cors from "cors";
import notFound from "./utils/notFound.js";
import { error } from "./utils/error.js";
import authRouter from "./routers/auth.router.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter);

app.use(notFound);
app.use(error);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
