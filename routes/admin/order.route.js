const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/order.controller");

router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.get('/detail/:id', controller.detail);
router.delete('/delete/:id', controller.deleteItem);

module.exports = router;