const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	createdBy: { type: String, required: true },
	clientId: { type: String, required: true }, //
	inspectionId: { type: String, required: true }, //
	questions: [
		{
			questions: { type: String, required: true },
			answers: { type: String },
			isReq: { type: Boolean, required: true },
			type: { type: String, required: true },
			options: { type: Array, required: true },
		},
	],
	imageBeforeLoading: { type: String }, //
	imageAfterLoading: { type: String }, //
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('checklists', schema);
