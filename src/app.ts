import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "./config/config.js";

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// routes import
import { recordRoutes } from "./routes/record.routes.js";
import { sseRoutes } from "./routes/sse.routes.js";
import { authRoutes } from "./routes/auth.routes.js";

// routes declaration
app.use("/api/v1/records", recordRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/sse", sseRoutes);

export { app };
