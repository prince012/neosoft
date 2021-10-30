const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	phone: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	confirm_password: { type: String, required: true },
	role: { type: String, required: true },
	login_status: { type: Boolean, required: true },
	authtoken: { type: String, required: true },
	createdBy: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('registers', schema);
