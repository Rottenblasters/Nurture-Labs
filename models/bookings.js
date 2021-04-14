const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Bookings collection schema
const BookingSchema = new Schema({
    userId : {
        type: String,
        required : true
    },
    advisor : {
        type: Schema.Types.ObjectId,
        ref: 'Advisor'
    },
    bookingTime : {
        type : String,
        required : true
    }
});



module.exports = mongoose.model('Booking', BookingSchema);