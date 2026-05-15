$(document).on(
    'click',
    '.delete-dev-work-btn',
    async function () {

        let id = $(this).data('id')

        let $btn = $(this)

        if (!id) {

            return alertjs.warning({
                t: "WARNING",
                m: "Invalid record id",
            })
        }

        let confirmDelete = confirm(
            "Are you sure you want to delete this development work?"
        )

        if (!confirmDelete)
            return

        try {

            $btn.prop("disabled", true)

            let response = await fetch(
                `/dev-works/delete/${id}`,
                {
                    method: 'DELETE',
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
                    },
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
)