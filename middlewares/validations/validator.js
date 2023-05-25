const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {
  let result = validationResult(request);
  console.log(result.errors);
  if (result.errors.length != 0) {
    let errorMsg = result.errors.reduce((acc, el) => acc + el.msg + " ,", "");
    // console.log(errorMsg);
    let error = new Error(errorMsg);
    error.status = 422;
    next(error);
  } else next();
};
