const  Joi = require('joi');

const signinSchema = Joi.object({
    email: Joi.string()
            .email({minDomainSegments:2}),
    password:Joi.string()
             
})

module.exports = signinSchema