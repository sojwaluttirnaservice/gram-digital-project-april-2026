$(document).on("change", "#from_year", function () {

    let fromYear = parseInt($(this).val())

    if (!isNaN(fromYear)) {
        $("#to_year").val(fromYear + 1)
    }
})



$(document).on("submit", "#fund-income-expense-form", async function (e) {
    e.preventDefault()

    let fromYear = $("#from_year").val()
    let toYear = $("#to_year").val()
    let documentFile = $("#document")[0].files[0]

    /* =====================================================
        BASIC VALIDATION
    ===================================================== */
    let formData = new FormData(
        document.getElementById("fund-income-expense-form")
    )

    if (!fromYear) {
        return alertjs.warning({
            t: "WARNING",
            m: "कृपया सुरुवातीचे वर्ष निवडा",
        })
    }

    if (!toYear) {
        return alertjs.warning({
            t: "WARNING",
            m: "कृपया शेवटचे वर्ष निवडा",
        })
    }

    if (parseInt(toYear) !== parseInt(fromYear) + 1) {
        return alertjs.warning({
            t: "WARNING",
            m: "शेवटचे वर्ष हे सुरुवातीच्या वर्षापेक्षा 1 ने जास्त असावे",
        })
    }

    if (!documentFile && !formData.get('id')) {
        return alertjs.warning({
            t: "WARNING",
            m: "कृपया दस्तऐवज निवडा",
        })
    }

    let $btn = $("#save-fund-income-expense-btn")

    handleSaveFundIncomeExpense($btn, formData)
})



async function handleSaveFundIncomeExpense($btn, formData) {

    try {

        $btn.prop("disabled", true)

        let response = await fetch(
            "/fund-income-expenses",
            {
                method: formData.get('id') ? "PUT" : "POST",
                body: formData,
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
                    window.open('/fund-income-expenses')
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

        // Re-enable button (in case page doesn't reload)
        $btn.prop("disabled", false)
    }
}