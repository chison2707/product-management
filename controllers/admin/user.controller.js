const User = require("../../models/user.model");
//[GET] / admin/user
module.exports.index = async (req, res) => {
    const user = await User.find({
        deleted: false
    })
    res.render("admin/pages/user/index", {
        pageTitle: "Danh sách tài khoản User",
        user: user
    });
}

//[GET] / admin/dashboard
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    await User.updateOne({ _id: id }, {
        status: status
    })
    req.flash('success', 'Cập nhật trạng thái tài khoản thành công!');

    res.redirect("back");
}