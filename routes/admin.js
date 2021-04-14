const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Advisor = require('../models/advisors');
const { validateAdvisor } = require('../middleware');



router.post('/advisor',validateAdvisor, catchAsync(async(req, res, next) => {
    const advisor = new Advisor({name : req.body.name,
                                 image: req.body.image});
    await advisor.save();
    res.status(200).send('200_OK');
}));

module.exports = router;