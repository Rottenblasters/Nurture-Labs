const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User collection schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
        // to register unique users (not implemented for ease of testing)
        // unique : true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    advisor : [{
        type: Schema.Types.ObjectId,
        ref: 'Advisor'
    }]
});


module.exports = mongoose.model('User', UserSchema);