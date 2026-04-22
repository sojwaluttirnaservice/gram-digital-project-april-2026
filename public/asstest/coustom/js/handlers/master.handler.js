var snapMale = "";
var snapFemale = "";
var tableData = "";
var excelData = [];
$(document).ready(function () {
  var table = $("#example").DataTable();
  var masterHandler = new MasterHandler();
  $(document).on("click", "#sendToServer", function (event) {
    if (excelData.length == 0) {
      alertjs.warning(
        {
          t: "माहिती",
          m: "List Is Empty",
        },
        function () {},
      );
      return false;
    }
    var btn = $(this);
    btn.prop("disabled", true);
    var data = {
      url: "/master/save-list",
      method: "post",
      data: { data: JSON.stringify(excelData) },
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }

      btn.prop("disabled", false);
      if (data.call == 1) {
        alertjs.success(
          {
            t: "माहिती",
            m: data.data.info,
          },
          function () {
            table.clear().draw();
            excelData = [];
            $("#excelFile").val("");
          },
        );
      } else {
        alertjs.warning(
          {
            t: "माहिती",
            m: "You Have an error",
          },
          function () {},
        );
      }
    });
  });

  $(document).on("change", "#excelFile", function (event) {
    masterHandler.readFile($(this), function (type, data) {
      if (!type) {
        alertjs.warning(
          {
            t: "माहिती",
            m: data,
          },
          function () {
            table.clear().draw();
            excelData = [];
          },
        );
      } else {
        table.destroy();
        masterHandler.excelList = data;
        if (masterHandler.excelList.length !== 0) {
          excelData = masterHandler.excelList.map(function (element) {
            return [
              Number(element.id),
              element.feu_malmattaNo,
              Number(element.feu_oblik_malmatta_id),
              element.feu_wardNo,
              element.feu_homeNo,
              element.feu_aadharNo,
              element.feu_ownerName,
              element.feu_secondOwnerName,
              element.feu_mobileNo,
              element.feu_gramPanchayet,
              element.feu_villageName,
              element.feu_gaatNo,
              Number(element.feu_gharkulYojna),
              element.feu_havingToilet,
              Number(element.feu_areaHeight),
              Number(element.feu_areaWidth),
              Number(element.feu_totalArea),
              Number(element.feu_totalAreaSquareMeter),
              element.feu_eastLandmark,
              element.feu_westLandmark,
              element.feu_northLandmark,
              element.feu_southLandmark,
              element.feu_bojaShera,
              element.feu_created_date,
              element.feu_modify_date,
            ];
          });
          table = $("#example").DataTable({
            data: excelData,
          });
        }
      }
    });
  });
});
function MasterHandler() {
  this.userList = [];
  this.excelList = [];

  this.readFile = function (fileUpload, callback) {
    fileUpload = fileUpload[0];
    //Reference the FileUpload element.
    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof FileReader != "undefined") {
        var reader = new FileReader();

        //For Browsers other than IE.
        if (reader.readAsBinaryString) {
          reader.onload = function (e) {
            this.excelList = ProcessExcel(e.target.result);
            console.log(this.excelList);
            callback(true, this.excelList);
          };
          reader.readAsBinaryString(fileUpload.files[0]);
        } else {
          //For IE Browser.
          reader.onload = function (e) {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
            }
            this.excelList = ProcessExcel(data);
            console.log(this.excelList);
            callback(true, this.excelList);
          };
          reader.readAsArrayBuffer(fileUpload.files[0]);
        }
      } else {
        callback(false, "This browser does not support HTML5.");
      }
    } else {
      callback(false, "Please upload a valid Excel file.");
    }
  };

  function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
      type: "binary",
    });
    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[firstSheet],
    );
    return excelRows;
  }
}
