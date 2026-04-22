// ===============================
// SORTING & SUBJECT FILTER HANDLER – TAHASIL OFFICE SEVA
// ===============================
$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);

  // ===== Set dropdowns from URL =====
  const currentSort = urlParams.get("sort") || "desc";
  $("#job-card-sort-order").val(currentSort);

  const currentSubject = urlParams.get("subject") || "";
  $("#subject-filter-select").val(currentSubject);

  // ===== On change → update URL → reload =====
  function updateUrlAndReload() {
    const selectedSort = $("#job-card-sort-order").val();
    const selectedSubject = $("#subject-filter-select").val();

    urlParams.set("sort", selectedSort);

    if (selectedSubject) {
      urlParams.set("subject", selectedSubject);
    } else {
      urlParams.delete("subject");
    }

    const newUrl = window.location.pathname + "?" + urlParams.toString();
    window.location.href = newUrl;
  }

  $("#job-card-sort-order, #subject-filter-select").on("change", updateUrlAndReload);


// ===============================
// VIEW TAHSIL OFFICE SEVA APPLICATION DETAILS (FULL)
// ===============================
// ===============================
// VIEW TAHSIL OFFICE SEVA APPLICATION DETAILS (FULL)
// ===============================
$(document).on(
  "click",
  ".view-tahsil-application-details-btn",
  function () {
    const application = JSON.parse(
      $(this).attr("data-application") || "{}"
    );

    const $modal = $("#tahsil-office-seva-application-details-modal");

    // ================= RESET =================
    $modal.find("input, textarea").val("");

    // Hide all status sections AND their HR
    $modal.find(".status-section").addClass("d-none");
    $modal.find(".status-section").prev("hr").addClass("d-none");

    // ================= BASIC DETAILS =================
    $modal.find('[name="id"]').val(application.id || "-");
    $modal.find('[name="applicant_name"]').val(application.applicant_name || "-");
    $modal.find('[name="applicant_mobile"]').val(application.applicant_mobile || "-");
    $modal.find('[name="applicant_aadhaar"]').val(application.applicant_aadhaar || "-");
    $modal.find('[name="applicant_address"]').val(application.applicant_address || "-");
    $modal.find('[name="subject"]').val(application.subject || "-");

    // ================= DOCUMENTS =================
    const $docsContainer = $("#tahsil-documents-view-container");
    $docsContainer.empty();

    let documents = [];

    try {
      if (application.uploaded_documents_list) {
        documents = JSON.parse(application.uploaded_documents_list);
      }
    } catch {
      documents = [];
    }

    if (!documents || documents.length === 0) {
      $docsContainer.append(
        `<div class="col-12 text-muted small">कागदपत्रे उपलब्ध नाहीत</div>`
      );
    } else {
      documents.forEach((doc) => {
        if (!doc.document_saved_path) return;

        const docUrl = `/uploads/docs/tahsil-office-seva/${doc.document_saved_path}`;

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

    // ================= STATUS HANDLING =================
    const status = String(application.registration_status || "").toUpperCase();

// Reset
$modal.find(".status-section").addClass("d-none");
$modal.find(".status-hr").addClass("d-none");

// ACCEPTED
if (status === "ACCEPTED") {
  const $section = $modal.find('.status-section[data-status="ACCEPTED"]');
  $section.removeClass("d-none");
  $section.prev(".status-hr").removeClass("d-none");

  $modal.find('[name="date_of_acceptance"]').val(application._date_of_acceptance || "-");
  $modal.find('[name="acceptance_remark"]').val(application.acceptance_remark || "-");
}

// REJECTED
if (status === "REJECTED") {
  const $section = $modal.find('.status-section[data-status="REJECTED"]');
  $section.removeClass("d-none");
  $section.prev(".status-hr").removeClass("d-none");

  $modal.find('[name="date_of_rejection"]').val(application._date_of_rejection || "-");
  $modal.find('[name="rejection_remark"]').val(application.rejection_remark || "-");
}


    // ================= SHOW MODAL =================
    $modal.modal("show");
  }
);


});
