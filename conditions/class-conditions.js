const { param, body } = require("express-validator");

exports.Adding = [
  // Validate the Id field
  // body("_id").isInt().withMessage(" Id Should Be Integer"),
  // Validate the fullname field
  body("name")
    .isString()
    .withMessage("name must be string")
    .isLength({ min: 3 })
    .withMessage("fullname must be at least 3 characters"),
  // Validate the supervisor field
  body("supervisor")
    .isMongoId()
    .optional()
    .withMessage(" Supervisor Id Should Be ObjectID"),
  // Validate the children ID field
  body("children").isArray({ min: 1 }).withMessage("Children must be an array"),
  body("children.*")
    .isInt()
    .withMessage("Child Id is Required and should be integer"),
];

exports.Patching = [
  // Validate the Id field
  body("_id").optional().isInt().withMessage(" Id Should Be Integer"),
  // Validate the fullname field
  body("name")
    .optional()
    .isString()
    .withMessage("name must be string")
    .isLength({ min: 3 })
    .withMessage("fullname must be at least 3 characters"),
  // Validate the supervisor field
  body("supervisor_id")
    .optional()
    .isMongoId()
    .withMessage(" Supervisor Id Should Be ObjectID"),
  // Validate the children ID field
  body("children_id")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Children must be an array"),
  body("children_id.*")
    .isInt()
    .withMessage("Child Id is Required and should be integer"),
];

exports.Deleting = [body("_id").isInt().withMessage(" Id Should Be Integer")];

exports.gettingById = [param("id").isInt().withMessage("Id Should Be Integer")];
