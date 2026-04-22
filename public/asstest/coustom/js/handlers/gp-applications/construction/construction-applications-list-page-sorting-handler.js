$(() => {
  // sorting part handler
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

  //- show construction application details modal

  const DIRECTION_IMAGE_BASE = "/uploads/images/construction/directions";

  function bindLandmarkDetails($modal, direction, app) {
    const imgName = app[`${direction}_landmark_image_name`];
    const lat = app[`${direction}_landmark_image_latitude`];
    const lng = app[`${direction}_landmark_image_longitude`];

    // Inputs
    $modal.find(`[name="${direction}_landmark_image_latitude"]`).val(lat || "");
    $modal
      .find(`[name="${direction}_landmark_image_longitude"]`)
      .val(lng || "");

    // Elements
    const $mapLink = $modal.find(`[name="${direction}_landmark_map_link"]`);
    const $imgLink = $modal.find(`[name="${direction}_landmark_image_link"]`);
    const $status = $modal.find(`[name="${direction}_landmark_status"]`);

    let messages = [];

    // ================= MAP =================
    if (lat && lng) {
      $mapLink
        .attr("href", `https://www.google.com/maps?q=${lat},${lng}`)
        .removeClass("disabled");
      messages.push("📍 लोकेशन उपलब्ध आहे");
    } else {
      $mapLink.attr("href", "#").addClass("disabled");
      messages.push("📍 लोकेशन उपलब्ध नाही");
    }

    // ================= IMAGE =================
    if (imgName) {
      $imgLink
        .attr("href", `${DIRECTION_IMAGE_BASE}/${imgName}`)
        .removeClass("disabled");
      messages.push("🖼️ फोटो उपलब्ध आहे");
    } else {
      $imgLink.attr("href", "#").addClass("disabled");
      messages.push("🖼️ फोटो उपलब्ध नाही");
    }

    // Status text
    $status
      .text(messages.join(" | "))
      .toggleClass("text-danger", !(lat && lng && imgName))
      .toggleClass("text-success", lat && lng && imgName);
  }

  function renderAttachedDocuments($modal, attachedDocumentsJson) {
    const $container = $modal.find("#attached-documents-container");
    $container.empty();

    let documents = [];

    const parsed = JSON.parse(attachedDocumentsJson);
    console.log(typeof parsed[0]);

    documents = documents.map((_d) => JSON.parse(_d));
    console.log(documents);

    try {
      if (
        typeof attachedDocumentsJson === "string" &&
        attachedDocumentsJson.trim() !== ""
      ) {
        documents = JSON.parse(attachedDocumentsJson);
      }
    } catch (error) {
      console.error("Invalid attached_documents JSON", error);
      documents = [];
    }

    // Safety check
    if (!Array.isArray(documents) || documents.length === 0) {
      $container.append(`
            <div class="col-12">
                <div class="text-muted small">
                    कोणतीही कागदपत्रे उपलब्ध नाहीत
                </div>
            </div>
        `);
      return;
    }

    documents.forEach((doc, index) => {
      const fileUrl = `${doc.saved_dir}/${doc.document_saved_name}`;
      const isMandatory = doc.type === "MANDATORY";

      $container.append(`
            <div class="col-12 col-md-6">
                <div class="border rounded p-3 h-100 d-flex flex-column justify-content-between">

                    <div>
                        <div class="fw-semibold mb-1">
                            ${index + 1}. ${doc.document_name}
                        </div>

                        <span class="badge ${isMandatory ? "bg-danger" : "bg-secondary"}">
                            ${isMandatory ? "अनिवार्य" : "ऐच्छिक"}
                        </span>

                        <div class="small d-none text-muted mt-1">
                            मूळ फाईल: ${doc.document_original_name}
                        </div>
                    </div>

                    <div class="mt-3">
                        <a class="btn btn-sm btn-outline-primary w-100"
                           href="${fileUrl}"
                           target="_blank">
                            कागदपत्र पहा
                        </a>
                    </div>

                </div>
            </div>
        `);
    });
  }

//   showing status info details

function bindStatusValues($modal, application) {
    const status = application.application_status;

    if (status === 'ACCEPTED') {
        $modal.find('[name="date_of_acceptance"]').val(application._date_of_acceptance || "");
        $modal.find('[name="acceptance_remark"]').val(application.acceptance_remark || "");
    }

    if (status === 'REJECTED') {
        $modal.find('[name="date_of_rejection"]').val(application._date_of_rejection || "");
        $modal.find('[name="rejection_remark"]').val(application.rejection_remark || "");
    }

    if (status === 'RESOLVED') {
        $modal.find('[name="masik_sabha_date"]').val(application._masik_sabha_date || "");
        $modal.find('[name="masik_tharav_number"]').val(application.masik_tharav_number || "");
        $modal.find('[name="resolution_malmatta_number"]').val(application.resolution_malmatta_number || "");
        $modal.find('[name="resolution_remark"]').val(application.resolution_remark || "");

        // Certificate
        $modal.find('[name="construction_certificate_date"]').val(application._construction_certificate_date || "");

        const $certLink = $modal.find('[name="construction_certification_doc_link"]');
        const $certStatus = $modal.find('[name="construction_certification_doc_status"]');

        if (application.construction_certification_doc_name) {
            const certUrl = `/uploads/images/construction/certificates/${application.construction_certification_doc_name}`;
            $certLink.attr('href', certUrl).removeClass('disabled');
            $certStatus.text('');
        } else {
            $certLink.attr('href', '#').addClass('disabled');
            $certStatus.text('प्रमाणपत्र उपलब्ध नाही');
        }
    }
}


  // When the "View Details" button is clicked
  $(document).on(
    "click",
    ".view-construction-application-details-btn",
    function () {
      const constructionApplication = JSON.parse(
        $(this).attr("data-constructionApplication") || "{}"
      );

      const $modal = $("#construction-application-details-modal");

      // /* -------- Reset modal -------- */
      $modal.find("input, textarea").val("");

      /* -------- Applicant details -------- */
      $modal
        .find('[name="malmatta_dharak_name"]')
        .val(constructionApplication.malmatta_dharak_name || "");
      $modal
        .find('[name="applicant_mobile"]')
        .val(constructionApplication.applicant_mobile || "");
      $modal
        .find('[name="applicant_adhar"]')
        .val(constructionApplication.applicant_adhar || "");
      $modal
        .find('[name="gp_name"]')
        .val(constructionApplication.gp_name || "");
      $modal
        .find('[name="applicant_address"]')
        .val(constructionApplication.applicant_address || "");

      $modal
        .find('[name="application_subject"]')
        .val(constructionApplication.application_subject || "");

      /* -------- Property details -------- */
      // ================= BASIC PROPERTY DATA =================
      $modal
        .find('[name="malmatta_no"]')
        .val(constructionApplication.malmatta_no || "");

      // ================= LANDMARK DATA =================
      bindLandmarkDetails($modal, "east", constructionApplication);
      bindLandmarkDetails($modal, "west", constructionApplication);
      bindLandmarkDetails($modal, "north", constructionApplication);
      bindLandmarkDetails($modal, "south", constructionApplication);

      //   Attached documents

      renderAttachedDocuments(
        $modal,
        constructionApplication.attached_documents
      );

      bindStatusValues($modal, constructionApplication)  
      /* -------- Show modal -------- */
      $modal.modal("show");
    }
  );
});
