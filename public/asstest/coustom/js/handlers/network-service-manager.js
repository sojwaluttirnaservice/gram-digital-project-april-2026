$(document).ready(function () {
  var networkService = new NetworkService();
  $(document).on("click", ".sendSMSNewApplication", function (e) {
    e.preventDefault();
    $("#masterSMSModal .modal-title").html("संदेश पाठवा");
    $("#smsFile").val("");
    $(".smsFile").addClass("d-none");
    $("#smsType").val("0");
    $("#smsList").val("");
    $("#smsMessage").val("");
    $("#masterSMSModal").modal({
      backdrop: "static",
      keyboard: false,
    });
  });
  $(document).on("change", "#smsFile", function (event) {
    networkService.readFile($(this), function (type, data) {
      if (!type) {
        alertjs.warning(
          {
            t: "माहिती",
            m: data,
          },
          function () {
            $("#smsType").val("0");
          },
        );
      } else {
        networkService.excelList = data;

        var mergeList = networkService.userList.concat(
          networkService.excelList,
        );
        mergeList = mergeList
          .map(function (value) {
            return value.mobile;
          })
          .join();
        $("#smsList").val(mergeList);
      }
    });
  });
  $(document).on("change", "#smsType", function (e) {
    var value = Number($(this).val());
    networkService.excelList = [];
    networkService.userList = [];
    $("#smsFile").val("");
    $(".smsFile").addClass("d-none");
    $("#smsList").val("");
    $("#smsMessage").val("");

    switch (value) {
      case 1:
        networkService.getMobileNumberList(function (data) {
          if (data.call == 1) {
            networkService.userList = data.data
              .map(function (value) {
                return value.mobile;
              })
              .join();
            $("#smsList").val(networkService.userList);
          } else {
            alertjs.warning(
              {
                t: "माहिती",
                m: "SMS यादी रिकामी आहे.",
              },
              function () {
                $("#smsType").val("0");
              },
            );
          }
        });
        break;
      case 2:
        $(".smsFile").removeClass("d-none");

        break;
      case 3:
        $(".smsFile").removeClass("d-none");

        networkService.getMobileNumberList(function (data) {
          if (data.call == 1) {
            networkService.userList = data.data;
            var list = networkService.userList
              .map(function (value) {
                return value.mobile;
              })
              .join();
            $("#smsList").val(list);
          } else {
            alertjs.warning(
              {
                t: "माहिती",
                m: "SMS यादी रिकामी आहे.",
              },
              function () {
                $("#smsType").val("0");
              },
            );
          }
        });
        break;
      case 4:
        break;
      default:
        $("#smsType").val("0");

        break;
    }
  });
  $(document).on("click", "#btnSendSMS", function (e) {
    e.preventDefault();
    var sendData = {
      docSMS: "",
      userMobileNo: "",
      count: 0,
    };

    if ($("#smsList").val() == "") {
      alert("यादी रिकामा आहे !!");
      return false;
    }
    if ($("#smsMessage").val() == "") {
      alert("संदेश रिकामा आहे !!");
      return false;
    }
    var sms = $("#smsMessage").val();
    sms += " ." + $("#gpName").val();
    sendData.docSMS = sms;
    sendData.userMobileNo = $("#smsList").val();
    var _this = this;
    sendData.count = sendData.userMobileNo.split(",").length;
    $(_this).text("संदेश पाठवल्या जातोय...").prop("disabled", true);
    networkService.sendSMS(sendData, function (type, data) {
      console.log(data);
      $(_this).text("संदेश पाठवा").prop("disabled", false);
      if (!type) {
        return false;
      }

      if (data.call == 1) {
        alertjs.success(
          {
            t: "माहिती",
            m: "संदेश यशस्वी रेत्या पाठवले.",
          },
          function () {
            window.location.reload();
          },
        );
      } else {
        alertjs.warning(
          {
            t: "माहिती",
            m: "संदेश पाठवले नाही, परत पाठवा.",
          },
          function () {},
        );
      }
    });
  });
});

function NetworkService() {
  this.userList = [];
  this.excelList = [];
  this.getMobileNumberList = function (callback) {
    //
    var data = {
      url: "/network-service/get-client-contact-list",
      method: "post",
      data: [],
    };

    commonHandler.ajaxManager(data, function (type, data) {
      // $(_this).text("संदेश पाठवा").prop("disabled", false);
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }
      callback(data);
    });
  };
  this.sendSMS = function (data, callback) {
    // $(_this).text("संदेश पाठवल्या जातोय...").prop("disabled", true);
    var data = {
      url: "/network-service/send-sms",
      method: "post",
      data: data,
    };

    commonHandler.ajaxManager(data, function (type, data) {
      // $(_this).text("संदेश पाठवा").prop("disabled", false);
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
      }
      callback(type, data);
    });
  };
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
