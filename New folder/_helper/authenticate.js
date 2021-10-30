const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = {
	authenticateToken,
};

async function authenticateToken(userheader) {
	const token = userheader && userheader.split(' ')[1];
	if (token == null) {
		return 'Please provide a auth token';
	} else {
		const verified = jwt.verify(token, config.secret_token);
		if (verified) {
			return verified;
		} else {
			throw 'invalid auth token';
		}
	}
}
