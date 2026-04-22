$(() => {

  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
  });

  // ==========================
  // SERVICE SUBJECT CHANGE – DYNAMIC DOCUMENTS
  // ==========================
  const SERVICE_SUBJECTS =
    typeof _SERVICE_SUBJECTS !== "undefined" && Array.isArray(_SERVICE_SUBJECTS)
      ? _SERVICE_SUBJECTS
      : [];

  $("#service_subject_select").on("change", function () {
    const selectedName = $(this).val();
    const $container = $("#documents-container");
    const $websiteContainer = $(".service-website-container");

    const subject = SERVICE_SUBJECTS.find(
      (s) => s.subject_name === selectedName,
    );

    $("#subject_id").val(subject ? subject.id : "");

    // Reset website link
    $websiteContainer.empty();

    // Show website if available
    if (subject && subject.website) {
      $websiteContainer.html(`
      <a
        href="${subject.website}"
        target="_blank"
        class="text-sm text-blue-600 underline font-medium"
      >
        वेबसाइट दाखवा
      </a>
    `);
    }

    // -------- existing document logic below --------
    $container.empty();

    if (!subject) {
      $container.html(`
      <p class="text-sm text-gray-600 text-center md:col-span-2">
        कृपया सेवा विषय निवडा
      </p>
    `);
      return;
    }

    if (!subject.documents || subject.documents.length === 0) {
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

      $container.append(`
      <div class="input-group">
        <label class="font-bold tracking-wider">
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
    `);
    });
  });

  // ==========================
  // SUBMIT HANDLER – TAHASIL OFFICE SEVA
  // ==========================
  $(document).on("click", "#save-tahsil-seva-btn", async function (e) {
    e.preventDefault();

    const $btn = $(this);
    const originalText = $btn.text();
    const form = $("#tahsil-office-seva-form");

    if (!form.valid()) return;

    $btn
      .prop("disabled", true)
      .addClass("disabled")
      .css({
        cursor: "not-allowed",
        backgroundColor: "#ccc",
        color: "#666",
      })
      .text("Saving...");

    try {
      const formData = new FormData(form[0]);
      const documents = [];

      // Collect document metadata + files
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


      formData.set("createdAt", _commonjsDateFormat(formData.get("createdAt")))

      // Send to backend
      const response = await fetch("/gp-applications/to-seva", {
        method: "POST",
        body: formData,
      });

      const { success, message, data } = await response.json();

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message || "अर्ज यशस्वीरीत्या साठविण्यात आला.",
          },
          () =>
            window.open(
              "/gp-applications/to-seva/application/" + data.applicationId,
              "_blank",
            ),
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message || "अर्ज साठवता आला नाही",
        });
      }
    } catch (err) {
      console.error(err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
      });
    } finally {
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

  //   generate QR codes

  // 1. Get the hidden data holder

  (function () {
    const dataHolder = document.querySelector("[data-qrLinks]");
    if (!dataHolder) return;

    // 2. Parse qrLinks safely
    let qrLinks = [];
    try {
      qrLinks = JSON.parse(dataHolder.getAttribute("data-qrLinks"));
    } catch (e) {
      console.error("Invalid QR links data", e);
      return;
    }

    // 3. Generate QR for each link
    qrLinks.forEach((qrLink, index) => {
      let id = `qr-code-${index}`;
      generateQRCode(id, qrLink.endpoint);
    });
  })();

  function generateQRCode(id, endpoint) {
    const qrContainer = document.getElementById(id);
    if (!qrContainer || !endpoint) return;

    // Clear existing QR (safe re-render)
    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
      text: endpoint,
      width: 128,
      height: 128,
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
});
