const { validationResult } = require("express-validator");
const ApiError = require("../utils/errors.API");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  
  if (!errors.isEmpty()) {
    return next(ApiError.badRequest("Validation errors", errors.array()));
  }
  next();
};

module.exports = validateRequest;
