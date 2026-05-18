$(document).ready(() => {
  console.log("gov yojna upload js loaded");

  let documentsList = [];

  /* =====================================
      MODE
  ===================================== */

  let isEditMode = false;

  /* =====================================
      RENDER DOCUMENTS
  ===================================== */

  function renderDocumentsList() {
    $("#documents-list").empty();

    if (!documentsList.length) {
      $("#documents-list").html(`
        <div class="text-muted small" id="empty-document-text">
          अद्याप कोणतेही कागदपत्र जोडलेले नाही
        </div>
      `);

      $("#required_documents_list").val(JSON.stringify([]));

      return;
    }

    documentsList.forEach((name, index) => {
      $("#documents-list").append(`
        <div class="badge bg-primary d-flex align-items-center gap-2 px-3 py-2">
          <span>${name}</span>

          <button
            type="button"
            class="btn-close btn-close-white shadow-none remove-document-btn"
            data-index="${index}">
          </button>
        </div>
      `);
    });

    $("#required_documents_list").val(JSON.stringify(documentsList));
  }

  /* =====================================
      ADD DOCUMENT
  ===================================== */

  $("#add-document-btn").on("click", function () {
    let value = $("#document-name-input").val().trim();

    if (!value) return;

    if (documentsList.includes(value)) {
      alertjs.warning({
        t: "WARNING",
        m: "हे कागदपत्र आधीच जोडले आहे",
      });

      return;
    }

    documentsList.push(value);

    renderDocumentsList();

    $("#document-name-input").val("").focus();
  });

  /* =====================================
      ENTER KEY SUPPORT
  ===================================== */

  $("#document-name-input").on("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();

      $("#add-document-btn").click();
    }
  });

  /* =====================================
      REMOVE DOCUMENT
  ===================================== */

  $(document).on("click", ".remove-document-btn", function () {
    let index = $(this).data("index");

    documentsList.splice(index, 1);

    renderDocumentsList();
  });

  /* =====================================
      LOAD DOCUMENTS FOR EDIT
  ===================================== */

  function loadDocumentsForEdit(data) {
    if (data && data.required_documents_list) {
      try {
        documentsList = Array.isArray(data.required_documents_list)
          ? data.required_documents_list
          : JSON.parse(data.required_documents_list || "[]");
      } catch (e) {
        documentsList = [];
      }
    } else {
      documentsList = [];
    }

    renderDocumentsList();
  }

  /* =====================================
      RESET DOCUMENTS
  ===================================== */

  function resetDocuments() {
    documentsList = [];

    renderDocumentsList();
  }

  /* =====================================
      VIEW DOCS MODAL
  ===================================== */

  $(document).on("click", ".view-docs-btn", function () {
    let docs = $(this).data("docs");

    if (typeof docs === "string") {
      try {
        docs = JSON.parse(docs);
      } catch (e) {
        docs = [];
      }
    }

    $("#docs-modal-list").empty();

    if (!docs || !docs.length) {
      $("#docs-modal-list").html(`
          <li class="list-group-item text-muted text-center">
            कोणतीही कागदपत्रे उपलब्ध नाहीत
          </li>
        `);
    } else {
      docs.forEach((doc, index) => {
        $("#docs-modal-list").append(`
            <li class="list-group-item d-flex align-items-center gap-2">
              <span class="badge bg-primary">${index + 1}</span>

              <i class="fa fa-file-text text-secondary"></i>

              <span>${doc}</span>
            </li>
          `);
      });
    }

    $("#docsModal").modal("show");
  });

  /* =====================================
      SET FORM DATA
  ===================================== */

  function setFormData(item) {
    $("#id").val(item.id || "");

    $("#yojana_name").val(item.yojana_name || "");

    $("#yojana_status").val(item.yojana_status || "ONGOING");

    $("#yojana_description").val(item.yojana_description || "");

    $("#website_link").val(item.website_link || "");
    $("#start_date").val(item.start_date ? item.start_date.split("T")[0] : "");

    loadDocumentsForEdit(item);
  }

  /* =====================================
      RESET FORM
  ===================================== */

  function resetForm() {
    document.getElementById("gov-yojana-form").reset();

    $("#id").val("");

    resetDocuments();

    isEditMode = false;

    $("#form-title").html(`
      <i class="fa fa-upload me-2"></i>
      शासकीय योजना अपलोड
    `);

    $("#upload-gov-yojna-file").html(`
      <i class="fa fa-save me-2"></i>
      जतन करा
    `);

    $("#cancel-edit-btn").addClass("d-none");
  }

  /* =====================================
      EDIT MODE
  ===================================== */

  $(document).on("click", ".edit-gov-yojna-file-btn", function () {
    let item = $(this).attr("data-item");

    try {
      item = JSON.parse(item);
    } catch (err) {
      console.error(err);

      return;
    }

    isEditMode = true;

    setFormData(item);

    $("#form-title").html(`
        <i class="fa fa-edit me-2"></i>
        शासकीय योजना अपडेट
      `);

    $("#upload-gov-yojna-file").html(`
        <i class="fa fa-edit me-2"></i>
        अपडेट करा
      `);

    $("#cancel-edit-btn").removeClass("d-none");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* =====================================
      CANCEL EDIT
  ===================================== */

  $("#cancel-edit-btn").on("click", function () {
    resetForm();
  });

  /* =====================================
      SAVE / UPDATE CLICK
  ===================================== */

  $("#upload-gov-yojna-file").on("click", async function (e) {
    e.preventDefault();

    let govYojanaData = new FormData(
      document.getElementById("gov-yojana-form"),
    );

    if (
      govYojanaData.get("imageBanner") &&
      govYojanaData.get("imageBanner").size > 0
    ) {
      govYojanaData.set(
        "imageBanner",
        await compressImageFile(govYojanaData.get("imageBanner")),
      );
    }

    if (isEditMode) {
      updateGovYojana(govYojanaData);
    } else {
      saveGovYojana(govYojanaData);
    }
  });

  /* =====================================
      SAVE
  ===================================== */

  async function saveGovYojana(formData) {
    try {
      let { success, message } = await fetch("/master/upload-gov-yojna-file", {
        method: "POST",
        body: formData,
      }).then((r) => r.json());

      if (success) {
        alertjs.success(
          {
            t: "Success",
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
      console.error(err);

      alertjs.warning({
        t: "ERROR",
        m: err?.message || "Something went wrong",
      });
    }
  }

  /* =====================================
      UPDATE
  ===================================== */

  async function updateGovYojana(formData) {
    try {
      let { success, message } = await fetch("/gov-yojana", {
        method: "PUT",
        body: formData,
      }).then((r) => r.json());

      if (success) {
        alertjs.success(
          {
            t: "Success",
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
      console.error(err);

      alertjs.warning({
        t: "ERROR",
        m: err?.message || "Something went wrong",
      });
    }
  }

  /* =====================================
      DELETE
  ===================================== */

  $(document).on("click", ".delete-gov-yojna-file-btn", function (e) {
    e.preventDefault();

    let fileName = $(this).attr("data-fileName");

    let bannerImageName = $(this).attr("data-bannerImageName");

    let fileId = $(this).attr("data-id");

    fetch("/master/delete-gov-yojna-file", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        fileName,
        fileId,
        bannerImageName,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.success) {
          alertjs.success(
            {
              t: "Successful",
              m: result.message,
            },
            () => {
              window.location.reload();
            },
          );
        } else {
          alertjs.warning({
            t: "WARNING",
            m: result.message,
          });
        }
      })
      .catch((err) => {
        console.error(err);

        alertjs.warning({
          t: "ERROR",
          m: err?.message || "Something went wrong",
        });
      });
  });

  /* =====================================
      INIT
  ===================================== */

  renderDocumentsList();
});
