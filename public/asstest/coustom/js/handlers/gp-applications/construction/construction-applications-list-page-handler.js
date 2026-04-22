$(() => {
  // for dates

  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    beforeShow: function () {
      setTimeout(function () {
        $(".ui-datepicker").css({
          "z-index": 1065,
        });
      }, 0);
    },
  });

  // ======== Accept ==========
  $(document).on("click", ".accept-construction-application-btn", function (e) {
    let stringifiedConstructionApplication = $(this).attr(
      "data-constructionApplication"
    );

    let constructionApplication = JSON.parse(
      stringifiedConstructionApplication
    );

    $(
      `#accept-construction-application-form [name="malmatta_dharak_name"]`
    ).val(constructionApplication.malmatta_dharak_name);
    $(`#accept-construction-application-form [name="id"]`).val(
      constructionApplication.id
    );

    $("#accept-construction-application-modal").modal("show");
  });

  async function handleAcceptConstructionApplication(e) {
    e.preventDefault();

    const $btn = $("#accept-construction-application-btn");
    $btn.prop("disabled", true); // disable button

    let accpetedData = new FormData(
      document.getElementById("accept-construction-application-form")
    );

    try {
      const { success, message } = await fetch(
        "/gp-applications/construction/accept",
        {
          method: "PUT",
          body: accpetedData,
        }
      ).then((res) => res.json());

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            window.location.reload();
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
        t: "Warning",
        m: err?.message || "Something went wrong",
      });
    } finally {
      $btn.prop("disabled", false); // re-enable button
    }
  }

  $(document).on(
    "click",
    "#accept-construction-application-btn",
    handleAcceptConstructionApplication
  );

  // reject

  $(document).on("click", ".reject-construction-application-btn", function (e) {
    let stringifiedConstructionApplication = $(this).attr(
      "data-constructionApplication"
    );

    let constructionApplication = JSON.parse(
      stringifiedConstructionApplication
    );
    $(
      `#reject-construction-application-form [name="malmatta_dharak_name"]`
    ).val(constructionApplication.malmatta_dharak_name);
    $(`#reject-construction-application-form [name="id"]`).val(
      constructionApplication.id
    );

    $("#reject-construction-application-modal").modal("show");
  });

  async function handleRejectConstructionApplication(e) {
    e.preventDefault();

    const $btn = $("#reject-construction-application-btn");
    $btn.prop("disabled", true); // disable button

    let rejectData = new FormData(
      document.getElementById("reject-construction-application-form")
    );

    try {
      const { success, message } = await fetch(
        "/gp-applications/construction/reject",
        {
          method: "PUT",
          body: rejectData,
        }
      ).then((res) => res.json());

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            window.location.reload();
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
        t: "Warning",
        m: err?.message || "Something went wrong",
      });
    } finally {
      $btn.prop("disabled", false); // re-enable button
    }
  }

  $(document).on(
    "click",
    "#reject-construction-application-btn",
    handleRejectConstructionApplication
  );

  //   revoke
  //   revoke
  const handleRevokeConstructionApplication = async (
    button,
    constructionApplicationId
  ) => {
    if (!constructionApplicationId) return;

    button.prop("disabled", true); // disable the button

    try {
      const response = await fetch("/gp-applications/construction/revoke", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: constructionApplicationId }),
      });

      const { success, message } = await response.json();

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => location.reload()
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error revoking complaint:", err);
      alertjs.warning({
        t: "WARNING",
        m: "काहीतरी चुकले",
      });
    } finally {
      button.prop("disabled", false); // re-enable button
    }
  };

  // Attach click event to revoke buttons
  $(document).on("click", ".revoke-construction-application-btn", function () {
    const constructionApplicationId = $(this).attr(
      "data-constructionApplicationId"
    );
    const $btn = $(this); // current button
    handleRevokeConstructionApplication($btn, constructionApplicationId);
  });

  // resolve part

  $(document).on("click", ".resolve-construction-application-btn", function () {
    const constructionApplication = JSON.parse(
      $(this).attr("data-constructionApplication")
    );
    $(
      "#resolve-construction-application-form [name='malmatta_dharak_name']"
    ).val(constructionApplication.malmatta_dharak_name);
    $("#resolve-construction-application-form [name='id']").val(
      constructionApplication.id
    );
    $("#resolve-construction-application-modal").modal("show");
  });

  //   resolve form validation

  const $form = $("#resolve-construction-application-form");

  $form.validate({
    ignore: [],

    rules: {
      malmatta_dharak_name: {
        required: true,
        minlength: 3,
      },

      masik_sabha_date: {
        required: true,
      },

      masik_tharav_number: {
        required: true,
        minlength: 1,
        maxlength: 20,
      },

      resolution_malmatta_number: {
        required: true,
        minlength: 1,
        maxlength: 20,
      },

      resolution_remark: {
        required: true,
        minlength: 5,
        maxlength: 200,
      },

      construction_certificate_date: {
        required: true,
      },

      constructionCertificate: {
        required: true, // ✅ only required, no extension check
      },

      id: {
        required: true,
      },
    },

    messages: {
      malmatta_dharak_name: {
        required: "मालमत्ता धारकाचे नाव आवश्यक आहे",
        minlength: "किमान ३ अक्षरे असणे आवश्यक आहे",
      },

      masik_sabha_date: {
        required: "मासिक सभा दिनांक आवश्यक आहे",
      },

      masik_tharav_number: {
        required: "मासिक ठराव क्रमांक आवश्यक आहे",
      },

      resolution_malmatta_number: {
        required: "निवारण मालमत्ता क्रमांक आवश्यक आहे",
      },

      resolution_remark: {
        required: "पूर्तता झाल्याचा शेरा आवश्यक आहे",
        minlength: "कृपया सविस्तर शेरा लिहा",
      },

      construction_certificate_date: {
        required: "बांधकाम प्रमाणपत्र दिनांक आवश्यक आहे",
      },

    //   constructionCertificate: {
    //     required: "बांधकाम प्रमाणपत्र अपलोड करणे आवश्यक आहे",
    //   },
    },

    errorElement: "div",
    errorClass: "invalid-feedback",

    highlight: function (element) {
      $(element).addClass("is-invalid");
    },

    unhighlight: function (element) {
      $(element).removeClass("is-invalid");
    },

    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },
  });

  async function handleResolveConstructionApplication(e) {
    e.preventDefault();

    const $btn = $("#resolve-construction-application-btn");
    $btn.prop("disabled", true); // disable button

    const $form = $("#resolve-construction-application-form");

    if (!$form.valid()) {
      $btn.prop("disabled", false); // re-enable if validation fails
      return;
    }

    let resolveData = new FormData($form[0]);

    resolveData.set(
      "masik_sabha_date",
      _commonjsDateFormat(resolveData.get("masik_sabha_date"))
    );
    resolveData.set(
      "construction_certificate_date",
      _commonjsDateFormat(resolveData.get("construction_certificate_date"))
    );

    try {
      const { success, message } = await fetch(
        "/gp-applications/construction/resolve",
        {
          method: "PUT",
          body: resolveData,
        }
      ).then((res) => res.json());

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            window.location.reload();
          }
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Resolve Error:", err);
      alertjs.warning({
        t: "Warning",
        m: err?.message || "निवारण करताना काहीतरी चूक झाली",
      });
    } finally {
      $btn.prop("disabled", false); // re-enable button
    }
  }

  $(document).on(
    "click",
    "#resolve-construction-application-btn",
    handleResolveConstructionApplication
  );


//   resolve modal things 

const SQ_M_TO_SQ_FT = 10.7639;

    // Meter → Feet
    $('input[name="total_area_sq_m"]').on('input', function () {
        const val = parseFloat(this.value);
        if (!isNaN(val)) {
            $('input[name="total_area_sq_ft"]').val((val * SQ_M_TO_SQ_FT).toFixed(2));
        }
    });

    // Feet → Meter
    $('input[name="total_area_sq_ft"]').on('input', function () {
        const val = parseFloat(this.value);
        if (!isNaN(val)) {
            $('input[name="total_area_sq_m"]').val((val / SQ_M_TO_SQ_FT).toFixed(2));
        }
    });

    // Upper floor area (only in sq.m → optional future use)
    $('input[name="upper_floor_area_sq_m"]').on('input', function () {
        const val = parseFloat(this.value);
        if (isNaN(val)) return;
        // kept for future expansion (no auto pair now)
    });

    // Approved construction area (sq.m)
    $('input[name="approved_construction_area_sq_m"]').on('input', function () {
        const val = parseFloat(this.value);
        if (isNaN(val)) return;
        // kept for future expansion
    });
});
