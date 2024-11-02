const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");

router.post('/add/:product_id', controller.addPost);

module.exports = router;