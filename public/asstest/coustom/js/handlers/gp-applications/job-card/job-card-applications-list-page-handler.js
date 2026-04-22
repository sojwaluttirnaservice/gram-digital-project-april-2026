$(() => {
  // ===============================
  // OPEN JOB CARD MODALS
  // ===============================
  function openJobCardModal(modalId, jobCard) {
    const $modal = $(modalId);
    $modal.find("[name='applicant_name']").val(jobCard.applicant_name || "");
    $modal.find("[name='id']").val(jobCard.id);
    $modal.find("[name='job_card_number']").val(jobCard.job_card_number || "MH"); // new
    $modal.modal("show");
  }

  $(document).on("click", ".accept-job-card-btn", function () {
    const jobCard = JSON.parse($(this).attr("data-jobCard") || "{}");
    openJobCardModal("#accept-job-card-modal", jobCard);
  });

  $(document).on("click", ".reject-job-card-btn", function () {
    const jobCard = JSON.parse($(this).attr("data-jobCard") || "{}");
    openJobCardModal("#reject-job-card-modal", jobCard);
  });

  // ===============================
  // HANDLE JOB CARD STATUS UPDATE
  // ===============================
  async function updateJobCardStatus({ id, status, remark, job_card_number, $btn }) {
    if (!id || !status) return;

    $btn.prop("disabled", true);

    try {
      const { success, message } = await fetch("/gp-applications/job-card/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, remark, job_card_number }),
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
  $(document).on("click", "#accept-job-card-btn", function (e) {
    e.preventDefault();
    const $btn = $(this);
    const id = $("#accept-job-card-form [name='id']").val();
    const job_card_number = $("#accept-job-card-form [name='job_card_number']").val();
    const remark = $("#accept-job-card-form [name='acceptance_remark']").val();
    updateJobCardStatus({ id, status: "ACCEPTED", remark, job_card_number, $btn });
  });

  $(document).on("click", "#reject-job-card-btn", function (e) {
    e.preventDefault();
    const $btn = $(this);
    const id = $("#reject-job-card-form [name='id']").val();
    const job_card_number = $("#reject-job-card-form [name='job_card_number']").val();
    const remark = $("#reject-job-card-form [name='rejection_remark']").val();
    updateJobCardStatus({ id, status: "REJECTED", remark, job_card_number, $btn });
  });

  $(document).on("click", ".revoke-job-card-btn", function () {
    const $btn = $(this);
    const id = $(this).attr("data-jobCardId");
    const job_card_number = $(this).attr("data-jobCardNumber") || null;
    updateJobCardStatus({ id, status: "PENDING", remark: null, job_card_number, $btn });
  });
});
