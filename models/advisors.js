const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Advisor collection schema
const AdvisorSchema = new Schema({
    name: {
        type : String,
        required : true
        // to register unique advisors (not implemented for ease of testing)
        // unique : true
    },
    image: {
        type : String,
        required: true
    }
});

module.exports = mongoose.model('Advisor', AdvisorSchema);