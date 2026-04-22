$(function () {
    const handleDeleteEmpowerment = async (id) => {
        const url = `/women-empowerment`;

        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
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
                    m: message || "हटवण्यात अयशस्वी",
                });
            }
        } catch (err) {
            console.error(err);
            alertjs.warning({
                t: "ERROR",
                m: "हटवताना काहीतरी चुकले",
            });
        }
    };

    $(document).on("click", ".delete-women-empowerment-btn", function (e) {
        e.preventDefault();

        const id = $(this).attr("data-women-empowerment-id");

        alertjs.deleteSpl("Confirm Delete ?", (status) => {
            if (status) {
                handleDeleteEmpowerment(+id);
            }
        });
    });
});
