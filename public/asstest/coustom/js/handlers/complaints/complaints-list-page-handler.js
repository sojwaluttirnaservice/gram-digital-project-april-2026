$(() => {
  // ==================================
  // code for complaints-list-page.pug
  // ==================================
  // Initialize datepicker for any date fields
  // Initialize datepicker
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    beforeShow: function () {
      setTimeout(function () {
        $(".ui-datepicker").css({
          "z-index": 1065,
        });
      }, 0);
    },
  });

  //   from dd-mm-yyyy to yyyy-mm-dd for sql format
  let formatDate = (_d) => {
    if (!_d) return "";
    return _d.trim().split("-").reverse().join("-");
  };

  //   this are the buttons present in the list
  $(document).on("click", ".accept-complaint-btn", function (e) {
    let stringifiedComplaint = $(this).attr("data-complaint");

    let complaint = JSON.parse(stringifiedComplaint);

    $(`#accept-complaint-form [name="formName"]`).val(complaint.formName);
    $(`#accept-complaint-form [name="id"]`).val(complaint.id);

    $("#accept-complaint-modal").modal("show");
  });

  $(document).on("click", ".reject-complaint-btn", function (e) {
    let stringifiedComplaint = $(this).attr("data-complaint");

    let complaint = JSON.parse(stringifiedComplaint);

    $(`#reject-complaint-form [name="formName"]`).val(complaint.formName);
    $(`#reject-complaint-form [name="id"]`).val(complaint.id);

    $("#reject-complaint-modal").modal("show");
  });

  //   Below are the buttons preset in the modal having some id ofc

  async function handleAccepetComplaint(e) {
    e.preventDefault();

    let accpetedData = new FormData(
      document.getElementById("accept-complaint-form")
    );

    accpetedData.set(
      "complaintResolutionDate",
      formatDate(accpetedData.get("complaintResolutionDate"))
    );
    // accpetedData.set(
    //   "complaintImage",
    //   await compressImageFile(accpetedData.get("complaintImage"))
    // );

    try {
      const { success, message } = await fetch("/complaints/accept", {
        method: "PUT",
        body: accpetedData,
      }).then((res) => res.json());

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            window.location.reload();
          }
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "Warning",
        m: err?.message || "Something went wrong",
      });
    }
  }

  $(document).on("click", "#accept-complaint-btn", handleAccepetComplaint);

  async function handleRejectComplaint(e) {
    e.preventDefault();

    let rejectionData = new FormData(
      document.getElementById("reject-complaint-form")
    );

    rejectionData.set(
      "complaintRejectionDate",
      formatDate(rejectionData.get("complaintRejectionDate"))
    );

    try {
      const { success, message } = await fetch("/complaints/reject", {
        method: "PUT",
        body: rejectionData,
      }).then((res) => res.json());

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            location.reload();
          }
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "Warning",
        m: err?.message || "Something went wrong",
      });
    }
  }
  $(document).on("click", "#reject-complaint-btn", handleRejectComplaint);

  // ==================================
  //  END OF ABOVE
  // ==================================

  // ==================================
  //   CODE FOR BOTH
  // code for accepted-complaints-list-page.pug
  //   code for rejected-complaints-list-page.pug
  // ==================================

  // Function to revoke a complaint and set its status back to PENDING
  const handleRevokeComplaint = async (complaintId) => {
    if (!complaintId) return;

    try {
      const response = await fetch("/complaints/revoke", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: complaintId }),
      });

      const { success, message } = await response.json();

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => location.reload()
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error revoking complaint:", err);
      alertjs.warning({
        t: "WARNING",
        m: "काहीतरी चुकले",
      });
    }
  };

  // Attach click event to revoke buttons
  $(document).on("click", ".revoke-complaint-btn", function () {
    const complaintId = $(this).attr("data-complaintId");
    handleRevokeComplaint(complaintId);
  });

  // ==================================
  // code for accepted-complaints-list-page.pug
  // ==================================

  /** 
    on page load, if that input exists mark it as only readonly
  complaintResolutionDate this is input
  then on change of value of  inside this date, updte the value inside

  complaintResolutionRemark inside this textarea like 'सदर तक्रारीचे निवारण  ${dateFromthatinpu) pपर्यंत होऊन जाईल'

  */
  // Check if the input exists and make readonly
  const $resolutionDate = $('input[name="complaintResolutionDate"]');
  if ($resolutionDate.length) {
    $resolutionDate.prop("readonly", true);

    // Attach change event using delegated format
    $(document).on(
      "change",
      'input[name="complaintResolutionDate"]',
      function () {
        // this was for shera
        const selectedDate = $(this).val();
        const $resolutionRemark = $(
          'textarea[name="complaintResolutionRemark"]'
        );
        if ($resolutionRemark.length) {
          $resolutionRemark.val(
            selectedDate
              ? `सदर तक्रारीचे निवारण ${selectedDate} पर्यंत होऊन जाईल`
              : ""
          );
        }

        // if extend-complaint-resolution-date-btn exists
        // which exists on the accepted-complaints-list-page.pug file

        // dont chnage the button disable state unless hte previous date and new date is not same
        let $extendComplaintResolutionDateBtn = $(
          "#extend-complaint-resolution-date-btn"
        );

        if ($(`[name="copyComplaintResolutionDate"]`)) {
          if (selectedDate != $(`[name="copyComplaintResolutionDate"]`).val()) {
            $extendComplaintResolutionDateBtn.prop("disabled", false);
          } else {
            $extendComplaintResolutionDateBtn.prop("disabled", true);
          }
        }
      }
    );
  }

  //   for extend the resolution date :

  $(document).on("click", ".extend-resolution-date-btn", function (e) {
    e.preventDefault();

    let stringifiedComplaint = $(this).attr("data-complaint");

    let complaint = JSON.parse(stringifiedComplaint);

    $(`#extend-resolution-date-form [name="formName"]`).val(complaint.formName);
    $(`#extend-resolution-date-form [name="complaintResolutionDate"]`).val(
      complaint._complaintResolutionDate
        ? complaint._complaintResolutionDate.split(" ")[0]
        : ""
    );
    $(`#extend-resolution-date-form [name="copyComplaintResolutionDate"]`).val(
      complaint._complaintResolutionDate
        ? complaint._complaintResolutionDate.split(" ")[0]
        : ""
    );

    $(`#extend-resolution-date-form [name="complaintResolutionRemark"]`).val(
      complaint.complaintResolutionRemark
    );
    $(`#extend-resolution-date-form [name="id"]`).val(complaint.id);
    $("#extend-resolution-date-modal").modal("show");
  });

  async function extendResolutionDate(formData) {
    formData.set(
      "complaintResolutionDate",
      formatDate(formData.get("complaintResolutionDate"))
    );
    const $btn = $("#extend-complaint-resolution-date-btn");
    const originalText = $btn.text();

    try {
      // Disable button + show loading text
      $btn.prop("disabled", true).text("प्रक्रिया सुरू आहे...");

      const response = await fetch("/complaints/extend/resolution-date", {
        method: "PUT",
        body: formData,
      });

      const { success, message } = await response.json();

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            location.reload();
          }
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message || "कारवाई अयशस्वी",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले",
      });
    } finally {
      // Restore button state
      $btn.prop("disabled", false).text(originalText);
    }
  }

  // Button click handler
  $(document).on(
    "click",
    "#extend-complaint-resolution-date-btn",
    function (e) {
      e.preventDefault();

      const form = document.getElementById("extend-resolution-date-form");
      if (!form) return;

      const newExtendData = new FormData(form);
      extendResolutionDate(newExtendData);
    }
  );

  //   MARK COMPLAINT AS RESOLVED,

  // FIRST THING IS TO OPEN THE MODAL FOR THE SAME PERSON COMPLAINT FOR WHICH WE WANNA RESOLVE IT

  $(document).on("click", ".resolve-complaint-btn", function (e) {
    e.preventDefault();

    let stringifiedComplaint = $(this).attr("data-complaint");

    let complaint = JSON.parse(stringifiedComplaint);

    $(`#resolve-complaint-form [name="formName"]`).val(complaint.formName);
    $(`#resolve-complaint-form [name="id"]`).val(complaint.id);
    $("#resolve-complaint-modal").modal("show");
  });
  const handleMarkResolve = async (resolvedData, $btn) => {
    try {
      // Disable button & show loading text
      $btn.prop("disabled", true).text("निवारण होत आहे...");

      const response = await fetch("/complaints/resolve", {
        method: "PUT",
        body: resolvedData,
      });

      const { success, message } = await response.json();

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            location.reload();
          }
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message || "कारवाई अयशस्वी",
        });

        $btn.prop("disabled", false).text("निवारण पूर्ण करा");
      }
    } catch (err) {
      console.error("Error:", err);

      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले",
      });

      $btn.prop("disabled", false).text("निवारण पूर्ण करा");
    }
  };

  $(document).on("click", "#resolve-complaint-btn", async function (e) {
    e.preventDefault();

    const $btn = $(this);
    const form = document.getElementById("resolve-complaint-form");

    if (!form) return;

    const resolvedData = new FormData(form);

    let compressedImg = await compressImageFile(
      resolvedData.get("resolvedComplaintImage")
    );

    resolvedData.set("resolvedComplaintImage", compressedImg);

    // ==============================
    // GET CURRENT LOCATION
    // ==============================
    if (!navigator.geolocation) {
      alertjs.warning({
        t: "WARNING",
        m: "आपल्या ब्राउझरमध्ये लोकेशन सुविधा उपलब्ध नाही",
      });
      return;
    }

    $btn.prop("disabled", true).text("लोकेशन मिळवत आहे...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Attach to FormData (exact DB field names)
        resolvedData.append("complaintResolutionImageLatitude", latitude);
        resolvedData.append("complaintResolutionImageLongitude", longitude);

        // Proceed with resolve
        handleMarkResolve(resolvedData, $btn);
      },
      (error) => {
        console.error("Geolocation error:", error);
        
        handleMarkResolve(resolvedData, $btn);
        

        // alertjs.warning({
        //   t: "WARNING",
        //   m: "लोकेशन मिळवता आले नाही. कृपया लोकेशन Allow करा.",
        // });

        $btn.prop("disabled", false).text("निवारण पूर्ण करा");
        return;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
});
