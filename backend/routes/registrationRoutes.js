const express = require('express');
const { registration } = require('../controllers/RegistrationController');
const router = express.Router();

router.post('/', registration);

module.exports = router;