$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);

  // Set dropdown value from URL (important)
  const currentSort = urlParams.get("sort") || "desc";
  $("#complaint-sort-order").val(currentSort);

  // On change → update URL → reload
  $("#complaint-sort-order").on("change", function () {
    const selectedOrder = $(this).val();

    urlParams.set("sort", selectedOrder);

    const newUrl = window.location.pathname + "?" + urlParams.toString();

    window.location.href = newUrl;
  });

  // When the "View Details" button is clicked
  $(document).on("click", ".view-ferfar-details-btn", function () {
    const ferfar = JSON.parse($(this).attr("data-ferfar") || "{}");

    console.log(ferfar);

    const $modal = $("#ferfar-details-modal");

    /* -------- Reset modal -------- */
    $modal.find("input, textarea").val("");
    $("#ferfar-document-link").attr("href", "#");

    /* -------- Applicant details -------- */
    $modal.find('[name="applicant_name"]').val(ferfar.applicant_name || "");
    $modal.find('[name="applicant_mobile"]').val(ferfar.applicant_mobile || "");
    $modal.find('[name="applicant_adhar"]').val(ferfar.applicant_adhar || "");
    $modal
      .find('[name="applicant_village"]')
      .val(ferfar.applicant_village || "");
    $modal
      .find('[name="applicant_address"]')
      .val(ferfar.applicant_address || "");

    /* -------- Property details -------- */
    $modal.find('[name="malmatta_no"]').val(ferfar.malmatta_no || "");
    $modal
      .find('[name="original_owner_name"]')
      .val(ferfar.original_owner_name || "");
    $modal.find('[name="ferfar_document"]').val(ferfar.ferfar_document || "");

    if (ferfar.ferfar_document_saved_name) {
      $("#ferfar-document-link")
        .attr(
          "href",
          `/uploads/docs/ferfar-applications/${ferfar.ferfar_document_saved_name}`
        )
        .show();
    } else {
      $("#ferfar-document-link").hide();
    }

    /* -------- Property boundaries -------- */
    $modal.find('[name="east_landmark"]').val(ferfar.east_landmark || "");
    $modal.find('[name="west_landmark"]').val(ferfar.west_landmark || "");
    $modal.find('[name="north_landmark"]').val(ferfar.north_landmark || "");
    $modal.find('[name="south_landmark"]').val(ferfar.south_landmark || "");
    $modal
      .find('[name="i_agree_statement"]')
      .val(ferfar.i_agree_statement || "");

    if (ferfar.application_status == "RESOLVED") {
      $modal
        .find('[name="masik_sabha_date"]')
        .val(ferfar._masik_sabha_date || "");
      $modal
        .find('[name="masik_tharav_number"]')
        .val(ferfar.masik_tharav_number || "");
      $modal
        .find('[name="resolution_malmatta_number"]')
        .val(ferfar.resolution_malmatta_number || "");
      $modal
        .find('[name="resolution_remark"]')
        .val(ferfar.resolution_remark || "");
    }

    /* -------- Show modal -------- */
    $modal.modal("show");
  });
});
