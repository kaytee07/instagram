const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string(),
  verifyPassword: Joi.string().required()
});

module.exports = signupSchema;
