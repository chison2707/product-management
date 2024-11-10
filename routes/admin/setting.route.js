const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require("../../controllers/admin/setting.controller");

const upload = multer();
const uploadCould = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/general', controller.general);
router.patch('/general', upload.single('logo'), uploadCould.upload, controller.generalPatch);

module.exports = router;