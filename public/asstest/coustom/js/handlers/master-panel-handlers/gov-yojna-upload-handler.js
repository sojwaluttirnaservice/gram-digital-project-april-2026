$(document).ready(() => {
  console.log("gov yojna upload js laoded");

  let documentsList = [];

  // =====================================
  // RENDER DOCUMENTS
  // =====================================
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

                                <button type="button"
                                        class="btn-close btn-close-white shadow-none remove-document-btn"
                                        data-index="${index}">
                                </button>
                        </div>
                `);
    });

    $("#required_documents_list").val(JSON.stringify(documentsList));
  }

  // =====================================
  // ADD DOCUMENT
  // =====================================
  $("#add-document-btn").on("click", function () {
    let value = $("#document-name-input").val().trim();

    if (!value) return;

    if (documentsList.includes(value)) {
      alert("हे कागदपत्र आधीच जोडले आहे");
      return;
    }

    documentsList.push(value);

    renderDocumentsList();

    $("#document-name-input").val("").focus();
  });

  // Enter key support
  $("#document-name-input").on("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      $("#add-document-btn").click();
    }
  });

  // =====================================
  // REMOVE DOCUMENT
  // =====================================
  $(document).on("click", ".remove-document-btn", function () {
    let index = $(this).data("index");

    documentsList.splice(index, 1);

    renderDocumentsList();
  });

  // =====================================
  // LOAD DOCUMENTS FOR EDIT
  // =====================================
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

  // =====================================
  // RESET DOCUMENTS (CREATE MODE)
  // =====================================
  function resetDocuments() {
    documentsList = [];

    renderDocumentsList();
  }

  $(document).on("click", ".view-docs-btn", function () {
    let docs = $(this).data("docs");

    // safe parse
    if (typeof docs === "string") {
      try {
        docs = JSON.parse(docs);
      } catch (e) {
        docs = [];
      }
    }

    // clear old data
    $("#docs-modal-list").empty();

    // handle empty case
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

    // open modal
    // new bootstrap.Modal(document.getElementById("docsModal")).show();
    $('#docsModal').modal('show')
  });

  let file = document.querySelector("#gov-yojna-file");
  $("#upload-gov-yojna-file").on("click", async function (e) {
    e.preventDefault();

    let govYojanaData = new FormData(
      document.getElementById("gov-yojana-form"),
    );

    if (
      govYojanaData.get("imageBanner") &&
      govYojanaData.get("imageBanner").size > 0
    )
      govYojanaData.set(
        "imageBanner",
        await compressImageFile(govYojanaData.get("imageBanner")),
      );

    post_file_data(govYojanaData);
  });

  async function post_file_data(formData) {
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
            // location.reload();
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
        t: "WARNING",
        m: err?.message,
      });
    }
  }

  // delte gov-yojna file
  $(document).on("click", "#delete-gov-yojna-file-btn", function (e) {
    e.preventDefault();
    let fileName = $(this).attr("data-fileName");
    let bannerImageName = $(this).attr('data-bannerImageName');
    let fileId = $(this).attr("data-id");

    fetch("/master/delete-gov-yojna-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName, fileId, bannerImageName }),
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result.success) {
          alertjs.success({ t: "Successful", m: result.message }, () => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        alertjs.warning({ t: "Error", m: err }, () => {});
      });
  });
});
