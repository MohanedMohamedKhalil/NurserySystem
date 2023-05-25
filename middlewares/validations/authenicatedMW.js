const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (request, response, next) => {
  //check if the request has token
  let token;

  try {
    token = request.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.secretKey);
    request.decodedObject = decodedToken;
    console.log(request.decodedObject);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.isAdmin = (request, repsone, next) => {
  if (request.decodedObject.isAdmin == true) next();
  else {
    let error = new Error(" You Not Authorized");
    error.status = 403;
    next(error);
  }
};
