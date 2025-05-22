import { Router } from "express";
import { login } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/login").post(login);

export { router as authRoutes };
