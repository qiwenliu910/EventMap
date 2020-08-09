/* Event mongoose model */
const mongoose = require('mongoose')
const EventSchema = new mongoose.Schema({
	eventId: {
		type: Number,
		required: true,
		// default: 1
	},
	title: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	address: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	author: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	date: {
		type: String,
		required: true,

	},
	type: {
		type: Number,
		required: true,
		// default: 1
	},
	vote: {
		type: Number,
		required: true,
		// default: 1
	},
	severity: {
		type: Number,
		required: true,
		// default: 1
	},
	description: {
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
const Event = mongoose.model('Event', EventSchema)

module.exports = { Event }
