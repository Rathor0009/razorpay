require('../db/server');
const mongoose = require("mongoose");


const dataschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
      
    },
    payment_Status   : {
        type: Number,
        default:0
       
    }

})



const razorUser = new mongoose.model('razorUser', dataschema);
module.exports = razorUser