const express = require('express');
const { authentication } = require('../controllers/AuthenticationController');
const router = express.Router();

router.post('/', authentication);

module.exports = router;