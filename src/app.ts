import express from "express";
import cors from "cors";

import config from "./config/config.js";

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());

// routes import
import { recordRoutes } from "./routes/record.routes.js";

// routes declaration
app.use("/api/v1/records", recordRoutes);

export { app };
