$(function () {

    /**
     * Sends a DELETE request to remove a committee member by ID.
     * @param {number} id - Member ID to delete.
     */
    const deleteMemberById = async (id) => {
        try {
            const response = await fetch(`/committees/members`, {
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
            console.error("Error deleting member:", error);
            alertjs.error({ m: "सर्व्हर त्रुटी. कृपया पुन्हा प्रयत्न करा." });
        }
    };

    /**
     * Handle delete button click for a member.
     */
    $(document).on("click", ".delete-member-btn", function (e) {
        e.preventDefault();

        const memberId = $(this).attr("data-member-id");

        if (!memberId) {
            alertjs.error({ m: "अवैध सदस्य आयडी." });
            return;
        }

        alertjs.deleteSpl("Confirm Delete?", (confirmed) => {
            if (confirmed) {
                deleteMemberById(+memberId);
            }
        });
    });
});
