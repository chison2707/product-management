const User = require("../../models/user.model");
const Order = require("../../models/order.model");
//[GET] / admin/user
module.exports.index = async (req, res) => {
    const user = await User.find({
        deleted: false
    })
    res.render("admin/pages/user/index", {
        pageTitle: "Danh sách tài khoản User",
        userClient: user
    });
}

//[PATCH] / admin/user/:status/:id
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    await User.updateOne({ _id: id }, {
        status: status
    })
    req.flash('success', 'Cập nhật trạng thái tài khoản thành công!');

    res.redirect("back");
}

//[GET] / admin/user/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
        _id: id,
        deleted: false
    }).select("-password");
    user.order = await Order.countDocuments({ user_id: user.tokenUser });

    res.render("admin/pages/user/detail", {
        pageTitle: `Chi tiết tài khoản ${user.fullName}`,
        userClient: user
    });
}

//[GET] / admin/user/delete/:id
module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.deleteOne({ _id: id })

    req.flash('success', 'Xóa tài khoản thành công!');
    res.redirect("back");
}