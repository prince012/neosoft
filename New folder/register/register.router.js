const express = require('express');
const router = express.Router();
const registerController = require('../register/register.controller');

module.exports = router;

router.post('/registerUser', registerController.add_user);
router.post('/regiserAdmin', registerController.add_admin);
