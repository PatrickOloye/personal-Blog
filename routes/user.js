const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

router.get('/allUsers', UserController.getAllUser);

module.exports = router;
