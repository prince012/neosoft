require('dotenv').config();

const mongoose = require('mongoose');

const URI = process.env.db_connection;

const connectdb = async () => {
	await mongoose.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('DB is connected....!');
};

module.exports = connectdb;

// module.exports = {
// 	Register: require('../models/registerModel'),
// };
