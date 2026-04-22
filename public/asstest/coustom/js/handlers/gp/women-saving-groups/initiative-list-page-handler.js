$(function () {
    const handleDeleteWgInitiative = async (id) => {
        const url = `/wg-initiatives`;

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

    $(document).on("click", ".delete-initiative-btn", function (e) {
        e.preventDefault();
        const initiativeId = $(this).attr("data-initiative-id");
        // Call the delete function

        alertjs.deleteSpl("Confirm Delete ?", (status) => {
            if (status) {
                handleDeleteWgInitiative(+initiativeId);
            }
        });
    });


});
