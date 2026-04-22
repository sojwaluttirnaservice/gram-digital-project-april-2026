// Global function to mark images as removed
window.removeExistingImage = function (imageId, type) {
  const wrapperId = `#${type}-wrap-${imageId}`;
  const inputId = `#removed_${type}_ids`;

  // Visually mark as removed
  $(wrapperId).addClass("removed");

  // Add the ID to the respective hidden input array
  let currentRemovedIds = JSON.parse($(inputId).val() || "[]");
  if (!currentRemovedIds.includes(imageId)) {
    currentRemovedIds.push(imageId);
    $(inputId).val(JSON.stringify(currentRemovedIds));
  }
};

$(() => {
  const handleSavePptSlideDetails = async (slideData, $btn, originalText) => {
    try {
      const responseBody = await fetch("/ppt/slides", {
        method: slideData.get("id") ? "PUT" : "POST",
        body: slideData,
      }).then((r) => r.json());

      const { success, message, data } = responseBody;

      if (success) {
        alertjs.success(
          {
            t: "Success",
            m: message,
          },
          () => {
            window.location.href = `/ppt/slides/list/page/${slideData.get("ppt_id_fk")}`;
          },
        );
      } else {
        alertjs.warning({
          t: "Warning",
          m: message,
        });
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

  const form = document.getElementById("ppt-slide-form");

  $(document).on("click", "#save-ppt-slide-btn", async function (e) {
    e.preventDefault();
    const $btn = $(this);
    const originalText = $btn.html();
    $btn
      .prop("disabled", true)
      .html('<i class="fa fa-spinner fa-spin me-2"></i>Please Wait...');

    const slideData = new FormData(form);

    const beforeImages = slideData.getAll("before_images");
    slideData.delete("before_images");
    for (const img of beforeImages) {
      if (img.size > 0) {
        slideData.append("before_images", await compressImageFile(img));
      }
    }

    const afterImages = slideData.getAll("after_images");
    slideData.delete("after_images");
    for (const img of afterImages) {
      if (img.size > 0) {
        slideData.append("after_images", await compressImageFile(img));
      }
    }

    commonjsPrintFormData(slideData);
    handleSavePptSlideDetails(slideData, $btn, originalText);
  });

  $(document).on("click", "#update-ppt-slide-btn", async function (e) {
    e.preventDefault();
    const $btn = $(this);
    const originalText = $btn.html();
    $btn
      .prop("disabled", true)
      .html('<i class="fa fa-spinner fa-spin me-2"></i>Please Wait...');

    const slideData = new FormData(form);

    const beforeImages = slideData.getAll("new_before_images");
    slideData.delete("new_before_images");
    for (const img of beforeImages) {
      if (img.size > 0) {
        slideData.append("new_before_images", await compressImageFile(img));
      }
    }

    const afterImages = slideData.getAll("new_after_images");
    slideData.delete("new_after_images");
    for (const img of afterImages) {
      if (img.size > 0) {
        slideData.append("new_after_images", await compressImageFile(img));
      }
    }

    commonjsPrintFormData(slideData);
    handleSavePptSlideDetails(slideData, $btn, originalText);
  });
  // ----------------------------------------------------
  // Handle Delete Slide
  // ----------------------------------------------------
  $(document).on("click", ".delete-ppt-slide-btn", function () {
    const $btn = $(this);
    const slideId = $btn.data("slideid");
    if (!slideId) return;

    alertjs.deleteSpl(
      "ही स्लाईड आणि तिच्या इमेज कायमच्या डिलीट होतील. डिलीट करायचे?",
      async (status) => {
        if (status) {
          const originalText = $btn.html();
          $btn
            .prop("disabled", true)
            .html('<i class="fa fa-spinner fa-spin"></i>');

          try {
            const { success, message } = await fetch(`/ppt/slides`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: slideId }),
            }).then((res) => res.json());

            if (success) {
              alertjs.success({ t: "Success", m: message }, () => {
                window.location.reload();
              });
            } else {
              alertjs.error({ t: "Error", m: message });
              $btn.prop("disabled", false).html(originalText);
            }
          } catch (error) {
            console.error(error);
            alertjs.error({
              t: "Error",
              m: "An error occurred while deleting.",
            });
            $btn.prop("disabled", false).html(originalText);
          }
        }
      },
    );
  });
});
