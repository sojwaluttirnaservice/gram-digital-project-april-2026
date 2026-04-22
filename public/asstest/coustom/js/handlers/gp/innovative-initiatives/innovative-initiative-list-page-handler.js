$(function () {
    const handleDeleteInnovativeInitiative = async (id) => {
        const url = `/innovative-initiatives`;

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

    $(document).on("click", ".delete-innovative-initiative-btn", function (e) {
        e.preventDefault();
        const initiativeId = $(this).attr("data-innovative-initiative-id");

        alertjs.deleteSpl("Confirm Delete ?", (status) => {
            if (status) {
                handleDeleteInnovativeInitiative(+initiativeId);
            }
        });
    });
});
