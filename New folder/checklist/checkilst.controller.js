const checklistService = require('../checklist/checklist.service');
const registerModel = require('../models/registerModel');

module.exports = { create_checklist, fill_checklist, file_upload };

async function file_upload(req, res, next) {
	try {
		if (req.files) {
			const img = req.files.imageAfterLoading[0].filename;
			const img2 = req.files.imageBeforeLoading[0].filename;
			let imageAfterLoading = 'http://localhost:4000/checklist/images/' + img;
			let imageBeforeLoading = 'http://localhost:4000/checklist/images/' + img2;
			res.status(200).send({
				status: true,
				results: { imageAfterLoading, imageBeforeLoading },
			});
		}
	} catch (err) {
		throw err;
	}
}

async function create_checklist(req, res, next) {
	try {
		const authData = await registerModel.findOne({
			authtoken: req.headers['authorization'],
		});
		console.log(authData);
		if (authData != null) {
			await checklistService
				.create_checklist(req.body, authData._id)
				.then(data =>
					data
						? res.send({ status: true, result: data })
						: res
								.status(400)
								.send({ status: false, message: 'checklist creation failed!!' })
				)
				.catch(err => next(err));
			// 	const Orders = await checklistService.create_checklist(
			// 		req.body,
			// 		authData._id
			// 	);
			// 	console.log('controller:         ', Orders);
			// 	if (Orders) {
			// 		res.status(200).json(Orders);
			// 	} else {
			// 		res.status(400).json({ status: false, message: 'duplicate order' });
			// 	}
		} else {
			res
				.status(400)
				.send({ status: false, message: 'provide a valid auth token!!' });
		}
	} catch (err) {
		throw err;
	}
}

async function fill_checklist(request, response, next) {
	// try {
	const authData = await registerModel.findOne({
		authtoken: request.headers['authorization'],
	});
	console.log(authData);
	if (authData != null) {
		await checklistService
			.fill_checklist(request.body, authData._id)
			.then(data =>
				data
					? response.send({ status: true, result: data })
					: response
							.status(400)
							.send({ status: false, message: 'checklist fill up failed!!' })
			)
			.catch(err => next(err));
	} else {
		response
			.status(400)
			.send({ status: false, message: 'provide a valid auth token!!' });
	}
	// } catch (err) {
	// 	throw err;
	// }
}
