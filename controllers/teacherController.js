const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
require("./../models/teacherModel");
require("./../models/classModel");
const Class = mongoose.model("Class");
const Teacher = mongoose.model("Teacher"); // Get Collection

exports.getAllteachers = (request, response, next) => {
  Teacher.find() // find Return [{}] or []
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
  // response.json({ message: "Getting teachers Successfully" });
};

exports.getteacherbyId = (request, response, next) => {
  Teacher.findOne({ _id: request.params.id }) // findOne Return {} or null
    .then((object) => {
      if (!object) {
        throw new Error("Teacher Doesn't Exist");
      } else {
        response.status(200).json(object);
      }
    })
    .catch((error) => next(error));
};

exports.getSupervisors = (request, response, next) => {
  Class.find({}, { _id: 0, supervisor: 1, name: 1 })
    .populate([{ path: "supervisor", select: { fullname: 1, _id: 0 } }])
    .then((object) => {
      response.status(200).json(object);
    })
    .catch((error) => next(error));
};

exports.addteacher = (request, response, next) => {
  const { fullname, email, password, isAdmin } = request.body;
  const image = request.file.filename;
  bcrypt.hash(password, +process.env.hashingRounds, function (err, hash) {
    if (err) {
      return next(err);
    }
    const result = new Teacher({
      fullname: fullname,
      email: email,
      password: hash,
      image: image,
      isAdmin: isAdmin,
    });
    result
      .save()
      .then((data) => {
        response.status(201).json(data); // status 201 : Created
      })
      .catch((error) => next(error));
  });
};
exports.updateteacher = (request, response, next) => {
  /*
  I don't know which property i want to update 
  So i will create an empty object to get the update property values
  */
  const updateObject = {};

  for (const property in request.body) {
    updateObject[property] = request.body[property];
  }
  if (request.file.filename) {
    updateObject.image = request.file.filename;
  }
  if (updateObject.password) {
    // if i want to update password , need to hash it first
    bcrypt.hash(
      updateObject.password,
      +process.env.hashingRounds,
      function (err, hash) {
        if (err) {
          return next(err);
        }
        updateObject.password = hash;
        updateTeacher();
        console.log(updateObject);
      }
    );
  } else {
    updateTeacher();
  }
  function updateTeacher() {
    Teacher.findOneAndUpdate({ _id: request.body._id }, updateObject, {
      new: true,
    })
      .then((updatedTeacher) => {
        if (!updatedTeacher) {
          throw new Error("Teacher Doesn't Exist");
        } else {
          response.status(200).json({ message: "Teacher Updated" });
        }
      })
      .catch((error) => next(error));
  }
};
exports.deleteteacher = (request, response, next) => {
  Teacher.findByIdAndDelete(request.body._id)
    .then((data) => {
      if (!data) throw new Error("No Teachers exist by this ID");
      // response.status(200).json(data);
      return data;
    })
    .then((deletedTeacher) => {
      Class.findOneAndUpdate(
        { supervisor: request.body._id },
        { $unset: { supervisor: 1 } },
        { new: true }
      )
        .then((data) => {
          if (!data)
            response.status(200).json({
              message: "The Teacher has Deleted and he wasn't a supervisor",
            });
          // supervisor delete from a class
          response.status(200).json(data);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};
