$(() => {
  // ===============================
  // SORTING HANDLER (OCCUPATION NOC)
  // ===============================
  const $sort = $("#occupation-noc-sort-order");
  const $subject = $("#occupation-noc-subject-dropdown");

  const updateUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const sortVal = $sort.val();
    const subjectVal = $subject.val();

    // Only set params if they have value, otherwise remove them
    sortVal ? urlParams.set("sort", sortVal) : urlParams.delete("sort");
    subjectVal
      ? urlParams.set("subject", subjectVal)
      : urlParams.delete("subject");

    const queryString = urlParams.toString();
    window.location.href =
      window.location.pathname + (queryString ? `?${queryString}` : "");
  };

  // Set default sort
  $sort.val(new URLSearchParams(window.location.search).get("sort") || "desc");

  // Attach one handler for both
  $sort.add($subject).on("change", updateUrl);

  // ===============================
  // STATUS BINDING
  // ===============================
  function bindOccupationNocStatus($modal, app) {
    if (app.application_status === "ACCEPTED") {
      $modal
        .find('[name="date_of_acceptance"]')
        .val(app._date_of_acceptance || "");
      $modal
        .find('[name="acceptance_remark"]')
        .val(app.acceptance_remark || "");
      $modal.find('[name="resolution_no"]').val(app.resolution_no || "");
      $modal.find('[name="malmatta_no"]').val(app.malmatta_no || "");
      $modal.find('[name="sabha_date"]').val(app._sabha_date || "");
    }

    if (app.application_status === "REJECTED") {
      $modal
        .find('[name="date_of_rejection"]')
        .val(app._date_of_rejection || "");
      $modal.find('[name="rejection_remark"]').val(app.rejection_remark || "");
    }
  }

  // ===============================
  // VIEW DETAILS MODAL
  // ===============================
  $(document).on("click", ".view-occupation-noc-details-btn", function () {
    const application = JSON.parse($(this).attr("data-occupationNoc") || "{}");

    const $modal = $("#occupation-noc-details-modal");

    // reset
    $modal.find("input, textarea").val("");

    // ===== BASIC DETAILS =====
    $modal
      .find('[name="applicant_name"]')
      .val(application.applicant_name || "");
    $modal
      .find('[name="applicant_mobile"]')
      .val(application.applicant_mobile || "");
    $modal
      .find('[name="applicant_email"]')
      .val(application.applicant_email || "");
    $modal
      .find('[name="applicant_aadhaar"]')
      .val(application.applicant_aadhaar || "");

    // ===== ADDRESS =====
    $modal
      .find('[name="applicant_address"]')
      .val(application.applicant_address || "");
    $modal
      .find('[name="applicant_taluka"]')
      .val(application.applicant_taluka || "");
    $modal
      .find('[name="applicant_district"]')
      .val(application.applicant_district || "");

    // ===== APPLICATION DETAILS =====
    $modal.find('[name="sabha_date"]').val(application.sabha_date || "");
    $modal.find('[name="malmatta_no"]').val(application.malmatta_no || "");

    if (application.application_status == "ACCEPTED") {
      const $acceptedSection = $modal.find(
        '.status-section[data-status="ACCEPTED"]',
      );

      $acceptedSection.removeClass("d-none");
    }

    if (application.application_status == "REJECTED") {
      const $rejectedSection = $modal.find(
        '.status-section[data-status="REJECTED"]',
      );

      $rejectedSection.removeClass("d-none");
    }

    // ================= DOCUMENTS =================
    const $docsContainer = $("#documents-view-container");
    $docsContainer.empty();

    let documents = [];

    try {
      console.log(application.documents);
      if (application.documents) {
        documents = application.documents;
      }
    } catch {
      documents = [];
    }

    if (!documents || documents.length === 0) {
      $docsContainer.append(
        `<div class="col-12 text-muted small">कागदपत्रे उपलब्ध नाहीत</div>`,
      );
    } else {
      documents.forEach((doc) => {
        // if (!doc.document_saved_path) return;

        const docUrl = `/uploads/docs/occupation-noc-docs/documents/${doc.document_saved_path}`;

        $docsContainer.append(`
          <div class="col-12 col-md-6">
            <a href="${docUrl}"
               target="_blank"
               class="btn btn-sm btn-outline-primary w-100 text-start">
              <i class="fa fa-file-pdf me-1"></i>
              ${doc.document_name || "दस्तऐवज"}
            </a>
          </div>
        `);
      });
    }

    // ===== STATUS =====
    bindOccupationNocStatus($modal, application);

    $modal.modal("show");
  });

  // ===============================
  // ACCEPT APPLICATION
  // ===============================
  $(document).on("click", ".accept-occupation-noc-btn", function () {
    const app = JSON.parse($(this).attr("data-occupationNoc") || "{}");

    const $modal = $("#accept-occupation-noc-modal");

    $modal.find('[name="id"]').val(app.id);
    $modal.find('[name="applicant_name"]').val(app.applicant_name || "");
    $modal.find('[name="acceptance_remark"]').val("");

    $modal.modal("show");
  });

  // ===============================
  // REJECT APPLICATION
  // ===============================
  $(document).on("click", ".reject-occupation-noc-btn", function () {
    const app = JSON.parse($(this).attr("data-occupationNoc") || "{}");

    const $modal = $("#reject-occupation-noc-modal");

    $modal.find('[name="id"]').val(app.id);
    $modal.find('[name="applicant_name"]').val(app.applicant_name || "");
    $modal.find('[name="rejection_remark"]').val("");

    $modal.modal("show");
  });
});
