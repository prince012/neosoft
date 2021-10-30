const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	orderName: { type: String, required: true },
	procurementId: { type: String, required: true },
	clientId: { type: String, required: true },
	inspectionId: { type: String, required: true },
	status: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('orders', schema);
