const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Booking = require('../models/bookings');
const { validateUser,
        loginValidation,
        authenticate,
        validateBooking } = require('../middleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT secret or private key 
const secret  = process.env.SECRET || 'thisshouldbeabettersecret!';


// GET user advisors
router.get('/:userId/advisor',catchAsync(async(req, res, next) => {
    try{
        const{ userId } = req.params;

        // get user by id
        const user = await User.findById(userId).populate('advisor','_id name image');

        // get advisor array
        const advisors = user.advisor;

        // get unique advisors
        const uniqueAdvisors = advisors.filter((x, i, a) => a.indexOf(x) == i);

        res.status(200).send(uniqueAdvisors);
    }
    catch{
        return res.status(400).send('400_BAD_REQUEST');
    }
}));

// GET user bookings
router.get('/:userId/advisor/booking',catchAsync(async(req, res, next) => {
    try{
        const{ userId } = req.params;

        // get bookings
        const bookings = await Booking.find({userId: userId}).populate('advisor');

        // restructuring of data
        let details = [];
        for(let booking of bookings){
            let info ={
                Advisor_Name : booking.advisor.name,
                Advisor_Image : booking.advisor.image,
                Advisor_Id : booking.advisor._id,
                Booking_Time : booking.bookingTime,
                Booking_Id : booking._id
            };
            details.push(info);
        }

        res.status(200).send(details);
    }
    catch{
        return res.status(400).send('400_BAD_REQUEST');
    }
}));


// Register user
router.post('/register',validateUser, catchAsync(async(req, res, next) => {
    try{
        const { email, name, password } = req.body;

        // generate salt
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashpswd = await bcrypt.hash(password, salt);

        // create new user
        const user = new User({ email, name, password:hashpswd });
        const registeredUser = await user.save();

        // generate JWT token
        const token = jwt.sign({_id : registeredUser._id,},secret);
        res.header('jwt-token', token).send({'jwt-token': token,
                                              'user-id': registeredUser._id});
    }
    catch {
        return res.status(400).send('400_BAD_REQUEST');
    }    
}));


// Login user
router.post('/login',loginValidation, authenticate, catchAsync(async(req, res, next) => {
    const token = jwt.sign({_id : req.user._id,},secret);

    // generate JWT token
    res.header('jwt-token', token).send({'jwt-token': token,
                                         'user-id': req.user._id});
}));

// Make a booking
router.post('/:userId/advisor/:advisorId',validateBooking, catchAsync(async(req, res, next) => {
    try{
        const {userId, advisorId} = req.params;
        const { bookingTime } = req.body;

        // new booking
        const booking = new Booking({bookingTime, userId});
        booking.advisor = advisorId;

        // find user by id
        const user = await User.findById(userId);

        // add advisor to user
        user.advisor.push(advisorId);

        await user.save();
        await booking.save();

        return res.status(200).send('200_OK');
    }
    catch{
        return res.status(400).send('400_BAD_REQUEST');
    }
}));


module.exports = router;