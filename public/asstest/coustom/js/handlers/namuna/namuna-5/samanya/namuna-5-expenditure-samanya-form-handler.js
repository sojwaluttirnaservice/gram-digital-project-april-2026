$(() => {
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    beforeShow: function (input, inst) {
      setTimeout(function () {
        inst.dpDiv.css({
          "z-index": 99999,
          background: "#ffffff !important", // force white background
          border: "1px solid #ccc", // optional: light border
          "box-shadow": "0 4px 8px rgba(0,0,0,0.1)", // optional: nice shadow
        });
      }, 0);
    },
  });

  $(document).on("input", "#amount_spent", function () {
    let value = $(this).val();

    // ❌ Remove non-numeric characters (except dot)
    value = value.replace(/[^0-9.]/g, "");

    // ❌ Prevent multiple dots
    value = value.replace(/(\..*?)\..*/g, "$1");

    let amountSpent = parseFloat(value) || 0;
    let maxLimit = parseFloat($(this).attr("data-max")) || 0;

    // ✅ सीमा check
    if (amountSpent > maxLimit) {
      amountSpent = maxLimit;
    } else if (amountSpent < 0) {
      amountSpent = 0;
    }

    // ✅ Final value set
    $(this).val(amountSpent);
  });


   $('#main_reason').on('change', function () {
        const selectedMain = $(this).val();

        // find selected main reason object
        const selectedObj = mainReasons.find(item => item.label === selectedMain);

        // target dropdown
        const $subDropdown = $('#reason_of_expenditure');

        // reset dropdown
        $subDropdown.empty();
        $subDropdown.append(`<option value="">----निवडा----</option>`);

        // if subreasons exist
        if (selectedObj && selectedObj.subreasons && selectedObj.subreasons.length > 0) {
            selectedObj.subreasons.forEach(sub => {
                $subDropdown.append(
                    `<option value="${sub.label}">${sub.label}</option>`
                );
            });
        }
    });

  const handleSaveNamuna5Samanya = async (n5ExpenditureSamanyaData) => {
    try {
      const { success, message, data } = await fetch("/namuna/5/samanya", {
        method: "POST",
        body: n5ExpenditureSamanyaData,
      }).then((r) => r.json());

      if (success) {
        alertjs.success({
          t: "SUCCESS",
          m: message,
        }, () =>{
            location.reload()
        });
        return;
      }
      alertjs.warning({
        t: "WARNING",
        m: message,
      });
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले.",
      });
    }
  };

  $(document).on(
    "click",
    "#namuna-5-expenditure-samanya-save-btn",
    function (e) {
      e.preventDefault();

      const $form = document.getElementById(
        "namuna-5-expenditure-samanya-form",
      );

      const n5ExpenditureSamanyaData = new FormData($form);

      n5ExpenditureSamanyaData.set(
        "payment_date",
        _commonjsDateFormat(n5ExpenditureSamanyaData.get("payment_date")),
      );

      // commonjsPrintFormData(n5ExpenditureSamanyaData)

      handleSaveNamuna5Samanya(n5ExpenditureSamanyaData);
    },
  );
});
