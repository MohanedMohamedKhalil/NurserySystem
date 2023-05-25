const mongoose = require("mongoose");
require("./../models/classModel");
require("./../models/teacherModel");
require("./../models/childModel");
const Teacher = mongoose.model("Teacher");
const Class = mongoose.model("Class"); // Get Collection

exports.getAllclasses = (request, response, next) => {
  Class.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getclassbyId = (request, response, next) => {
  Class.findOne({ _id: request.params.id })
    .then((object) => {
      if (!object) {
        throw new Error("Class Doesn't Exist");
      } else {
        response.status(200).json(object);
      }
    })
    .catch((error) => next(error));
};
exports.getChildrenInfo = (request, response, next) => {
  Class.find({ _id: request.params.id }, { _id: 0, children: 1, name: 1 })
    .populate([{ path: "children", select: { fullname: 1, _id: 0 } }])
    .then((object) => {
      if (object.length == 0) {
        throw new Error("Class Doesn't Exist");
      } else {
        response.status(200).json(object);
      }
    })
    .catch((error) => next(error));
};
exports.getSupervisorsInfo = (request, response, next) => {
  Class.find({ _id: request.params.id }, { _id: 0, supervisor: 1, name: 1 })
    .populate([{ path: "supervisor", select: { fullname: 1, _id: 0 } }])
    .then((object) => {
      if (object.length == 0) {
        throw new Error("Class Doesn't Exist");
      } else {
        response.status(200).json(object);
      }
    })
    .catch((error) => next(error));
};
exports.addclass = (request, response, next) => {
  let result = new Class({
    _id: request.body._id,
    name: request.body.name,
    supervisor: request.body.supervisor,
    children: request.body.children,
  });
  // Check if the supervisor exists in the Teacher model
  Teacher.findOne({ _id: request.body.supervisor }).then((teacher) => {
    if (!teacher) {
      const error = new Error(
        `Supervisor with id ${request.body.supervisor} not found`
      );
      error.statusCode = 404;
      next(error);
    }
    result
      .save()
      .then((data) => {
        response.status(201).json(data); // status 201 : Created
      })
      .catch((error) => next(error));
  });
};
exports.updateclass = (request, response, next) => {
  /*
I don't know which property i want to update 
So i will create an empty object to get the update property values
*/
  const updateObject = {};

  for (const property in request.body) {
    updateObject[property] = request.body[property];
  }

  Class.findOneAndUpdate({ _id: request.body._id }, updateObject, {
    new: true,
  })
    .then((updatedClass) => {
      if (!updatedClass) {
        throw new Error("Class Doesn't Exist");
      } else {
        response.status(200).json({ message: "Class Updated" });
      }
    })
    .catch((error) => next(error));
};
exports.deleteclass = (request, response, next) => {
  Class.findOneAndDelete({ _id: request.body._id })
    .then((object) => {
      if (!object) {
        throw new Error("Class Doesn't Exist");
      } else {
        response.status(200).json({ message: object.name + " , " + "deleted" });
      }
    })
    .catch((error) => next(error));
};
