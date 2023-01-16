// require('../db/server');
// const mongoose = require("mongoose");


// const orderSchema = new mongoose.Schema({
//     orderId: {
//         type: String,
       
//     },
//     amount: {
//         type: String,
        
//     },
//     status: {
//         type: String,
//         required: true,
      
//     }
//     // subscriptions_Status   : {
//     //     type: Number,
//     //     default:0
       
//     // }

// })



// const razorOrder = new mongoose.model('razorOrder', orderSchema);

require('../db/server');

const mongoose = require('mongoose')

const paymentDetailsSchema = new mongoose.Schema({
	orderId: {
		type: String,
		required: true
	},
	receiptId: {
		type: String
	},
	paymentId: {
		type: String,
	},
	signature: {
		type: String,
	},
	amount: {
		type: String
	},
	currency: {
		type: String
	},
	createdAt: {
		type: Date
	},
	status: {
		type: String
	}
})

module.exports = mongoose.model('PaymentDetail', paymentDetailsSchema)
// module.exports = razorOrder