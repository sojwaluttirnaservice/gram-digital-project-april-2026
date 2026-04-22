$(() => {
  $(".datepicker").mask("00-00-0000");
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-90:+0",
  });
  // Check if mobile exists or not
  // Check if mobile exists or not
  async function handleCheckApplicationByMobile(e) {
    e.preventDefault();

    let applicant_mobile = $("#applicant_mobile").val()?.trim();
    let $btn = $("#check-mobile-number-exists-btn");
    let $status = $("#mobile-check-status");

    // 🔹 Validation
    if (!applicant_mobile) {
      return alertjs.warning({
        t: "WARNING",
        m: "मोबाईल क्रमांक आवश्यक आहे",
      });
    }

    if (!/^\d+$/.test(applicant_mobile)) {
      return alertjs.warning({
        t: "WARNING",
        m: "मोबाईल क्रमांक फक्त अंकांमध्ये असावा",
      });
    }

    if (applicant_mobile.length !== 10) {
      return alertjs.warning({
        t: "WARNING",
        m: "मोबाईल क्रमांक 10 अंकी असावा",
      });
    }

    // 🔒 Disable button + show status (ONLY during API call)
    $btn.prop("disabled", true).text("तपास सुरू आहे...");
    $status
      .text("सदर मोबाईल क्रमांकाची तपासणी सुरू आहे, कृपया प्रतीक्षा करा...")
      .show();

    try {
      let res = await fetch(
        `/gp-applications/job-card/check?applicant_mobile=${applicant_mobile}`,
      );

      let { success, message } = await res.json();

      if (success) {
        alertjs.success(
          {
            t: "यशस्वी",
            m: message || "सदर मोबाईल क्रमांक अर्जासाठी उपलब्ध आहे.",
          },
          () => {
            $("input[name='applicant_mobile']").val(applicant_mobile);
          },
        );

        // ✅ Show form section (NO disabling / hiding)
        $("#form-section").slideDown();
      } else {
        alertjs.warning({
          t: "सूचना",
          m: message,
        });
        $("#form-section").slideUp();
      }
    } catch (err) {
      console.error(err);
      alertjs.error({
        t: "त्रुटी",
        m: "सर्व्हरशी संपर्क साधता आला नाही",
      });
    } finally {
      // 🔓 Always restore button + hide status
      $btn.prop("disabled", false).text("तपासा");
      $status.hide();
    }
  }

  $(document).on(
    "click",
    "#check-mobile-number-exists-btn",
    handleCheckApplicationByMobile,
  );

  // ======================
  let memberIndex = 0;

  const $addMemberBtn = $("#add-family-member");
  const $container = $("#family-members-container");

  const relationOptionsList = [
    "स्वतः",
    "पत्नी",
    "पती",
    "मुलगा",
    "मुलगी",
    "वडील",
    "आई",
    "भाऊ",
    "बहीण",
    "आजोबा",
    "आजी",
    "सून",
    "जावई",
    "नातू",
    "नात",
    "इतर",
  ];

  $addMemberBtn.on("click", function () {
    memberIndex++;

    const relationOptions = relationOptionsList
      .map((relation) => `<option value="${relation}">${relation}</option>`)
      .join("");

    const $wrapper = $(`
    <div class="family-member-card border border-stone-300 rounded-md bg-stone-100 p-3 flex flex-col gap-3 mb-2" data-index="${memberIndex}">

      <div class="flex justify-between items-center">
        <label class="font-bold tracking-wider">सदस्य ${memberIndex} माहिती</label>

        <button type="button" class="remove-family-member text-red-600 font-bold hover:underline">
          काढून टाका
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold">सदस्याचे नाव</label>
          <input type="text" name="family_members[${memberIndex}][member_name]" class="py-1 px-2 outline-none bg-stone-100 border border-stone-300 rounded-md" required />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold">कुटुंब प्रमुखाशी नाते</label>
          <select name="family_members[${memberIndex}][relation_to_family_head]" class="py-1 px-2 outline-none bg-stone-100 border border-stone-300 rounded-md" required>
            <option value="">निवडा</option>
            ${relationOptions}
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold">लिंग</label>
          <select name="family_members[${memberIndex}][gender]" class="py-1 px-2 outline-none bg-stone-100 border border-stone-300 rounded-md" required>
            <option value="">निवडा</option>
            <option value="पुरुष">पुरुष</option>
            <option value="स्त्री">स्त्री</option>
            <option value="इतर">इतर</option>
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold">वय</label>
          <input type="number" name="family_members[${memberIndex}][age]" class="py-1 px-2 outline-none bg-stone-100 border border-stone-300 rounded-md" required />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold">दिव्यांग आहे का?</label>
          <select name="family_members[${memberIndex}][is_disabled]" class="py-1 px-2 outline-none bg-stone-100 border border-stone-300 rounded-md" required>
            <option value="">निवडा</option>
            <option value="YES">होय</option>
            <option value="NO">नाही</option>
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold">आधार कार्ड (PDF)</label>
          <input type="file" name="family_members[${memberIndex}][adhar_card_pdf_name]" class="py-1 px-2 outline-none bg-stone-100 border border-stone-300 rounded-md" accept="application/pdf" required />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold">सदस्याचा फोटो</label>
          <input type="file" name="family_members[${memberIndex}][family_member_photo_file]" class="py-1 px-2 outline-none bg-stone-100 border border-stone-300 rounded-md" accept="image/*" required />
        </div>

      </div>
    </div>
  `);

    $container.append($wrapper);
  });

  // Remove member card
  $(document).on("click", ".remove-family-member", function () {
    $(this).closest(".family-member-card").remove();
  });

  // remove member
  $(document).on("click", ".remove-family-member", function () {
    $(this).closest(".family-member-card").remove();
  });

  //   form handler

  $(document).on(
    "change",
    "input[name='family_photo_image_name']",
    function () {
      const file = this.files[0];

      $("#preview-img").hide();
      $("#family-photo-image-preview").attr("src", "");

      if (!file) return;

      if (!file.type.match(/^image\//)) {
        alert("फक्त फोटो फाइल निवडा");
        $(this).val("");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        $("#family-photo-image-preview").attr("src", e.target.result);
        $("#preview-img").show();
      };
      reader.readAsDataURL(file);
    },
  );

  // ==========================================
  // FORM VALIDATION
  // ==========================================
  // / ==========================================
  $("#job-card-application-form").validate({
    ignore: [],
    rules: {
      family_head_name: { required: true, minlength: 3 },
      applicant_name: { required: true, minlength: 3 },
      applicant_address: { required: true, minlength: 5 },
      applicant_mobile: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },

      // Caste
      caste_category: { required: true },
      other_caste_category: {
        required: function () {
          return $("[name='caste_category']").val() === "OTHER";
        },
        minlength: 2,
      },

      // Radio fields (YES / NO mandatory)
      minority: { required: true },
      small_farmer: { required: true },
      general_farmer: { required: true },
      land_reform_beneficiary: { required: true },
      indira_awaas_beneficiary: { required: true },
      aab_yojana_beneficiary: { required: true },
      forest_rights_act_2006: { required: true },
      bpl_family: { required: true },
      rashtriya_swasthya_bima_beneficiary: { required: true },
    },
    messages: {
      family_head_name: "कुटुंबप्रमुखाचे नाव आवश्यक आहे",
      applicant_name: "अर्जदाराचे नाव आवश्यक आहे",
      applicant_address: "पूर्ण पत्ता आवश्यक आहे",
      applicant_mobile: "वैध मोबाईल क्रमांक द्या",

      caste_category: "जात प्रवर्ग निवडा",
      other_caste_category: "इतर जात प्रवर्ग लिहा",

      minority: "पर्याय निवडा",
      small_farmer: "पर्याय निवडा",
      general_farmer: "पर्याय निवडा",
      land_reform_beneficiary: "पर्याय निवडा",
      indira_awaas_beneficiary: "पर्याय निवडा",
      aab_yojana_beneficiary: "पर्याय निवडा",
      forest_rights_act_2006: "पर्याय निवडा",
      bpl_family: "पर्याय निवडा",
      rashtriya_swasthya_bima_beneficiary: "पर्याय निवडा",
    },
    errorClass: "text-red-500 text-sm",
    errorPlacement: function (error, element) {
      // 🔴 ALWAYS place error below input-holder
      const $holder = element.closest(".input-holder");

      if ($holder.length) {
        error.insertAfter($holder);
      } else {
        error.insertAfter(element);
      }
    },
  });

  $(function () {
    const $casteSelect = $("select[name='caste_category']");
    const $otherGroup = $(".other-cast-category-group");
    const $otherInput = $("input[name='other_caste_category']");

    function toggleOtherCaste() {
      if ($casteSelect.val() === "OTHER") {
        $otherGroup.show();
      } else {
        $otherGroup.hide();
        $otherInput.val("");
      }
    }

    // On change
    $casteSelect.on("change", toggleOtherCaste);

    // On page load (important)
    toggleOtherCaste();
  });

  // ==========================================
  // SUBMIT HANDLER
  // ==========================================

  $(document).on("click", "#save-job-card-application-btn", async function (e) {
    e.preventDefault();

    const $btn = $(this);
    const originalText = $btn.text(); // save original button text
    const form = $("#job-card-application-form");

    // -------------------------
    // VALIDATE FORM
    // -------------------------
    if (!form.valid()) return;

    // -------------------------
    // DISABLE BUTTON IMMEDIATELY
    // -------------------------
    $btn
      .prop("disabled", true)
      .addClass("disabled")
      .css({
        cursor: "not-allowed",
        backgroundColor: "#ccc", // gray background
        color: "#666", // gray text
      })
      .text("Saving...");

    try {
      const formData = new FormData(form[0]);
      const members = [];
      const imagePromises = [];

      $("#family-members-container .family-member-card").each(function (i) {
        const $card = $(this);

        members.push({
          member_name: $card.find('[name*="[member_name]"]').val(),
          relation_to_family_head: $card
            .find('[name*="[relation_to_family_head]"]')
            .val(),
          gender: $card.find('[name*="[gender]"]').val(),
          age: $card.find('[name*="[age]"]').val(),
          is_disabled: $card.find('[name*="[is_disabled]"]').val(),
        });

        // Aadhaar PDF
        const adhar = $card.find('[name*="[adhar_card_pdf_name]"]')[0];
        if (adhar?.files?.[0]) {
          formData.append(`adhar_card_file_${i}`, adhar.files[0]);
        }

        // Family member photo (compressed)
        const photo = $card.find('[name*="[family_member_photo_file]"]')[0];
        if (photo?.files?.[0]) {
          imagePromises.push(
            compressImageFile(photo.files[0]).then((file) => {
              formData.append(`family_member_photo_file_${i}`, file);
            }),
          );
        }
      });

      await Promise.all(imagePromises);
      formData.append("family_members_list", JSON.stringify(members));
      formData.set("createdAt", _commonjsDateFormat(formData.get("createdAt")))

      // -------------------------
      // SEND TO BACKEND
      // -------------------------
      const response = await fetch("/gp-applications/job-card", {
        method: "POST",
        body: formData,
      });

      const { success, message, data } = await response.json();

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message || "Job card application submitted successfully",
          },
          () => {
            window.open(
              "/gp-applications/job-card/j/" + data.applicationId,
              "_blank",
            );
            location.reload()
          },
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message || "Submission failed",
        });
      }
    } catch (err) {
      console.error(err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      // -------------------------
      // RESTORE BUTTON
      // -------------------------
      $btn
        .prop("disabled", false)
        .removeClass("disabled")
        .css({
          cursor: "",
          backgroundColor: "",
          color: "",
        })
        .text(originalText);
    }
  });
});
