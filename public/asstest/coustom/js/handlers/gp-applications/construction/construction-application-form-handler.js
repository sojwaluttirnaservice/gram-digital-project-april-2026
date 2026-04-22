$(() => {
  $(".datepicker").mask("00-00-0000");
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-90:+0",
  });

  // check for location access
  initLocationGuard();

  bindLandmarkImageHandlers();

  /* =========================================================
   OPTIONAL DOCUMENTS HANDLER
   Allows user to add/remove optional documents dynamically
   Mandatory documents are handled separately and cannot be removed.
   ========================================================= */

  // Container where optional documents will be added
  const optionalContainer = $("#optional-documents-container");

  // Button to add new optional document
  const addOptionalBtn = $("#add-optional-doc");

  // Counter to create unique names for each optional document
  let optionalCount = 0;

  /**
   * Function: createOptionalDocRow
   * ------------------------------
   * Creates a new optional document row with:
   * 1. Input for document name (optional)
   * 2. Input for document file upload
   * 3. Remove button to delete the row
   */
  function createOptionalDocRow() {
    optionalCount++;
    const row = $(`
            <div class="input-group px-2 grid grid-cols-1 md:grid-cols-2 gap-2 items-center optional-doc-row">
                <div>
                    <label class="font-bold tracking-wider">कागदपत्राचे नाव (ऐच्छिक)</label>
                    <input type="text" name="optional_document_name_${optionalCount}" class="py-1 px-2 outline-none bg-stone-100 border border-stone-300 rounded-md w-full" placeholder="कागदपत्राचे नाव">
                </div>
                <div class="flex items-center gap-2">
                    <input type="file" name="optional_document_file_${optionalCount}" class="py-1 px-2 outline-none bg-stone-100 border border-stone-300 rounded-md w-full">
                    <button type="button" class="px-2 py-1 bg-red-600 text-white rounded-md remove-optional-doc hover:bg-red-700">काढा</button>
                </div>
            </div>
        `);

    // Bind remove functionality to the remove button
    row.find(".remove-optional-doc").on("click", function () {
      row.remove();
    });

    // Append the new optional document row to the container
    optionalContainer.append(row);
  }

  /**
   * Add new optional document row when user clicks the button
   */
  addOptionalBtn.on("click", createOptionalDocRow);

  /* =========================================================
   END OF OPTIONAL DOCUMENTS HANDLER
   ========================================================= */

  // =======================================================
  // FORM VALIDATION SETUP
  // =======================================================

  // Initialize validation rules on the form
  $("#construction-application-form").validate({
    ignore: [], // Ensure hidden fields (like latitude/longitude) are validated if needed
    rules: {
      malmatta_dharak_name: { required: true, minlength: 3 },
      applicant_mobile: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
      applicant_adhar: {
        required: true,
        digits: true,
        minlength: 12,
        maxlength: 12,
      },
      gp_name: { required: true },
      applicant_address: { required: true, minlength: 5 },
      application_subject: { required: true },
      malmatta_no: { required: false }, // optional
    },
    messages: {
      malmatta_dharak_name: "मालमत्ता धारकाचे नाव आवश्यक आहे",
      applicant_mobile: "वैध मोबाईल क्रमांक द्या",
      applicant_adhar: "वैध आधार क्रमांक द्या",
      gp_name: "ग्रामपंचायत आवश्यक आहे",
      applicant_address: "पूर्ण पत्ता आवश्यक आहे",
      application_subject: "अर्जाचा विषय आवश्यक आहे",
    },
    errorClass: "text-red-500 text-sm",
  });

  // =======================================================
  // SUBMIT BUTTON CLICK HANDLER
  // =======================================================

  $(document).on(
    "click",
    "#save-construction-application-btn",
    async function (e) {
      e.preventDefault();

      const $btn = $(this);
      const form = $("#construction-application-form");

      // Validate the form using jQuery Validation
      if (!form.valid()) {
        return false;
      }

      const formData = new FormData(form[0]);

      // =========================
      // 1. Mandatory documents
      // =========================
      for (let i = 1; i <= 6; i++) {
        const fileInput = $(`[name="mandatory_document_file_${i}"]`)[0];
        if (!fileInput || fileInput.files.length === 0) {
          alert(
            `Mandatory document "${$(`[name='mandatory_document_name_${i}']`).val()}" is required`,
          );
          fileInput.focus();
          return false;
        }
      }

      // =========================
      // 2. Direction photos
      // =========================
      const directions = ["east", "west", "north", "south"];
      for (let dir of directions) {
        const fileInput = $(`[name="${dir}_landmark_image_name"]`)[0];
        if (!fileInput || fileInput.files.length === 0) {
          alert(`${dir} direction photo is required`);
          fileInput.focus();
          return false;
        }
      }

      // =========================
      // DISABLE BUTTON (START)
      // =========================
      $btn.prop("disabled", true).addClass("disabled");

      // Compress EAST landmark image
      const eastImage = formData.get("east_landmark_image_name");
      if (eastImage) {
        const compressedEast = await compressImageFile(eastImage);
        formData.set("east_landmark_image_name", compressedEast);
      }

      // Compress WEST landmark image
      const westImage = formData.get("west_landmark_image_name");
      if (westImage) {
        const compressedWest = await compressImageFile(westImage);
        formData.set("west_landmark_image_name", compressedWest);
      }

      // Compress NORTH landmark image
      const northImage = formData.get("north_landmark_image_name");
      if (northImage) {
        const compressedNorth = await compressImageFile(northImage);
        formData.set("north_landmark_image_name", compressedNorth);
      }

      // Compress SOUTH landmark image
      const southImage = formData.get("south_landmark_image_name");
      if (southImage) {
        const compressedSouth = await compressImageFile(southImage);
        formData.set("south_landmark_image_name", compressedSouth);
      }

      formData.set("application_date", _commonjsDateFormat(formData.get("application_date")))

      try {
        const response = await fetch("/gp-applications/construction", {
          method: "POST",
          body: formData,
        });

        const { success, message, data } = await response.json();

        if (success) {
          alertjs.success(
            {
              t: "SUCCESS",
              m: message || "Form submitted successfully!",
            },

            () => {
              window.open(
                "/gp-applications/construction/print/" + data.applicationId,
              );
              location.reload();
            },
          );

          // form[0].reset();
          // $("#optional-documents-container").empty();
        } else {
          alertjs.warning({
            t: "WARNING",
            m: message,
          });
        }
      } catch (err) {
        console.error(err);
        alertjs.warning({
          t: "WARNING",
          m: err?.message || "काहीतरी चुकले. पुन्हा प्रयत्न करा.",
        });
      } finally {
        // =========================
        // ENABLE BUTTON (END)
        // =========================
        $btn.prop("disabled", false).removeClass("disabled");
      }
    },
  );
});

