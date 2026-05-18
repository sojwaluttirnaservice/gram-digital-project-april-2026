$(() => {
  /* =========================================================
    MODE
========================================================= */

  let isEditMode = false;
  $(document).on(
    "submit",
    "#fund-income-expense-image-form",
    async function (e) {
      e.preventDefault();

      let title = $("#title").val().trim();
      let image = $("#image")[0].files[0];
      let fundId = $("#fund_income_exp_id_fk").val();

      /* =====================================================
            BASIC VALIDATION
        ===================================================== */

      if (!fundId) {
        return alertjs.warning({
          t: "WARNING",
          m: "Invalid fund record",
        });
      }

      if (!title) {
        return alertjs.warning({
          t: "WARNING",
          m: "कृपया शीर्षक प्रविष्ट करा",
        });
      }

      if (!image && !isEditMode) {
        return alertjs.warning({
          t: "WARNING",
          m: "कृपया फोटो निवडा",
        });
      }

      let allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

      if (!allowedTypes.includes(image.type)) {
        return alertjs.warning({
          t: "WARNING",
          m: "फक्त JPG, PNG, WEBP फोटो स्वीकारल्या जातील",
        });
      }

      let formData = new FormData(
        document.getElementById("fund-income-expense-image-form"),
      );

      let $btn = $("#save-fund-income-expense-image-btn");
      if (isEditMode) {
        handleUpdateFundIncomeExpenseImage($btn, formData);
      } else {
        handleSaveFundIncomeExpenseImage($btn, formData);
      }
    },
  );

  async function handleSaveFundIncomeExpenseImage($btn, formData) {
    try {
      $btn.prop("disabled", true);

      let response = await fetch("/fund-income-expenses/image/save", {
        method: "POST",
        body: formData,
      });

      let result = await response.json();

      let { success, message } = result;

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            location.reload();
          },
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error:", err);

      alertjs.warning({
        t: "ERROR",
        m: err?.message,
      });
    } finally {
      // Re-enable button (in case page doesn't reload)
      $btn.prop("disabled", false);
    }
  }

  /* =========================================================
    UPDATE IMAGE
========================================================= */

  async function handleUpdateFundIncomeExpenseImage($btn, formData) {
    try {
      $btn.prop("disabled", true);

      let response = await fetch("/fund-income-expenses/image/update", {
        method: "PUT",
        body: formData,
      });

      let result = await response.json();

      let { success, message } = result;

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            location.reload();
          },
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error:", err);

      alertjs.warning({
        t: "ERROR",
        m: err?.message,
      });
    } finally {
      $btn.prop("disabled", false);
    }
  }

  /* =========================================================
    DELETE IMAGE
========================================================= */

  $(document).on("click", ".delete-image-btn", async function () {
    let id = $(this).data("id");

    if (!id) {
      return;
    }

    let confirmDelete = confirm("तुम्हाला ही फोटो हटवायची आहे का?");

    if (!confirmDelete) {
      return;
    }

    let $btn = $(this);

    try {
      $btn.prop("disabled", true);

      let response = await fetch(`/fund-income-expenses/image/delete/${id}`, {
        method: "DELETE",
      });

      let result = await response.json();

      let { success, message } = result;

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            location.reload();
          },
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error:", err);

      alertjs.warning({
        t: "ERROR",
        m: err?.message,
      });
    } finally {
      $btn.prop("disabled", false);
    }
  });

  /* =========================================================
    SET FORM DATA
========================================================= */

  function setFormData(item) {
    $("#id").val(item.id || "");

    $("#title").val(item.title || "");

    $("#desc").val(item.desc || "");

    $("#submit-btn-text").text("अपडेट करा");

    $("#cancel-edit-btn").removeClass("d-none");

    isEditMode = true;
  }

  /* =========================================================
    RESET FORM
========================================================= */

  function resetForm() {
    $("#fund-income-expense-image-form")[0].reset();

    $("#id").val("");

    $("#submit-btn-text").text("अपलोड");

    $("#cancel-edit-btn").addClass("d-none");

    isEditMode = false;
  }

  /* =========================================================
    EDIT IMAGE
========================================================= */

  $(document).on("click", ".edit-image-btn", function () {
    let item = $(this).attr("data-imageData");

    try {
      item = JSON.parse(item);
    } catch (err) {
      console.error(err);

      return;
    }

    setFormData(item);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* =========================================================
    CANCEL EDIT
========================================================= */

  $("#cancel-edit-btn").on("click", function () {
    resetForm();
  });
});
