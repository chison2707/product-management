// button status
const buttonStatus = document.querySelectorAll("[button-status");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const stauts = button.getAttribute("button-status");
            if (stauts) {
                url.searchParams.set("status", stauts);
            }
            else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        });
    });
}
// end button status

// form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const key = e.target.elements.keyword.value;

        if (key) {
            url.searchParams.set("keyword", key);
        }
        else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
}
// end form search