// north, east, west, wotuh image changes
// ====================================

function bindLandmarkImageHandlers() {
  const directions = ["east", "west", "north", "south"];

  directions.forEach((dir) => {
    $(`input[name="${dir}_landmark_image_name"]`).on("change", function () {
      handleLandmarkImageChange(dir);
    });
  });
}
function handleLandmarkImageChange(direction) {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLandmarkLocation(
        direction,
        position.coords.latitude,
        position.coords.longitude,
      );
    },
    (error) => {
      alert("Location access required to upload image");
    },
  );
}
function setLandmarkLocation(direction, latitude, longitude) {
  $(`input[name="${direction}_landmark_image_latitude"]`).val(latitude);
  $(`input[name="${direction}_landmark_image_longitude"]`).val(longitude);
}

// =============== location ==============

/**
 * Entry function
 */
function initLocationGuard() {
  if (!navigator.geolocation) {
    lockForm();
    return;
  }

  checkLocationPermission();
}

/**
 * Check existing permission state
 */
function checkLocationPermission() {
  navigator.permissions
    .query({ name: "geolocation" })
    .then((permissionStatus) => {
      if (permissionStatus.state === "granted") {
        unlockForm();
      } else {
        lockForm();
      }

      permissionStatus.onchange = () => {
        if (permissionStatus.state === "granted") {
          unlockForm();
        } else {
          lockForm();
        }
      };
    })
    .catch(() => {
      lockForm();
    });
}

/**
 * Ask browser for location
 */
function requestLocationAccess() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      unlockForm();
    },
    (error) => {
      lockForm();
    },
  );
}

/**
 * Disable submit, show warning & button
 */
function lockForm() {
  $("#save-construction-application-btn")
    .prop("disabled", true)
    .addClass("opacity-50 cursor-not-allowed");
  $("#warning-text").show();
  $("#grant-location-access").show();

  $("#grant-location-access").off("click").on("click", requestLocationAccess);
}

/**
 * Enable submit, hide warning & button
 */
function unlockForm() {
  $("#save-construction-application-btn")
    .prop("disabled", false)
    .removeClass("opacity-50 cursor-not-allowed");
  $("#warning-text").hide();
  $("#grant-location-access").hide();
}
