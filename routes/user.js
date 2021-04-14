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

const secret  = process.env.SECRET || 'thisshouldbeabettersecret!';


router.get('/:userId/advisor',catchAsync(async(req, res, next) => {
    try{
        const{ userId } = req.params;
        const user = await User.findById(userId).populate('advisor','_id name image');
        const advisors = user.advisor;
        const uniqueAdvisors = advisors.filter((x, i, a) => a.indexOf(x) == i);
        res.status(200).send(uniqueAdvisors);
    }
    catch{
        return res.status(400).send('400_BAD_REQUEST');
    }
}));

router.get('/:userId/advisor/booking',catchAsync(async(req, res, next) => {
    try{
        const{ userId } = req.params;
        const bookings = await Booking.find({userId: userId}).populate('advisor');
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


router.post('/register',validateUser, catchAsync(async(req, res, next) => {
    try{
        const { email, name, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashpswd = await bcrypt.hash(password, salt);
        const user = new User({ email, name, password:hashpswd });
        const registeredUser = await user.save();
        const token = jwt.sign({_id : registeredUser._id,},secret);
        res.header('jwt-token', token).send({'jwt-token': token,
                                              'user-id': registeredUser._id});
    }
    catch {
        return res.status(400).send('400_BAD_REQUEST');
    }    
}));

router.post('/login',loginValidation, authenticate, catchAsync(async(req, res, next) => {
    const token = jwt.sign({_id : req.user._id,},secret);
    res.header('jwt-token', token).send({'jwt-token': token,'user-id': req.user._id});
}));

router.post('/:userId/advisor/:advisorId',validateBooking, catchAsync(async(req, res, next) => {
    try{
        const {userId, advisorId} = req.params;
        const { bookingTime } = req.body;
        const booking = new Booking({bookingTime, userId});
        booking.advisor = advisorId;
        const user = await User.findById(userId);
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