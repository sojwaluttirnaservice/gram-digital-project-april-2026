$(() => {
  // ===============================
  // SORTING HANDLER (JOB CARD)
  // ===============================
  const urlParams = new URLSearchParams(window.location.search);

  // Set dropdown from URL
  const currentSort = urlParams.get("sort") || "desc";
  $("#emp-demand-sort-order").val(currentSort);

  // On change → update URL → reload
  $("#emp-demand-sort-order").on("change", function () {
    const selectedOrder = $(this).val();

    urlParams.set("sort", selectedOrder);

    const newUrl = window.location.pathname + "?" + urlParams.toString();

    window.location.href = newUrl;
  });

// ===============================
// VIEW EMPLOYMENT DEMAND DETAILS
// ===============================
function renderEmpDemandFamilyMembers($modal, membersJson) {
    const $container = $modal.find("#family-members-view-container");
    $container.empty();

    let members = [];
    try {
        if (Array.isArray(membersJson)) members = membersJson;
        else if (typeof membersJson === "string" && membersJson.trim() !== "")
            members = JSON.parse(membersJson);
    } catch (err) {
        console.error("Invalid family_members JSON", err);
    }

    if (!members.length) {
        $container.append(`
            <div class="col-12">
                <div class="text-muted small">सदस्यांची माहिती उपलब्ध नाही</div>
            </div>
        `);
        return;
    }

    members.forEach((m, i) => {
        const signFile = m.sign_or_thumb_stamp_photo_name;
        const signUrl = signFile
            ? `/uploads/images/emp-demand/signatures/${signFile}`
            : "#";

        const signBtnClass = signFile ? "btn-outline-success" : "btn-outline-secondary disabled";
        const signStatus = signFile ? "साइन/अंगठा प्रिंट उपलब्ध आहे" : "साइन/अंगठा प्रिंट उपलब्ध नाही";

        $container.append(`
            <div class="col-12 col-md-6">
                <div class="border rounded p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="fw-semibold mb-1">${i + 1}. ${m.member_name || "-"}</div>
                        <div class="small text-muted">बँक खाते: ${m.bank_account_number || "-"}</div>
                        <div class="small text-muted">आधार क्र.: ${m.adhar_card_number || "-"}</div>
                        <div class="small text-muted">कामाच्या ठिकाणी पाळणा घराची आवश्यकता: ${m.is_creche_required_at_workplace || "-"}</div>
                    </div>
                    <div class="mt-3">
                        <a class="btn btn-sm ${signBtnClass} w-100" href="${signUrl}" target="_blank">साइन/अंगठा प्रिंट पहा</a>
                        <div class="small text-muted mt-1 text-center">${signStatus}</div>
                    </div>
                </div>
            </div>
        `);
    });
}

// ===============================
// SHOW EMPLOYMENT DEMAND MODAL
// ===============================
$(document).on("click", ".view-emp-demand-details-btn", function () {
    const demand = JSON.parse($(this).attr("data-demand") || "{}");
    const $modal = $("#emp-demand-details-modal");

    // Reset
    $modal.find("input, textarea").val("");
    $modal.find("a").addClass("disabled").attr("href", "#");
    $modal.find(".text-muted").text("");
    $modal.find(".status-section").addClass("d-none");

    // ================= BASIC INFO =================
    $modal.find('[name="family_head_name"]').val(demand.family_head_name || "");
    $modal.find('[name="applicant_name"]').val(demand.applicant_name || "");
    $modal.find('[name="applicant_mobile"]').val(demand.applicant_mobile || "");
    $modal.find('[name="job_card_number"]').val(demand.job_card_number_fk || "");

    // ================= PERIOD =================
    $modal.find('[name="from_date"]').val(demand._from_date || "");
    $modal.find('[name="to_date"]').val(demand._to_date || "");

    // ================= FAMILY MEMBERS =================
    renderEmpDemandFamilyMembers($modal, demand.family_members_list);

    // ================= STATUS =================
    if (demand.registration_status === "ACCEPTED") {
        $modal.find(".status-section[data-status='ACCEPTED']").removeClass("d-none");
        $modal.find('[name="date_of_acceptance"]').val(demand._date_of_acceptance || "");
        $modal.find('[name="acceptance_remark"]').val(demand.acceptance_remark || "");
    } else if (demand.registration_status === "REJECTED") {
        $modal.find(".status-section[data-status='REJECTED']").removeClass("d-none");
        $modal.find('[name="date_of_rejection"]').val(demand._date_of_rejection || "");
        $modal.find('[name="rejection_remark"]').val(demand.rejection_remark || "");
    }
    
    // Show modal
    $modal.modal("show");
});



});
