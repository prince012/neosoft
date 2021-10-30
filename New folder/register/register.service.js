var sha512 = require('js-sha512');
const registerModel = require('../models/registerModel');
const validator = require('../validator/validate');

module.exports = {
	add_user,
	add_admin,
};

async function add_user(userparams, u_id) {
	try {
		if (userparams) {
			var validation = await validator.add_userValidator(userparams);
			if (validation.error) {
				const errors = validation.error;
				throw errors;
			} else {
				const userdata = await registerModel.findOne({
					email: userparams.email,
				});
				if (userdata != null) {
					throw 'already registered!!';
				} else {
					const find_role = await registerModel.findOne({ _id: u_id });
					if (find_role.role == 'Admin') {
						if (
							userparams.role == 'Procurement Manager' ||
							userparams.role == 'Client' ||
							userparams.role == 'Inspection Manager'
						) {
							if (userparams.password == userparams.confirm_password) {
								userparams.password = sha512(userparams.password);
								userparams.confirm_password = sha512(
									userparams.confirm_password
								);
								userparams.login_status = false;
								userparams.authtoken = 0;
								userparams.createdBy = 'Admin';
								const userObj = await registerModel.create(userparams);
								if (userObj) {
									return userObj;
								} else {
									throw 'register failed!!';
								}
							} else {
								throw 'password and conf. password should be same';
							}
						} else {
							throw 'Admin can create only procurement manager, inspection manager, client.';
						}
					} else if (find_role.role == 'Procurement Manager') {
						if (
							userparams.role == 'Client' ||
							userparams.role == 'Inspection Manager'
						) {
							const all_users = await registerModel.find();
							const filteredUser = await all_users.filter(
								data => data.role == 'Inspection Manager'
							);
							if (filteredUser.length != 0) {
								throw 'Inspection Manager already present and contact admin for the same.';
							} else {
								if (userparams.password == userparams.confirm_password) {
									userparams.password = sha512(userparams.password);
									userparams.confirm_password = sha512(
										userparams.confirm_password
									);
									userparams.login_status = false;
									userparams.authtoken = 0;
									userparams.createdBy = 'Procurement Manager';
									const userObj = await registerModel.create(userparams);
									if (userObj) {
										return userObj;
									} else {
										throw 'register failed!!';
									}
								} else {
									throw 'password and conf. password should be same';
								}
							}
						} else {
							throw 'Procurement Manager can create only inspection manager, client.';
						}
					}
				}
			}
		}
	} catch (error) {
		throw error;
	}
}

//admin register
async function add_admin(userparams) {
	try {
		if (userparams) {
			var validation = await validator.add_userValidator(userparams);
			if (validation.error) {
				const errors = validation.error;
				throw errors;
			} else {
				const userdata = await registerModel.findOne({
					role: userparams.role,
				});
				if (userdata != null) {
					throw 'Admin already registered!!';
				} else {
					if (userparams.password == userparams.confirm_password) {
						userparams.password = sha512(userparams.password);
						userparams.confirm_password = sha512(userparams.confirm_password);
						userparams.login_status = false;
						userparams.authtoken = 0;
						userparams.createdBy = 'Admin';
						const userObj = await registerModel.create(userparams);
						if (userObj) {
							return userObj;
						} else {
							throw 'register failed!!';
						}
					} else {
						throw 'password and conf. password should be same';
					}
				}
			}
		}
	} catch (error) {
		throw error;
	}
}
