$(() => {

    /* =========================================================
        DATE PICKER
    ========================================================= */

    $(".datepicker").datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2100",
    })



    /* =========================================================
        MARATHI DATE CONVERTER
    ========================================================= */

    const marathiDigits = [
        "०",
        "१",
        "२",
        "३",
        "४",
        "५",
        "६",
        "७",
        "८",
        "९",
    ]


    const convertDateToMarathi = (
        date
    ) => {

        if (!date)
            return ""

        return date
            .split("-")
            .reverse()
            .join("-")
            .replace(
                /\d/g,
                (d) => marathiDigits[d]
            )
    }



    /* =========================================================
        TRANSLATE INPUT
    ========================================================= */

    const debouncedTranslate =
        commonjsDebounce(
            (
                value,
                targetInput
            ) => {

                commonHandler.translateWord(
                    value,
                    (data) => {

                        $(targetInput)
                            .val(data)
                    }
                )

            },
            300
        )



    $(document).on(
        "input change",
        ".mainText",
        function () {

            let value =
                $(this)
                    .val()
                    .trim()

            let target =
                $(this)
                    .data("target")

            if (!target)
                return

            let targetInput =
                $(
                    `[name="${target}"]`
                )

            if (!targetInput.length)
                return


            /* =====================================
                DATE FIELD
            ===================================== */

            if (
                $(this).attr("type")
                === "date"
            ) {

                targetInput.val(
                    convertDateToMarathi(
                        value
                    )
                )

                return
            }


            /* =====================================
                IGNORE SELECT
            ===================================== */

            if ($(this).is("select"))
                return


            /* =====================================
                EMPTY VALUE
            ===================================== */

            if (!value) {

                targetInput.val("")

                return
            }


            /* =====================================
                TRANSLATE
            ===================================== */

            debouncedTranslate(
                value,
                targetInput
            )
        }
    )



    /* =========================================================
        SAVE BUTTON
    ========================================================= */

    $(document).on(
        "click",
        "#save-marriage-cert-form-btn",
        function (e) {

            e.preventDefault()

            saveMarriageCertForm(
                $(this)
            )
        }
    )



    /* =========================================================
        SAVE FORM
    ========================================================= */

    const saveMarriageCertForm =
        async (btn) => {

            try {

                let form =
                    $(
                        "#marriage-cert-unavailability-form"
                    )

                if (!form.length)
                    return

                let formElement =
                    form[0]


                /* =====================================
                    HTML VALIDATION
                ===================================== */

                if (
                    !formElement.checkValidity()
                ) {

                    formElement
                        .reportValidity()

                    return
                }


                /* =====================================
                    BUTTON LOADING
                ===================================== */

                btn.prop(
                    "disabled",
                    true
                )

                btn.html(`
                    <i class="fa fa-spinner fa-spin me-1"></i>
                    सेव्ह होत आहे...
                `)


                /* =====================================
                    FORM DATA
                ===================================== */

                let formData =
                    new FormData(
                        formElement
                    )


                /* =====================================
                    API CALL
                ===================================== */

                formData.set('date_of_checking', _commonjsDateFormat(formData.get('date_of_checking')));
                formData.set('date_of_registration', _commonjsDateFormat(formData.get('date_of_registration')));
                formData.set('date_of_issue', _commonjsDateFormat(formData.get('date_of_issue')));

                let response =
                    await fetch(
                        "/marriage-cert-unavailability",
                        {
                            method: "POST",
                            body: formData,
                        }
                    )

                let { success,
                    message} =
                    await response.json()


                /* =====================================
                    SUCCESS
                ===================================== */

                if (success) {

                    alertjs.success(
                        {
                            t: "SUCCESS",
                            m:
                                message
                                || "रेकॉर्ड सेव्ह झाले",
                        },
                        () => {
                            window.open('/marriage-cert-unavailability')
                        }
                    )
                }


                /* =====================================
                    WARNING
                ===================================== */

                else {

                    alertjs.warning({
                        t: "WARNING",
                        m:
                            message
                            || "काहीतरी चुकले",
                    })
                }

            }
            catch (err) {

                console.error(
                    "Error:",
                    err
                )

                alertjs.warning({
                    t: "WARNING",
                    m:
                        err?.message
                        || "काहीतरी चुकले.",
                })
            }
            finally {

                btn.prop(
                    "disabled",
                    false
                )

                btn.html(`
                    <i class="fa fa-save me-1"></i>
                    सेव्ह करा
                `)
            }
        }
})