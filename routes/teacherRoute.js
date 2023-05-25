const express = require("express");
const { body } = require("express-validator");
const controller = require("./../controllers/teacherController");
const conditions = require("./../conditions/teacher-conditions");
const validator = require("../middlewares/validations/validator");
const { isAdmin } = require("./../middlewares/validations/authenicatedMW");
const router = express.Router();
// console.log(conditions.Adding);
router
  .route("/teachers")
  .all(isAdmin, controller.getAllteachers)
  .get(controller.getAllteachers)
  .post(
    conditions.addImage("image"),
    conditions.Adding,
    validator,
    controller.addteacher
  )
  .patch(
    conditions.addImage("image"),
    conditions.Patching,
    validator,
    controller.updateteacher
  )
  .delete(conditions.Deleting, validator, controller.deleteteacher);

router
  .route("/teachers/:id")
  .get(conditions.gettingById, validator, controller.getteacherbyId);

router.route("/teachers/classes/supervisor").get(controller.getSupervisors);

module.exports = router;
