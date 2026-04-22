$(document).ready(function () {
  console.log("js Loaded");

  let karSudharniButtons = [
    { value: "जमीन कर सुधारणी", id: "1" },
    { value: "आरोग्य दिवा कर सुधारणी ", id: "2" },
    { value: "बांधकाम रेडीनटोर दर सुधारणा", id: "3" },
    { value: "पाणी कर सुधारणा", id: "4" },
  ];

  let html = karSudharniButtons.map((el, i) => {
    return ` 
          <div class='col-5 col-md-2 p-2 box box--white'> 
            <div class='commonModalFrom d-flex justify-content-center align-items-center' data-id=${el.id}> 
              <p class='box__title'> <i class='fa fa-print fa-2x text-danger'></i></p>
              <p class='pl-2 pt-2'><small> ${el.value} </small></p>
            </div>
          </div>
          `;
  });

  $(".karSudharniButtons").html(html.join(""));

  $(document).on("click", ".commonModalFrom", function () {
    console.log("clicked");
    console.log($(this).attr("data-id"));
    let id = $(this).attr("data-id");

    if (id == 1) {
      window.location.assign("/master/gram-rate-setting");
    }
    if (id == 2) {
      window.location.assign("/master/arogyaDivabattiKarSetting");
    }
    if (id == 3) {
      window.location.assign("/master/bandkamRedinatorKarSetting");
    }
    if (id == 4) {
      window.location.assign("/master/paniKarSetting");
    }
  });

  console.log($(".commonModalFrom").html());
});
