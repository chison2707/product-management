const Chat = require("../../models/chat.model");
const uploadToCloudinary = require("../../helpers/uploadToCloudinary");

module.exports = async (req, res) => {
    const userId = res.locals.user._id.toString();
    const fullName = res.locals.user.fullName;
    const roomChatId = req.params.roomChatId;

    _io.once('connection', (socket) => {
        socket.join(roomChatId);

        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            let images = [];
            for (const imageBuffer of data.images) {
                const link = await uploadToCloudinary(imageBuffer);
                images.push(link);
            }

            // lưu vào database
            const chat = new Chat({
                user_id: userId,
                room_chat_id: roomChatId,
                content: data.content,
                images: images
            });
            await chat.save();

            // trả data về client
            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                fullName: fullName,
                content: data.content,
                images: images
            });
        })
        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
                userId: userId,
                fullName: fullName,
                type: type
            });
        })
    });
}