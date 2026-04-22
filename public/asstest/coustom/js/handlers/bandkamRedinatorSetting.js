$(document).ready(function () {
  console.log("js loaded redinator");
  let bandKamRedinatorForm = $("#bandKamRedinatorForm");
  let bandKamRedinatorFormSubmit = $("#bandKamRedinatorFormSubmit");
  let redinatorRateModalCloseBtn = $(".redinatorRateModalCloseBtn");
  let redinatorRateModal = $("#redinatorRateModal");
  let bandkamPrakarButton = $(".bandkamPrakarButton");
  bandkamPrakarButton.on("click", function (e) {
    e.preventDefault();
    console.log("clicked");
    redinatorRateModal.modal("show");
    let [el1, el2, el3, el4, el5, , el7] = bandKamDetails;
    console.log(el1);
    let first4Array = [el1, el2, el3, el4, el5, el7];
    let html = first4Array.map((el, i) => {
      return ` 
                        <tr> 
                            <td> ${el.bp_type}</td>
                            <td> ${el.bp_ready_nakar_rate} </td> 
                            <td> ${el.bp_tax_rate} </td> 
                        </tr> 
            `;
    });
    $(".redinatorRateTbody").html(html);
  });

  redinatorRateModalCloseBtn.on("click", function (e) {
    e.preventDefault();
    redinatorRateModal.modal("hide");
  });

  bandKamRedinatorFormSubmit.on("click", function (e) {
    e.preventDefault();

    let bandKamRedinatorSendDetails = [];

    $.each(bandKamDetails, function (i, el) {
      bandKamRedinatorSendDetails.push({
        id: $(`#redinekarRate${i + 1}`).attr("data-id"),
        redinakarRate: $(`#redinekarRate${i + 1}`).val(),
        taxRate: $(`#taxRate${i + 1}`).val(),
      });
    });

    console.log(bandKamRedinatorSendDetails);
    $.ajax({
      url: "/master/bandKamRedinatorSetting",
      method: "POST",
      data: {
        details: bandKamRedinatorSendDetails,
      },
      success: function (result) {
        console.log(result);
        if (result.call == 1) {
          alertjs.success(
            {
              t: "बांधकाम रेडीनटोर दर सुधारणा",
              m: "कर यशस्वी रित्या बदल झाला आहे.",
            },
            function () {
              window.location.reload();
            },
          );
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
