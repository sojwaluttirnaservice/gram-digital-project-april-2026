$(() => {
  const form = document.getElementById("ppt-form");

  /**
   * Compress image if file exists
   */
  const compressIfExists = async (formData, fieldName) => {
    const file = formData.get(fieldName);
    if (file && file.size > 0) {
      const compressed = await compressImageFile(file);
      formData.set(fieldName, compressed);
    }
  };

  /**
   * Save / Update PPT
   */
  const handleSavePptMainDetails = async (pptData, $btn, originalText) => {
    try {
      const responseBody = await fetch("/ppt", {
        method: pptData.get("id") ? "PUT" : "POST",
        body: pptData,
      }).then((r) => r.json());

      const { success, message, data } = responseBody;

      if (success) {
        alertjs.success(
          { t: "Success", m: message },
          () => {
            if (data && data.insertId) {
              window.location.href = `/ppt/slides/list/page/${data.insertId}`;
            } else {
              window.location.href = `/ppt/list`;
            }
          }
        );
      } else {
        alertjs.warning({ t: "Warning", m: message });
        if ($btn) $btn.prop("disabled", false).html(originalText);
      }
    } catch (err) {
      console.error("Error:", err);

      alertjs.warning({
        t: "Warning",
        m: err?.message || "काहीतरी चुकले.",
      });

      if ($btn) $btn.prop("disabled", false).html(originalText);
    }
  };

  /**
   * jQuery validation
   */
  $("#ppt-form").validate({
  rules: {
    title: { required: true },
    description: { required: true },

    cover_image: {
      required: function () {
        return !$('input[name="id"]').val();
      }
    },

    page_1_image: {
      required: function () {
        return !$('input[name="id"]').val();
      }
    },

    page_2_image: {
      required: function () {
        return !$('input[name="id"]').val();
      }
    },

    page_3_image: {
      required: function () {
        return !$('input[name="id"]').val();
      }
    },

    remaining_pages_header_image: {
      required: function () {
        return !$('input[name="id"]').val();
      }
    }
  },

  messages: {
    title: "Title टाका",
    description: "वर्णन टाका",
    cover_image: "Cover Image आवश्यक आहे",
    page_1_image: "Page 2 Image आवश्यक आहे",
    page_2_image: "Page 3 Image आवश्यक आहे",
    page_3_image: "Page 4 Image आवश्यक आहे",
    remaining_pages_header_image: "Background Image आवश्यक आहे",
  },

  errorClass: "text-danger",
});

  /**
   * Save button
   */
  $(document).on("click", "#save-ppt-main-details-btn", async function (e) {
    e.preventDefault();

    if (!$("#ppt-form").valid()) return;

    const $btn = $(this);
    const originalText = $btn.html();

    $btn
      .prop("disabled", true)
      .html('<i class="fa fa-spinner fa-spin me-2"></i>Please Wait...');

    const pptData = new FormData(form);

    /**
     * Compress all images
     */
    await compressIfExists(pptData, "cover_image");
    await compressIfExists(pptData, "page_1_image");
    await compressIfExists(pptData, "page_2_image");
    await compressIfExists(pptData, "page_3_image");
    await compressIfExists(pptData, "remaining_pages_header_image");

    commonjsPrintFormData(pptData);

    handleSavePptMainDetails(pptData, $btn, originalText);
  });
});