const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/product.cotroller");

router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.delete('/delete/:id', controller.deleteItem);
router.get('/listDelete', controller.listDelete);
router.delete('/listDelete/delete/:id', controller.deleteItemReal);
router.patch('/listDelete/restore/:id', controller.restoreItem);

router.get('/create', controller.create);
router.post('/create', controller.createPost);


module.exports = router;