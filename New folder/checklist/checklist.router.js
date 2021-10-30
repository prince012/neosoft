const express = require('express');
const router = express.Router();
const checklistController = require('../checklist/checkilst.controller');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './checklist/images');
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	},
});

var upload = multer({ storage: storage });
var uploadMultiple = upload.fields([
	{ name: 'imageBeforeLoading', maxCount: 10 },
	{ name: 'imageAfterLoading', maxCount: 10 },
]);

module.exports = router;

router.post('/createChecklist', checklistController.create_checklist);
router.post('/fillNewChecklist', checklistController.fill_checklist);
router.post('/uploadImages', uploadMultiple, checklistController.file_upload);
