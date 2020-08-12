/* Event mongoose model */
const mongoose = require('mongoose')
const EventSchema = new mongoose.Schema({
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
// EventSchema.statics.findByEventId = function(eventId) {
// 	const Event = this // binds this to the Event model
//
// 	// First find the event by their eventId
// 	return Event.findOne({ eventId: eventId }).then((e) => {
// 		if (!e) {
// 			return Promise.reject("No match")  // a rejected promise
// 		}
// 		// if the user exists, make sure their password is correct
// 		return new Promise((resolve, reject) => {
// 			resolve(e)
// 		})
// 	})
// }

const Event = mongoose.model('Event', EventSchema)

module.exports = { Event }
