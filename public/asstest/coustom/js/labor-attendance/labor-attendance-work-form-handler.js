$(() => {
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
  });
  const formatDate = (_date) =>
    _date && _date?.trim() ? _date.split("-").reverse().join("-") : "";

  $("#labor-attendance-work-form").validate({
    rules: {
      name: {
        required: true,
      },
      location: {
        required: true,
      },
      start_date: {
        required: true,
        // date: true,
      },
      end_date: {
        required: true,
        // date: true,
      },
    },
    messages: {
      name: "कामाचे नाव आवश्यक आहे.",
      location: "कामाचे स्थळ आवश्यक आहे.",
      start_date: "प्रारंभ दिनांक आवश्यक आहे.",
      end_date: "अंतिम दिनांक आवश्यक आहे.",
    },
    errorClass: "is-invalid",
    // validClass: 'is-valid',

    // 👇 Add this to make the error message appear as <small> below the field
    errorElement: "small",
    errorPlacement: function (error, element) {
      error.addClass("text-danger"); // Bootstrap red text class
      error.insertAfter(element); // Append below the input
    },
  });

  // Pure function: takes date string + daysCount, returns new date string
  function calculateEndDate(startDateStr, daysCount = 7) {
    if (!startDateStr) return null;
    // Parse DD-MM-YYYY
    let parts = startDateStr.split("-");
    if (parts.length !== 3) return null;

    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1; // JS months 0-based
    let year = parseInt(parts[2], 10);

    let startDate = new Date(year, month, day);
    if (isNaN(startDate)) return null;

    // Inclusive -> add (daysCount - 1)
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (daysCount - 1));

    // Format back to dd-mm-yyyy
    let dd = String(endDate.getDate()).padStart(2, "0");
    let mm = String(endDate.getMonth() + 1).padStart(2, "0");
    let yyyy = endDate.getFullYear();

    let formatted = `${dd}-${mm}-${yyyy}`;

    // If input[name="end_date"] exists, auto-set it
    // let $end = $('input[name="end_date"]');
    // if ($end.length) {
    //   $end.val(formatted);
    // }

    return formatted;
  }

  // Example usage with jQuery listener
  $(function () {
    $('input[name="start_date"]').on("input change blur", function () {
      let startDateVal = $(this).val();
      let daysCount = parseInt($(this).attr("data-dayscount")) || 7;

      let dateAfterDaysCount = calculateEndDate(startDateVal, daysCount);
      $('input[name="end_date"]').val(dateAfterDaysCount)
    });
  });

  const handleSaveUpdateWork = async (e) => {
    e.preventDefault();

    const form = $("#labor-attendance-work-form");

    // Validate the form before proceeding
    if (!form.valid()) {
      return; // Stop execution if form is invalid
    }

    try {
      let formData = new FormData(
        document.getElementById("labor-attendance-work-form")
      );
      let apiMethod = formData.get("id") ? "PUT" : "POST";

      formData.set("start_date", formatDate(formData.get("start_date")));
      formData.set("end_date", formatDate(formData.get("end_date")));

      const res = await fetch("/labor-attendance/work", {
        method: apiMethod,
        body: formData,
        // body: JSON.stringify({ id: 2 }),
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      const { success, message } = await res.json();

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            location.href = "/labor-attendance/work/list";
          }
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
        m: err?.message || "काहीतरी चुकले.",
      });
    }
  };

  $(document).on(
    "click",
    "#save-labor-attendance-work-btn",
    handleSaveUpdateWork
  );

  $(document).on(
    "click",
    "#update-labor-attendance-work-btn",
    handleSaveUpdateWork
  );
});
