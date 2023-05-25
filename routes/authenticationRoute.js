const express = require("express");
const controller = require("./../controllers/authenticationController");
const conditions = require("./../conditions/teacher-conditions");
const validator = require("../middlewares/validations/validator");
const router = express.Router();

router.post(
  "/register",
  conditions.addImage("image"),
  conditions.Adding,
  validator,
  controller.register
);
router.post("/login", controller.login);

module.exports = router;

// mohaned1235
//menna1234
