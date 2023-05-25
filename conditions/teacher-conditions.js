const { param, body } = require("express-validator");
const multer = require("multer");
const { ObjectId } = require("mongodb");

exports.Adding = [
  // Validate the id field with custom() that takes callbackfunc that return true/false
  //   body("_id")
  //     .custom((value) => ObjectId.isValid(value))
  //     .withMessage("Invalid ID"),
  body("_id").optional().isMongoId().withMessage(" Id Should Be Object ID"),
  // body("_id").isInt().withMessage(" Id Should be an Integer"),
  // Validate the fullname field
  body("fullname")
    .isString()
    .withMessage("fullname must be string")
    .isLength({ min: 8 })
    .withMessage("fullname must be at least 8 characters"),
  // Validate the password field
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
  // Validate the email field
  body("email").isEmail().withMessage("Invalid email"),
  // Validate the image field
];

exports.addImage = (fieldName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // ==  upload = multer({ dest: "uploads/" })
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 10);
      cb(null, uniqueSuffix + "-" + file.originalname); // to change name of photo to unique name
    },
  });
  function fileFilter(req, file, cb) {
    // to allow img files only
    if (file.mimetype.startsWith("image")) {
      // To accept the file pass `true`, like so:
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
  const upload = multer({ storage, fileFilter }); // file which i will upload imgs
  return upload.single(fieldName);
};

exports.Patching = [
  body("_id").optional().isMongoId().withMessage(" Id Should Be Object ID"),
  body("fullName").optional().isAlpha().withMessage("fullname must be string"),
  body("password")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
  body("email").optional().isEmail().withMessage("Invalid email"),
  body("image").optional().isString().withMessage("Image should be string"),
];

exports.Deleting = [
  body("_id").isMongoId().withMessage(" Id Should Be ObjectID"),
];

exports.gettingById = [
  param("id").isMongoId().withMessage("Id Should Be Object ID"),
];
