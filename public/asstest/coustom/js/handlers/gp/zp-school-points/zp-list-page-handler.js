$(function () {

    const handleDeleteZpPoint = async (id) => {
        const url = `/zp-school-points`;

        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id })
        });

        const { success, message } = await res.json();

        if (success) {
            alertjs.success(
                {
                    m: message,
                },
                () => location.reload()
            );
        } else {
            alertjs.warning({
                t: "FAILED",
                m: "हटवण्यात अयशस्वी."
            });
        }
    };

    $(document).on("click", ".delete-zp-point-btn", function (e) {
        e.preventDefault();
        const zpPointId = $(this).attr("data-zp-point-id");

        alertjs.deleteSpl("Confirm Delete ?", (status) => {
            if (status) {
                handleDeleteZpPoint(+zpPointId);
            }
        });
    });

});
