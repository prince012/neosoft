const ordersModel = require('../models/orderModel');
const registerModel = require('../models/registerModel');

module.exports = { create_order, update_orders, getOrders };

//create orders
async function create_order(userparams, p_id) {
	try {
		if (userparams) {
			const find_role = await registerModel.findOne({ _id: p_id });
			console.log('service find role ========== ', find_role);
			if (find_role.role == 'Procurement Manager') {
				const find_clientId = await registerModel.findOne({
					_id: userparams.clientId,
				});
				if (find_clientId != null) {
					const find_inspectionId = await registerModel.findOne({
						_id: userparams.inspectionId,
					});
					if (find_inspectionId != null) {
						userparams.procurementId = p_id;
						userparams.clientId = find_clientId._id;
						userparams.inspectionId = find_inspectionId._id;
						userparams.status = 'Processing';
						const create_order = await ordersModel.create(userparams);
						if (create_order) {
							return create_order;
						} else {
							throw 'order creation failed!!';
						}
					} else {
						throw 'enter a valid Inspection Manager ID!!';
					}
				} else {
					throw 'enter a valid Client ID!!';
				}
			} else {
				throw 'Only Procurement Manager can Create an Order!!';
			}
		}
	} catch (err) {
		throw err;
	}
}

//update orders
async function update_orders(userparams, id) {
	try {
		if (userparams) {
			const find_role = await registerModel.findOne({ _id: id });
			if (
				find_role.role == 'Procurement Manager' ||
				find_role.role == 'Admin' ||
				find_role.role == 'Inspection Manager'
			) {
				const update = await ordersModel.updateOne(
					{ _id: userparams.id },
					{ $set: { status: userparams.status } }
				);
				if (update) {
					return 'order status updated successfully!!';
				} else {
					throw 'update status failed!!';
				}
			} else {
				throw 'Inspection manager, procurement manager and admin will be able to update the status of order.';
			}
		}
	} catch (err) {
		throw err;
	}
}

//get orders
async function getOrders(id) {
	try {
		const find_id = registerModel.findOne({ _id: id });
		if (find_id != null) {
			const orders = ordersModel.find();
			if (orders.length != 0) {
				return orders;
			} else {
				throw 'fetching orders failed!!';
			}
		} else {
			throw 'auth token is incorrect!!';
		}
	} catch (err) {
		throw err;
	}
}
