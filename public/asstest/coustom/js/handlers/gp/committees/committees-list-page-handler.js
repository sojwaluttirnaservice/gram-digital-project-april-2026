$(function () {

    /**
     * Sends a DELETE request to remove a committee by ID.
     * @param {number} id - Committee ID to delete.
     */
    const deleteCommitteeById = async (id) => {
        try {
            const response = await fetch(`/committees`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                alertjs.success({ m: message }, () => location.reload());
            } else {
                alertjs.error({ m: message || "हटवताना त्रुटी आली." });
            }
        } catch (error) {
            console.error("Error deleting committee:", error);
            alertjs.error({ m: "सर्व्हर त्रुटी. कृपया पुन्हा प्रयत्न करा." });
        }
    };

    /**
     * Handle delete button click.
     */
    $(document).on("click", ".delete-committee-btn", function (e) {
        e.preventDefault();

        const committeeId = $(this).attr("data-committee-id");

        if (!committeeId) {
            alertjs.error({ m: "अवैध समिती आयडी." });
            return;
        }

        alertjs.deleteSpl("Confirm Delete?", (confirmed) => {
            if (confirmed) {
                deleteCommitteeById(+committeeId);
            }
        });
    });
});
