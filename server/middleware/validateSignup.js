const signup = require("../schema/signup");
const AppError = require("../utils/AppError");

module.exports = (req, res, next) => {
  console.log(req.body)
     const valid = signup.validate(req.body);

     if (valid.error) {
       throw new AppError(valid.error.message);
     }        

     next();
}