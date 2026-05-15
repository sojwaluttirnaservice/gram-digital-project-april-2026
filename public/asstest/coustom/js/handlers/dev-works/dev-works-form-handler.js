$(document).on(
    'change',
    '#from_year',
    function () {

        let fromYear = Number($(this).val())

        if (!fromYear)
            return

        $('#to_year').val(fromYear + 1)
    }
)



$(document).on(
    'submit',
    '#dev-works-form',
    async function (e) {

        e.preventDefault()

        let form = document.getElementById(
            'dev-works-form'
        )

        let formData = new FormData(form)

        let id = formData.get('id')

        let fromYear =
            formData.get('from_year')

        let toYear =
            formData.get('to_year')

        let title =
            formData.get('title')

        let status =
            formData.get('status')

        let documentFile =
            $('#document')[0]?.files?.[0]

        let $btn =
            $('#save-dev-work-btn')

        /* =========================================
            VALIDATION
        ========================================= */

        if (!fromYear) {

            return alertjs.warning({
                t: "WARNING",
                m: "Please select from year",
            })
        }

        if (!toYear) {

            return alertjs.warning({
                t: "WARNING",
                m: "Please select to year",
            })
        }

        if (
            Number(toYear) !==
            Number(fromYear) + 1
        ) {

            return alertjs.warning({
                t: "WARNING",
                m: "To year should be next year of from year",
            })
        }

        if (!title?.trim()) {

            return alertjs.warning({
                t: "WARNING",
                m: "Please enter title",
            })
        }

        if (!status) {

            return alertjs.warning({
                t: "WARNING",
                m: "Please select status",
            })
        }

        if (!id && !documentFile) {

            return alertjs.warning({
                t: "WARNING",
                m: "Please upload document",
            })
        }

        try {

            $btn.prop("disabled", true)

            let url =
                id
                    ? '/dev-works/update'
                    : '/dev-works/save'

            let response =
                await fetch(
                    url,
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

                        if (id) {

                            location.reload()
                        }
                        else {

                            window.location =
                                '/dev-works'
                        }
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