const User = require("../../models/user.model");

const usersSocket = require("../../sockets/client/users.socket");

// [GET]/user/infor/edit/:id
module.exports.notFriend = async (req, res) => {
    // socket
    usersSocket(res);
    //end socket

    const userId = res.locals.user.id;
    const myUser = await User.findOne({ _id: userId });
    const requestFriends = myUser.requestFriends;
    const acceptFriends = myUser.acceptFriends;
    const users = await User.find({
        $and: [
            { _id: { $ne: userId } },
            { _id: { $nin: requestFriends } },
            { _id: { $nin: acceptFriends } }
        ],
        status: "active",
        deleted: false
    })
    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    });
}