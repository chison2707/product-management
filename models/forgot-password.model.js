const mongoose = require('mongoose');
const generate = require("../helpers/generate");

const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 120
    }
}, {
    timestamps: true
});
const ForgorPassword = mongoose.model("ForgorPassword", forgotPasswordSchema, "forgot-password");

module.exports = ForgorPassword;