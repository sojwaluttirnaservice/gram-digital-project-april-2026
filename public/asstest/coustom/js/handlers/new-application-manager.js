var newApplicationList = [];
var singleApplication = {};
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

  //   for sending the sms
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
          }
        );
        // window.location.assign("/form-8/phase-2/" + data.data);
      } else {
        alertjs.warning(
          {
            t: "माहिती",
            m: "SMS परत पाठपाठवा.",
          },
          function () {}
        );
      }
    });
  });

  // FOR UPDATING THE APPLICTION STATUS ,

  // EITHER ACCEPT OR REJECT

  const handleUpdateApplicationStatus = async (applicationStatData) => {
    try {
      const res = await fetch("/application/update-doc-remark", {
        method: "PUT",
        body: JSON.stringify(applicationStatData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { success, message } = await res.json();

      if (success) {
        alertjs.success({
          t: "SUCCESS",
          m: message,
        }, () => location.reload());
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले",
      });
    }
  };

  $(document).on("click", ".accept-application-btn", function (e) {
    e.preventDefault();

    let applicationId = $(this).attr("data-applicationId");
    let changeApplicationStatusTo = "ACCEPTED";


    handleUpdateApplicationStatus({ applicationId, changeApplicationStatusTo });

  });

  $(document).on("click", ".reject-application-btn", function (e) {
    e.preventDefault();

    let applicationId = $(this).attr("data-applicationId");
    let changeApplicationStatusTo = "REJECTED";

    alertjs.deleteSpl("तुम्ही हा अर्ज नक्की रद्द करू इच्छिता?", (isYes)=>{
        if(isYes){
            handleUpdateApplicationStatus({ applicationId, changeApplicationStatusTo });
        }
    })
  });
});
