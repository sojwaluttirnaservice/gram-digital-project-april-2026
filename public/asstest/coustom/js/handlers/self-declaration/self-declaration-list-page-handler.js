$(() => {
  // top part
  $(document).on("click", ".deleteDecleration", function (e) {
    e.preventDefault();

    let deleteApplicationId = $(this).attr("data-id");
    // console.log(deleteApplicationId);

    alertjs.delete((status) => {
      if (status == false) {
        return false;
      } else {
        $.ajax({
          url: "/self-declaration/delete/" + deleteApplicationId,
          method: "POST",
          success: function (result) {
            console.log(result);
            if (result.call == 1) {
              window.location.reload();
            }
          },
          error: function (err) {
            console.log(err);
          },
        });
      }
    });
  });

  $(document).on("click", ".printDecleration", function (e) {
    e.preventDefault();
    let applicationId = Number($(this).attr("data-id"));
    let applicationType = $(this).attr("data-appType");

    singleApplication = newSelfDeclarationList[applicationId];
    $("#printSelfDeclaration .modal-title").html(
      (singleApplication.sd_first_name || "") + " यांचा अर्ज प्रिंट करा",
    );
    $("#printPlace").val(gp);
    $("#date31").val("");
    $("#idData").val(singleApplication.id);
    $("#appType").val(applicationType);
    $("#printSelfDeclaration").modal("show");
  });

  $(document).on("click", "#btnPrintSelfDeclaration", function (e) {
    e.preventDefault();
    var printPlace = $("#printPlace").val();
    var date31 = $("#date31").val();
    if (printPlace !== "" && date31 !== "") {
      window.open(
        `/print/self-declaration?p=${printPlace}&d=${date31}&i=${$(
          "#idData",
        ).val()}&appType=${$("#appType").val()}`,
      );
    }
  });

  /** 
  $(document).on("click", "#see-self-declaration-list-btn", function(e){
    e.preventDefault();
    let $certDropdown = $('[name="create-self-declaration-cert-dropdown"]');
    let cert = $certDropdown.val();
    if(cert == -1){
        alertjs.warning({
            t: "Warning",
            m: "अर्जाची यादी बघण्यासाठी योग्य पर्याय निवडा."
        })
        return;
    }

    let openUrl = `/self-declaration`
    if(cert){
        openUrl += `?cert=${cert}`
    }
    window.open(openUrl, "_self")
  })
    */

  $(document).on(
    "change",
    '[name="create-self-declaration-cert-dropdown"]',
    function (e) {
      e.preventDefault();
      let $certDropdown = $('[name="create-self-declaration-cert-dropdown"]');
      let cert = $certDropdown.val();
      if (cert == -1) {
        alertjs.warning({
          t: "Warning",
          m: "अर्जाची यादी बघण्यासाठी योग्य पर्याय निवडा.",
        });
        return;
      }

      let openUrl = `/self-declaration`;
      if (cert) {
        openUrl += `?cert=${cert}`;
      }
      window.open(openUrl, "_self");
    },
  );

  //   OPEN THE NEW APPLICATION BUTTON
  $(document).on(
    "click",
    "#new-self-declaration-application-btn",
    function (e) {
      let $certDropdown = $('[name="create-self-declaration-cert-dropdown"]');
      let cert = $certDropdown.val();

      if (!cert || cert == -1) {
        alertjs.warning(
          {
            t: "अर्जाचा विषय",
            m: "अर्जाचा विषय निवडा",
          },
          () => {
            // on alert close → focus dropdown
            $certDropdown.focus();
          },
        );

        return; // 🚫 stop here, don't open window
      }

      alertjs.confirm(
        {
          t: "अर्ज नोंदणी",
          m: `तुम्ही ${cert?.split("_").join(" ")} ह्या विषयासाठी अर्ज करीत आहात.`,
        },
        () => {
          window.open(
            `/self-declaration/form?cert=${encodeURIComponent(cert)}`,
          );
        },
      );
    },
  );

  //   Top part handling

  // Writing this comment, adding a new functionality to show hte details like uploaded documents in modal
  // format , to open it the modal

  $(document).on("click", ".view-self-declaration-details-btn", function (e) {
    e.preventDefault();

    const selfDeclaration = JSON.parse($(this).attr("data-selfDeclaration"));
     
    console.log(selfDeclaration.documents)

    // ===== DIRECT SCHEMA MAPPING =====

    $('[name="sd_applicantFullSelfNameM"]').val(
      selfDeclaration.sd_applicantFullSelfNameM ||
        selfDeclaration.sd_applicantFullSelfNameE ||
        "",
    );

    $('[name="mobile"]').val(selfDeclaration.mobile || "");

    $('[name="sd_applicantAadharM"]').val(
      selfDeclaration.sd_applicantAadharM ||
        selfDeclaration.sd_applicantAadharE ||
        "",
    );

    $('[name="sd_applicantGender"]').val(
      selfDeclaration.sd_applicantGender || "",
    );

    $('[name="sd_applicantAddressM"]').val(
      selfDeclaration.sd_applicantAddressM ||
        selfDeclaration.sd_applicantAddressE ||
        "",
    );

    $('[name="applicationSubject"]').val(
      selfDeclaration.applicationSubject || "",
    );

    $('[name="certificateReason"]').val(
      selfDeclaration.certificateReason || "",
    );

    // ===== DOCUMENTS (DYNAMIC & SAFE) =====

    const container = $("#documentsContainer");
    container.empty();

    if (
      Array.isArray(selfDeclaration.documents) &&
      selfDeclaration.documents.length
    ) {
      selfDeclaration.documents.forEach((doc, index) => {
        container.append(`
                <div class="border rounded-3 p-2 mb-2 d-flex justify-content-between align-items-center">
                    <div>
                        <div class="fw-semibold">${index + 1}. ${doc.document_label || "कागदपत्र"}</div>
                      
                    </div>
                    ${
                      doc.document_saved_path
                        ? `<a href="${doc.document_saved_path}" target="_blank"
                                 class="btn btn-sm btn-outline-primary">
                                 पहा
                               </a>`
                        : ""
                    }
                </div>
            `);
      });
    } else {
      container.html(
        `<small class="text-muted">कागदपत्रे उपलब्ध नाहीत</small>`,
      );
    }

    $("#self-declaration-details-modal").modal("show");
  });
});
