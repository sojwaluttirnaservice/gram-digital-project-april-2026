$(document).on(
    'submit',
    '#dev-work-image-form',
    async function (e) {

        e.preventDefault()

        let form =
            document.getElementById(
                'dev-work-image-form'
            )

        let formData =
            new FormData(form)

        let title =
            formData.get('title')

        let image =
            $('#image')[0]?.files?.[0]

        let $btn =
            $('#save-dev-work-image-btn')

        /* =========================================
            VALIDATION
        ========================================= */

        if (!title?.trim()) {

            return alertjs.warning({
                t: "WARNING",
                m: "Please enter title",
            })
        }

        if (!image) {

            return alertjs.warning({
                t: "WARNING",
                m: "Please select image",
            })
        }

        try {

            $btn.prop("disabled", true)

            let response =
                await fetch(
                    '/dev-works/image/save',
                    {
                        method: 'POST',
                        body: formData,
                    }
                )

            let result =
                await response.json()

            let {
                success,
                message,
            } = result

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



$(document).on(
    'click',
    '.delete-dev-work-image-btn',
    async function () {

        let id =
            $(this).data('id')

        let $btn =
            $(this)

        if (!id) {

            return alertjs.warning({
                t: "WARNING",
                m: "Invalid image id",
            })
        }

        let confirmDelete =
            confirm(
                "Are you sure you want to delete this image?"
            )

        if (!confirmDelete)
            return

        try {

            $btn.prop("disabled", true)

            let response =
                await fetch(
                    `/dev-works/image/delete/${id}`,
                    {
                        method: 'DELETE',
                    }
                )

            let result =
                await response.json()

            let {
                success,
                message,
            } = result

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