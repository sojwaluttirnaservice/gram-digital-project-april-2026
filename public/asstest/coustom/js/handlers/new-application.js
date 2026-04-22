var doc_list = [];

$(document).ready(function () {
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
  });

  // masking aadhar no for dashes between 4 digits (eg. 0000-0000-0000)
  $("#formAadhar").mask("0000-0000-0000");
  $("#formSearch").mask("0000-0000-0000");
  let selectedDocs = [];

  // console.log("Happnig this ")

  var inputValues = {
    formName: $("#formName").val(),
    formMobile: $("#formMobile").val(),
    formEmail: $("#formEmail").val(),
    formAddress: $("#formAddress").val(),
    formAadhar: $("#formAadhar").val(),
    dakhlaCheckOne: $("#dakhlaCheckOne").prop("checked") == false ? 0 : 1,
    dakhlaCheckOneName: $("#dakhlaCheckOneName").val(),
    dakhlaCheckOneDate: $("#dakhlaCheckOneDate").val(),
    dakhlaCheckTwo: $("#dakhlaCheckTwo").prop("checked") == false ? 0 : 1,
    dakhlaCheckTwoName: $("#dakhlaCheckTwoName").val(),
    dakhlaCheckTwoDate: $("#dakhlaCheckTwoDate").val(),
    dakhlaCheckThree: $("#dakhlaCheckThree").prop("checked") == false ? 0 : 1,
    dakhlaCheckThreeDate: $("#dakhlaCheckThreeDate").val(),
    dakhlaCheckFour: $("#dakhlaCheckFour").prop("checked") == false ? 0 : 1,
    dakhlaCheckFourNumber: $("#dakhlaCheckFourNumber").val(),
    dakhlaCheckFive: $("#dakhlaCheckFive").prop("checked") == false ? 0 : 1,
    dakhlaCheckSix: $("#dakhlaCheckSix").prop("checked") == false ? 0 : 1,
    dakhlaCheckSixTextArea: $("#dakhlaCheckSixTextArea").val(),
    dakhlaCheckSeven: $("#dakhlaCheckSeven").prop("checked") == false ? 0 : 1,
    dakhlaCheckSevenTextArea: $("#dakhlaCheckSevenTextArea").val(),
    dakhlaCheckEight: $("#dakhlaCheckEight").prop("checked") == false ? 0 : 1,
  };

  // console.log("second happending")

  // Utility function to add or remove docs from selectedDocs
  function addRemoveDocs(isSelected, addData) {
    if (isSelected) {
      // Add doc if not already in selectedDocs (avoid duplicates)
      if (!selectedDocs.some((doc) => doc.docId === addData.docId)) {
        selectedDocs.push(addData);
      }
    } else {
      // Remove doc by docId
      selectedDocs = selectedDocs.filter((doc) => doc.docId !== addData.docId);
    }
    console.log(selectedDocs);
  }

  // Handler for dakhlaCheckOne (Birth Certificate)
  $("#dakhlaCheckOne").on("click", function () {
    let isSelected = $(this).prop("checked");
    let id = Number($(this).attr("data-i"));
    // Pick fresh values from input fields when checkbox clicked
    let addData = {
      docId: doc_list[id].id,
      docTitle: doc_list[id].dt_doc_name,
      docCol1: $("#dakhlaCheckOneName").val(), // fresh value
      docCol2: $("#dakhlaCheckOneDate").val(), // fresh value
    };
    addRemoveDocs(isSelected, addData);
  });

  // Handler for dakhlaCheckTwo (Death Certificate)
  $("#dakhlaCheckTwo").on("click", function () {
    let isSelected = $(this).prop("checked");
    let id = Number($(this).attr("data-i"));
    let addData = {
      docId: doc_list[id].id,
      docTitle: doc_list[id].dt_doc_name,
      docCol1: $("#dakhlaCheckTwoName").val(), // fresh value
      docCol2: $("#dakhlaCheckTwoDate").val(), // fresh value
    };
    addRemoveDocs(isSelected, addData);
  });

  // Handler for dakhlaCheckThree (विवाह नोंदणी)
  $("#dakhlaCheckThree").on("click", function () {
    let isSelected = $(this).prop("checked");
    let id = Number($(this).attr("data-i"));
    let addData = {
      docId: doc_list[id].id,
      docTitle: doc_list[id].dt_doc_name,
      docCol1: $("#dakhlaCheckThreeDate").val(), // fresh value
      docCol2: "", // no second column
    };
    addRemoveDocs(isSelected, addData);
  });

  // Handler for dakhlaCheckFour (नमुना नं. 8 चा उतारा)
  $("#dakhlaCheckFour").on("click", function () {
    let isSelected = $(this).prop("checked");
    let id = Number($(this).attr("data-i"));
    let addData = {
      docId: doc_list[id].id,
      docTitle: doc_list[id].dt_doc_name,
      docCol1: $("#dakhlaCheckFourNumber").val(), // fresh value
      docCol2: "",
    };
    addRemoveDocs(isSelected, addData);
  });

  // Handler for dakhlaCheckFive (ग्रामपंचायत येणे बाकी नसल्याचा दाखला)
  $("#dakhlaCheckFive").on("click", function () {
    let isSelected = $(this).prop("checked");
    let id = Number($(this).attr("data-i"));
    let addData = {
      docId: doc_list[id].id,
      docTitle: doc_list[id].dt_doc_name,
      docCol1: "", // no values for these fields
      docCol2: "",
    };
    addRemoveDocs(isSelected, addData);
  });

  // Handler for dakhlaCheckSix (निराधार असले बाबतचा दाखला)
  $("#dakhlaCheckSix").on("click", function () {
    let isSelected = $(this).prop("checked");
    let id = Number($(this).attr("data-i"));
    let addData = {
      docId: doc_list[id]?.id || 9,
      docTitle: doc_list[id]?.dt_doc_name || 'दारिद्र्यरेषेखालचा दाखला',
      docCol1: $("#dakhlaCheckSixTextArea").val(), // fresh value
      docCol2: "",
    };
    addRemoveDocs(isSelected, addData);
  });

  // Handler for dakhlaCheckSeven (इतर काम लिहावे कोणते असल्यास)
  $("#dakhlaCheckSeven").on("click", function () {
    let isSelected = $(this).prop("checked");
    let id = Number($(this).attr("data-i"));
    let addData = {
      docId: doc_list[id].id,
      docTitle: doc_list[id].dt_doc_name,
      docCol1: $("#dakhlaCheckSevenTextArea").val(), // fresh value from textarea
      docCol2: "",
    };
    addRemoveDocs(isSelected, addData);
  });

  // गावातील तक्रारी नोद येथे लिहावी
  $("#dakhlaCheckEight").on("click", function () {
    let isSelected = $(this).prop("checked");
    let id = Number($(this).attr("data-i"));
    let addData = {
      docId: doc_list[id].id,
      docTitle: doc_list[id].dt_doc_name,
      docCol1: "", // no values
      docCol2: "",
    };
    addRemoveDocs(isSelected, addData);
  });

  //
  function updateOrAddDoc(docId, docTitle, col1Value, col2Value) {
    const index = selectedDocs.findIndex((doc) => doc.docId === docId);
    if (index !== -1) {
      // Update existing entry
      selectedDocs[index].docCol1 = col1Value;
      selectedDocs[index].docCol2 = col2Value;
    } else {
      // Add new entry only if checkbox related to this doc is checked
      // We'll check this in the input handlers below
      selectedDocs.push({
        docId,
        docTitle,
        docCol1: col1Value,
        docCol2: col2Value,
      });
    }
    console.log(selectedDocs);
  }

  //   for all present input fields

  // Example for dakhlaCheckOneName input field
  $("#dakhlaCheckOneName").on("input", function () {
    const docId = doc_list[Number($("#dakhlaCheckOne").attr("data-i"))].id;
    const docTitle =
      doc_list[Number($("#dakhlaCheckOne").attr("data-i"))].dt_doc_name;
    // Only update if related checkbox is checked
    if ($("#dakhlaCheckOne").prop("checked")) {
      updateOrAddDoc(
        docId,
        docTitle,
        $(this).val(),
        $("#dakhlaCheckOneDate").val(),
      );
    }
  });

  // Similarly for dakhlaCheckOneDate
  $("#dakhlaCheckOneDate").on("input", function () {
    const docId = doc_list[Number($("#dakhlaCheckOne").attr("data-i"))].id;
    const docTitle =
      doc_list[Number($("#dakhlaCheckOne").attr("data-i"))].dt_doc_name;
    if ($("#dakhlaCheckOne").prop("checked")) {
      updateOrAddDoc(
        docId,
        docTitle,
        $("#dakhlaCheckOneName").val(),
        $(this).val(),
      );
    }
  });

  // dakhlaCheckTwoName and dakhlaCheckTwoDate
  $("#dakhlaCheckTwoName").on("input", function () {
    const docId = doc_list[Number($("#dakhlaCheckTwo").attr("data-i"))].id;
    const docTitle =
      doc_list[Number($("#dakhlaCheckTwo").attr("data-i"))].dt_doc_name;
    if ($("#dakhlaCheckTwo").prop("checked")) {
      updateOrAddDoc(
        docId,
        docTitle,
        $(this).val(),
        $("#dakhlaCheckTwoDate").val(),
      );
    }
  });

  $("#dakhlaCheckTwoDate").on("input", function () {
    const docId = doc_list[Number($("#dakhlaCheckTwo").attr("data-i"))].id;
    const docTitle =
      doc_list[Number($("#dakhlaCheckTwo").attr("data-i"))].dt_doc_name;
    if ($("#dakhlaCheckTwo").prop("checked")) {
      updateOrAddDoc(
        docId,
        docTitle,
        $("#dakhlaCheckTwoName").val(),
        $(this).val(),
      );
    }
  });

  // dakhlaCheckThreeDate (only one input)
  $("#dakhlaCheckThreeDate").on("input", function () {
    const docId = doc_list[Number($("#dakhlaCheckThree").attr("data-i"))].id;
    const docTitle =
      doc_list[Number($("#dakhlaCheckThree").attr("data-i"))].dt_doc_name;
    if ($("#dakhlaCheckThree").prop("checked")) {
      updateOrAddDoc(docId, docTitle, $(this).val(), "");
    }
  });

  // dakhlaCheckFourNumber
  $("#dakhlaCheckFourNumber").on("input", function () {
    const docId = doc_list[Number($("#dakhlaCheckFour").attr("data-i"))].id;
    const docTitle =
      doc_list[Number($("#dakhlaCheckFour").attr("data-i"))].dt_doc_name;
    if ($("#dakhlaCheckFour").prop("checked")) {
      updateOrAddDoc(docId, docTitle, $(this).val(), "");
    }
  });

  // dakhlaCheckSixTextArea
  $("#dakhlaCheckSixTextArea").on("input", function () {
    const docId = doc_list[Number($("#dakhlaCheckSix").attr("data-i"))].id;
    const docTitle =
      doc_list[Number($("#dakhlaCheckSix").attr("data-i"))].dt_doc_name;
    if ($("#dakhlaCheckSix").prop("checked")) {
      updateOrAddDoc(docId, docTitle, $(this).val(), "");
    }
  });

  // dakhlaCheckSevenTextArea
  $("#dakhlaCheckSevenTextArea").on("input", function () {
    const docId = doc_list[Number($("#dakhlaCheckSeven").attr("data-i"))].id;
    const docTitle =
      doc_list[Number($("#dakhlaCheckSeven").attr("data-i"))].dt_doc_name;
    if ($("#dakhlaCheckSeven").prop("checked")) {
      updateOrAddDoc(docId, docTitle, $(this).val(), "");
    }
  });

  // $(document).on("change", function () {
  //   selectedDocs.forEach((el, i) => {
  //     console.log(el.docId === 6 && el.docId === 7);
  //     if ((el.docId === 6 && el.docId === 7) && (el.docId === 1)) {
  //       console.log("in here");
  //       alert("इतर काम लिहावे कोणते असल्यास व गावातील तक्रारी नोद येथे लिहावी  हे दाखले लागत असल्यास इतर दाखल्यासाठी मागणी करता येणार नाही. त्या साठी ग्रामपंचात ला संपर्क साधावा.");
  //       return false;
  //     }
  //   })
  // })

  $(document).on("click", "#saveNewUserForm", function (e) {
    e.preventDefault();

    $("#newForm8").validate({
      errorPlacement: function (error, element) {
        if (element.attr("name") === "formName") {
          $("#formName")
            .closest(".input-group")
            .append('<div class="text-red-500 text-xs mt-1"></div>')
            .find("div.text-red-500")
            .append(error);
        }

        if (element.attr("name") === "formMobile") {
          $("#formMobile")
            .closest(".input-group")
            .append('<div class="text-red-500 text-xs mt-1"></div>')
            .find("div.text-red-500")
            .append(error);
        }

        if (element.attr("name") === "formAddress") {
          $("#formAddress")
            .closest(".input-group")
            .append('<div class="text-red-500 text-xs mt-1"></div>')
            .find("div.text-red-500")
            .append(error);
        }

        if (element.attr("name") === "formAadhar") {
          $("#formAadhar")
            .closest(".input-group")
            .append('<div class="text-red-500 text-xs mt-1"></div>')
            .find("div.text-red-500")
            .append(error);
        }
      },

      rules: {
        formName: {
          required: true,
        },
        formMobile: {
          required: true,
        },
        formAddress: {
          required: true,
        },
        formAadhar: {
          required: true,
        },
        dakhlaCheckOneName: {
          required: function () {
            return $("#dakhlaCheckOne").prop("checked");
          },
        },
        dakhlaCheckOneDate: {
          required: function () {
            return $("#dakhlaCheckOne").prop("checked");
          },
        },

        dakhlaCheckTwoName: {
          required: function () {
            return $("#dakhlaCheckTwo").prop("checked");
          },
        },
        dakhlaCheckTwoDate: {
          required: function () {
            return $("#dakhlaCheckTwo").prop("checked");
          },
        },

        dakhlaCheckThreeDate: {
          required: function () {
            return $("#dakhlaCheckThree").prop("checked");
          },
        },

        dakhlaCheckFourNumber: {
          required: function () {
            return $("#dakhlaCheckFour").prop("checked");
          },
        },

        dakhlaCheckSixTextArea: {
          required: function () {
            return $("#dakhlaCheckSix").prop("checked");
          },
        },
        // dakhlaCheckSevenTextArea: {
        //   required: function () {
        //     return $("#dakhlaCheckSeven").prop("checked");
        //   },
        // },
      },
    });

    if (!$("#newForm8").valid()) {
      alertjs.warning({
        t: "WARNING",
        m: "संपूर्ण आवश्यक माहिती भरा.",
      });
      return false;
    }

    let sendData = {
      docDetails: selectedDocs,
      formName: $("#formName").val(),
      formMobile: $("#formMobile").val(),
      formEmail: $("#formEmail").val(),
      formAddress: $("#formAddress").val(),
      formAadhar: $("#formAadhar").val().replaceAll("-", ""),
      create_date: _commonjsDateFormat($("#create_date").val()),
    };

    if (sendData.docDetails.length === 0) {
      alertjs.warning({
        t: "WARNING",
        m: "कृपया एक तरी दाखला निवडा !",
      });
      return false;
    }

    if (sendData.docDetails.length > 2) {
      alertjs.warning({
        t: "WARNING",
        m: "फक्त 2 दाखला/अर्ज मागणी करू शकता!",
      });
      return false;
    }

    let data = {
      url: "/save-new-application",
      method: "post",
      data: sendData,
    };

    commonHandler.ajaxManager(data, async function (type, data, responseData) {
      if (type == false) {
        alertjs.warning({
          t: "Warning",
          m:
            responseData?.message || "You Have An Error, PLease check Console.",
        });
        return false;
      }
      if (data.call == 2) {
        alertjs.warning(
          {
            t: "माहिती",
            m:
              data?.message ||
              `आपण मागील १५ दिवसांमध्ये तक्रार किंवा दाखला साठी अर्ज केला आहे त्यामुळे आपणास 
          १५ दिवसांकरिता आपणास कोणतीही तक्रार किंवा इतर दाखल्यासाठी अर्ज नाही करू शकत. त्यासाठी ग्रामपंचायती मध्ये संपर्क करावा.`,
          },
          function () {
            window.location.assign("/new-application-form");
          },
        );
      } else if (data.call == 1) {
        const dateTime = getDateTime();
        const sendData = {
          mobile: "",
          sms: `${$("#fName").val()} कडून ${dateTime.date} रोजी  ${
            dateTime.time
          } वाजता नागरिकता नोंदणीसाठी  अर्ज  प्राप्त  झाला. `,
        };
        sendGpSms(sendData);

        alertjs.success(
          {
            t: "माहिती",
            m: "सदर अर्ज यशस्वी रित्या भरल्या गेला आहे.",
          },
          function () {
            console.log(data);
            window.open("/print-application/" + data.id, "_blank");
            // location.reload();
          },
        );
      } else {
        alertjs.warning(
          {
            t: "",
            m: data?.message || "",
          },
          function () {},
        );
      }
    });
  });

  $(document).on("click", "#btnFormSearch", function (e) {
    e.preventDefault();
    var aadhar = $("#formSearch").val().replaceAll("-", "");

    console.log(aadhar);
    if (aadhar.length != 12) {
      alertjs.warning(
        {
          t: "माहिती",
          m: "आधार नंबर चुकीचा आहे !!",
        },
        function () {},
      );
      return false;
    }

    var data = {
      url: "/application/get-user-details",
      method: "post",
      data: {
        addhar: aadhar,
      },
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert("You Have An Error, PLease check Console.");
        console.log(data);
        return false;
      }
      if (data.call == 1) {
        $("#formName").val(data.data.formName);
        $("#formMobile").val(data.data.formMobile);
        $("#formEmail").val(data.data.formEmail);
        $("#formAddress").val(data.data.formAddress);
        // $("#formAadhar").val(data.data.formAadhar);
        let aadhar = data.data.formAadhar;

        if (aadhar && aadhar.length === 12) {
          aadhar = aadhar.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
        }

        $("#formAadhar").val(aadhar);
        // window.location.assign("/form-8/phase-2/" + data.data);
      } else {
        alertjs.warning(
          {
            t: "माहिती",
            m: "आधार बद्दल माहित उपलब्ध नाही ",
          },
          function () {},
        );
      }
    });
  });
});

function getDateTime() {
  const currentDate = new Date();
  // Format the date as "9 Jan 2024"
  const day = currentDate.getDate();
  // prettier-ignore
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  const hours = (((currentDate.getHours() + 11) % 12) + 1)
    .toString()
    .padStart(2, "0"); // Convert to 12-hour format
  const minutes = currentDate.getMinutes().toString().padStart(2, "0"); // Ensure two digits
  const period = currentDate.getHours() < 12 ? "AM" : "PM";

  const formattedTime = `${hours}:${minutes} ${period}`;
  //eg sms format. person_name, date, sandarbha, aarja prapta zala.

  return { date: formattedDate, time: formattedTime };
}
