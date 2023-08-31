const express = require('express');
const { getProducts } = require('../controllers/ProductsController');
const { authenticateToken } = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/', authenticateToken, getProducts);

module.exports = router;