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
  $(document).on("click", ".view-complaint-details-btn", function () {
    const complaint = $(this).data("complaint"); // Extract complaint object from data attribute

    // Set basic fields
    const $modal = $("#complaint-details-modal");
    $modal.find('[name="formName"]').val(complaint.formName);
    $modal.find('[name="formEmail"]').val(complaint.formEmail);
    $modal.find('[name="formMobile"]').val(complaint.formMobile);
    $modal.find('[name="formAadhar"]').val(complaint.formAadhar);
    $modal.find('[name="formAddress"]').val(complaint.formAddress);
    $modal.find('[name="complaintSubject"]').val(complaint.complaintSubject);

    // Set complaint documents & links
    const $docSection = $modal.find(".complaint-documents-section");
    $docSection.find(".fw-semibold").text(complaint.complaintSubject);

    $docSection
      .find(".complaint-photo")
      .attr(
        "href",
        `/uploads/images/complaints/${complaint.complaintImageUrl}?sub=${encodeURIComponent(complaint.complaintSubject)}&applicant=${encodeURIComponent(complaint.formName)}`
      );

    $docSection
      .find(".complaint-location")
      .attr(
        "href",
        `https://www.google.com/maps?q=${complaint.imageLatitude},${complaint.imageLongitude}`
      );

    $docSection
      .find(".complaint-doc")
      .attr(
        "href",
        `/uploads/docs/complaints/${complaint.complaintDocUrl}?sub=${encodeURIComponent(complaint.complaintSubject)}&applicant=${encodeURIComponent(complaint.formName)}`
      );

    // Toggle resolution/rejection sections
    if (
      complaint.complaintStatus === "ACCEPTED" ||
      complaint.complaintStatus === "RESOLVED"
    ) {
      $modal.find("#resolution-section").show();
      $modal
        .find('[name="complaintResolutionDate"]')
        .val(complaint._complaintResolutionDate || "");
      $modal
        .find('[name="complaintResolutionRemark"]')
        .val(complaint.complaintResolutionRemark || "");
      $modal.find("#rejection-section").hide();

      if (complaint.complaintStatus === "RESOLVED") {
        $modal.find("#resolution-image-div").show();

        $("#resolved-complaint-photo-link").attr(
          "href",
          `/uploads/images/complaints/resolution/${complaint.complaintResolutionImageUrl}`
        );

        $("#resolved-complaint-photo-location-link").attr(
          "href",
          `https://www.google.com/maps?q=${complaint.complaintResolutionImageLatitude},${complaint.complaintResolutionImageLongitude}`
        );
      }
    } else if (complaint.complaintStatus === "REJECTED") {
      $modal.find("#rejection-section").show();
      $modal
        .find('[name="complaintRejectionDate"]')
        .val(complaint._complaintRejectionDate?.split(" ")[0] || "");
      $modal
        .find('[name="rejectionReason"]')
        .val(complaint.rejectionReason || "");
      $modal.find("#resolution-section").hide();
    } else {
      // Pending complaint
      $modal.find("#resolution-section, #rejection-section").hide();
    }

    // Show the modal
    $modal.modal("show");
  });
});
