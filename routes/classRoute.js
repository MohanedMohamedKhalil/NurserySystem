const express = require("express");
const { body } = require("express-validator");
const controller = require("./../controllers/classController");
const conditions = require("./../conditions/class-conditions");
const validator = require("../middlewares/validations/validator");
const router = express.Router();

router
  .route("/class")
  .get(controller.getAllclasses)
  .post(conditions.Adding, validator, controller.addclass)
  .patch(conditions.Patching, validator, controller.updateclass)
  .delete(conditions.Deleting, validator, controller.deleteclass);

router
  .route("/class/:id")
  .get(conditions.gettingById, validator, controller.getclassbyId);

router
  .route("/class/:id/child")
  .get(conditions.gettingById, validator, controller.getChildrenInfo);

router.route("/class/:id/teacher").get(controller.getSupervisorsInfo);

module.exports = router;
