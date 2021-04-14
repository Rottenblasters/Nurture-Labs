const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique : true
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