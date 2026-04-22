$(() => {
  $(document).on("input change", '[name="gender"]', function (e) {
    e.preventDefault();
    let _gender = $(this).val()?.trim().toLowerCase();
    let _marathiGender = "";

    switch (_gender) {
      case "male":
        _marathiGender = "पुरुष";
        break;
      case "female":
        _marathiGender = "स्त्री";
        break;
      case "others":
        _marathiGender = "इतर";
        break;
    }

    $(`[name='gender_m']`).val(_marathiGender);

  });

  $(document).on("input change", '[name="certificate_not_found_for"]', function (e) {
    e.preventDefault();
    let _certificate = $(this).val()?.trim().toLowerCase();
    let _marathiCertificate = "";

    switch (_certificate) {
        case "birth":
            _marathiCertificate = "जन्म";
            break;
        case "death":
            _marathiCertificate = "मृत्यू";
            break;
    }

    $(`[name='certificate_not_found_for_m']`).val(_marathiCertificate);
});
  function _dateFormatYYYYMMDD(_date) {
    _date = _date?.trim();

    return _date ? _date.split("-").reverse().join("-") : "";
  }

  
  $(document).on("change", ".to-marathi", function (e) {
    e.preventDefault();
    let englishWord = $(this).val();
    const closestNextInputTagForMarathi = $(this)
      .closest(".form-group")
      .find("input")
      .eq(1);

    commonHandler.translateWord(englishWord, function (data) {
      // console.log(data)
      closestNextInputTagForMarathi.val(data);
    });
  });

  $(document).on("input change", '[name="relation_to_parent_or_spouse"]', function (e) {
    e.preventDefault();
    let _relation = $(this).val()?.trim().toLowerCase();
    let _marathiRelation = "";
  
    switch (_relation) {
      case "self":
        _marathiRelation = "स्वतः";
        break;
  
      case "son":
        _marathiRelation = "मुलगा";
        break;
  
      case "daughter":
        _marathiRelation = "मुलगी";
        break;
  
      case "wife":
        _marathiRelation = "पत्नी";
        break;
  
      case "husband":
        _marathiRelation = "पती";
        break;
    }
  
    $(`[name='relation_to_parent_or_spouse_m']`).val(_marathiRelation);
  });
  

  // jQuery Validation for the form
  $("#unavailability-certificate-form").validate({
    rules: {
      name: {
        required: true,
      },
      name_m: {
        required: false,
      },
      gender: {
        required: true,
      },
      gender_m: {
        required: false,
      },
      name_of_parent_or_spouse: {
        required: true,
      },
      name_of_parent_or_spouse_m: {
        required: false,
      },
      year_range: {
        required: true,
      },
      year_range_m: {
        required: false,
      },
      relation_to_parent_or_spouse: {
        required: true,
      },
      relation_to_parent_or_spouse_m: {
        required: false,
      },
      certificate_not_found_for: {
        required: true,
      },
      certificate_not_found_for_m: {
        required: false,
      },
      date_of_registration: {
        required: true,
      },
      date_of_registration_m: {
        required: false,
      },
      remarks: {
        required: false,
        maxlength: 255,
      },
      date_of_issue: {
        required: true,
        // date: true
      },
    },
    messages: {
      name: "Please enter the name",
      name_m: "कृपया नाव प्रविष्ट करा",
      gender: "Please select the gender",
      gender_m: "कृपया लिंग निवडा",
      name_of_parent_or_spouse: "Please enter the name of parent or spouse",
      name_of_parent_or_spouse_m: "कृपया पती/पत्नी/वडील/आई चे नाव प्रविष्ट करा",
      year_range: "Please enter the year range",
      year_range_m: "कृपया वर्ष प्रविष्ट करा",
      relation_to_parent_or_spouse: "Please select the relation",
      relation_to_parent_or_spouse_m: "कृपया नातं निवडा",
      certificate_not_found_for: "Please select the certificate type",
      certificate_not_found_for_m: "कृपया अनुपलब्ध दाखला निवडा",
      date_of_registration: "Please enter the date of registration",
      date_of_registration_m: "कृपया नोंदणी दिनांक प्रविष्ट करा",
      remarks: {
        maxlength: "Remarks cannot be longer than 255 characters",
      },
      date_of_issue: {
        required: "Please enter the date of issue",
        // date: "Please enter a valid date"
      },
    },
    // errorElement: "div",
    // errorPlacement: function (error, element) {
    //     error.addClass("invalid-feedback");
    //     element.closest(".form-group").append(error);
    // },
    // highlight: function (element, errorClass, validClass) {
    //     $(element).addClass("is-invalid").removeClass("is-valid");
    // },
    // unhighlight: function (element, errorClass, validClass) {
    //     $(element).addClass("is-valid").removeClass("is-invalid");
    // }
  });

  // Handle form submission for saving unavailability certificate
  $(document).on("click", "#save-unavailability-certificate-btn", function (e) {
    e.preventDefault();

    const certificateData = new FormData(
      document.getElementById("unavailability-certificate-form")
    );

    if (!$("#unavailability-certificate-form").valid()) {
      alertjs.warning({ t: "Please fill in all required fields" });
      return;
    }

    handleSaveUnavailabilityCertificate(certificateData, false);
  });

  // Handle form submission for updating unavailability certificate
  $(document).on(
    "click",
    "#update-unavailability-certificate-btn",
    function (e) {
      e.preventDefault();

      const certificateData = new FormData(
        document.getElementById("unavailability-certificate-form")
      );

      if (!$("#unavailability-certificate-form").valid()) {
        alertjs.warning({ t: "Please fill in all required fields" });
        return;
      }

      handleSaveUnavailabilityCertificate(certificateData, true);
    }
  );

  async function handleSaveUnavailabilityCertificate(
    certificateData,
    isUpdate
  ) {
    try {
      certificateData.set(
        "date_of_registration",
        _dateFormatYYYYMMDD(certificateData.get("date_of_registration"))
      );
      certificateData.set(
        "date_of_issue",
        _dateFormatYYYYMMDD(certificateData.get("date_of_issue"))
      );

      const _url = !isUpdate
        ? `/unavailability-certificate/save-unavailability-certificate`
        : `/unavailability-certificate/update-unavailability-certificate`;

      const _response = await fetch(_url, {
        method: !isUpdate ? "POST" : "PUT",
        body: certificateData,
      });

      const { success, data } = await _response.json();

      if (success) {
        const msg = !isUpdate
          ? "Certificate saved successfully"
          : "Certificate updated successfully";
        $.notify(msg, {
          className: "success",
          globalPosition: "top center",
        });

        if (!isUpdate) {
          document.getElementById("unavailability-certificate-form").reset();
        }
      } else {
        alertjs.warning({ t: "Error: Unable to save the certificate" });
      }
    } catch (err) {
      console.log(`Error while saving the certificate: ${err}`);
      alertjs.warning({ t: "Error: Unable to save the certificate" });
    }
  }

  // Datepicker initialization
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
  });
});
