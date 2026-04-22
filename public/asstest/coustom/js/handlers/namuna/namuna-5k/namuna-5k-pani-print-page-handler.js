document.addEventListener("DOMContentLoaded", function () {
  // Initialize datepicker with only past dates allowed by default
  const initDatepicker = (minDate = null) => {
    $(".datepicker").datepicker("destroy"); // destroy previous instance if any

    let nextDay = null;
    if (minDate) {
      const date = new Date(minDate);
      date.setDate(date.getDate() + 1); // add 1 day
      nextDay = date;
    }
    $(".datepicker").datepicker({
      dateFormat: "dd-mm-yy",
      changeMonth: true,
      changeYear: true,
      defaultDate: new Date(),
      maxDate: 0, // no future dates
      minDate: nextDay, // restrict to last payment date if provided
    });
  };

  initDatepicker();

  const fetchLastDateOfNamuna5k = async () => {
    try {
      const response = await fetch("/namuna/5k/pani/date");
      const { success, message, data } = await response.json();

      if (success) {
        // Get last payment date in Sequelize.DATEONLY format
        let lastPaymentDate = data?.payment_upto_date;
        if (lastPaymentDate) {
          initDatepicker(lastPaymentDate); // set minDate dynamically
        }
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error fetching last payment date:", err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले",
      });
    }
  };

  fetchLastDateOfNamuna5k();

  // handle Save Payment
  const handleSaveOfflinePaymentInNamuna5kPani = async (n5kData) => {
    try {
      const { success, message, data } = await fetch("/namuna/5k/pani/pay", {
        method: "POST",
        body: n5kData,
      }).then((r) => r.json());

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            fetchLastDateOfNamuna5k();
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
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले",
      });
    }
  };

  //

  const button = document.getElementById(
    "save-save-offline-payment-namuna-5k-pani-btn",
  );

  if (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const form = document.getElementById("tax-payment-form");
      const n5kData = new FormData(form);

      const payment_upto_date = n5kData.get("payment_upto_date");

      if (!payment_upto_date) {
        alertjs.warning({
          t: "WARNING",
          m: "कृपया भरणा रक्कम दिनांक भरा.",
        });
        return;
      }

      const deposited_cash_amount = n5kData.get("deposited_cash_amount");

      if (!deposited_cash_amount || Number(deposited_cash_amount) <= 0) {
        alertjs.warning({
          t: "WARNING",
          m: "कृपया भरणा रक्कम भरा.",
        });
        return;
      }

      const receiptFile = n5kData.get("receiptFile");

      if (!receiptFile) {
        alertjs.warning({
          t: "WARNING",
          m: "कृपया पावती फाईल भरा.",
        });
        return;
      }

      n5kData.set(
        "payment_upto_date",
        _commonjsDateFormat(n5kData.get("payment_upto_date")),
      );

      commonjsPrintFormData(n5kData);

      handleSaveOfflinePaymentInNamuna5kPani(n5kData);
    });
  }
});
