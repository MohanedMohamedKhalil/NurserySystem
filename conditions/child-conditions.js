const { param, body } = require("express-validator");

exports.Adding = [
  // body("_id").isInt().withMessage(" Id Should Be Integer"),
  // Validate the fullname field
  body("fullname")
    .isString()
    .withMessage("fullname must be string")
    .isLength({ min: 8 })
    .withMessage("fullname must be at least 8 characters"),
  // Validate the age field
  body("age")
    .isLength({ min: 2 })
    .withMessage("Age must be at least 2 characters")
    .isInt()
    .withMessage("Age should be Integer"),
  // Validate the level field
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level must include one of those [ PreKGm , KG1 , KG2 ]"),
  // Validate the address field
  body("address.city")
    .notEmpty()
    .isString()
    .withMessage("City is required and must be a string"),
  body("address.street")
    .notEmpty()
    .isString()
    .withMessage("Street is required and must be a string"),
  body("address.building")
    .notEmpty()
    .isInt()
    .withMessage("Building is required and must be an Integer"),
];

exports.Patching = [
  body("_id").optional().isInt().withMessage(" Id Should Be Integer"),
  // Validate the fullname field
  body("fullname")
    .optional()
    .isString()
    .withMessage("fullname must be string")
    .isLength({ min: 8 })
    .withMessage("fullname must be at least 8 characters"),
  // Validate the age field
  body("age")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Age must be at least 2 characters")
    .isInt()
    .withMessage("Age should be Integer"),
  // Validate the level field
  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level must include one of those [ PreKG , KG1 , KG2 ]"),
  // Validate the address field
  body("address.city")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("City is required and must be a string"),
  body("address.street")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("Street is required and must be a string"),
  body("address.building")
    .optional()
    .notEmpty()
    .isInt()
    .withMessage("Building is required and must be an Integer"),
];

exports.Deleting = [body("_id").isInt().withMessage(" Id Should Be Integer")];

exports.gettingById = [param("id").isInt().withMessage("Id Should Be Integer")];
