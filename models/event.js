/* Event mongoose model */
const mongoose = require('mongoose')

const Event = mongoose.model('Event', {
	CRIME_ID: {
		type: Number,
		required: true,
		// default: 1
	},
	TITLE: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	ADDRESS: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	ARTHOR: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	DATE: {
		type: String,
		required: true,
		
	},
	TYPE: {
		type: Number,
		required: true,
		// default: 1
	},
	VOTE: {
		type: Number,
		required: true,
		// default: 1
	},
	SEVERITY: {
		type: Number,
		required: true,
		// default: 1
	},
	DESCRIPTION: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	coordinates: {
		type: Array,
		required: true,
		
	}
})

module.exports = { Event }