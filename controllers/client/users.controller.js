const User = require("../../models/user.model");

// [GET]/user/infor/edit/:id
module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id;
    const users = await User.find({
        _id: { $ne: userId },
        status: "active",
        deleted: false
    })
    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    });
}