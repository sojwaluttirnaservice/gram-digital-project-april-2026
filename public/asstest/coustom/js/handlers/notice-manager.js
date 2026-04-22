var noticeList = [];
var noticeDefaultList = {};
$(document).ready(function () {
  $(document).on("click", ".sendSMSNewApplication", function (e) {
    e.preventDefault();
    var applicationId = Number($(this).attr("data-id"));
    singleApplication = newApplicationList[applicationId];

    $("#masterSMSModal .modal-title").html(singleApplication.docName);
    $("#docAllow").prop("checked", false);
    $("#docDisAllow").prop("checked", false);
    $("#docSMS").val("");
    $("#masterSMSModal").modal("show");
  });

  $(document).on("click", "#btnSendSMS", function (e) {
    e.preventDefault();
    var sendData = {
      docResponse: "",
      docSMS: "",
      userMobileNo: "",
      appId: 0,
    };
    var c = false;
    if ($("#docAllow").prop("checked") == true) {
      sendData.docResponse = 1;
      c = true;
    }
    if ($("#docDisAllow").prop("checked") == true) {
      sendData.docResponse = 0;
      c = true;
    }
    if (c == false) {
      alert("दाखला मान्य/अमान्य निवडा !!");
      return false;
    }
    if ($("#docSMS").val() == "") {
      alert("संदेश रिकामा आहे !!");
      return false;
    }
    var sms = $("#docSMS").val();
    sms += " ." + $("#gpName").val();
    sendData.docSMS = sms;
    sendData.userMobileNo = singleApplication.formMobile;
    sendData.appId = singleApplication.id;
    var _this = this;
    $(_this).text("संदेश पाठवल्या जातोय...").prop("disabled", true);
    var data = {
      url: "/application/send-application-message",
      method: "post",
      data: sendData,
    };

    commonHandler.ajaxManager(data, function (type, data) {
      $(_this).text("संदेश पाठवा").prop("disabled", false);
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }
      if (data.call == 1) {
        alertjs.success(
          {
            t: "माहिती",
            m: "दाखला यशस्वी रेत्या जतन केला आणि SMS यसास्वी पाठविण्यात आला आहे.",
          },
          function () {
            window.location.reload();
          },
        );
        // window.location.assign("/form-8/phase-2/" + data.data);
      } else {
        alertjs.warning(
          {
            t: "माहिती",
            m: "SMS परत पाठपाठवा.",
          },
          function () {},
        );
      }
    });
  });
  $(document).on("click", "#newWebNotice", function (e) {
    e.preventDefault();
    $("#masterWebNotice .modal-title").html("नवीन वेब नोटीस जोडा");
    $("#webNoticeText").val("");
    $("#masterWebNotice").modal("show");
  });
  $(document).on("click", "#saveWebNotice", function (e) {
    e.preventDefault();
    var webNoticeText = $("#webNoticeText").val();
    var data = {
      url: "/web-notice/save-message",
      method: "post",
      data: {
        webNoticeText: webNoticeText,
      },
    };
    commonHandler.ajaxManager(data, function (type, data) {
      //$(_this).text("संदेश पाठवा").prop("disabled", false);
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }
      if (data.call == 1) {
        alertjs.success(
          {
            t: "माहिती",
            m: "वेब नोटीस यशस्वी रित्या जतन केली गेली आहे.",
          },
          function () {
            window.location.reload();
          },
        );
      }
    });
  });
});
