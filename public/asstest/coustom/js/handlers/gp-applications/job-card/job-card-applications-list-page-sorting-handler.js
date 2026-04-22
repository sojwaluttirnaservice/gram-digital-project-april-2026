$(() => {
  // ===============================
  // SORTING HANDLER (JOB CARD)
  // ===============================
  const urlParams = new URLSearchParams(window.location.search);

  // Set dropdown from URL
  const currentSort = urlParams.get("sort") || "desc";
  $("#job-card-sort-order").val(currentSort);

  // On change → update URL → reload
  $("#job-card-sort-order").on("change", function () {
    const selectedOrder = $(this).val();

    urlParams.set("sort", selectedOrder);

    const newUrl = window.location.pathname + "?" + urlParams.toString();

    window.location.href = newUrl;
  });

  // ===============================
  // STATUS BINDING (JOB CARD)
  // ===============================
  function bindJobCardStatus($modal, job) {
    const status = job.registration_status;

    if (status === "ACCEPTED") {
      $modal
        .find('[name="date_of_acceptance"]')
        .val(job._date_of_acceptance || "");

      $modal
        .find('[name="acceptance_remark"]')
        .val(job.acceptance_remark || "");

      $modal.find('[name="job_card_number"]').val(job.job_card_number || "");
    }

    if (status === "REJECTED") {
      $modal
        .find('[name="date_of_rejection"]')
        .val(job._date_of_rejection || "");

      $modal.find('[name="rejection_remark"]').val(job.rejection_remark || "");
    }
  }

  // ===============================
  // VIEW JOB CARD DETAILS MODAL
  // ===============================
  function renderFamilyMembers($modal, familyMembersJson) {
    const $container = $modal.find("#family-members-view-container");
    $container.empty();

    let members = [];

    try {
      // Accept both stringified JSON & array
      if (Array.isArray(familyMembersJson)) {
        members = familyMembersJson;
      } else if (
        typeof familyMembersJson === "string" &&
        familyMembersJson.trim() !== ""
      ) {
        members = JSON.parse(familyMembersJson);
      }
    } catch (err) {
      console.error("Invalid family_members JSON", err);
      members = [];
    }

    // No members
    if (!Array.isArray(members) || members.length === 0) {
      $container.append(`
      <div class="col-12">
        <div class="text-muted small">सदस्यांची माहिती उपलब्ध नाही</div>
      </div>
    `);
      return;
    }

    // Render members
    members.forEach((m, index) => {
      const adharFile = m.adhar_card_pdf_name;
      const adharUrl = adharFile
        ? `/uploads/docs/job-cards/adhar-cards/${adharFile}`
        : "#";

      const adharBtnClass = adharFile
        ? "btn-outline-primary"
        : "btn-outline-secondary disabled";

      const adharStatus = adharFile
        ? "आधार कार्ड उपलब्ध आहे"
        : "आधार कार्ड उपलब्ध नाही";

      const memberPhotoFile = m.family_member_photo_name;

      const memberPhotoUrl = memberPhotoFile
        ? `/uploads/images/job-cards/member-photos/${memberPhotoFile}`
        : "#";

         const memberBtnClass = memberPhotoFile
        ? "btn-outline-success"
        : "btn-outline-success disabled";

      const memberPhotoStatus = adharFile
        ? "सदस्य फोटो उपलब्ध आहे"
        : "सदस्य फोटो उपलब्ध नाही";

      $container.append(`
      <div class="col-12 col-md-6">
        <div class="border rounded p-3 h-100 d-flex flex-column justify-content-between">

          <div>
            <div class="fw-semibold mb-1">
              ${index + 1}. ${m.member_name || "-"}
            </div>

            <div class="small text-muted">नाते : ${m.relation_to_family_head || "-"}</div>
            <div class="small text-muted">लिंग : ${m.gender || "-"}</div>
            <div class="small text-muted">वय : ${m.age || "-"}</div>
            <div class="small text-muted">दिव्यांग : ${m.is_disabled || "-"}</div>
          </div>

          <div class="mt-3">
            <a class="btn btn-sm ${adharBtnClass} w-100"
               href="${adharUrl}"
               target="_blank">
              आधार कार्ड पहा
            </a>
            <div class="small text-muted mt-1 text-center">
              ${adharStatus}
            </div>
          </div>
          <div class="mt-3">
            <a class="btn btn-sm ${memberBtnClass} w-100"
               href="${memberPhotoUrl}"
               target="_blank">
               सदस्य फोटो  पहा
            </a>
            <div class="small text-muted mt-1 text-center">
              ${memberPhotoStatus}
            </div>
          </div>
        </div>
      </div>
    `);
    });
  }

  function bindDocuments($modal, job) {
    // Family photo
    const $photoLink = $modal.find('[name="family_photo_image_link"]');
    const $photoStatus = $modal.find('[name="family_photo_status"]');

    if (job.family_photo_image_name) {
      $photoLink
        .attr(
          "href",
          `/uploads/images/job-cards/family-photos/${job.family_photo_image_name}`
        )
        .removeClass("disabled");

      $photoStatus
        .text("फोटो उपलब्ध आहे")
        .removeClass("text-danger")
        .addClass("text-success");
    } else {
      $photoLink.attr("href", "#").addClass("disabled");
      $photoStatus.text("फोटो उपलब्ध नाही").addClass("text-danger");
    }

    // Ration card
    const $rationLink = $modal.find(
      '[name="family_head_ration_card_pdf_link"]'
    );
    const $rationStatus = $modal.find('[name="ration_card_status"]');

    if (job.family_head_ration_card_pdf) {
      $rationLink
        .attr(
          "href",
          `/uploads/docs/job-cards/ration-cards/${job.family_head_ration_card_pdf}`
        )
        .removeClass("disabled");

      $rationStatus
        .text("रेशन कार्ड उपलब्ध आहे")
        .removeClass("text-danger")
        .addClass("text-success");
    } else {
      $rationLink.attr("href", "#").addClass("disabled");
      $rationStatus.text("रेशन कार्ड उपलब्ध नाही").addClass("text-danger");
    }
  }

  $(document).on("click", ".view-job-card-details-btn", function () {
    const jobCard = JSON.parse($(this).attr("data-jobCard") || "{}");

    const $modal = $("#job-card-details-modal");

    // Reset
    $modal.find("input, textarea").val("");
    $modal.find("a").addClass("disabled").attr("href", "#");
    $modal.find(".text-muted").text("");

    // ================= BASIC INFO =================
    $modal
      .find('[name="family_head_name"]')
      .val(jobCard.family_head_name || "");
    $modal.find('[name="applicant_name"]').val(jobCard.applicant_name || "");
    $modal
      .find('[name="applicant_mobile"]')
      .val(jobCard.applicant_mobile || "");
    $modal.find('[name="gp_name"]').val(jobCard.gp_name || "");
    $modal
      .find('[name="applicant_address"]')
      .val(jobCard.applicant_address || "");

    // ================= SOCIAL INFO =================
    $modal.find('[name="caste_category"]').val(jobCard.caste_category || "");

    const inputFields = [
      "minority",
      "small_farmer",
      "general_farmer",
      "land_reform_beneficiary",
      "indira_awaas_beneficiary",
      "aab_yojana_beneficiary",
      "forest_rights_act_2006",
      "bpl_family",
      "rashtriya_swasthya_bima_beneficiary",
    ];

    inputFields.forEach((field) => {
      const value = jobCard[field] === "YES" ? "होय" : "नाही";
      $modal.find(`[name="${field}"]`).val(value);
    });

    $modal
      .find('[name="rashtriya_swasthya_bima_no"]')
      .val(jobCard.rashtriya_swasthya_bima_no || "");
    $modal.find('[name="bpl_family_no"]').val(jobCard.bpl_family_no || "");

    // ================= FAMILY MEMBERS =================
    renderFamilyMembers($modal, jobCard.family_members_list);

    // ================= DOCUMENTS =================
    bindDocuments($modal, jobCard);

    // ================= STATUS =================
    bindJobCardStatus($modal, jobCard);

    // Show modal
    $modal.modal("show");
  });
});
