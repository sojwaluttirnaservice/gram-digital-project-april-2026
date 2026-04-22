$(document).ready(function () {
  
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

  $(".aadhar").mask("0000-0000-0000");

  $(".image-upload").on("change", function () {
    displayImage($(this));
  });

  const debouncedTranslate = commonjsDebounce(function (value, input) {
    commonHandler.translateWord(value, function (data) {
      $(input).val(data);
    });
  }, 200); // adjust delay if needed

  $(document).on("input change", ".mainText", function (e) {
    e.preventDefault();

    let value = $(this).val();
    // Find corresponding .secText inside same input-group
    let input = $(this).closest(".input-group").find(".secText");
    if (value.trim() !== "") {
      debouncedTranslate(value, input);
    } else {
      input.val("");
    }
  });

  $(document).on("change", 'select[name="marriageTypeE"]', function () {
    const selectedValue = $(this).val();

    const marriageTypeMap = {
      Registered: "नोंदणीकृत",
      Religious: "धार्मिक",
      Court: "कोर्ट विवाह",
      Other: "इतर",
    };

    const marathiValue = marriageTypeMap[selectedValue] || "";

    $('input[name="marriageTypeM"]').val(marathiValue);
  });

  //   /save button

$(document).on(
  "click",
  "#saveMarriageRegistrationApplicationBtn",
  async function (e) {
    e.preventDefault();

    const btn = $(this);
    const originalText = btn.text();

    const form = document.getElementById(
      "marriage-registration-application-form"
    );

    const marriageData = new FormData(form);

    try {
      // ---------------------------------------
      // 1️⃣ Validate Wedding Photos (2–3)
      // ---------------------------------------
      const weddingPhotos = marriageData
        .getAll("marriageWeddingPhotos")
        .filter((file) => file instanceof File && file.name !== "");

      if (weddingPhotos.length < 2 || weddingPhotos.length > 3) {
        alert("कृपया २ ते ३ लग्नाचे फोटो अपलोड करा");
        return;
      }

      // ---------------------------------------
      // 2️⃣ Validate Minimum 2 Witnesses
      // ---------------------------------------
      let witnessCount = 0;

      for (let i = 1; i <= 3; i++) {
        const name = marriageData.get(`witness_name_${i}`);
        if (name && name.trim() !== "") {
          witnessCount++;
        }
      }

      if (witnessCount < 2) {
        alert("किमान २ साक्षीदार आवश्यक आहेत");
        return;
      }

      // ---------------------------------------
      // 3️⃣ Compress ALL Image Files (No Duplicates)
      // ---------------------------------------

      const processedKeys = new Set();
      const updatedFormData = new FormData();

      for (let [key, value] of marriageData.entries()) {

        // If file and image → compress
        if (value instanceof File && value.name !== "") {

          if (value.type.startsWith("image/")) {

            const compressedImage = await compressImageFile(value);
            updatedFormData.append(key, compressedImage);

          } else {
            // Non-image files (PDF etc)
            updatedFormData.append(key, value);
          }

        } else {
          // Normal fields (text, hidden, etc)
          updatedFormData.append(key, value);
        }
      }

      // ---------------------------------------
      // 4️⃣ Disable Button
      // ---------------------------------------
      btn.prop("disabled", true);
      btn.text("जतन होत आहे...");

      // ---------------------------------------
      // 5️⃣ Send to Backend
      // ---------------------------------------
      const response = await fetch("/marriage", {
        method: "POST",
        body: updatedFormData,
      });

      const result = await response.json();

      if (result.success) {
        alertjs.success(
          {
            t: "Success",
            m: result.message || "विवाह नोंदणी यशस्वी झाली",
          },
          () => {
            location.reload();
          }
        );
      } else {
        alertjs.warning({
          t: "Warning",
          m: result.message || "काहीतरी चूक झाली आहे",
        });
      }

    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "Warning",
        m: err?.message || "काहीतरी चूक झाली आहे",
      });
    } finally {
      btn.prop("disabled", false);
      btn.text(originalText);
    }
  }
);
});

function displayImage($input) {
  const targetImgId = $input.data("target-img");
  const $previewImg = $("#" + targetImgId);

  if (!$previewImg.length) return;

  const file = $input[0].files[0];

  // No file selected
  if (!file) {
    $previewImg.attr("src", "/img/fallback/upload-photo.jpg");
    return;
  }

  // Validate image type
  if (!file.type.startsWith("image/")) {
    alert("कृपया योग्य फोटो निवडा.");
    $input.val("");
    $previewImg.attr("src", "/img/fallback/upload-photo.jpg");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    $previewImg.attr("src", e.target.result);
  };

  reader.readAsDataURL(file);
}
