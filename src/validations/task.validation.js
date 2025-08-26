const { body } = require("express-validator");

exports.taskValidation = [
 body("title")
  .notEmpty()
  .withMessage("Task title is required")
  .isString()
  .withMessage("Task title must be a string")
  .isLength({ max: 100 })
  .withMessage("Task title must be up to 100 characters"),
 body("description")
  .optional()
  .isString()
  .withMessage("Description must be a string"),
 body("dueDate")
  .optional()
  .isISO8601()
  .withMessage("Due date must be a valid date"),
 body("priority")
  .optional()
  .isInt({ min: 1, max: 10 })
  .withMessage("Priority must be an integer between 1 and 10"),
 body("status")
  .optional()
  .isIn(["undone", "done"])
  .withMessage("Status must be 'undone' or 'done'"),
 body("categoryId")
  .optional()
  .isInt()
  .withMessage("Category ID must be an integer"),
];  