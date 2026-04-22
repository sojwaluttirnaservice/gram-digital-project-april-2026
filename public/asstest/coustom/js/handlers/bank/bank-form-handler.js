$(() => {
  const handleSaveBankDetails = async (bankFormData, $btn) => {
    try {
      // Disable button
      $btn.prop("disabled", true);

      const { success, message } = await fetch("/bank", {
        method: "POST",
        body: bankFormData,
      }).then((r) => r.json());

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            location.reload();
          },
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "ERROR",
        m: err?.message,
      });
    } finally {
      // Re-enable button (in case page doesn't reload)
      $btn.prop("disabled", false);
    }
  };

  $(document).on("click", "#bank-save-btn", function (e) {
    e.preventDefault();

    const $btn = $(this); // get button reference
    const $form = document.getElementById("bank-form");

    const bankFormData = new FormData($form);

    handleSaveBankDetails(bankFormData, $btn);
  });

  $(document).on("input", "#account_balance", function (e) {
    let value = $(this).val();

    // Remove everything except numbers
    value = value.replace(/[^0-9]/g, "");

    // Prevent negative (extra safety)
    if (value < 0) value = 0;

    $(this).val(+value);
  });
});
