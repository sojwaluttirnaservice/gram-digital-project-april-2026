$(document).ready(function () {
  console.log("pani kr setting js loaded");
  let submitPaniKar = $("#submitPaniKar");

  submitPaniKar.on("click", function (e) {
    e.preventDefault();
    console.log("submit pani kr");
    let generalWaterTax = $("#generalWaterTax").val();
    let specialWaterTax = $("#specialWaterTax").val();
    console.log(generalWaterTax, specialWaterTax);
    if (generalWaterTax != "" && specialWaterTax != "") {
      $.ajax({
        url: "/master/updatePaniKar",
        method: "POST",
        data: {
          data: JSON.stringify({
            generalWaterTax,
            specialWaterTax,
          }),
        },
        success: function (result) {
          console.log(result);
          if (result.call == 1) {
            alertjs.success(
              {
                t: "पाणी कर यशस्वी रित्या जतन झाला.",
                m: "",
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
    }
  });
});
