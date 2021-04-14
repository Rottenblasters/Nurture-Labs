const Joi = require('joi');

// register advisor validation schema
module.exports.advisorSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
});

// register user validation schema
module.exports.userSchema = Joi.object({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    password : Joi.string().required()
});

// login user validation schema
module.exports.registerSchema = Joi.object({
    email: Joi.string().required().email(),
    password : Joi.string().required()
});

// make booking validation schema
module.exports.bookingSchema = Joi.object({
    bookingTime : Joi.string().required() 
});

