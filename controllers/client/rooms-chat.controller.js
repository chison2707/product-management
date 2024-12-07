const User = require("../../models/user.model");
const RoomChat = require("../../models/room-chat.model");
// [GET]/rooms-chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;

    const listRoomChat = await RoomChat.find({
        "users.user_id": userId,
        typeRoom: "group",
        deleted: false
    })
    // console.log(listRoomChat)
    res.render("client/pages/rooms-chat/index", {
        pageTitle: "Danh sách phòng",
        listRoomChat: listRoomChat,
    });
}
// [GET]/rooms-chat/create
module.exports.create = async (req, res) => {
    const listFrinends = res.locals.user.friendList;

    for (const friend of listFrinends) {
        const infoFriend = await User.findOne({
            _id: friend.user_id,
        }).select("fullName avatar");
        friend.infoFriend = infoFriend;
    }

    res.render("client/pages/rooms-chat/create", {
        pageTitle: "Tạo phòng chat",
        listFrinends: listFrinends,
    });
}

// [POST]/rooms-chat/create
module.exports.createPost = async (req, res) => {
    const title = req.body.title;
    const usersId = req.body.usersId;

    const dataChat = {
        title: title,
        typeRoom: "group",
        users: [],
    };

    usersId.forEach(userId => {
        dataChat.users.push({
            user_id: userId,
            role: "user"
        });
    });

    dataChat.users.push({
        user_id: res.locals.user.id,
        role: "admin"
    });

    const room = new RoomChat(dataChat);
    await room.save();

    res.redirect(`/chat/${room.id}`);
}