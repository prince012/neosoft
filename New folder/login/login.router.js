const express = require('express');
const router = express.Router();
const loginController = require('../login/login.controller');

module.exports = router;

router.post('/login', loginController.login);
router.post('/logout', loginController.logout, loginController.authorize);
