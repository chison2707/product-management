const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();

const controller = require("../../controllers/admin/product.cotroller");
const validate = require("../../validates/admin/product.validate");
const uploadCould = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.delete('/delete/:id', controller.deleteItem);
router.get('/listDelete', controller.listDelete);
router.delete('/listDelete/delete/:id', controller.deleteItemReal);
router.patch('/listDelete/restore/:id', controller.restoreItem);

router.get('/create', controller.create);
router.post('/create',
    upload.single('thumbnail'),
    uploadCould.upload,
    validate.createPost,
    controller.createPost);

router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', upload.single('thumbnail'), validate.createPost, controller.editPatch);

router.get('/detail/:id', controller.detail);

module.exports = router;