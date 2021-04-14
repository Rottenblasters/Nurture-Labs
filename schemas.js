const Joi = require('joi');

module.exports.advisorSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
});

module.exports.userSchema = Joi.object({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    password : Joi.string().required()
});

module.exports.registerSchema = Joi.object({
    email: Joi.string().required().email(),
    password : Joi.string().required()
});

module.exports.bookingSchema = Joi.object({
    bookingTime : Joi.string().required() 
});

