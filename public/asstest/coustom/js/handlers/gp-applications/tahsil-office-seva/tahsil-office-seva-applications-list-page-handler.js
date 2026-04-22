$(() => {
  // ===============================
  // OPEN TAHSIL SEVA MODALS
  // ===============================
  function openTahsilApplicationModal(modalId, application) {
    const $modal = $(modalId);

    $modal.find("[name='applicant_name']").val(application.applicant_name || "");
    $modal.find("[name='subject']").val(application.subject || "");
    $modal.find("[name='id']").val(application.id);

    $modal.modal("show");
  }

  $(document).on("click", ".accept-tahsil-application-btn", function () {
    const application = JSON.parse($(this).attr("data-application") || "{}");
    openTahsilApplicationModal("#accept-tahsil-application-modal", application);
  });

  $(document).on("click", ".reject-tahsil-application-btn", function () {
    const application = JSON.parse($(this).attr("data-application") || "{}");
    openTahsilApplicationModal("#reject-tahsil-application-modal", application);
  });

  // ===============================
  // HANDLE TAHSIL SEVA STATUS UPDATE
  // ===============================
  async function updateTahsilApplicationStatus({ id, status, remark, $btn }) {
    if (!id || !status) return;

    $btn.prop("disabled", true);

    try {
      const { success, message } = await fetch("/gp-applications/to-seva/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, remark }),
      }).then((res) => res.json());

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () => window.location.reload());
      } else {
        alertjs.warning({ t: "WARNING", m: message });
      }
    } catch (err) {
      console.error(err);
      alertjs.warning({ t: "WARNING", m: err?.message || "Something went wrong" });
    } finally {
      $btn.prop("disabled", false);
    }
  }

  // ===============================
  // MODAL BUTTON BINDINGS
  // ===============================
  $(document).on("click", "#accept-tahsil-application-btn", function (e) {
    e.preventDefault();

    const $btn = $(this);
    const id = $("#accept-tahsil-application-form [name='id']").val();
    const remark = $("#accept-tahsil-application-form [name='acceptance_remark']").val();

    updateTahsilApplicationStatus({
      id,
      status: "ACCEPTED",
      remark,
      $btn,
    });
  });

  $(document).on("click", "#reject-tahsil-application-btn", function (e) {
    e.preventDefault();

    const $btn = $(this);
    const id = $("#reject-tahsil-application-form [name='id']").val();
    const remark = $("#reject-tahsil-application-form [name='rejection_remark']").val();

    updateTahsilApplicationStatus({
      id,
      status: "REJECTED",
      remark,
      $btn,
    });
  });

  // ===============================
  // REVOKE → BACK TO PENDING
  // ===============================
  $(document).on("click", ".revoke-tahsil-application-btn", function () {
    const $btn = $(this);
    const id = $(this).attr("data-applicationId");

    updateTahsilApplicationStatus({
      id,
      status: "PENDING",
      remark: null,
      $btn,
    });
  });
});

