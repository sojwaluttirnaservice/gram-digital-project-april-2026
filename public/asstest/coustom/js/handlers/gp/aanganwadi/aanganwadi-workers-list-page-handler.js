$(function () {
    /**
     * Delete center via API
     * @param {number} id - Center ID to delete
     */
    const handleDeleteCenter = async (id) => {
        const url = `/aanganwadi/workers`;

        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success(
                    {
                        m: message || "अंगणवाडी केंद्र यशस्वीरित्या हटवले गेले.",
                    },
                    () => location.reload()
                );
            } else {
                alertjs.error({ m: message || "हटवताना काही त्रुटी आली." });
            }
        } catch (error) {
            alertjs.error({ m: "सर्व्हरशी कनेक्ट करता आले नाही. कृपया पुन्हा प्रयत्न करा." });
        }
    };

    /**
     * Attach click handler to delete buttons
     */
    $(document).on("click", ".delete-worker-btn", function (e) {
        e.preventDefault();

        const workerId = $(this).attr("data-worker-id");

        if (!workerId || isNaN(workerId)) {
            return alertjs.error({ m: "अवैध केंद्र ID." });
        }

        alertjs.deleteSpl("आपण हे अंगणवाडी केंद्र हटवू इच्छिता का?", (confirmed) => {
            if (confirmed) {
                handleDeleteCenter(+workerId);
            }
        });
    });
});
