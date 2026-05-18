$(() => {

    let isEditMode = false

    /* =========================================================
        SET FORM DATA
    ========================================================= */

    function setFormData(item) {

        $("#title")
            .val(item.title || "")

        $("#desc")
            .val(item.desc || "")

        $("#id")
            .val(item.id || "")

        $("#submit-btn-text")
            .text("फोटो अपडेट करा")

        $("#cancel-edit-btn")
            .removeClass("d-none")

        isEditMode = true

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }



    /* =========================================================
        RESET FORM
    ========================================================= */

    function resetForm() {

        document
            .getElementById("dev-work-image-form")
            .reset()

        $("#image_id")
            .val("")

        $("#submit-btn-text")
            .text("फोटो जतन करा")

        $("#cancel-edit-btn")
            .addClass("d-none")

        isEditMode = false
    }



    /* =========================================================
        EDIT IMAGE
    ========================================================= */

    $(document).on(
        "click",
        ".edit-dev-work-image-btn",
        function () {

            let item =
                $(this).attr("data-devWorkImage")

            try {

                item = JSON.parse(item)

                setFormData(item)

            }
            catch (err) {

                console.error(err)

                alertjs.warning({
                    t: "WARNING",
                    m: "Invalid image data",
                })
            }
        }
    )



    /* =========================================================
        CANCEL EDIT
    ========================================================= */

    $("#cancel-edit-btn").on(
        "click",
        function () {

            resetForm()
        }
    )



    /* =========================================================
        SAVE / UPDATE IMAGE
    ========================================================= */

    $(document).on(
        "submit",
        "#dev-work-image-form",
        async function (e) {

            e.preventDefault()

            let form =
                document.getElementById(
                    "dev-work-image-form"
                )

            let formData =
                new FormData(form)

            let title =
                formData.get("title")

            let image =
                $("#image")[0]?.files?.[0]

            let $btn =
                $("#save-dev-work-image-btn")

            /* =========================================
                VALIDATION
            ========================================= */

            if (!title?.trim()) {

                return alertjs.warning({
                    t: "WARNING",
                    m: "Please enter title",
                })
            }

            if (!isEditMode && !image) {

                return alertjs.warning({
                    t: "WARNING",
                    m: "Please select image",
                })
            }

            try {

                $btn.prop("disabled", true)

                let response =
                    await fetch(
                        isEditMode
                            ? "/dev-works/image/update"
                            : "/dev-works/image/save",
                        {
                            method: isEditMode
                                ? "PUT"
                                : "POST",

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



    /* =========================================================
        DELETE IMAGE
    ========================================================= */

    async function handleDelete(
        $btn,
        id
    ) {

        try {

            $btn.prop("disabled", true)

            let response =
                await fetch(
                    `/dev-works/image/delete/${id}`,
                    {
                        method: "DELETE",
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



    $(document).on(
        "click",
        ".delete-dev-work-image-btn",
        function () {

            let id =
                $(this).data("id")

            let $btn =
                $(this)

            if (!id) {

                return alertjs.warning({
                    t: "WARNING",
                    m: "Invalid image id",
                })
            }

            alertjs.deleteSpl(
                "तुम्हाला ही प्रतिमा हटवायची आहे का?",
                (status) => {

                    if (status) {

                        handleDelete(
                            $btn,
                            id
                        )
                    }
                }
            )
        }
    )
})