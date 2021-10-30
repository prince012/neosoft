const registerService = require('../register/register.service');
const registerModel = require('../models/registerModel');

module.exports = { add_user, add_admin };

//add user
async function add_user(request, response, next) {
	// console.log(request.body);
	try {
		const authData = await registerModel.findOne({
			authtoken: request.headers['authorization'],
		});
		if (authData != null) {
			await registerService
				.add_user(request.body, authData._id)
				.then(data =>
					data
						? response.send({ status: true, result: data })
						: response
								.status(400)
								.send({ status: false, message: 'register failed!!' })
				)
				.catch(err => next(err));
		} else {
			response
				.status(400)
				.send({ status: false, message: 'provide a valid auth token!!' });
		}
	} catch (error) {
		response.status(400).send(error);
	}
}

//add admin
async function add_admin(request, response, next) {
	// console.log(request.body);
	try {
		await registerService
			.add_admin(request.body)
			.then(data =>
				data
					? response.send({ status: true, result: data })
					: response
							.status(400)
							.send({ status: false, message: 'register failed!!' })
			)
			.catch(err => next(err));
	} catch (error) {
		response.status(400).send(error);
	}
}
