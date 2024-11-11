const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require("../../controllers/client/user.controller");

const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");
const upload = multer();
const uploadCould = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/register', controller.register);
router.post('/register', validate.registerPost, controller.registerPost);
router.get('/login', controller.login);
router.post('/login', validate.loginPost, controller.loginPost);
router.get('/logout', controller.logout);
router.get('/password/forgot', controller.forgotPassword);
router.post('/password/forgot', validate.forgotPassword, controller.forgotPasswordPost);
router.get('/password/otp', controller.otpPassword);
router.post('/password/otp', controller.otpPasswordPost);
router.get('/password/reset', controller.resetPassword);
router.post('/password/reset', validate.resetPasswordPost, controller.resetPasswordPost);

router.get('/password/change-password', authMiddleware.requireAuth, controller.changePassword);
router.post('/password/change-password', authMiddleware.requireAuth, validate.changePassword, controller.changePasswordPost);

router.get('/infor', authMiddleware.requireAuth, controller.infor);
router.get('/infor/edit', authMiddleware.requireAuth, controller.editInfor);
router.patch('/infor/edit', upload.single('avatar'), uploadCould.upload, authMiddleware.requireAuth, controller.editInforPatch);

module.exports = router;