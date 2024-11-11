const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/user.controller");


router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
// router.get('/change-status/:id', controller.detail);
module.exports = router;