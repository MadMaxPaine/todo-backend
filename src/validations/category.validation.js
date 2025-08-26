const { body } = require("express-validator");

exports.categoryValidation = [
 body("name")
  .notEmpty()
  .withMessage("Category name is required")
  .isString()
  .withMessage("Category name must be a string")
  .isLength({ max: 50 })
  .withMessage("Category name must be up to 50 characters"),
 body("isDefault")
  .optional()
  .isBoolean()
  .withMessage("isDefault must be a boolean"),
];