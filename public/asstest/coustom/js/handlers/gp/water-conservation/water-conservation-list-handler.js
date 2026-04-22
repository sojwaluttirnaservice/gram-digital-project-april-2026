$(function () {
    const handleDeleteStructure = async (structureId) => {
        const url = `/water-conservation`;

        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: structureId }),
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

    $(document).on("click", ".delete-structure-btn", function (e) {
        e.preventDefault();
        const structureId = $(this).attr("data-structure-id");

        alertjs.deleteSpl("Confirm Delete ?", (confirmed) => {
            if (confirmed) {
                handleDeleteStructure(+structureId);
            }
        });
    });
});
