var sha512 = require('js-sha512');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const registerModel = require('../models/registerModel');

module.exports = {
	login,
	logout,
};

//login
async function login(userparams) {
	try {
		const emailRegexp =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		const mail = emailRegexp.test(userparams.username);
		console.log(mail);
		if (mail != false) {
			const userdata = await registerModel.find({
				email: userparams.username,
			});
			if (userdata != 0) {
				if (
					userdata[0].role == 'Admin' ||
					userdata[0].role == 'Client' ||
					userdata[0].role == 'Procurement Manager' ||
					userdata[0].role == 'Inspection Manager'
				) {
					if (sha512(userparams.password) === userdata[0].password) {
						const accesstoken = await jwt.sign(
							userdata[0].email,
							config.secret_token
						);
						const login_status = await registerModel.updateOne(
							{ email: userparams.username },
							{ $set: { login_status: true, authtoken: accesstoken } }
						);
						if (login_status) {
							userdata[0].login_status = true;
							userdata[0].authtoken = accesstoken;
							return userdata[0];
						} else {
							throw 'update login status failed';
						}
					} else {
						throw 'Incorrect Password!!';
					}
				}
			} else {
				throw 'user not found!!';
			}
		} else {
			const userdata = await registerModel.find({
				phone: userparams.username,
			});
			if (userdata != 0) {
				if (userdata[0].role === 'Inspection Manager') {
					if (sha512(userparams.password) === userdata[0].password) {
						const accesstoken = jwt.sign(
							userdata[0].phone,
							config.secret_token
						);
						const login_status = await registerModel.updateOne(
							{ phone: userparams.username },
							{ $set: { login_status: true, authtoken: accesstoken } }
						);
						if (login_status) {
							userdata[0].login_status = true;
							userdata[0].authtoken = accesstoken;
							return userdata[0];
						} else {
							throw 'update login status failed';
						}
					} else {
						throw 'Incorrect Password!!';
					}
				} else {
					throw 'Only Inspection Manager can login through Mobile number';
				}
			} else {
				throw 'user not found!!';
			}
		}
	} catch (err) {
		throw err;
	}
}

//logout
async function logout(id) {
	try {
		const userdata = await registerModel.findOne({ _id: id });
		console.log('service id ========= ', userdata);
		if (userdata != 0) {
			const logoutdata = await registerModel.updateOne(
				{ _id: userdata._id },
				{ $set: { login_status: false } }
			);
			console.log('logout data -----', logoutdata);
			if (logoutdata) {
				return 'logout Successfully!!';
			} else {
				throw 'logout failed!!';
			}
		}
	} catch (err) {
		throw err;
	}
}
