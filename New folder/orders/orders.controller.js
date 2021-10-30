const ordersService = require('../orders/orders.service');
const registerModel = require('../models/registerModel');

module.exports = { create_orders, update_orders, getOrders };

async function create_orders(req, res, next) {
	try {
		let userdata = await registerModel.findOne({
			authtoken: req.headers['authorization'],
		});
		console.log(userdata);
		if (userdata != null) {
			await ordersService
				.create_order(req.body, userdata._id)
				.then(orders =>
					orders
						? res.send({ status: true, result: orders })
						: res.status(400).send({ status: false, message: 'order failed!!' })
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

async function update_orders(req, res, next) {
	try {
		let userdata = await registerModel.findOne({
			authtoken: req.headers['authorization'],
		});
		console.log(userdata);
		if (userdata != null) {
			await ordersService
				.update_orders(req.body, userdata._id)
				.then(orders =>
					orders
						? res.send({ status: true, result: orders })
						: res
								.status(400)
								.send({ status: false, message: 'update failed!!' })
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

//get all orders
async function getOrders(req, res, next) {
	try {
		let userdata = await registerModel.findOne({
			authtoken: req.headers['authorization'],
		});
		if (userdata != null) {
			await ordersService
				.getOrders()
				.then(data =>
					data
						? res.send({ status: true, result: data })
						: res
								.status(400)
								.send({ status: false, message: 'get orders failed!!' })
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
