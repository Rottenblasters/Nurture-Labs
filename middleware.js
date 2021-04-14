const { advisorSchema ,
        userSchema,
        registerSchema,
        bookingSchema} = require('./schemas.js');
const User = require("./models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('./models/user.js');


// Advisor registration validation middleware
module.exports.validateAdvisor = (req, res, next) => {
    const { error } = advisorSchema.validate(req.body);
    if (error) {
        return res.status(400).send('400_BAD_REQUEST');
    } else {
        next();
    }
};

// User registration validation middleware
module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send('400_BAD_REQUEST');
    } else {
        next();
    }
};

// User login validation middleware
module.exports.loginValidation = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).send('400_BAD_REQUEST');
    } else {
        next();
    }
};

// User login authentication middleware
module.exports.authenticate = async(req, res, next) => {
    const {email, password} = req.body;

    // check if email exists
    const user = await User.findOne({email: email});
    if(!user) return res.status(401).send('401_AUTHENTICATION_ERROR');

    // check if password correct
    const validPswd = await bcrypt.compare(password, user.password);
    if(!validPswd) return res.status(401).send('401_AUTHENTICATION_ERROR');

    req.user = user;
    next();
};

// booking registration validation middleware
module.exports.validateBooking = (req, res, next) => {
    const { error } = bookingSchema.validate(req.body);
    if (error) {
        return res.status(400).send('400_BAD_REQUEST');
    } else {
        next();
    }
};

