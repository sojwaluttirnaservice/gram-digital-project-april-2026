$(() => {
  // ==================================
  // COMMON HELPERS
  // ==================================

  function disableBtn($btn, text = "Processing...") {
    if (!$btn || !$btn.length) return;
    $btn.data("old-text", $btn.text());
    $btn.prop("disabled", true).text(text);
  }

  function enableBtn($btn) {
    if (!$btn || !$btn.length) return;
    $btn.prop("disabled", false).text($btn.data("old-text") || "Submit");
  }

  // ==================================
  // DATEPICKER
  // ==================================

  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    beforeShow: function () {
      setTimeout(() => {
        $(".ui-datepicker").css({ "z-index": 1065 });
      }, 0);
    },
  });

  // dd-mm-yyyy -> yyyy-mm-dd
  const formatDate = (_d) => {
    if (!_d) return "";
    return _d.trim().split("-").reverse().join("-");
  };

  // ==================================
  // LIST PAGE – ACCEPT / REJECT MODALS
  // ==================================

  $(document).on("click", ".accept-ferfar-application-btn", function () {
    const ferfar = JSON.parse($(this).attr("data-ferfar"));
    $("#accept-ferfar-application-form [name='applicant_name']").val(ferfar.applicant_name);
    $("#accept-ferfar-application-form [name='id']").val(ferfar.id);
    $("#accept-ferfar-application-modal").modal("show");
  });

  $(document).on("click", ".reject-ferfar-application-btn", function () {
    const ferfar = JSON.parse($(this).attr("data-ferfar"));
    $("#reject-ferfar-application-form [name='applicant_name']").val(ferfar.applicant_name);
    $("#reject-ferfar-application-form [name='id']").val(ferfar.id);
    $("#reject-ferfar-application-modal").modal("show");
  });

  // ==================================
  // ACCEPT FERFAR
  // ==================================

  async function handleAccepetFerfarApplication(e) {
    e.preventDefault();

    const $btn = $(e.currentTarget);
    disableBtn($btn, "Accepting...");

    const formData = new FormData(
      document.getElementById("accept-ferfar-application-form")
    );

    try {
      const { success, message } = await fetch("/gp-applications/f8-ferfar/accept", {
        method: "PUT",
        body: formData,
      }).then((res) => res.json());

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () => location.reload());
      } else {
        enableBtn($btn);
        alertjs.warning({ t: "WARNING", m: message });
      }
    } catch (err) {
      enableBtn($btn);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "Something went wrong",
      });
    }
  }

  $(document).on("click", "#accept-ferfar-application-btn", handleAccepetFerfarApplication);

  // ==================================
  // REJECT FERFAR
  // ==================================

  async function handleRejectFerfarApplication(e) {
    e.preventDefault();

    const $btn = $(e.currentTarget);
    disableBtn($btn, "Rejecting...");

    const formData = new FormData(
      document.getElementById("reject-ferfar-application-form")
    );

    try {
      const { success, message } = await fetch("/gp-applications/f8-ferfar/reject", {
        method: "PUT",
        body: formData,
      }).then((res) => res.json());

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () => location.reload());
      } else {
        enableBtn($btn);
        alertjs.warning({ t: "WARNING", m: message });
      }
    } catch (err) {
      enableBtn($btn);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "Something went wrong",
      });
    }
  }

  $(document).on("click", "#reject-ferfar-application-btn", handleRejectFerfarApplication);

  // ==================================
  // REVOKE FERFAR (ACCEPTED / REJECTED LIST)
  // ==================================

  async function handleRevokeFerfarApplication(ferfarId, $btn) {
    if (!ferfarId) return;

    disableBtn($btn, "Revoking...");

    try {
      const { success, message } = await fetch("/gp-applications/f8-ferfar/revoke", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ferfarId }),
      }).then((res) => res.json());

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () => location.reload());
      } else {
        enableBtn($btn);
        alertjs.warning({ t: "WARNING", m: message });
      }
    } catch (err) {
      enableBtn($btn);
      alertjs.warning({
        t: "WARNING",
        m: "काहीतरी चुकले",
      });
    }
  }

  $(document).on("click", ".revoke-ferfar-application-btn", function () {
    handleRevokeFerfarApplication(
      $(this).attr("data-ferfarId"),
      $(this)
    );
  });

  // ==================================
  // RESOLVE FERFAR
  // ==================================

  $(document).on("click", ".resolve-ferfar-application-btn", function () {
    const ferfar = JSON.parse($(this).attr("data-ferfar"));
    $("#resolve-ferfar-application-form [name='applicant_name']").val(ferfar.applicant_name);
    $("#resolve-ferfar-application-form [name='id']").val(ferfar.id);
    $("#resolve-ferfar-application-modal").modal("show");
  });

  async function handleMarkResolveFerfarApplication(e) {
    e.preventDefault();

    const $btn = $(e.currentTarget);
    disableBtn($btn, "Resolving...");

    const formData = new FormData(
      document.getElementById("resolve-ferfar-application-form")
    );

    formData.set(
      "masik_sabha_date",
      formatDate(formData.get("masik_sabha_date"))
    );

    try {
      const { success, message } = await fetch("/gp-applications/f8-ferfar/resolve", {
        method: "PUT",
        body: formData,
      }).then((res) => res.json());

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () => location.reload());
      } else {
        enableBtn($btn);
        alertjs.warning({
          t: "WARNING",
          m: message || "कारवाई अयशस्वी",
        });
      }
    } catch (err) {
      enableBtn($btn);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले",
      });
    }
  }

  $(document).on(
    "click",
    "#resolve-ferfar-application-btn",
    handleMarkResolveFerfarApplication
  );
});
