document.addEventListener('DOMContentLoaded', function () {
    const alerts = document.querySelectorAll('.alert[show-alert]');

    alerts.forEach(alert => {
        const time = alert.getAttribute('data-time');
        const closeButton = alert.querySelector('.close-alert');

        // Show alert with slide-in effect
        setTimeout(() => {
            alert.classList.add('show');
        }, 100);

        // Auto-close after specified time with slide-out effect
        setTimeout(() => {
            alert.classList.add('hide');
            setTimeout(() => alert.remove(), 500); // Remove alert after animation ends
        }, time);

        // Close alert on close button click with slide-out effect
        closeButton.addEventListener('click', () => {
            alert.classList.add('hide');
            setTimeout(() => alert.remove(), 500); // Remove alert after animation ends
        });
    });
});

// button go back

const btnGoBack = document.querySelectorAll("[btn-go-back]");
if (btnGoBack.length > 0) {
    btnGoBack.forEach(btn => {
        btn.addEventListener("click", () => {
            history.back();
        });
    });
}

// end button go back

// upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    const removeImage = document.querySelector("[removeImage]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
            removeImage.style.display = 'block';
        }
    });
    removeImage.addEventListener("click", () => {
        uploadImageInput.value = '';
        uploadImagePreview.src = '';
        removeImage.style.display = 'none';
    })
}
// end upload image