/* =========================================================
    DELETE FUND INCOME EXPENSE
========================================================= */

$(() => {

    /* =====================================================
        HANDLE DELETE
    ===================================================== */

    const handleDelete = async ($btn, id) => {

        try {

            $btn.prop("disabled", true)

            let response = await fetch(
                `/fund-income-expenses/delete/${id}`,
                {
                    method: "DELETE",
                }
            )

            let result = await response.json()

            let { success, message } = result

            if (success) {

                alertjs.success(
                    {
                        t: "SUCCESS",
                        m: message,
                    },
                    () => {
                        location.reload()
                    }
                )
            }
            else {

                alertjs.warning({
                    t: "WARNING",
                    m: message,
                })
            }

        }
        catch (err) {

            console.error("Error:", err)

            alertjs.warning({
                t: "ERROR",
                m: err?.message,
            })
        }
        finally {

            $btn.prop("disabled", false)
        }
    }


    /* =====================================================
        DELETE BUTTON CLICK
    ===================================================== */

    $(document).on(
        "click",
        ".delete-btn",
        function () {

            let id = $(this).data("id")

            if (!id) {

                return alertjs.warning({
                    t: "WARNING",
                    m: "Invalid record id",
                })
            }

            let $btn = $(this)

            alertjs.deleteSpl(
                "तुम्हाला ही नोंद हटवायची आहे का?",
                (status) => {

                    if (status) {

                        handleDelete($btn, id)
                    }
                }
            )
        }
    )
})