const loginService = require('../login/login.service');
const auth = require('../_helper/authenticate');
const registerModel = require('../models/registerModel');

module.exports = { login, authorize, logout };

//login
async function login(req, res, next) {
	console.log(req.body);
	try {
		await loginService
			.login(req.body)
			.then(data =>
				data
					? res.send({ status: true, result: data })
					: res.status(400).send({ status: false, message: 'login failed!!' })
			)
			.catch(err => next(err));
	} catch (err) {
		throw err;
	}
}

//authorize
async function authorize(req, res, next) {
	try {
		await auth
			.authenticateToken(req.headers.authorization)
			.then(data =>
				data
					? res.send({ status: true, result: data })
					: res
							.status(400)
							.send({ status: false, message: 'Authorization failed!!' })
			)
			.catch(err => next(err));
	} catch (err) {
		throw err;
	}
}

//logout
async function logout(req, res, next) {
	try {
		let userdata = await registerModel.findOne({
			authtoken: req.headers['Authorization'],
		});
		if (userdata != null) {
			await loginService
				.logout(userdata._id)
				.then(data =>
					data
						? res.send({ status: true, result: data })
						: res
								.status(400)
								.send({ status: false, message: 'logout failed!!' })
				)
				.catch(err => next(err));
		} else {
			res
				.status(400)
				.send({ status: false, message: 'provide a valid auth token!!' });
		}
	} catch (err) {
		throw err;
	}
}
