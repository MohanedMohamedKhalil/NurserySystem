const mongoose = require("mongoose");
require("./../models/childModel");
require("./../models/classModel");
require("./../models/teacherModel");
const Class = mongoose.model("Class");
const Child = mongoose.model("Child"); // Get Collection

exports.getAllChildren = (request, response, next) => {
  Child.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getChildbyId = (request, response, next) => {
  Child.findOne({ _id: request.params.id })
    .then((object) => {
      if (!object) {
        throw new Error("Child Doesn't Exist");
      } else {
        response.status(200).json(object);
      }
    })
    .catch((error) => next(error));
};
exports.getChildClass = (request, response, next) => {
  Class.find(
    { children: request.params.id },
    { _id: 0, children: 1, name: 1, supervisor: 1 }
  )
    .populate([
      {
        path: "children",
        match: { _id: request.params.id },
        select: { fullname: 1, _id: 0 },
      },
    ])
    .populate([
      {
        path: "supervisor",
        select: { fullname: 1, _id: 0 },
      },
    ])
    .then((object) => {
      if (object.length == 0) {
        throw new Error("Class Doesn't Exist");
      } else {
        response.status(200).json(object);
      }
    })
    .catch((error) => next(error));
};
exports.addChild = (request, response, next) => {
  let result = new Child({
    _id: request.body._id,
    fullname: request.body.fullname,
    age: request.body.age,
    level: request.body.level,
    address: request.body.address,
  });
  result
    .save()
    .then((data) => {
      response.status(201).json(data); // status 201 : Created
    })
    .catch((error) => next(error));
};
exports.updateChild = (request, response, next) => {
  /*
I don't know which property i want to update 
So i will create an empty object to get the update property values
*/
  const { _id } = request.body;
  const updatedObject = {};

  for (const property in request.body) {
    if (property === "address") {
      for (const addressProperty in request.body.address) {
        updatedObject[`address.${addressProperty}`] =
          request.body.address[addressProperty];
      }
    } else {
      updatedObject[property] = request.body[property];
    }
  }

  Child.findOneAndUpdate({ _id }, updatedObject, { new: true })
    .then((updatedChild) => {
      if (!updatedChild) {
        throw new Error("Child Doesn't Exist");
      } else {
        response.status(200).json({ message: "Child Updated" });
      }
    })
    .catch((error) => next(error));
};

exports.deleteChild = (request, response, next) => {
  Child.findOneAndDelete({ _id: request.body._id })
    .then((object) => {
      if (!object) {
        throw new Error("Child Doesn't Exist");
      } else {
        response.status(200).json(object.fullname);
      }
    })
    .catch((error) => next(error));
};
