// chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");
            const userId = button.getAttribute("btn-add-friend");

            socket.emit("CLIENT_ADD_FRIEND", userId);
        });
    });
}
// end chức năng gửi yêu cầu

// chức năng hủy kết bạn
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");
            const userId = button.getAttribute("btn-cancel-friend");

            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        });
    });
}
//end chức năng hủy kết bạn

// chức năng từ chối kết bạn
const listBtnRefuselFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuselFriend.length > 0) {
    listBtnRefuselFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse");
            const userId = button.getAttribute("btn-refuse-friend");

            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        });
    });
}
//end chức năng từ chối kết bạn

// chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("accepted");
            const userId = button.getAttribute("btn-accept-friend");

            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        });
    });
}
//end chức năng chấp nhận kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgeUsersAccept = document.querySelector("[badge-users-accept]");
    const userId = badgeUsersAccept.getAttribute("badge-users-accept");
    if (userId == data.userId) {
        badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
    }
});
// end SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    const userId = dataUsersAccept.getAttribute("data-users-accept");
    if (userId == data.userId) {
        const newBoxUser = document.createElement("div");
        newBoxUser.classList.add("col-6");
        newBoxUser.innerHTML = ` <div class="box-user">
                    <div class="inner-avatar">
                        <img src='/images/avatarDefault.png' alt=${data.inforUserA.fullName}>
                    </div>
                    <div class="inner-info">
                        <div class="inner-name">${data.inforUserA.fullName}</div>
                        <div class="inner-buttons">
                            <button class="btn btn-sm btn-primary mr-1" btn-accept-friend=${data.inforUserA._id} >Chấp nhận</button>
                            <button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend=${data.inforUserA._id} >Xóa</button>
                            <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="" disabled="">Đã xóa</button>
                            <button class="btn btn-sm btn-primary mr-1" btn-accepted-friend="" disabled="">Đã kết bạn</button>
                        </div>
                    </div>
                </div>`;
        dataUsersAccept.appendChild(newBoxUser);

        // xóa lời mời kết bạn
        const btnRefuseFriend = newBoxUser.querySelector("[btn-refuse-friend]");
        btnRefuseFriend.addEventListener("click", () => {
            btnRefuseFriend.closest(".box-user").classList.add("refuse");
            const userId = btnRefuseFriend.getAttribute("btn-refuse-friend");

            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        });
        //end xóa lời mời kết bạn
        // chấp nhận lời mời kết bạn
        const btnAcceptFriend = newBoxUser.querySelector("[btn-accept-friend]")
        btnAcceptFriend.addEventListener("click", () => {
            btnAcceptFriend.closest(".box-user").classList.add("accepted");
            const userId = btnAcceptFriend.getAttribute("btn-accept-friend");

            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        });
        // end chấp nhận lời mời kết bạn
    }
});
// end SERVER_RETURN_INFO_ACCEPT_FRIEND