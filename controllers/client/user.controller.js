const md5 = require('md5');
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const ForgorPassword = require('../../models/forgot-password.model');

const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");

// [GET]/user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    });
}

// [POST]/user/register
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if (existEmail) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("back");
        return;
    }

    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

// [GET]/user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    });
}

// [POST]/user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }

    if (md5(password) != user.password) {
        req.flash("error", "Mật khẩu không đúng!");
        res.redirect("back");
        return;
    }

    if (user.status == "inactive") {
        req.flash("error", "Tài khoản đã bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);
    res.redirect(`/`);
}

// [GET]/user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect(`/`);
}

// [GET]/user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Quên mật khẩu"
    });
}

// [POST]/user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }
    // Tạo mã otp và lưu otp, email vào collection forgot password
    const otp = generateHelper.generateRandomNumber(8);
    const objforgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    };

    const forgotPassword = new ForgorPassword(objforgotPassword);
    await forgotPassword.save();

    // gửi mã otp qua email của user
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `
        Mã OTP lấy lại mật khẩu là <b>${otp}</b>.Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP
    `;

    sendMailHelper.sendMail(email, subject, html);


    res.redirect(`/user/password/otp?email=${email}`);
}

// [GET]/user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password", {
        pageTitle: "Nhập mã otp",
        email: email
    });
}

// [POST]/user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if (!result) {
        req.flash("error", "Mã OTP không đúng!");
        res.redirect("back");
        return;
    };

    const user = await User.findOne({
        email: email
    })

    res.cookie("tokenUser", user.tokenUser);

    res.redirect(`/user/password/reset`);
}

// [GET]/user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đặt lại mật khẩu"
    });
}

// [POST]/user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password)
    });

    req.flash("success", "Đổi mật khẩu thành công!!!");
    res.redirect("/");
}