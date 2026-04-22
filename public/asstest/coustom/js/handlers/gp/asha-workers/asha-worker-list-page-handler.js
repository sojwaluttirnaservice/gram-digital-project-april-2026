$(function () {
    const handleDeleteAshaWorker = async (id) => {
        const url = `/asha-workers`;

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
                    { m: message },
                    () => location.reload()
                );
            } else {
                alertjs.warning({ m: message });
            }
        } catch (err) {
            console.error("Delete failed", err);
            alertjs.warning({ m: "हटवताना काहीतरी चुकले." });
        }
    };

    $(document).on("click", ".delete-asha-worker-btn", function (e) {
        e.preventDefault();
        const workerId = $(this).attr("data-asha-worker-id");

        alertjs.deleteSpl("हटवायचे निश्चित आहे का?", (confirmed) => {
            if (confirmed) {
                handleDeleteAshaWorker(Number(workerId));
            }
        });
    });
});
