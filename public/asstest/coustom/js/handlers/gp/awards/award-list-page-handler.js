$(function () {
    const handleDeleteAward = async (id) => {
        const url = `/awards`;

        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });

        const { success, data, message } = await res.json();

        if (success) {
            alertjs.success(
                {
                    m: message,
                },
                () => location.reload()
            );
        }
    };

    $(document).on("click", ".delete-award-btn", function (e) {
        e.preventDefault();
        const awardId = $(this).attr("data-award-id");
        // Call the delete function

        alertjs.deleteSpl("Confirm Delete ?", (status) => {
            if (status) {
                handleDeleteAward(+awardId);
            }
        });
    });


});
