const checklistModel = require('../models/checklistModel');
const registerModel = require('../models/registerModel');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());

module.exports = { create_checklist, fill_checklist };

async function create_checklist(userparams, u_id) {
	try {
		if (userparams) {
			const find_role = await registerModel.findOne({ _id: u_id });
			if (find_role.role == 'Procurement Manager') {
				userparams.createdBy = 'Procurement Manager';
				const createChecklist = await checklistModel.create(userparams);
				if (createChecklist) {
					return createChecklist;
				} else {
					throw 'create checklist failed!!';
				}
			} else {
				throw 'Only Procurement manager can create checklist!!';
			}
		}
	} catch (err) {
		throw err;
	}
}

async function fill_checklist(userparams, u_id) {
	// try {
	// console.log(userparams);
	const find_role = await registerModel.findOne({ _id: u_id });
	if (find_role.role == 'Inspection Manager') {
		let q = userparams.questions;
		const checklist_data = await checklistModel.findOne({
			_id: userparams.checklistID,
		});
		if (checklist_data != null) {
			for (let i = 0; i < userparams.questions.length; i++) {
				const update = await checklistModel.updateOne(
					{
						_id: userparams.checklistID,
						'questions.questions': userparams.questions[i].questions,
					},
					{
						$set: {
							'questions.$.answers': userparams.questions[i].answers,
							imageBeforeLoading: userparams.imageBeforeLoading,
							imageAfterLoading: userparams.imageAfterLoading,
						},
					}
				);
				console.log('update============', update);
			}
			const image_update = await checklistModel.updateOne({});
			return 'update successfully';
		} else {
			throw 'get checklist data failed!';
		}
	} else {
		throw 'Only Inspection Manager can able to fill checklist';
	}
	// } catch (err) {
	// 	throw err;
	// }
}
