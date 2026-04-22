$(() =>{
      $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
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
  

// ===============================
// SAVE EMP DEMAND NAMUNA 5 RECORD
// ===============================
async function handleSaveEmpDemandNamuna5Record(e) {
  e.preventDefault();

  const $btn = $("#submit-emp-demand-n5-form-btn");
  const form = document.getElementById("emp-demand-n5-form");

  if (!form) return;

  const empDemandN5FormData = new FormData(form);

  empDemandN5FormData.set('n5_from_date', _commonjsDateFormat(empDemandN5FormData.get('n5_from_date')))
   empDemandN5FormData.set('n5_to_date', _commonjsDateFormat(empDemandN5FormData.get('n5_to_date')))


  $btn.prop("disabled", true);

  try {
    const { success, message } = await fetch("/gp-applications/emp-demand/n-5", {
      method: "POST",
      body: empDemandN5FormData,
    }).then((res) => res.json());

    if (success) {
      alertjs.success(
        { t: "SUCCESS", m: message || "नमुना ५ नोंद यशस्वीरित्या जतन करण्यात आली." },
        () => window.location.reload()
      );
    } else {
      alertjs.warning({
        t: "WARNING",
        m: message || "नमुना ५ नोंद जतन करता आली नाही.",
      });
    }
  } catch (err) {
    console.error("Error:", err);
    alertjs.warning({
      t: "WARNING",
      m: err?.message || "Something went wrong",
    });
  } finally {
    $btn.prop("disabled", false);
  }
}

// ===============================
// FORM SUBMIT BINDING
// ===============================
// $(document).on("submit", "#emp-demand-n5-form", handleSaveEmpDemandNamuna5Record);


  $(document).on('click', "#submit-emp-demand-n5-form-btn", handleSaveEmpDemandNamuna5Record)
})