const mongoose = require("mongoose");
require("./../models/teacherModel");
const Teacher = mongoose.model("Teacher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = function (request, response, next) {
  // Check Email Existance
  Teacher.findOne({ email: request.body.email })
    .then((object) => {
      if (!object) {
        const { fullname, password, email, isAdmin } = request.body;
        const image = request.file.filename;
        const rounds = bcrypt.genSaltSync(+process.env.hashingRounds);
        hash = bcrypt.hashSync(password, rounds);

        let object = new Teacher({
          fullname: fullname,
          email: email,
          password: hash,
          image: image,
          isAdmin: isAdmin,
        });

        object
          .save()
          .then((data) => {
            // 3. send response with jwt Token
            const token = jwt.sign(
              {
                userId: object._id,
                userName: object.fullname,
                isAdmin: object.isAdmin,
              },
              process.env.secretKey
            );
            response
              .status(200)
              .json({ message: "Teacher Registered" + " , " + token });
          })
          .catch((error) => next(error));
      } else {
        throw new Error("Duplicated Teacher ");
      }
    })
    .catch((error) => next(error));
};
exports.login = (request, response, next) => {
  Teacher.findOne({ email: request.body.email })
    .then((object) => {
      //1. Check Email Existance
      if (!object) throw new Error("Email Not Found");

      //2. Compare Password by decrypt it first then compare
      const password = bcrypt.compareSync(
        request.body.password,
        object.password
      );
      if (!password) throw new Error("Password Not Identical ");

      // 3. If Email and Password >> Correct
      const token = jwt.sign(
        {
          userId: object._id,
          userName: object.fullname,
          isAdmin: object.isAdmin,
        },
        process.env.secretKey
      );
      response.status(200).json({ token });
    })
    .catch((error) => next(error));
};
