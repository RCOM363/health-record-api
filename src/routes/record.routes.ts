import { Router } from "express";
import {
  createHealthRecord,
  getHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
} from "../controllers/record.controllers.js";
import {
  createRecordRules,
  updateRecordRules,
  idParamRule,
} from "../validators/record.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.route("/").post(createRecordRules, validate, createHealthRecord);
router
  .route("/:id")
  .get(idParamRule, validate, getHealthRecord)
  .put(idParamRule, updateRecordRules, validate, updateHealthRecord)
  .delete(idParamRule, validate, deleteHealthRecord);

export { router as recordRoutes };
