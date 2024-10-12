const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer();
const controller = require("../../controllers/admin/account.controller");
const validate = require("../../validates/admin/account.validate");
const uploadCould = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/', controller.index);
router.get('/create', controller.create);

router.post('/create',
    upload.single('avatar'),
    uploadCould.upload,
    validate.createPost,
    controller.createPost);

module.exports = router;