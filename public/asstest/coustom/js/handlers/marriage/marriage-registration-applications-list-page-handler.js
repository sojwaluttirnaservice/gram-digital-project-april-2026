$(() => {
  $(".datepicker").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    beforeShow: function (input, inst) {
      setTimeout(function () {
        inst.dpDiv.css({
          "z-index": 99999,
          background: "#ffffff !important", // force white background
          border: "1px solid #ccc", // optional: light border
          "box-shadow": "0 4px 8px rgba(0,0,0,0.1)", // optional: nice shadow
        });
      }, 0);
    },
  });

  const debouncedTranslate = commonjsDebounce(function (value, input) {
    commonHandler.translateWord(value, function (data) {
      $(input).val(data);
    });
  }, 200); // adjust delay if needed

  $(document).on("input change", ".mainText", function (e) {
    e.preventDefault();
    let value = $(this).val();
    let input = $(this).siblings(".secText");
    debouncedTranslate(value, input);
  });

  // MODALS => OPEN
  // ACCEPTE MODAL
  //   this are the buttons present in the list
  $(document).on(
    "click",
    ".accept-marriage-registration-application-btn",
    function (e) {
      let stringifiedMarriage = $(this).attr("data-marriage");

      let marriage = JSON.parse(stringifiedMarriage);

      $(
        `#accept-marriage-registration-application-form [name="marriageHusbandNameE"]`,
      ).val(marriage.marriageHusbandNameE);
      $(
        `#accept-marriage-registration-application-form [name="marriageHusbandNameM"]`,
      ).val(marriage.marriageHusbandNameM);
      $(
        `#accept-marriage-registration-application-form [name="marriageWifedNameE"]`,
      ).val(marriage.marriageWifedNameE);
      $(
        `#accept-marriage-registration-application-form [name="marriageWifeNameM"]`,
      ).val(marriage.marriageWifeNameM);

      $(`#accept-marriage-registration-application-form [name="id"]`).val(
        marriage.id,
      );

      $("#accept-marriage-registration-application-modal").modal("show");
    },
  );

  // REJECT MODAL
  $(document).on(
    "click",
    ".reject-marriage-registration-application-btn",
    function (e) {
      let stringifiedMarriage = $(this).attr("data-marriage");

      let marriage = JSON.parse(stringifiedMarriage);

      $(
        `#reject-marriage-registration-application-form [name="marriageHusbandNameE"]`,
      ).val(marriage.marriageHusbandNameE);
      $(
        `#reject-marriage-registration-application-form [name="marriageHusbandNameM"]`,
      ).val(marriage.marriageHusbandNameM);
      $(
        `#reject-marriage-registration-application-form [name="marriageWifedNameE"]`,
      ).val(marriage.marriageWifedNameE);
      $(
        `#reject-marriage-registration-application-form [name="marriageWifeNameM"]`,
      ).val(marriage.marriageWifeNameM);

      $(`#reject-marriage-registration-application-form [name="id"]`).val(
        marriage.id,
      );

      $("#reject-marriage-registration-application-modal").modal("show");
    },
  );

  // update stuats part

  async function handleUpdateStatus(
    formData,
    $btn,
    actionText = "Processing...",
  ) {
    disableBtn($btn, actionText);

    try {
      const res = await fetch("/marriage/status", {
        method: "PUT",
        body: formData,
      });

      const { success, message } = await res.json();

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () => location.reload());
      } else {
        enableBtn($btn);
        alertjs.warning({ t: "WARNING", m: message });
      }
    } catch (err) {
      enableBtn($btn);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "Something went wrong",
      });
    }
  }

  $(document).on(
    "click",
    "#accept-marriage-registration-application-btn",
    function (e) {
      e.preventDefault();

      const $btn = $(this);
      const formData = new FormData(
        document.getElementById(
          "accept-marriage-registration-application-form",
        ),
      );

      formData.set("status", "ACCEPTED");

      handleUpdateStatus(formData, $btn, "Accepting...");
    },
  );

  $(document).on(
    "click",
    "#reject-marriage-registration-application-btn",
    function (e) {
      e.preventDefault();

      const $btn = $(this);
      const formData = new FormData(
        document.getElementById(
          "reject-marriage-registration-application-form",
        ),
      );
      formData.set("status", "REJECTED");

      handleUpdateStatus(formData, $btn, "Rejecting...");
    },
  );

  //   print model

  $(document).on("click", ".printModel", function (e) {
    e.preventDefault();
    // console.log('print m certificate')
    $("#printPlace").val("");
    $("#date31").val("");
    let data = Number($(this).attr("data-id"));
    console.log(data);
    $("#idData").val(data);

    $("#marriageModel").modal("show");
  });

  $(document).on("click", "#btnPrintCertificate", function (e) {
    e.preventDefault();
    let printPlace = $("#printPlace").val();
    let date31 = $("#date31").val();

    window.open(
      `/print/marriage?p=${printPlace}&d=${date31}&i=${$("#idData").val()}`,
      "_blank",
    );
  });

  $(document).on("click", "#btnPrintMarriageCertificate", function (e) {
    e.preventDefault();
    let printPlace = $("#printPlace").val();
    let date31 = $("#date31").val();
    let format = $(this).attr("data-format");

    window.open(
      `/print/marriage?p=${printPlace}&d=${date31}&i=${$("#idData").val()}&format=${format}`,
      "_blank",
    );
  });

  $(document).on("click", "#marriage-register-report-print-btn", function (e) {
    e.preventDefault();
    let month = +$(`[name='month']`).val(),
      year = $(`[name='year']`).val();

    if (isNaN(month) || month > 12 || month < 0) {
      alertjs.warning({
        t: "योग्य महिना भरा",
      });
      return;
    }

    if (isNaN(year) || year.length != 4) {
      alertjs.warning({
        t: "योग्य वर्ष भरा",
      });
      return;
    }

    $(`#monthYearModal`).modal("hide");

    window.open(
      `/marriage/marriage-register-report-print?month=${month}&year=${year}`,
    );
  });

  // marriage details handler

  // ================================
  // View Marriage Details
  // ================================
  $(document).on("click", ".view-marriage-details-btn", function (e) {
    e.preventDefault();

    const marriage = $(this).data("marriage"); // object passed from table row
    const $modal = $("#marriage-details-modal");

    // =============================
    // BASIC APPLICATION INFO
    // =============================
    $modal.find('[name="id"]').val(marriage.id);
    $modal.find('[name="application_mode"]').val(marriage.application_mode);
    $modal.find('[name="application_status"]').val(marriage.application_status);
    $modal.find('[name="created_date"]').val(marriage._created_date);

    // =============================
    // HUSBAND DETAILS
    // =============================
    $modal
      .find('[name="marriageHusbandNameE"]')
      .val(marriage.marriageHusbandNameE);
    $modal
      .find('[name="marriageHusbandNameM"]')
      .val(marriage.marriageHusbandNameM);
    $modal
      .find('[name="marriageHusbandMobileE"]')
      .val(marriage.marriageHusbandMobileE);
    $modal
      .find('[name="marriageHusbandAadharE"]')
      .val(marriage.marriageHusbandAadharE);
    $modal
      .find('[name="marriageHusbandDobE"]')
      .val(marriage.marriageHusbandDobE);
    $modal.find('[name="marriageHusbandAge"]').val(marriage.marriageHusbandAge);
    $modal
      .find('[name="marriageHusbandAddressE"]')
      .val(marriage.marriageHusbandAddressE);

    // =============================
    // HUSBAND DOCUMENT LINKS
    // =============================

    if (marriage.marriageHusbandBirthProofFile) {
      $("#marriageHusbandBirthProofFileLink")
        .attr(
          "href",
          `/uploads/docs/marriage/${marriage.marriageHusbandBirthProofFile}`,
        )
        .text(`जन्म दाखला (${marriage.marriageHusbandBirthProofType || "—"})`)
        .show();
    } else {
      $("#marriageHusbandBirthProofFileLink").hide();
    }

    if (marriage.marriageHusbandIdProofFile) {
      $("#marriageHusbandIdProofFileLink")
        .attr(
          "href",
          `/uploads/docs/marriage/${marriage.marriageHusbandIdProofFile}`,
        )
        .text(`ओळखपत्र (${marriage.marriageHusbandIdProofType || "—"})`)
        .show();
    } else {
      $("#marriageHusbandIdProofFileLink").hide();
    }

    if (marriage.marriageHusbandAddressProofFile) {
      $("#marriageHusbandAddressProofFileLink")
        .attr(
          "href",
          `/uploads/docs/marriage/${marriage.marriageHusbandAddressProofFile}`,
        )
        .text(
          `पत्ता पुरावा (${marriage.marriageHusbandAddressProofType || "—"})`,
        )
        .show();
    } else {
      $("#marriageHusbandAddressProofFileLink").hide();
    }

    // =============================
    // HUSBAND PHOTO
    // =============================
    const $husbandPhotoContainer = $("#husbandPhotoContainer");
    $husbandPhotoContainer.empty();

    if (marriage.image_h) {
      $husbandPhotoContainer.append(`
    <div class="col-md-4 mb-3">
      <div class="card shadow-sm rounded-3">
        <img 
          src="/upload/${marriage.image_h}" 
          class="img-fluid rounded-top" 
          style="height:220px; object-fit:cover;"
        />
        <div class="card-body text-center p-2">
          <strong>पती फोटो</strong>
        </div>
      </div>
    </div>
  `);
    } else {
      $husbandPhotoContainer.append(`
    <div class="col-12">
      <p class="text-muted">पतीचा फोटो उपलब्ध नाही.</p>
    </div>
  `);
    }

    // =============================
    // WIFE DETAILS
    // =============================
    $modal.find('[name="marriageWifedNameE"]').val(marriage.marriageWifedNameE);
    $modal.find('[name="marriageWifeNameM"]').val(marriage.marriageWifeNameM);
    $modal
      .find('[name="marriageWifeMobileE"]')
      .val(marriage.marriageWifeMobileE);
    $modal
      .find('[name="marriageWifedAadharE"]')
      .val(marriage.marriageWifedAadharE);
    $modal.find('[name="marriageWifeDobE"]').val(marriage.marriageWifeDobE);
    $modal.find('[name="marriageWifeAge"]').val(marriage.marriageWifeAge);
    $modal
      .find('[name="marriageWifeAddressE"]')
      .val(marriage.marriageWifeAddressE);

    // =============================
    // WIFE DOCUMENT LINKS
    // =============================

    if (marriage.marriageWifeBirthProofFile) {
      $("#marriageWifeBirthProofFileLink")
        .attr(
          "href",
          `/uploads/docs/marriage/${marriage.marriageWifeBirthProofFile}`,
        )
        .text(`जन्म दाखला (${marriage.marriageWifeBirthProofType || "—"})`)
        .show();
    } else {
      $("#marriageWifeBirthProofFileLink").hide();
    }

    if (marriage.marriageWifeIdProofFile) {
      $("#marriageWifeIdProofFileLink")
        .attr(
          "href",
          `/uploads/docs/marriage/${marriage.marriageWifeIdProofFile}`,
        )
        .text(`ओळखपत्र (${marriage.marriageWifeIdProofType || "—"})`)
        .show();
    } else {
      $("#marriageWifeIdProofFileLink").hide();
    }

    if (marriage.marriageWifeAddressProofFile) {
      $("#marriageWifeAddressProofFileLink")
        .attr(
          "href",
          `/uploads/docs/marriage/${marriage.marriageWifeAddressProofFile}`,
        )
        .text(`पत्ता पुरावा (${marriage.marriageWifeAddressProofType || "—"})`)
        .show();
    } else {
      $("#marriageWifeAddressProofFileLink").hide();
    }

    // =============================
    // WIFE PHOTO
    // =============================
    const $wifePhotoContainer = $("#wifePhotoContainer");
    $wifePhotoContainer.empty();

    if (marriage.image_w) {
      $wifePhotoContainer.append(`
    <div class="col-md-4 mb-3">
      <div class="card shadow-sm rounded-3">
        <img 
          src="/upload/${marriage.image_w}" 
          class="img-fluid rounded-top" 
          style="height:220px; object-fit:cover;"
        />
        <div class="card-body text-center p-2">
          <strong>पत्नी फोटो</strong>
        </div>
      </div>
    </div>
  `);
    } else {
      $wifePhotoContainer.append(`
    <div class="col-12">
      <p class="text-muted">पत्नीचा फोटो उपलब्ध नाही.</p>
    </div>
  `);
    }

    // =============================
    // MARRIAGE DETAILS
    // =============================
    $modal.find('[name="marriageTypeE"]').val(marriage.marriageTypeE);
    $modal.find('[name="marriageDate"]').val(marriage.marriageDate);
    $modal.find('[name="marriagePlaceE"]').val(marriage.marriagePlaceE);
    $modal.find('[name="marriageHallNameE"]').val(marriage.marriageHallNameE);
    $modal
      .find('[name="marriageHallAddressE"]')
      .val(marriage.marriageHallAddressE);

    // ============================
    // WEDDING PHOTOS (MULTIPLE)
    // =============================
    const photos = marriage.marriageWeddingPhotos || [];
    const $photoContainer = $("#marriageWeddingPhotosContainer");

    $photoContainer.empty();

    if (photos.length > 0) {
      photos.forEach((photo, index) => {
        const photoHtml = `
      <div class="col-md-3 mb-3">
        <div class="card shadow-sm rounded-3">
          <img 
            src="/uploads/images/marriage/${photo}" 
            class="img-fluid rounded-top" 
            style="height:180px; object-fit:cover;"
          />
          <div class="card-body text-center p-2">
            <a 
              href="/uploads/images/marriage/${photo}" 
              target="_blank" 
              class="btn btn-sm btn-outline-primary w-100"
            >
              फोटो ${index + 1} पहा
            </a>
          </div>
        </div>
      </div>
    `;

        $photoContainer.append(photoHtml);
      });
    } else {
      $photoContainer.append(`
    <div class="col-12">
      <p class="text-muted">कोणतेही विवाह फोटो उपलब्ध नाहीत.</p>
    </div>
  `);
    }

    $("#marriageWeddingCertificateFileLink").attr(
      "href",
      `/uploads/docs/marriage/${marriage.marriageWeddingCertificateFile}`,
    );

    $("#marriageWeddingCardFileLink").attr(
      "href",
      `/uploads/docs/marriage/${marriage.marriageWeddingCardFile}`,
    );

    // =============================
    // WITNESSES (JSON)
    // =============================
    const witnesses = marriage.witnesses_details || [];
    const $container = $("#witnesses-container");
    $container.empty();

    witnesses.forEach((w, index) => {
      const witnessHtml = `
    <div class="card shadow-sm rounded-3 mb-3">
      <div class="card-body p-3">
        <div class="row align-items-center">

          <!-- Left Side: Details -->
          <div class="col-12 col-md-8">
            <h6 class="fw-bold mb-2">साक्षीदार ${index + 1}</h6>
            <p class="mb-1"><strong>नाव:</strong> ${w.name || ""}</p>
            <p class="mb-1"><strong>आधार:</strong> ${w.aadhar || ""}</p>
            <p class="mb-1"><strong>मोबाईल:</strong> ${w.mobile || ""}</p>
            <p class="mb-2"><strong>पत्ता:</strong> ${w.address || ""}</p>

            ${
              w.idUpload
                ? `<a href="/uploads/docs/marriage/${w.idUpload}" 
                     target="_blank" 
                     class="btn btn-sm btn-outline-secondary">
                     ओळखपत्र पहा
                   </a>`
                : ""
            }
          </div>

          <!-- Right Side: Photo -->
          <div class="col-12 col-md-4 text-center mt-3 mt-md-0">
            ${
              w.photo
                ? `<img src="/uploads/docs/marriage/${w.photo}" 
                       alt="Witness Photo"
                       class="img-fluid rounded shadow-sm"
                       style="max-height: 180px; object-fit: cover;">`
                : `<div class="text-muted">फोटो उपलब्ध नाही</div>`
            }
          </div>

        </div>
      </div>
    </div>
  `;

      $container.append(witnessHtml);
    });

    // =============================
    // STATUS BASED TOGGLE
    // =============================
    if (marriage.application_status === "ACCEPTED") {
      $("#acceptance-section").show();
      $("#rejection-section").hide();

      $modal
        .find('[name="date_of_acceptance"]')
        .val(marriage._date_of_acceptance || "");
      $modal
        .find('[name="acceptance_remark"]')
        .val(marriage.acceptance_remark || "");
    } else if (marriage.application_status === "REJECTED") {
      $("#rejection-section").show();
      $("#acceptance-section").hide();

      $modal
        .find('[name="date_of_rejection"]')
        .val(marriage._date_of_rejection || "");
      $modal
        .find('[name="rejection_remark"]')
        .val(marriage.rejection_remark || "");
    } else {
      $("#acceptance-section, #rejection-section").hide();
    }

    // =============================
    // SHOW MODAL
    // =============================
    $modal.modal("show");
  });


  // DELETE THE MARRIAE 
  	$(document).on('click', '.removeMarriage', function (e) {
		e.preventDefault()
		// console.log($(this).attr('data-id'))
		let certId = $(this).attr('data-certId')

		alertjs.delete(function (status) {
			if (status == true) {
				let data = {
					url: '/marriage/remove-marriage',
					method: 'post',
					data: {
						id: certId,
					},
				}
				commonHandler.ajaxManager(data, function (type, data) {
					if (type == false) {
						alert('You Have An Error, PLease check Console')
						console.log(data)
						return false
					}
					if (data.call == 1) {
						alertjs.success(
							{
								t: 'विवाह नोंदणी',
								m: 'यशस्वी रित्या काढल्या गेली.',
							},
							function () {
								window.location.reload()
							}
						)
					}
				})
			}
		})
	})
});

function disableBtn($btn, text = "Processing...") {
  if (!$btn || !$btn.length) return;
  $btn.data("old-text", $btn.text());
  $btn.prop("disabled", true).text(text);
}

function enableBtn($btn) {
  if (!$btn || !$btn.length) return;
  $btn.prop("disabled", false).text($btn.data("old-text") || "Submit");
}
