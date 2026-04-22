$(document).ready(function () {
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
  });
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

  // -----------------------------
  // Helper Validation Functions
  // -----------------------------
  const isRequired = (value) => value.trim() !== "";
  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isDigits = (value) => /^\d+$/.test(value);
  const isLength = (value, length) => value.length === length;

  // -----------------------------
  // Error Handling Functions
  // -----------------------------
  const showError = (element, message) => {
    if (!element) return;

    const parentDiv = element.closest(".flex.flex-col");
    const existingError = parentDiv.querySelector(".error-message");

    if (existingError) existingError.remove();

    const error = document.createElement("span");
    error.className = "error-message";

    Object.assign(error.style, {
      color: "red",
      fontWeight: "600",
      marginTop: "4px",
      fontSize: "12px",
      display: "block",
    });

    error.textContent = message;

    const inputHolder = element.closest(".input-holder");
    inputHolder.insertAdjacentElement("afterend", error);
  };

  const clearError = (element) => {
    if (!element) return;

    const holder = element.closest(".input-holder");

    if (holder) {
      const err = holder.querySelector(".error-message");
      if (err) err.remove();

      // Reset border color
      holder.style.borderColor = "#d1d5db";
    }
  };

  const clearAllErrors = (form) => {
    form.querySelectorAll(".error-message").forEach((el) => el.remove());
  };

  $("#complaintSubject").on("change", function () {
    const isOther = this.value === "other";

    const otherField = document.getElementById("other_complaint_subject");

    otherField.required = isOther;

    if (!isOther) {
      otherField.value = "";
      clearError(otherField); // if you have per-field error handling
    }
  });
  // -----------------------------
  // Form Submission
  // -----------------------------
  const handleRegisterComplaint = async (complaintData) => {
    try {
      const response = await fetch("/complaints", {
        method: "POST",
        body: complaintData,
      });

      const { success, message, data } = await response.json();

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () => {
          // window.location.reload(),
          if (data.id) window.open(`/complaints/print/${data.id}`, "_blank");
        });
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message || "काहीतरी चुकले. पुन्हा प्रयत्न करा.",
        });
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alertjs.warning({
        t: "WARNING",
        m: "काहीतरी चुकले. पुन्हा प्रयत्न करा.",
      });
    }
  };

  // -----------------------------
  // Form Validation
  // -----------------------------
  const validateForm = (form) => {
    let isValid = true;

    const fields = [
      {
        id: "formName",
        label: "अर्जदाराचे नाव",
        rules: [(v) => isRequired(v) || "कृपया अर्जदाराचे नाव भरा"],
        minLength: 3,
        minLengthMessage: "किमान 3 अक्षरे असणे आवश्यक",
      },
      {
        id: "formEmail",
        label: "ई-मेल",
        rules: [
          (v) => isRequired(v) || "ई-मेल आवश्यक आहे",
          (v) => isEmail(v) || "योग्य ई-मेल भरा",
        ],
      },
      {
        id: "formMobile",
        label: "मोबाईल क्रमांक",
        rules: [
          (v) => isRequired(v) || "मोबाईल क्रमांक आवश्यक आहे",
          (v) => isDigits(v) || "फक्त अंक भरा",
          (v) => isLength(v, 10) || "10 अंक असणे आवश्यक",
        ],
      },
      {
        id: "formAadhar",
        label: "आधार क्रमांक",
        rules: [
          (v) => isRequired(v) || "आधार क्रमांक आवश्यक आहे",
          (v) => isDigits(v) || "फक्त अंक",
          (v) => isLength(v, 12) || "12 अंक असणे आवश्यक",
        ],
      },
      {
        id: "formAddress",
        label: "पत्ता",
        rules: [(v) => isRequired(v) || "पत्ता आवश्यक आहे"],
        minLength: 5,
        minLengthMessage: "किमान 5 अक्षरे असणे आवश्यक",
      },
      {
        id: "complaintSubject",
        label: "तक्रारीचा विषय",
        rules: [(v) => isRequired(v) || "तक्रारीचा विषय निवडा"],
      },
      //   {
      //     id: "garbageVanPicksUpGarbage",
      //     label: "कचरा गाडी येते का",
      //     rules: [(v) => isRequired(v) || "कचरा गाडी येते का हे निवडा"],
      //   },
      //   {
      //     id: "garbageCollectionVanFrequencyByWeek",
      //     label: "आठवड्यात येण्याची वारंवारिता",
      //     rules: [(v) => isRequired(v) || "आठवड्यात किती वेळा येते ते निवडा"],
      //   },
      //   {
      //     id: "isGarbageProperlyDisposed",
      //     label: "कचरा योग्य प्रकारे टाकला जातो का",
      //     rules: [
      //       (v) => isRequired(v) || "कचरा योग्य प्रकारे टाकला जातो का हे निवडा",
      //     ],
      //   },
    ];

    fields.forEach((field) => {
      const el = document.getElementById(field.id);
      const value = el ? el.value : "";

      clearError(el);

      for (let rule of field.rules) {
        const result = rule(value);
        if (result !== true) {
          showError(el, result);
          isValid = false;
          return;
        }
      }

      if (field.minLength && value.length < field.minLength) {
        showError(el, `${field.label} ${field.minLengthMessage}`);
        isValid = false;
      }
    });

    const fileFields = [
      {
        id: "imageForComplaint",
        label: "छायाचित्र",
        allowedExt: ["jpg", "jpeg", "png", "webp"],
      },
      { id: "docForComplaint", label: "कागदपत्र", allowedExt: [] }, // allow any file
    ];

    fileFields.forEach((fileField) => {
      const input = document.getElementById(fileField.id);
      clearError(input);

      if (!input || !input.files || input.files.length === 0) {
        showError(input, `${fileField.label} आवश्यक आहे`);
        isValid = false;
        return;
      }

      const file = input.files[0];

      if (fileField.allowedExt.length > 0) {
        const ext = file.name.split(".").pop().toLowerCase();
        if (!fileField.allowedExt.includes(ext)) {
          showError(
            input,
            `${fileField.label} फक्त ${fileField.allowedExt.join(", ").toUpperCase()} फॉर्मॅट`,
          );
          isValid = false;
        }
      }

      if (file.size > MAX_FILE_SIZE) {
        showError(input, `${fileField.label} 4MB पेक्षा जास्त आहे`);
        isValid = false;
      }
    });

    return isValid;
  };

  // -----------------------------
  // Geolocation Functions
  // -----------------------------
  let userCoords = null; // store coords globally

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("आपला ब्राऊझर स्थान प्राप्त करण्यास समर्थ नाही");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            userCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(userCoords);
          },
          (err) => {
            reject("कृपया आपल्या स्थानाची परवानगी द्या. स्थान आवश्यक आहे.");
          },
        );
      }
    });
  };

  // Ask for permission on page load
  getUserLocation().catch((errMsg) => {
    alertjs.warning({ t: "LOCATION REQUIRED", m: errMsg });
  });

  $("#complaintSubject").on("change", function () {
    const isOther = $(this).val() === "other";
    const $wrapper = $("#other-complaint-subject-wrapper");
    const $input = $("#other_complaint_subject");

    $input.prop("required", isOther);

    if (isOther) {
      $wrapper.removeClass("hidden");
      $input.focus();
    } else {
      $wrapper.addClass("hidden");
      $input.val("");
      clearError($input[0]);
    }
  });

  // -----------------------------
  // Button Click Listener
  // -----------------------------
  $("#registerComplaintBtn").on("click", async function (e) {
    e.preventDefault();

    const form = document.getElementById("complaint-form");

    clearAllErrors(form);

    if (!validateForm(form)) {
      console.log("Form validation failed.");
      return;
    }

    // If user denied location earlier, ask again
    if (!userCoords) {
      try {
        await getUserLocation();
      } catch (errMsg) {
        alertjs.warning({ t: "LOCATION REQUIRED", m: errMsg });
        return;
      }
    }

    const complaintData = new FormData(form);

    const selectedSubject = complaintData.get("complaintSubject");
    console.log(selectedSubject);

    if (selectedSubject === "other") {
      const otherSubject = complaintData.get("other_complaint_subject");

      if (!otherSubject || !otherSubject.trim()) {
        alertjs.warning({
          t: "SUBJECT REQUIRED",
          m: "कृपया इतर विषय नमूद करा",
        });
        return;
      }

      // Replace subject with typed value
      complaintData.set("complaintSubject", otherSubject.trim());

      // Optional: remove helper field
      //   complaintData.delete("other_complaint_subject");
    }

    complaintData.append("imageLatitude", userCoords.latitude);
    complaintData.append("imageLongitude", userCoords.longitude);

    complaintData.set(
      "createdAt",
      _commonjsDateFormat(complaintData.get("createdAt")),
    );
    await handleRegisterComplaint(complaintData);
  });
});
