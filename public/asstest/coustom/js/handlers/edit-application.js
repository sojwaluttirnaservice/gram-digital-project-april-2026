$(() => {
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
  });

  // done yar finally
  let selectedOptions = [];

  function upsert(doc) {
    const i = selectedOptions.findIndex((d) => d.docId === doc.docId);
    if (i > -1) selectedOptions[i] = doc;
    else selectedOptions.push(doc);
  }

  function remove(docId) {
    selectedOptions = selectedOptions.filter((d) => d.docId !== docId);
  }

  // ✅ INIT FROM UI (NOT FROM JSON)
  $('input[type="checkbox"]:checked').each(function () {
    const $cb = $(this);
    const $row = $cb.closest(".form-group");

    const docId = $cb.data("i"); // you are using index mapping
    const docTitle = $row.find("label").text().trim();

    const docCol1 = $row.find("input.form-control").eq(0).val() || "";
    const docCol2 = $row.find("input.form-control").eq(1).val() || "";

    if (docId === undefined) return;

    upsert({
      docId,
      docTitle,
      docCol1,
      docCol2,
    });
  });

  console.log("INIT STATE:", selectedOptions);

  // CHECKBOX CHANGE
  $(document).on("change", 'input[type="checkbox"]', function () {
    const $cb = $(this);
    const $row = $cb.closest(".form-group");

    const docId = $cb.data("i");
    const docTitle = $row.find("label").text().trim();

    const docCol1 = $row.find("input.form-control").eq(0).val() || "";
    const docCol2 = $row.find("input.form-control").eq(1).val() || "";

    if ($cb.is(":checked")) {
      upsert({ docId, docTitle, docCol1, docCol2 });
    } else {
      remove(docId);
      $row.find("input.form-control").val("");
    }

    console.log(selectedOptions);
  });

  // INPUT CHANGE
  $(document).on("input", "input.form-control", function () {
    const $row = $(this).closest(".form-group");
    const $cb = $row.find('input[type="checkbox"]');

    if (!$cb.is(":checked")) return;

    const docId = $cb.data("i");
    const docTitle = $row.find("label").text().trim();

    const docCol1 = $row.find("input.form-control").eq(0).val() || "";
    const docCol2 = $row.find("input.form-control").eq(1).val() || "";

    upsert({ docId, docTitle, docCol1, docCol2 });

    console.log(selectedOptions);
  });

  //   update part handling

  $(document).on("click", "#update-application-btn", async function (e) {
    e.preventDefault();
    let sendData = {
      docDetails: selectedOptions,
      formName: $("#formName").val(),
      formMobile: $("#formMobile").val(),
      formEmail: $("#formEmail").val(),
      formAddress: $("#formAddress").val(),
      formAadhar: $("#formAadhar").val()?.replaceAll("-", ""),
      create_date: _commonjsDateFormat($("#create_date").val()),
      id: $("#id").val()
    };

    try {
      let { success, message } = await fetch("/application", {
        method: "PUT",
        body: JSON.stringify(sendData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => r.json());

      if(success){
        alertjs.success({
            t: "Success",
            m: message
        }, () =>{
            location.reload();
        })
      }else{
       alertjs.warning({
        t: "WARNING",
        m: message,
      }) 
      }
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message,
      })
    }
  });
});
