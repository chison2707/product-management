const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");

router.get('/', controller.index);
router.post('/add/:product_id', controller.addPost);
router.get('/delete/:product_id', controller.delete);

module.exports = router;