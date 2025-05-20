import { body, param } from "express-validator";

enum HealthStatus {
  Healthy = "Healthy",
  Sick = "Sick",
  Critical = "Critical",
}

export const createRecordRules = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name is required"),

  body("age")
    .isInt({ min: 1 })
    .withMessage("age must not be non-negative number"),

  body("status")
    .isIn(Object.values(HealthStatus))
    .withMessage(
      `status must be one of: ${Object.values(HealthStatus).join(", ")}`,
    ),
];

export const updateRecordRules = [
  body("name").optional().isString(),
  body("age").optional().isInt({ min: 0 }),
  body("status").optional().isIn(Object.values(HealthStatus)),
];

export const idParamRule = [
  param("id").isUUID().withMessage("id must be a UUID"),
];
