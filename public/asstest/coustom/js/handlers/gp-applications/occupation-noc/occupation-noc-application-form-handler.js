$(() => {
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-90:+0",
  });

  const form = $("#occupation-noc-application-form");
  const submitBtn = $("#submit-occupation-noc-application-btn");

  // =======================================================
  // FORM VALIDATION
  // =======================================================
  form.validate({
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
      applicant_email: {
        required: true,
        email: true,
      },
      applicant_aadhaar: {
        required: true,
        digits: true,
        minlength: 12,
        maxlength: 12,
      },
      applicant_address: {
        required: true,
        minlength: 5,
      },
      applicant_village: {
        required: true,
      },
      applicant_taluka: {
        required: true,
      },
      applicant_district: {
        required: true,
      },
    },
    messages: {
      applicant_name: "अर्जदाराचे नाव आवश्यक आहे",
      applicant_mobile: "वैध मोबाईल क्रमांक प्रविष्ट करा",
      applicant_email: "वैध ई-मेल प्रविष्ट करा",
      applicant_aadhaar: "१२ अंकी आधार क्रमांक प्रविष्ट करा",
      applicant_address: "संपूर्ण पत्ता आवश्यक आहे",
      applicant_village: "गाव आवश्यक आहे",
      applicant_taluka: "तालुका आवश्यक आहे",
      applicant_district: "जिल्हा आवश्यक आहे",
    },
    errorClass: "text-red-500 text-sm",
    errorPlacement: function (error, element) {
      error.insertAfter(element.closest(".input-holder"));
    },
  });

  // =======================================================
  // SUBMIT HANDLER
  // =======================================================
  $(document).on(
    "click",
    "#submit-occupation-noc-application-btn",
    async function (e) {
      e.preventDefault();

      // Validate form
      if (!form.valid()) {
        return false;
      }

      // =========================
      // DISABLE BUTTON
      // =========================

      try {
        submitBtn
          .prop("disabled", true)
          .addClass("opacity-50 cursor-not-allowed")
          .text("जतन करत आहे...");

        const formData = new FormData(form[0]);
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }

        const documents = [];
        $("#documents-container .input-group").each(function (i) {
          const $group = $(this);
          const $fileInput = $group.find("input[type='file']");
          if (!$fileInput.length) return;

          const file = $fileInput[0].files[0];

          const labelText = $group
            .find("label")
            .text()
            .replace(/\n/g, "")
            .replace(/\s+/g, " ")
            .trim();

          documents.push({
            document_name: labelText,
            document_original_name: file ? file.name : "",
            document_saved_path: "", // backend will fill
          });

          if (file) formData.append(`document_file_${i}`, file);
        });

        formData.append("uploaded_documents_list", JSON.stringify(documents));

        formData.set("dob", _commonjsDateFormat(formData.get("dob")));

        formData.set("createdAt", _commonjsDateFormat(formData.get("createdAt")));

        const response = await fetch("/gp-applications/occupation-noc", {
          method: "POST",
          body: formData,
        });

        const { success, message, data } = await response.json();

        if (success) {
          alertjs.success(
            {
              t: "SUCCESS",
              m: message || "अर्ज यशस्वीरीत्या जतन करण्यात आला आहे.",
            },
            () => {
              if (data?.applicationId) {
                window.open(
                  `/gp-applications/occupation-noc/application/${data.applicationId}`,
                  "_blank",
                );
              }
              location.reload();
            },
          );
        } else {
          alertjs.warning({
            t: "WARNING",
            m: message || "अर्ज जतन करण्यात अयशस्वी.",
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
        // ENABLE BUTTON
        // =========================
        submitBtn
          .prop("disabled", false)
          .removeClass("opacity-50 cursor-not-allowed")
          .text("जतन करा");
      }
    },
  );

  const OCCUPATION_NOC_SUBJECTS =
    typeof _OCCUPATION_NOC_SUBJECTS !== "undefined" &&
    Array.isArray(_OCCUPATION_NOC_SUBJECTS)
      ? _OCCUPATION_NOC_SUBJECTS
      : [];

  $(document).on(
    "change",
    "#occupation_noc_subject_codes_select",
    function (e) {
      e.preventDefault();

      let $selectedSubjectCode = $(this).val();
      let $container = $("#documents-container");

      const subject = OCCUPATION_NOC_SUBJECTS.find(
        (s) => s.subject_code === $selectedSubjectCode,
      );

      const application_subject = subject?.subject_name;

      $('[name="application_subject"]').val(subject ? application_subject : "")

      $container.empty();

      if (!subject.documents || subject.documents?.length === 0) {
        $container.html(`
            <p class="text-sm text-red-600 text-center md:col-span-2">
                आवश्यक कागदपत्रे उपलब्ध नाहीत
            </p>
            `);
        return;
      }

      subject.documents.forEach((doc) => {
        const labelText = (doc.label || "").replace(/\s+/g, " ").trim();
        const requiredMark = doc.is_required
          ? `<span class="text-red-500 font-bold">*</span>`
          : "";

        $container.append(
          `
                <div class="input-group">
                    <label class="text-sm font-bold tracking-wider">
                    ${labelText} ${requiredMark}
                    </label>
                    <div class="relative w-full border border-stone-300 px-4 py-1 rounded-md bg-stone-100">
                    <input
                        type="file"
                        name="documents[${doc.key}]"
                        class="py-1 px-2 outline-none w-full bg-stone-100"
                        ${doc.is_required ? "required" : ""}
                    />
                    </div>
                </div>
            `,
        );
      });
    },
  );
});
