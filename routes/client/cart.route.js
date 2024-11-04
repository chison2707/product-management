const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");

router.get('/', controller.index);
router.post('/add/:product_id', controller.addPost);
router.get('/delete/:product_id', controller.delete);
router.get('/update/:product_id/:quantity', controller.update);

module.exports = router;