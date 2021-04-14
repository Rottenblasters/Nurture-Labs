const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Advisor = require('../models/advisors');
const { validateAdvisor } = require('../middleware');



router.post('/advisor',validateAdvisor, catchAsync(async(req, res, next) => {
    try{
        const advisor = new Advisor({name : req.body.name,
                                     image: req.body.image});
        await advisor.save();
        res.status(200).send('200_OK');
    }
    catch{
        res.status(400).send('400_BAD_REQUEST');
    }
}));

module.exports = router;