const signin = require("../schema/signin");
const AppError = require("../utils/AppError")

module.exports = (req, res, next) => {
  const valid = signin.validate(req.body);

  if (valid.error) {
    throw new AppError(valid.error.message);
  }

  next();
};
