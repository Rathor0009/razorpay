require('../db/server');

const mongoose = require('mongoose')

const contactdetails = new mongoose.Schema({
	contactId: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	contact: {
		type: Number,
	},
	type: {
		type: String,
	}
	
})

module.exports = mongoose.model('contactdetails', contactdetails)