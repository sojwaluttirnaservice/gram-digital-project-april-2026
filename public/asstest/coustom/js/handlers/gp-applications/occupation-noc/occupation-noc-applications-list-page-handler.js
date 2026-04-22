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
  // =====================================
  // OPEN OCCUPATION NOC MODALS
  // =====================================
  function openOccupationNocModal(modalId, application) {
    const $modal = $(modalId);

    // Reset form
    $modal.find("input, textarea").val("");

    // Common fields
    $modal
      .find("[name='applicant_name']")
      .val(application.applicant_name || "");
    $modal.find("[name='id']").val(application.id);

    $modal.modal("show");
  }

  // ===============================
  // ACCEPT MODAL OPEN
  // ===============================
  $(document).on("click", ".accept-occupation-noc-btn", function () {
    const application = JSON.parse($(this).attr("data-occupationNoc") || "{}");
    openOccupationNocModal("#accept-occupation-noc-modal", application);
  });

  // ===============================
  // REJECT MODAL OPEN
  // ===============================
  $(document).on("click", ".reject-occupation-noc-btn", function () {
    const application = JSON.parse($(this).attr("data-occupationNoc") || "{}");
    openOccupationNocModal("#reject-occupation-noc-modal", application);
  });

  // =====================================
  // UPDATE OCCUPATION NOC STATUS
  // =====================================
  async function updateOccupationNocStatus({
    id,
    status,
    remark,
    sabha_date,
    malmatta_no,
    resolution_no,
    survey_no,
    $btn,
  }) {
    if (!id || !status) return;

    $btn.prop("disabled", true);

    try {
      const { success, message } = await fetch(
        "/gp-applications/occupation-noc/status",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            status,
            remark,
            sabha_date,
            malmatta_no,
            resolution_no,
            survey_no
          }),
        },
      ).then((res) => res.json());

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () =>
          window.location.reload(),
        );
      } else {
        alertjs.warning({ t: "WARNING", m: message });
      }
    } catch (err) {
      console.error(err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले",
      });
    } finally {
      $btn.prop("disabled", false);
    }
  }

  // =====================================
  // ACCEPT BUTTON HANDLER
  // =====================================
  $(document).on("click", "#accept-occupation-noc-btn", function (e) {
    e.preventDefault();

    const $btn = $(this);
    const id = $("#accept-occupation-noc-form [name='id']").val();
    const remark = $(
      "#accept-occupation-noc-form [name='acceptance_remark']",
    ).val();

    const _rawSabhaDate = $(
      "#accept-occupation-noc-form [name='sabha_date']",
    ).val();

    const formattedSabhaDate = _commonjsDateFormat(_rawSabhaDate)


    const malmatta_no = $(
      "#accept-occupation-noc-form [name='malmatta_no']",
    ).val();
    const survey_no = $(
      "#accept-occupation-noc-form [name='survey_no']",
    ).val();
    const resolution_no = $(
      "#accept-occupation-noc-form [name='resolution_no']",
    ).val();

    updateOccupationNocStatus({
      id,
      status: "ACCEPTED",
      remark,
      sabha_date: formattedSabhaDate,
      malmatta_no,
      resolution_no,
      survey_no,
      $btn,
    });
  });

  // =====================================
  // REJECT BUTTON HANDLER
  // =====================================
  $(document).on("click", "#reject-occupation-noc-btn", function (e) {
    e.preventDefault();

    const $btn = $(this);
    const id = $("#reject-occupation-noc-form [name='id']").val();
    const remark = $(
      "#reject-occupation-noc-form [name='rejection_remark']",
    ).val();

    updateOccupationNocStatus({
      id,
      status: "REJECTED",
      remark,
      $btn,
    });
  });

  // =====================================
  // REVOKE (BACK TO PENDING)
  // =====================================
  $(document).on("click", ".revoke-occupation-noc-btn", function () {
    const $btn = $(this);
    const id = $(this).attr("data-occupationNocId");

    updateOccupationNocStatus({
      id,
      status: "PENDING",
      remark: null,
      $btn,
    });
  });
});
