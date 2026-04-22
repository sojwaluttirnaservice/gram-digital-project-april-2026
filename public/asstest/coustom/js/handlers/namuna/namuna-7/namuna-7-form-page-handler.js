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

  const sections = {
    CASH: "#cash-section",
    CHEQUE: "#cheque-section",
    DEMAND_DRAFT: "#dd-section",
    RTGS: "#rtgs-section",
    UPI: "#upi-section",
    OTHER: "#other-section, #other-name-section",
  };



  const $taxCategory = $("#tax_category");
  const $paymentFor = $("#payment_for");
  const $paymentDesc = $("#payment_for_desc");
  const $paymentReason = $("#reason_in_words");

  // On tax category change
  $taxCategory.on("change", function () {
    const selected = $(this).val();

    // reset dropdown
    $paymentFor.html(`<option value=''>----निवडा----</option>`);

    if (!selected) return;

    // find matching category
    const found = dropdown.find(d => d.tax_category === selected);

    if (!found) return;

    // populate options
    $.each(found.payment_reason, function (key, value) {
      $paymentFor.append(
        `<option value="${key}">${value}</option>`
      );
    });
  });

  // On payment_for change
  $paymentFor.on("change", function () {
    const text = $(this).find("option:selected").text();

    $paymentDesc.val(text);
    $paymentReason.val(text)
  });

  const hideAllSections = () => {
    $("#cash-section").hide();
    $("#cheque-section").hide();
    $("#dd-section").hide();
    $("#rtgs-section").hide();
    $("#upi-section").hide();
    $("#other-section").hide();
    $("#other-name-section").hide();
  };

  const togglePaymentFields = () => {
    const medium = $("#payment_medium").val();

    hideAllSections();

    if (sections[medium]) {
      $(sections[medium]).show();
    }
  };

  // Run when dropdown changes
  $("#payment_medium").on("change", togglePaymentFields);

  // Run once on page load (important for edit form cases)
  togglePaymentFields();

//   $("#payment_for").on("change", function () {
//     let value = +$(this).val();
    
    
//     const reason = $(this).find(":selected").data("pramanpatra_name") || "";
//     // const isOther = reason.toLowerCase() === "other";  
//     let isOther = [19, 20].includes(value)

//     $("#reason_in_words")
//       .val(isOther ? "" : reason)
//       .prop("readonly", !isOther);
//   });

  const handleSave = async (e) => {
    e.preventDefault();

    const $btn = $("#namuna-7-samanya-save-btn");
    const $form = $("#namuna-7-form");

    const formData = new FormData($form[0]);

    formData.set("date", _commonjsDateFormat(formData.get("date")));

    try {
      $btn.prop("disabled", true).text("Saving...");

      const response = await fetch("/namuna/7", {
        method: "POST",
        body: formData,
      });

      const { success, message } = await response.json();

      if (success) {
        alertjs.success({
          t: "",
          m: message,
        }, () => window.location.href = "/namuna/7/list");

        $form[0].reset();
      } else {
        alertjs.warning({
          t: "",
          m: message,
        });
      }
    } catch (error) {
      console.error(error);

      alertjs.warning({
        t: "",
        m: "Something went wrong.",
      });
    } finally {
      $btn.prop("disabled", false).text("जतन करा");
    }
  };

  $(document).on("submit", "#namuna-7-form", handleSave);
});
