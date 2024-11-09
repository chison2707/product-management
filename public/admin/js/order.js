// change status
const selectChangeStatus = document.querySelectorAll("[select-change-status]");
if (selectChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    selectChangeStatus.forEach(option => {
        option.addEventListener("change", (e) => {
            const id = option.getAttribute("data-id");
            const statusChange = e.target.value;

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
}
// end change status