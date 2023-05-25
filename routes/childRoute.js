const express = require("express");
const { body } = require("express-validator");
const controller = require("./../controllers/childController");
const conditions = require("./../conditions/child-conditions");
const validator = require("../middlewares/validations/validator");

const router = express.Router();

router
  .route("/child")
  .get(controller.getAllChildren)
  .post(conditions.Adding, validator, controller.addChild)
  .patch(conditions.Patching, validator, controller.updateChild)
  .delete(conditions.Deleting, validator, controller.deleteChild);

router
  .route("/child/:id")
  .get(conditions.gettingById, validator, controller.getChildbyId);

router.route("/child/:id/class").get(controller.getChildClass);

module.exports = router;
