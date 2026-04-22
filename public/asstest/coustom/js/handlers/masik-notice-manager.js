$(document).ready(function () {
  var newMasikList = [];
  var subjectList =
    _notice && _notice.notice_subject ? JSON.parse(_notice.notice_subject) : [];

  if (subjectList.length > 0) {
    printTable(subjectList);
  }

  var imageData = "";
  var gp = "";

  // date picker for sabha date

  $("#sabhaDate").datepicker({
    dateFormat: "dd/mm/yy",
  });

  // jQuery validation
  $("#newSabhaForm").validate({
    rules: {
      sabhaName: {
        required: true,
      },
      sabhaDate: {
        required: true,
      },
      sabhaSchedule: {
        required: true,
      },
      sabhaScheduleTime: {
        required: true,
      },
      sabhaPlace: {
        required: true,
      },
      sabhaNumber: {
        required: true,
      },
    },
  });

  $(document).on("click", ".copy-to-vishay", function (e) {
    e.preventDefault();
    var data = $(this).html();
    $("#masikNoticevishay").val(data).focus();
  });

  $(document).on("click", ".add-in-list-btn", function (e) {
    e.preventDefault();
    let subject = $(this).attr("data-subject");
    subjectList.push(subject);
    printTable(subjectList);
    $(this).val("");
  });

  $(document).on("click", "#add-in-list-from-input-btn", function (e) {
    e.preventDefault();
    let sub = $("#masikNoticevishay").val();
    if (!sub?.trim()) return;
    subjectList.push(sub);
    printTable(subjectList);

    $("#masikNoticevishay").val("");
  });

  $(document).on("keyup", "#masikNoticevishay", function (e) {
    e.preventDefault();
    let sub = $(this).val();

    if (e.key === "Enter") {
      if (!sub?.trim()) return;
      subjectList.push(sub);
      printTable(subjectList);
      $(this).val("");
    }
  });

  // remove notice vishay from table.
  $(document).on("click", ".remove-notice", function (e) {
    e.preventDefault();
    console.log("here", Number($(this).data("id")));
    alertjs.deleteSpl("सदर विषय काढायचा आहे का ?", (status) => {
      if (status) {
        let index = Number($(this).data("id"));
        subjectList.splice(index, 1);
        printTable(subjectList);
      }
    });
  });

  // helper function printing sabha vishay into table

  function printTable(subjectList) {
    var list = subjectList
      .map(function (value, index) {
        return `<tr>
                   <td>${
                     index + 1
                   }) ${value} <button type="button" class="remove-notice float-right btn btn-sm btn-danger" data-id="${index}">काढा</button></td>
                </tr>`;
      })
      .join("");
    $("#mn-list").html(list);
  }

  function getFormData() {
    let sabhaDate = $("#sabhaDate").val().split("/");

    let requiredFormat = [sabhaDate[1], sabhaDate[0], sabhaDate[2]].join("/");

    console.log("REquired date format = ", requiredFormat);
    return {
      sabhaName: $("#sabhaName").val(),
      sabhaDate: requiredFormat,
      sabhaSchedule: $("#sabhaSchedule").val(),
      sabhaScheduleTime: $("#sabhaScheduleTime").val(),
      sabhaPlace: $("#sabhaPlace").val(),
      sabhaNumber: $("#sabhaNumber").val(),
      id: $("id") != null ? $("#id").val() : null,
      masikNoticevishay: JSON.stringify(subjectList),
    };
  }

  // save masik notice details
  $(document).on("click", "#saveGpMasikNotice", function (e) {
    e.preventDefault();
    if (!$("#newSabhaForm").valid()) {
      alertjs.warning({
        t: "सर्व आवश्यक माहिती भरा",
      });
      return false;
    }
    // let sabhaDate = $("#sabhaDate").val().split("/");

    let newSabha = getFormData();

    $.ajax({
      url: "/masik-notice/saveNewNotice",
      method: "post",
      data: newSabha,
      success: function (result) {
        console.log(result);
        if (result.call === 1) {
          alertjs.success(
            {
              t: "यशस्वी रित्या जतन झाले.",
            },
            function () {
              window.location.reload();
            }
          );
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  $(document).on("click", "#updateGpMasikNotice", async function (e) {
    try {
      e.preventDefault();
      if (!$("#newSabhaForm").valid()) {
        alertjs.warning({
          t: "सर्व आवश्यक माहिती भरा",
        });
        return false;
      }
      // let sabhaDate = $("#sabhaDate").val().split("/");

      let newSabha = getFormData();

      const _response = await fetch(`/masik-notice/update-masik-notice`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSabha),
      });

      const _data = await _response.json();

      if (_data.call == 1) {
        alertjs.success(
          {
            t: "यशस्वी रित्या अद्ययावत झाले .",
          },
          function () {
            window.location.reload();
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  });

  //   $(document).on("click", "#updateGpMasikNotice", function (e) {
  //     const id = +$(this).attr("data-id");
  //     e.preventDefault();
  //     if (!$("#newSabhaForm").valid()) {
  //       alertjs.warning({
  //         t: "सर्व आवश्यक माहिती भरा",
  //       });
  //       return false;
  //     }

  //     let newSabha = getFormData();

  //     newSabha["id"] = id;

  //     console.log(newSabha);

  //     $.ajax({
  //       url: "/masik-notice/updateMasikNotice",
  //       method: "post",
  //       data: newSabha,
  //       success: function (result) {
  //         console.log(result);
  //         if (result.call === 1) {
  //           alertjs.success(
  //             {
  //               t: "यशस्वी रित्या अद्ययावत झाली.",
  //             },
  //             function () {
  //               window.location.reload();
  //             }
  //           );
  //         }
  //       },
  //       error: function (err) {
  //         console.log(err);
  //       },
  //     });
  //   });

  // OPEN PRINT NOTICE MODEL

  $(document).on("click", ".printNotice", function (e) {
    e.preventDefault();

    // GETTING NOTICE ID FOR PRINT
    let noticeId = $(this).attr("data-id");

    // LIST OF SABHA TYPES
    let sabhaPrintTypes = [
      {
        sabhaName: "मासिक सभा",
      },
      {
        sabhaName: "तहकूब मासिक सभा",
      },
      {
        sabhaName: "ग्रामसभा",
      },
      {
        sabhaName: "तहकूब ग्रामसभा",
      },
      {
        sabhaName: "महिला सभा",
      },
      {
        sabhaName: "तहकुभ महिला सभा",
      },
      {
        sabhaName: "विशेष सभा",
      },
    ];

    let html = sabhaPrintTypes.map((el) => {
      return `  
            <div class='m-1'> 
                    <button class='btn btn-primary font-weight-bold sabhaButton' id='${el.sabhaName}' data-noticeId='${noticeId}'> 
                        ${el.sabhaName} 
                    </button>
            </div>`;
    });

    $(".sabhaPrintTypes").html(html);

    $("#printSabhaTypeModal").modal("show");
  });

  // print specific sabha notice
  $(document).on("click", ".sabhaButton", function (e) {
    e.preventDefault();
    console.log();

    alertjs.deleteSpl("वॉटरमार्क पाहिजे का?", (status) => {
      let sabhaType = $(this).attr("id");
      let noticeId = $(this).attr("data-noticeId");
      window.open(
        `/masik-notice/printSabhaNotice?sabhaType=${encodeURIComponent(sabhaType)}&noticeId=${encodeURIComponent(noticeId)}&watermark=${encodeURIComponent(status)}`,
        "_blank"
      );
    });
  });

  // delete sabha notice from list
  $(document).on("click", ".deleteNotice", function (e) {
    e.preventDefault();
    let deleteNoticeId = $(this).attr("data-masikSabhaNoticeId");

    alertjs.deleteSpl("Confirm Delete?", async (isYes) => {
      if (!isYes) {
        return;
      }

      try {
        const res = await fetch("/masik-notice/deleteNotice", {
          method: "POST",
          body: JSON.stringify({ id: deleteNoticeId }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { call } = await res.json();

        if (call) {
          alertjs.success(
            {
              t: "मासिक नोटिस यशस्वी रित्या काढली गेली.",
            },
            () => {
              window.location.reload();
            }
          );
        } else {
          alertjs.warning({
            t: "मासिक नोटिस काढली नाही गेली.",
          });
        }
      } catch (err) {
        console.error("Error:", err);
        alertjs.warning({
          t: "मासिक नोटिस काढली नाही गेली.",
        });
      }
    });
  });

  $(".editNotice").on("click", function (e) {
    e.preventDefault();
    const id = $(this).attr("data-id");
    window.open(`/masik-notice/edit-masik-notice?noticeId=${id}`, `_blank`);
  });

  const handleSendSabhaSms = async (parsedMasikNotice) => {
    try {
      const res = await fetch("/sms/masik-sabha-notice", {
        method: "POST",
        body: JSON.stringify(parsedMasikNotice),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { call: success, message } = await res.json();

      if (success) {
        alertjs.success({
          t: "SUCCESS",
          m: message,
        });
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.log("Error while sending sms");
      alertjs.warning({
        t: "WARNING",
        m: err?.message || 'काहीतरी चुकले',
      });
    }
  };

  // send masik notice message
  $(document).on("click", ".sendMessageBtn", function (e) {
    e.preventDefault();

    try {
      let masikNotice = $(this).attr("data-masikSabhaNotice");

      let parsedMasikNotice = JSON.parse(masikNotice);
      handleSendSabhaSms(parsedMasikNotice);
    } catch (err) {
      console.error("Error:", err);
    }
  });

  // temporary
  $("#addNewSabhaBtn").on("click", function () {
    // Prompt the user for a new Sabha name
    var newSabhaName = $("input#sabhaName").val();

    // Check if the user entered a name and it's not empty
    if (newSabhaName && newSabhaName.trim() !== "") {
      // Add the new Sabha as the first option in the select box
      $("#sabhaName").prepend(
        `<option value="${newSabhaName}" data-sabhaType="custom">${newSabhaName}</option>`
      );

      // Select the newly added option
      $("#sabhaName").val(newSabhaName);
    }
  });

  $("#enterNewSabhaBtn").on("click", () => {
    $("#addSabhaModal").modal("show");
  });
});
