$(document).ready(function () {

  const $casteSelect = $("#caste-category-select");
  const $otherGroup = $(".other-cast-category-group");
  const $otherInput = $otherGroup.find('input[name="other_caste_category"]');

  function toggleOtherCaste() {
    if ($casteSelect.val() === "OTHER") {
      $otherGroup.css({ opacity: 1, pointerEvents: "auto" });
    } else {
      $otherGroup.css({ opacity: 0, pointerEvents: "none" });
      $otherInput.val("");
    }
  }

  $casteSelect.on("change", toggleOtherCaste);
  toggleOtherCaste();

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

  // Add new member
  $("#add-family-member").click(function () {
    let memberId = `m-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // Use data-family-member to store JSON object
    let memberData = {
      memberId: memberId,
      member_name: "",
      relation_to_family_head: "",
      gender: "पुरुष",
      age: "",
      is_disabled: "NO",
      adhar_card_pdf_name: "",
      family_member_photo_name: "",
    };

    let html = `
<div class="family-member border rounded p-3 mb-3" data-family-member='${JSON.stringify(memberData)}'>
  <div class="row g-3">
    <div class="col-md-4">
      <label class="form-label fw-bold">सदस्याचे नाव</label>
      <input type="text" class="form-control member-name" required>
    </div>
    <div class="col-md-4">
      <label class="form-label fw-bold">नाते</label>
      <select class="form-select member-relation" required>
        ${relationOptionsList.map((rel) => `<option value="${rel}">${rel}</option>`).join("")}
      </select>
    </div>
    <div class="col-md-2">
      <label class="form-label fw-bold">लिंग</label>
      <select class="form-select member-gender" required>
        <option value="पुरुष">पुरुष</option>
        <option value="महिला">महिला</option>
        <option value="इतर">इतर</option>
      </select>
    </div>
    <div class="col-md-2">
      <label class="form-label fw-bold">वय</label>
      <input type="number" class="form-control member-age" required>
    </div>
    <div class="col-md-4">
      <label class="form-label fw-bold">अपंग आहे का?</label>
      <div class="d-flex gap-3">
        <div class="form-check">
          <input type="radio" class="form-check-input member-disabled" value="YES" required>
          <label class="form-check-label">होय</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input member-disabled" value="NO" checked>
          <label class="form-check-label">नाही</label>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <label class="form-label fw-bold">आधार कार्ड PDF</label>
      <input type="file" class="form-control member-adhar" accept="application/pdf">
    </div>
    <div class="col-md-6">
      <label class="form-label fw-bold">सदस्याचा फोटो</label>
      <input type="file" class="form-control member-photo" accept="image/*">
    </div>
    <div class="col-md-12 text-end">
      <button type="button" class="btn btn-danger btn-sm remove-family-member">काढा</button>
    </div>
  </div>
</div>
`;

    $("#family-members-container").append(html);
  });

  // Remove member
  $(document).on("click", ".remove-family-member", function () {
    $(this).closest(".family-member").remove();
  });

  // Before submitting form, serialize all data from data-family-member
  $("#job-card-application-form").submit(function (e) {
    $(".family-member").each(function (index) {
      let data = $(this).data("family-member");

      // Update data with current inputs
      data.member_name = $(this).find(".member-name").val();
      data.relation_to_family_head = $(this).find(".member-relation").val();
      data.gender = $(this).find(".member-gender").val();
      data.age = $(this).find(".member-age").val();
      data.is_disabled = $(this).find(".member-disabled:checked").val() || "NO";

      // Put it back
      $(this).attr("data-family-member", JSON.stringify(data));
    });

    // Optionally, create a hidden input to send full JSON
    let familyArray = $(".family-member")
      .map(function () {
        return JSON.parse($(this).attr("data-family-member"));
      })
      .get();

    if ($("#family-members-json").length === 0) {
      $("<input>")
        .attr({
          type: "hidden",
          id: "family-members-json",
          name: "family_members_list",
          value: JSON.stringify(familyArray),
        })
        .appendTo("#job-card-application-form");
    } else {
      $("#family-members-json").val(JSON.stringify(familyArray));
    }
  });

  //   edit or update part

  async function handleUpdateJobApplication(e) {
    e.preventDefault();

    const $btn = $("#update-job-card-application-btn");
    const originalText = $btn.text();

    // ---- UI: disable button ----
    $btn.prop("disabled", true);
    $btn.removeClass("btn-primary").addClass("btn-secondary");
    $btn.text("Updating...");

    try {
      const $form = $("#job-card-application-form");
      const formData = new FormData($form[0]);

      const memberCards = $(".family-member");
      const imagePromises = [];

      memberCards.each(function (i) {
        const $card = $(this);

        const memberData = {
          memberId:
            $card.attr("data-member-id") ||
            `m-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          member_name: $card.find(".member-name").val() || "",
          relation_to_family_head: $card.find(".member-relation").val() || "",
          gender: $card.find(".member-gender").val() || "पुरुष",
          age: $card.find(".member-age").val() || "",
          is_disabled: $card.find(".member-disabled:checked").val() || "NO",
          adhar_card_pdf_name:
            $card.find('input[name*="adhar_card_pdf_name"]').val() || "",
          family_member_photo_name:
            $card.find('input[name*="family_member_photo_name"]').val() || "",
          index: i,
        };

        const adhar = $card.find(".member-adhar")[0];
        if (adhar?.files?.[0]) {
          formData.append(`adhar_card_file_${i}`, adhar.files[0]);
        }

        const photo = $card.find(".member-photo")[0];
        if (photo?.files?.[0]) {
          imagePromises.push(
            compressImageFile(photo.files[0]).then((file) => {
              formData.append(`family_member_photo_file_${i}`, file);
            })
          );
        }

        $card.attr("data-member", JSON.stringify(memberData));
      });

      await Promise.all(imagePromises);

      const familyMembersArray = memberCards
        .map(function () {
          const data = $(this).attr("data-member");
          if (data) return JSON.parse(data);

          return {
            memberId:
              $(this).attr("data-member-id") ||
              `m-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            member_name: $(this).find(".member-name").val() || "",
            relation_to_family_head:
              $(this).find(".member-relation").val() || "",
            gender: $(this).find(".member-gender").val() || "पुरुष",
            age: $(this).find(".member-age").val() || "",
            is_disabled: $(this).find(".member-disabled:checked").val() || "NO",
            adhar_card_pdf_name:
              $(this).find('input[name*="adhar_card_pdf_name"]').val() || "",
            family_member_photo_name:
              $(this).find('input[name*="family_member_photo_name"]').val() ||
              "",
          };
        })
        .get();

      formData.set("family_members_list", JSON.stringify(familyMembersArray));

      if (formData.get("caste_category") === "OTHER") {
        formData.set("caste_category", formData.get("other_caste_category"));
      }

      const response = await fetch("/gp-applications/job-card", {
        method: "PUT",
        body: formData,
      });

      const { success, message } = await response.json();

      if (success) {
        alertjs.success({ t: "SUCCESS", m: message }, () =>{
            location.href = '/gp-applications/job-card/list?status=rejected&sort=desc'
        } );
      } else {
        alertjs.warning({ t: "WARNING", m: message });
      }
    } catch (err) {
      console.error(err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले. पुन्हा प्रयत्न करा.",
      });
    } finally {
      // ---- UI: restore button ----
      $btn.prop("disabled", false);
      $btn.removeClass("btn-secondary").addClass("btn-primary");
      $btn.text(originalText);
    }
  }

  $(document).on(
    "click",
    "#update-job-card-application-btn",
    handleUpdateJobApplication
  );
});
