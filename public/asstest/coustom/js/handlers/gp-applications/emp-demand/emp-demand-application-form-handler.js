$(() => {
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
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

  function setDataInForm(jobCard) {
    // Prefill applicant info
    $("[name='applicant_name']").val(jobCard.applicant_name);
    $("[name='applicant_mobile']").val(jobCard.applicant_mobile);
    $("[name='job_card_number_fk']").val(jobCard.job_card_number);

    // Render family members
    const renderFamilyMembers = () => {
      const $container = $("#family-members-container");
      $container.empty(); // Clear previous entries

      let members = JSON.parse(jobCard.family_members_list || "[]");

      members.forEach((member, index) => {
        const memberHtml = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded-md border shadow-md mb-4">
                    <!-- Member Name (readonly) -->
                    <div class="flex flex-col">
                        <label class="font-semibold mb-1">सदस्याचे नाव</label>
                        <input type="text" name="family_members[${index}][member_name]" value="${member.member_name}" class="w-full px-3 py-2 border rounded-md bg-stone-100" readonly>
                    </div>

                    <!-- Bank Account Number -->
                    <div class="flex flex-col">
                        <label class="font-semibold mb-1">बँक खाते क्रमांक</label>
                        <input type="text" name="family_members[${index}][bank_account_number]" class="w-full px-3 py-2 border rounded-md bg-stone-100" placeholder="बँक खाते क्रमांक" required>
                    </div>

                    <!-- Aadhar Number -->
                    <div class="flex flex-col">
                        <label class="font-semibold mb-1">आधार क्रमांक</label>
                        <input type="text" name="family_members[${index}][adhar_card_number]" class="w-full px-3 py-2 border rounded-md bg-stone-100" placeholder="आधार क्रमांक" required>
                    </div>

                    <!-- Creche Required at Workplace -->
                    <div class="flex flex-col">
                        <label class="font-semibold mb-1">कामाच्या ठिकाणी पाळणा घराची आवश्यकता आहे काय?</label>
                        <select name="family_members[${index}][is_creche_required_at_workplace]" class="w-full px-3 py-2 border rounded-md bg-stone-100" required>
                            <option value="">-- निवडा --</option>
                            <option value="YES">होय</option>
                            <option value="NO">नाही</option>
                        </select>
                    </div>

                    <!-- Sign / Thumb Stamp -->
                    <div class="flex flex-col">
                        <label class="font-semibold mb-1">सही / ठसा अपलोड करा</label>
                        <input type="file" name="family_members[${index}][sign_or_thumb_stamp_photo]" class="w-full px-3 py-2 border rounded-md bg-stone-100" accept="image/*" required>
                    </div>
                </div>
            `;

        $container.append(memberHtml);
      });
    };

    renderFamilyMembers();
  }

  // Check if mobile exists or not

  async function handleCheckApplicationByJobCardNumber(e) {
    e.preventDefault();

    let job_card_number = $("#job_card_number").val()?.trim();
    let $btn = $("#check-job-card-number-exists-btn");
    let $status = $("#job-card-check-status");

    // 🔹 Validation
    if (!job_card_number) {
      return alertjs.warning({
        t: "WARNING",
        m: "जॉब कार्ड क्रमांक आवश्यक आहे",
      });
    }

    // 🔒 Disable button + show status (ONLY during API call)
    $btn.prop("disabled", true).text("तपास सुरू आहे...");
    $status
      .text("सदर जॉब कार्ड क्रमांकाची तपासणी सुरू आहे, कृपया प्रतीक्षा करा...")
      .show();

    try {
      let res = await fetch(
        `/gp-applications/emp-demand/check?job_card_number=${job_card_number}`
      );

      let { success, message, data } = await res.json();

      if (success) {
        alertjs.success(
          {
            t: "यशस्वी",
            m: message,
          },
          () => {
            $("input[name='job_card_number']").val(job_card_number);
          }
        );

        // ✅ Show form section (NO disabling / hiding)
        $("#form-section").slideDown();

        setDataInForm(data.jobCard);
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
    "#check-job-card-number-exists-btn",
    handleCheckApplicationByJobCardNumber
  );

  //   form saver

  async function handleSaveEmpDemandForm(e) {
    e.preventDefault();

    const $btn = $("#save-emp-demand-application-btn");
    const originalText = $btn.text();
    const form = $("#job-card-application-form");

    // -------------------------
    // DISABLE BUTTON
    // -------------------------
    $btn
      .prop("disabled", true)
      .css({ cursor: "not-allowed", backgroundColor: "#ccc", color: "#666" })
      .text("जतन करत आहे...");

    try {
      const formData = new FormData(form[0]);
      const members = [];
      const imagePromises = [];

      // -------------------------
      // Convert from_date → yyyy-mm-dd
      // -------------------------
      const fromDateInput = form.find('[name="from_date"]').val();
      if (fromDateInput) {
        const [dd, mm, yyyy] = fromDateInput.split("-");
        const formattedFromDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(
          2,
          "0"
        )}`;
        formData.set("from_date", formattedFromDate);
      }

      console.log(formData.get("from_date"));

      // -------------------------
      // Family Members
      // -------------------------
      $("#family-members-container .flex.flex-wrap").each(function (i) {
        const $card = $(this);

        const member = {
          member_name: $card.find('[name*="[member_name]"]').val(),
          bank_account_number: $card
            .find('[name*="[bank_account_number]"]')
            .val(),
          adhar_card_number: $card.find('[name*="[adhar_card_number]"]').val(),
          is_creche_required_at_workplace: $card
            .find('[name*="[is_creche_required_at_workplace]"]')
            .val(),
        };

        members.push(member);

        const signInput = $card.find(
          '[name*="[sign_or_thumb_stamp_photo]"]'
        )[0];

        if (signInput?.files?.[0]) {
          imagePromises.push(
            compressImageFile(signInput.files[0]).then((file) => {
              formData.append(`sign_or_thumb_stamp_file_${i}`, file);
            })
          );
        }
      });

      await Promise.all(imagePromises);

      formData.append("family_members_list", JSON.stringify(members));

      // -------------------------
      // SEND TO BACKEND
      // -------------------------
      const response = await fetch("/gp-applications/emp-demand", {
        method: "POST",
        body: formData,
      });

      const { success, message, data } = await response.json();

      if (success) {
        alertjs.success({ t: "यशस्वी", m: message }, () => {
          if (data?.applicationId) {
            window.open(
              "/gp-applications/emp-demand/application/" + data.applicationId,
              "_blank"
            );
          }
        });
      } else {
        alertjs.warning({ t: "सूचना", m: message });
      }
    } catch (err) {
      console.error(err);
      alertjs.warning({
        t: "त्रुटी",
        m: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
      });
    } finally {
      $btn
        .prop("disabled", false)
        .css({ cursor: "", backgroundColor: "", color: "" })
        .text(originalText);
    }
  }

  $(document).on(
    "click",
    "#save-emp-demand-application-btn",
    handleSaveEmpDemandForm
  );
});
