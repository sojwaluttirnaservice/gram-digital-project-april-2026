$(() =>{

    // ===============================
// OPEN EMPLOYMENT DEMAND MODALS
// ===============================
function openEmpDemandModal(modalId, demand) {
    const $modal = $(modalId);
    $modal.find("[name='applicant_name']").val(demand.applicant_name || "");
    $modal.find("[name='id']").val(demand.id);
    $modal.find("[name='job_card_number_fk']").val(demand.job_card_number_fk || "");
    $modal.modal("show");
}

$(document).on("click", ".accept-emp-demand-btn", function () {
    const demand = JSON.parse($(this).attr("data-demand") || "{}");
    openEmpDemandModal("#accept-emp-demand-modal", demand);
});

$(document).on("click", ".reject-emp-demand-btn", function () {
    const demand = JSON.parse($(this).attr("data-demand") || "{}");
    openEmpDemandModal("#reject-emp-demand-modal", demand);
});

// ===============================
// HANDLE EMPLOYMENT DEMAND STATUS UPDATE
// ===============================
async function updateEmpDemandStatus({ id, status, remark, job_card_number_fk, $btn }) {
    if (!id || !status) return;

    $btn.prop("disabled", true);

    try {
        const { success, message } = await fetch("/gp-applications/emp-demand/status", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status, remark, job_card_number_fk }),
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
$(document).on("click", "#accept-emp-demand-btn", function (e) {
    e.preventDefault();
    const $btn = $(this);
    const id = $("#accept-emp-demand-form [name='id']").val();
    const job_card_number_fk = $("#accept-emp-demand-form [name='job_card_number_fk']").val();
    const remark = $("#accept-emp-demand-form [name='acceptance_remark']").val();
    updateEmpDemandStatus({ id, status: "ACCEPTED", remark, job_card_number_fk, $btn });
});

$(document).on("click", "#reject-emp-demand-btn", function (e) {
    e.preventDefault();
    const $btn = $(this);
    const id = $("#reject-emp-demand-form [name='id']").val();
    const job_card_number_fk = $("#reject-emp-demand-form [name='job_card_number_fk']").val();
    const remark = $("#reject-emp-demand-form [name='rejection_remark']").val();
    updateEmpDemandStatus({ id, status: "REJECTED", remark, job_card_number_fk, $btn });
});

// Optional: revoke status
$(document).on("click", ".revoke-emp-demand-btn", function () {
    const $btn = $(this);
    const id = $(this).attr("data-demand-id");
    const job_card_number_fk = $(this).attr("data-job-card-number") || null;
    updateEmpDemandStatus({ id, status: "PENDING", remark: null, job_card_number_fk, $btn });
});



})