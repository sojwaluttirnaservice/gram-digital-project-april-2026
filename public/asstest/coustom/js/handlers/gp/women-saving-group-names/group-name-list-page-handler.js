$(function () {
    const handleDeleteWgInitiative = async (id) => {
        const url = `/wg-names`;

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

    $(document).on("click", ".delete-group-btn", function (e) {
        e.preventDefault();
        const groupId = $(this).attr("data-group-id");
        // Call the delete function

        alertjs.deleteSpl("Confirm Delete ?", (status) => {
            if (status) {
                handleDeleteWgInitiative(+groupId);
            }
        });
    });


});
