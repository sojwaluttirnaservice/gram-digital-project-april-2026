function openCustomSizeWindow(url, width = 1366, height = 768) {
  console.log("Executing this function");
  const features = `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=${width},height=${height},initial-scale=1.0,maximum-scale=1.0,user-scalable=no`;
  const printWindow = window.open(url, "_blank", features);
  if (printWindow) {
    printWindow.focus();
  } else {
    alert("Pop-up blocked. Please allow pop-ups for this site.");
  }
}

$(() => {
  $(".datepicker").mask("00-00-0000");
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-90:+0",
  });

  const $form = $("#property-ferfar-form");

  // -----------------------------
  // jQuery Validation Rules
  // -----------------------------
  $form.validate({
    ignore: [],
    rules: {
      applicant_name: {
        required: true,
        minlength: 3,
      },
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
      applicant_address: {
        required: true,
        minlength: 10,
      },
      applicant_village: {
        required: true,
        maxlength: 60,
      },
      //   malmatta_no: {
      //     required: true,
      //   },
      original_owner_name: {
        required: true,
      },
      ferfar_document: {
        required: true,
      },
      ferfarDocument: {
        required: true,
        // extension: "jpg|jpeg|png|pdf",
      },
      i_agree_statement_status: {
        required: true,
      },
      east_landmark: {
        required: true,
        minlength: 3,
        maxlength: 100,
      },
      west_landmark: {
        required: true,
        minlength: 3,
        maxlength: 100,
      },
      north_landmark: {
        required: true,
        minlength: 3,
        maxlength: 100,
      },
      south_landmark: {
        required: true,
        minlength: 3,
        maxlength: 100,
      },
    },

    messages: {
      applicant_name: "अर्जदाराचे नाव आवश्यक आहे.",
      applicant_mobile: {
        required: "मोबाईल क्रमांक आवश्यक आहे.",
        digits: "फक्त अंक टाका.",
        minlength: "१० अंकी मोबाईल क्रमांक टाका.",
        maxlength: "१० अंकी मोबाईल क्रमांक टाका.",
      },
      applicant_adhar: {
        required: "आधार क्रमांक आवश्यक आहे.",
        digits: "फक्त अंक टाका.",
        minlength: "१२ अंकी आधार क्रमांक टाका.",
        maxlength: "१२ अंकी आधार क्रमांक टाका.",
      },
      applicant_address: "पूर्ण पत्ता आवश्यक आहे.",
      applicant_village: "गावाचे नाव आवश्यक आहे.",
      //   malmatta_no: "मालमत्ता क्रमांक आवश्यक आहे.",
      original_owner_name: "मूळ मालकाचे नाव आवश्यक आहे.",
      ferfar_document: "कागदपत्र प्रकार निवडा.",
      ferfarDocument: {
        required: "कागदपत्र अपलोड करणे आवश्यक आहे.",
        extension: "फक्त JPG, PNG किंवा PDF फाइल अपलोड करा.",
      },
      i_agree_statement_status: "अटी व शर्ती मान्य करणे आवश्यक आहे.",

      east_landmark: {
        required: "पूर्व दिशेचा सीमाभाग / शेजारी आवश्यक आहे.",
        minlength: "किमान ३ अक्षरे टाका.",
        maxlength: "१०० अक्षरांपेक्षा जास्त मजकूर टाकू नका.",
      },
      west_landmark: {
        required: "पश्चिम दिशेचा सीमाभाग / शेजारी आवश्यक आहे.",
        minlength: "किमान ३ अक्षरे टाका.",
        maxlength: "१०० अक्षरांपेक्षा जास्त मजकूर टाकू नका.",
      },
      north_landmark: {
        required: "उत्तर दिशेचा सीमाभाग / शेजारी आवश्यक आहे.",
        minlength: "किमान ३ अक्षरे टाका.",
        maxlength: "१०० अक्षरांपेक्षा जास्त मजकूर टाकू नका.",
      },
      south_landmark: {
        required: "दक्षिण दिशेचा सीमाभाग / शेजारी आवश्यक आहे.",
        minlength: "किमान ३ अक्षरे टाका.",
        maxlength: "१०० अक्षरांपेक्षा जास्त मजकूर टाकू नका.",
      },
    },

    errorElement: "span",
    errorClass: "text-red-600 text-sm font-semibold",
    highlight: function (element) {
      $(element).closest(".input-holder").addClass("border-red-500");
    },
    unhighlight: function (element) {
      $(element).closest(".input-holder").removeClass("border-red-500");
    },
    errorPlacement: function (error, element) {
      if (element.attr("type") === "file") {
        error.insertAfter(element.closest(".input-holder"));
      } else {
        error.insertAfter(element);
      }
    },
  });

  // -----------------------------
  // Submit Handler
  // -----------------------------
  async function handleSubmitFerfarForm(e) {
    e.preventDefault();

    if (!$form.valid()) {
      alertjs.warning({
        t: "WARNING",
        m: "कृपया सर्व आवश्यक माहिती भरा.",
      });
      return;
    }

    const propertyFerfarData = new FormData($form[0]);
    propertyFerfarData.set('application_date', _commonjsDateFormat(propertyFerfarData.get("application_date")))

    try {
      const url = "/gp-applications/f8-ferfar/register";

      const { success, message, data } = await fetch(url, {
        method: "POST",
        body: propertyFerfarData,
      }).then((res) => res.json());

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () => {
          const printUrl = `/gp-applications/f8-ferfar/print/${data.ferfarApplicationId}`;
          openCustomSizeWindow(printUrl);
        });
      } else {
        alertjs.warning({ t: "WARNING", m: message });
      }
    } catch (err) {
      console.error(err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले.",
      });
    }
  }

  // -----------------------------
  // Bind Submit
  // -----------------------------
  $(document).on("click", "#submit-ferfar-form-btn", handleSubmitFerfarForm);
});
