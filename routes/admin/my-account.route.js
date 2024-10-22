const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer();
const controller = require("../../controllers/admin/my-account.controller");
const uploadCould = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/', controller.index);
router.get('/edit', controller.edit);
router.patch('/edit',
    upload.single('avatar'),
    uploadCould.upload,
    controller.editPatch);

module.exports = router;