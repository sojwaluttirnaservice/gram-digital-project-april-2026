let allowRefreshPageDuringPayment = true;

//-----------------------------------------------------------------------------------------

// PAYMENT DETAILS OBJECT
/**
 * Note - PAYMENT FOR INDICATORS
 * 1 = samanya tax payment
 * 2 = pani tax payment
 * 3 = vivah tax payment
 * 4 = ghoshna patra payment
 * * CHECK common.js FOR MORE INDICATORS
 */

// console.log(paymentDetails)

// not declaring this below object bcz on script load it shows it has been already declared, might be globally present
// but it looks like this
/**
let paymentDetails = {
    amount: '-',
    personName: $('.pay-owner-name').val(),
    malmattaNo: '-',
    transactionNumber: '-',
    paymentNumber: '-',
    paymentFor: '-',
    paymentMode: '', // 0 OFFLINE 1 ONLINE
};
 */

$(document).ready(function () {
  console.log("tax-payer-manager-payment.js loaded");

  $(document).on("click", "#getTaxPayerView", function (e) {
    $("#homeId").val("");
    $("#divUserDetails").addClass("d-none");
    $("#selectSearch-1").val(1);
    $("#masterModal").modal({
      show: true,
    });
  });

  $("#selectSearch-1").on("change", function () {
    searchType = Number($(this).val());
    $("#homeId-type").val("");
    $("#homeId").val("");
  });

  //   for search
  $("#homeId-type")
    .autocomplete({
      minLength: 1,
      source: function (request, response) {
        $("#homeId").val("");
        $("#divUserDetails").addClass("d-none");
        $.ajax({
          url: "/tax-payer/get-auto-search",
          method: "post",
          data: {
            q: request.term,
            sType: searchType,
          },
          success: function (data) {
            console.log(data.call);
            response(data.call);
          },
        });
      },
      focus: function (event, ui) {
        $("#homeId-type").val(ui.item.label);
        return false;
      },
      select: function (event, ui) {
        $("#homeId-type").val(ui.item.label);
        $("#homeId").val(ui.item.id);
        getUserDetails();
        return false;
      },
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
    return $("<li>")
      .data("ui-autocomplete-item", item)
      .append("<a> " + item.label + "</a>")
      .appendTo(ul);
  };

  function getUserDetails() {
    var value = Number($("#homeId").val());
    if (isNaN(value) || value == null || value == 0) {
      return false;
    }
    homeManager.getUserDetails(value, function (data) {
      if (data.call == 1) {
        homeManager.tempUserDetails = data.data;
        data = data.data;
        $(".myMainId").val(data.id);
        $("#newMalmattaNo").val(data.feu_malmattaNo);
        $("#newWardNo").val(data.feu_wardNo);
        $("#oldHomeNo").val(data.feu_homeNo);
        $("#newOwnerName").val(data.feu_ownerName);
        $("#newSecondOwnerName").val(data.feu_secondOwnerName);
        $("#newMobileNo").val(data.feu_mobileNo);
        $("#newAadharNo").val(data.feu_aadharNo);
        $("#newGramPanchayet").val(data.feu_gramPanchayet);
        $("#newVillageName").val(data.feu_villageName);

        $("#totalSamanyaKar").val(data.totalSampurnaTax);
        $("#totalWaterKar").val(data.totalWaterTax);
        $("#totalKar").val(data.totalTax);
        $("#divUserDetails").removeClass("d-none");
      } else {
        $("#divUserDetails").addClass("d-none");

        alertjs.warning(
          {
            t: "माहिती",
            m: "वरील अनु/घर क्रमांक सापडले नाही.",
          },
          function () {},
        );
      }
    });
  }

  $(document).on("click", ".isNaN", function (e) {
    $(this).select();
  });

  $(document).on("input", ".isNaN", function (e) {
    var _value = Number($(this).val());
    var currentId = $(this).prop("id");
    if (isNaN(_value) || _value == "") {
      $("#" + currentId).val("0");
    }
    vasuli.checkValidInput(currentId);
  });

  function getNewSamanyaVasuliData() {
    let _bharnaDate = $("#bharnaDate").val().split("/").reverse().join("-");

    // this is saved as the entry in another table

    let newVasuliData = {
      lastBuildingTax: Number($("#lastBuildingTax").val()),
      currentBuildingTax: Number($("#currentBuildingTax").val()),

      lastDivaTax: Number($("#lastDivaTax").val()),
      currentDivaTax: Number($("#currentDivaTax").val()),

      lastArogyaTax: Number($("#lastArogyaTax").val()),
      currentArogyaTax: Number($("#currentArogyaTax").val()),

      lastTaxFine: Number($("#lastTaxFine").val()),
      lastTaxRelief: Number($("#lastTaxRelief").val()),

      // Four new taxes
      lastCleaningTax: Number($("#lastCleaningTax").val()),
      currentCleaningTax: Number($("#currentCleaningTax").val()),

      lastFireblegateTax: Number($("#lastFireblegateTax").val()),
      currentFireblegateTax: Number($("#currentFireblegateTax").val()),

      lastTreeTax: Number($("#lastTreeTax").val()),
      currentTreeTax: Number($("#currentTreeTax").val()),

      lastEducationTax: Number($("#lastEducationTax").val()),
      currentEducationTax: Number($("#currentEducationTax").val()),

      // New Taxes end

      formNineId: Number($("#formNineId").val()),
      userId: Number($("#userId").val()),

      bharnaDate: _bharnaDate,
      amountInWords: $("#amountInWords").val(),

      checkNo: $("#checkNo").val(),
      finalTax: Number($("#totalSampurnaTax").val()),
    };
    return newVasuliData;
  }

  function getNewPaniVasuliData() {
    let _bharnaDate = $("#bharnaDate").val().split("/").reverse().join("-");

    // this is saved as the entry in another table

    let newVasuliData = {
      lastSpacialWaterTax: Number($("#lastSpacialWaterTax").val()),
      currentSpacialWaterTax: Number($("#currentSpacialWaterTax").val()),

      lastGenealWaterTax: Number($("#lastGenealWaterTax").val()),
      currentGenealWaterTax: Number($("#currentGenealWaterTax").val()),

      formNineId: Number($("#formNineId").val()),
      userId: Number($("#userId").val()),

      bharnaDate: _bharnaDate,
      amountInWords: $("#amountInWords").val(),

      checkNo: $("#checkNo").val(),
      finalWaterTax: Number($("#totalWaterTax").val()),
    };
    return newVasuliData;
  }

  //   saving tax details  of vasuli
  // SAving the tax details

  let thresholdAmount = 1000;
  // Saving Vasuli details for samanya
  $(document).on("click", "#saveVasuliDetails", function () {
    vasuli.checkValidInput();

    // if any amount was inserted or not
    let finalTax = Number($("#totalSampurnaTax").val());

    // if no amount was inserted, this will be zero, so don't move next
    if (finalTax === 0) {
      alertjs.warning(
        {
          t: `कृपया वसुली कर भरा`,
        },
        function () {},
      );
      return;
    }

    let previousOutstandingAmount =
      parseFloat($("#totalPreviousSamanyaTax").val()) || 0;
    // Check if there is any pending previous tax
    if (previousOutstandingAmount > 0) {
      //CASE 1: Previous outstanding amount is thresholdAmount or less
      if (previousOutstandingAmount <= thresholdAmount) {
        if (finalTax != previousOutstandingAmount) {
          alertjs.warning({
            t: "WARNING",
            m: `₹${thresholdAmount} किंवा त्यापेक्षा कमी थकबाकी असल्यास, ती पूर्ण भरणे आवश्यक आहे.`,
          });
          return;
        }
      }

      // CASE 2: Previous outstanding amount is more than thresholdAmount
      else if (previousOutstandingAmount > thresholdAmount) {
        let fiftyPercentOfPending = 0.5 * previousOutstandingAmount;

        if (finalTax < fiftyPercentOfPending) {
          alertjs.warning({
            t: "WARNING",
            m: `₹${previousOutstandingAmount} थकबाकीपैकी किमान ₹${fiftyPercentOfPending.toFixed(2)} (५०%) भरणे आवश्यक आहे.`,
          });
          return;
        }
      }
    }

    var mobile = $("#paymentMobileNumber").val();

    if (mobile?.trim()?.length !== 10) {
      alertjs.warning(
        {
          t: "WARNING",
          m: "मोबाइल नों. योग्य नाही",
        },
        () => {
          $("#paymentMobileNumber").focus();
        },
      );
      return false;
    }

    let isToProcess = confirm(`करवसुली करिता आपला ${mobile} निवड झाली आहे.`);

    if (isToProcess === false) {
      return false;
    }

    paymentDetails.paymentMode = 1;
    paymentDetails.transactionNumber = $("#transaction_number").val();
    paymentDetails.amount = finalTax;
    paymentDetails.personName = $("#personName").val();
    paymentDetails.malmattaNo = $("#malmattaNo").val();
    paymentDetails.paymentFor = 1;
    paymentDetails.was_paid_by_dharak = "YES";
    paymentDetails.approval_status = "PENDING";
    paymentDetails.tax_category = paymentDetails.paymentFor == 1 ? "SAMANYA" : "PANI";

    let fileInput = $("#paymentScreenshot")[0];
    if (!fileInput?.files?.length) {
      alertjs.warning({
        t: "WARNING",
        m: "पेमेंटचा स्क्रीनशॉट जोडा.",
      });
      return;
    }
    let paymentScreenshot = fileInput.files[0];

    let paymentData = new FormData();
    for (let key in paymentDetails) {
      if (paymentDetails.hasOwnProperty(key)) {
        paymentData.set(key, paymentDetails[key]);
      }
    }
    paymentData.set("paymentScreenshot", paymentScreenshot);

    const newSamanyaVasuliData = getNewSamanyaVasuliData();

    paymentData.set(
      "newSamanyaVasuliData",
      JSON.stringify(newSamanyaVasuliData),
    );

    const handlePayment = async () => {
      function getPaymentFor() {
        switch (paymentDetails.paymentFor) {
          case 1:
            return "सामान्य कर भरणा";
          case 2:
            return "पाणी कर भरणा";
        }
      }

      try {
        let url = "/payment/save-by-user?isPaidByUser=true";

        const res = await fetch(url, {
          method: "POST",
          body: paymentData,
        });

        let { success, message, reciptNumber: paymentId } = await res.json();

        // if fails
        if (!success) {
          alertjs.warning({
            t: "WARNING",
            m: message,
          });
          return;
        }

        alertjs.success({
          t: "SUCCESS",
          m: message,
        }, () => window.location.reload());

        // // if goes good

        // if (paymentId) {
        //   // udpate into samanya tax table
        // }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    handlePayment();
  });

  $(document).on("click", "#goPani", function (e) {
    id = homeManager.tempUserDetails.id;
    e.preventDefault();
    window.location.assign("/tax-payer/new/pani/" + id);
  });

  $(document).on("click", "#goSamanya", function (e) {
    e.preventDefault();
    id = homeManager.tempUserDetails.id;
    window.location.assign("/tax-payer/new/samanya/" + id);
  });

  //   saving pani vasuli details
  $(document).on("click", "#savePaniVasuliDetails", function () {
    const $btn = $(this);
    const originalText = $btn.html(); // ✅ store original button text

    $btn.prop("disabled", true).html("Processing..."); // ✅ disable + change text

    vasuli.checkValidInput();

    let finalWaterTax = Number($("#totalWaterTax").val());
    if (finalWaterTax === 0) {
      alertjs.warning({ t: `कृपया पाणी वसुली कर भरा` }, function () {});
      $btn.prop("disabled", false).html(originalText);
      return;
    }

    let previousOutstandingAmount =
      parseFloat($("#totalPreviousWaterTax").val()) || 0;

    if (previousOutstandingAmount > 0) {
      if (previousOutstandingAmount <= thresholdAmount) {
        if (finalWaterTax != previousOutstandingAmount) {
          alertjs.warning({
            t: "WARNING",
            m: `₹${thresholdAmount} किंवा त्यापेक्षा कमी थकबाकी असल्यास, ती पूर्ण भरणे आवश्यक आहे.`,
          });
          $btn.prop("disabled", false).html(originalText);
          return;
        }
      } else if (previousOutstandingAmount > thresholdAmount) {
        let fiftyPercentOfPending = 0.5 * previousOutstandingAmount;

        if (finalWaterTax < fiftyPercentOfPending) {
          alertjs.warning({
            t: "WARNING",
            m: `₹${previousOutstandingAmount} थकबाकीपैकी किमान ₹${fiftyPercentOfPending.toFixed(2)} (५०%) भरणे आवश्यक आहे.`,
          });
          $btn.prop("disabled", false).html(originalText);
          return;
        }
      }
    }

    var mobile = $("#paymentMobileNumber").val();

    if (mobile?.trim()?.length !== 10) {
      alertjs.warning(
        {
          t: "WARNING",
          m: "मोबाइल नों. योग्य नाही",
        },
        () => {
          $("#paymentMobileNumber").focus();
        },
      );
      $btn.prop("disabled", false).html(originalText);
      return false;
    }

    let isToProcess = confirm(`करवसुली करिता आपला ${mobile} निवड झाली आहे.`);

    if (isToProcess === false) {
      $btn.prop("disabled", false).html(originalText);
      return false;
    }

    paymentDetails.paymentMode = 1;
    paymentDetails.transactionNumber = $("#transaction_number").val();
    paymentDetails.amount = finalWaterTax;
    paymentDetails.personName = $("#personName").val();
    paymentDetails.malmattaNo = $("#malmattaNo").val();
    paymentDetails.paymentFor = 2;
    paymentDetails.was_paid_by_dharak = "YES";
    paymentDetails.approval_status = "PENDING";
    // bcz this pani already so no concitiaonl chek
    paymentDetails.tax_category = "PANI"

    let fileInput = $("#paymentScreenshot")[0];
    if (!fileInput?.files?.length) {
      alertjs.warning({
        t: "WARNING",
        m: "पेमेंटचा स्क्रीनशॉट जोडा.",
      });
      $btn.prop("disabled", false).html(originalText);
      return;
    }

    let paymentScreenshot = fileInput.files[0];

    let paymentData = new FormData();
    for (let key in paymentDetails) {
      if (paymentDetails.hasOwnProperty(key)) {
        paymentData.set(key, paymentDetails[key]);
      }
    }

    paymentData.set("paymentScreenshot", paymentScreenshot);

    const newVasuliPaniData = getNewPaniVasuliData();
    paymentData.set("newPaniVasuliData", JSON.stringify(newVasuliPaniData));

    const handlePayment = async () => {
      try {
        let url = "/payment/save-by-user-water?isPaidByUser=true";

        const res = await fetch(url, {
          method: "POST",
          body: paymentData,
        });

        let { success, message } = await res.json();

        if (!success) {
          alertjs.warning({
            t: "WARNING",
            m: message,
          });
          return;
        }

        alertjs.success({
          t: "SUCCESS",
          m: message,
        }, () => location.reload());
      } catch (err) {
        console.error("Error:", err);
      } finally {
        // ✅ Always restore button state
        $btn.prop("disabled", false).html(originalText);
      }
    };

    handlePayment();
  });

  // FUNCTION TO CHECK IF PREVIOUS SAMANYA TAX IS FILLED OR NOT
  // IF ANY OUTSTANDING AMOUNT IS PRESENT, THEN MAKE CURRENT TAX AMOUNT FIELD READONLY FOR THE USER

  const handleCheckPreviousTaxIsPaidOrNot = () => {
    let previousOutstandingAmount = 0;
    if ($("#totalPreviousSamanyaTax").length > 0)
      previousOutstandingAmount = parseFloat(
        $("#totalPreviousSamanyaTax").val(),
      );

    if ($("#totalPreviousWaterTax").length > 0)
      previousOutstandingAmount = parseFloat($("#totalPreviousWaterTax").val());

    let isPreviousAmountPending = previousOutstandingAmount > 0;
    if (isPreviousAmountPending) {
      $(".currentTaxFilling").prop("readonly", true);
    }
  };

  handleCheckPreviousTaxIsPaidOrNot();
});

function covertToWords(value, targetId = "amountInWords") {
  $.ajax({
    url: "/currency/toWords",
    type: "POST",
    data: {
      data: value,
    },
    success: (data) => {
      $(`#${targetId}`).val(data.words);
    },
    error: (err) => {
      console.log(err);
    },
  });
}

var vasuli = {
  checkValidInput: function (current_is) {
    var value = Number($("#" + current_is).val());
    var value1 = Number(details[current_is]);
    if (isNaN(value)) {
      $("#" + current_is).val(0);
      this.calcInput();
      return false;
    }
    if (isNaN(value1)) {
      $("#" + current_is).val(0);
      this.calcInput();
      return false;
    }
    if (value > value1) {
      $("#" + current_is).val(value1);
      this.calcInput();
      return false;
    }
    this.calcInput();
  },

  calcInput: function () {
    let totalSampurnaTax =
      Number($("#lastBuildingTax").val()) +
      Number($("#currentBuildingTax").val()) +
      Number($("#lastTaxFine").val()) -
      Number($("#lastTaxRelief").val()) +
      Number($("#lastDivaTax").val()) +
      Number($("#currentDivaTax").val()) +
      Number($("#lastArogyaTax").val()) +
      Number($("#currentArogyaTax").val()) +
      //   new tax adding

      Number($("#lastCleaningTax").val()) +
      Number($("#currentCleaningTax").val()) +
      Number($("#lastFireblegateTax").val()) +
      Number($("#currentFireblegateTax").val()) +
      Number($("#lastTreeTax").val()) +
      Number($("#currentTreeTax").val()) +
      Number($("#lastEducationTax").val()) +
      Number($("#currentEducationTax").val());

    //   new tax adding end

    $("#totalSampurnaTax").val(totalSampurnaTax);

    // calling function for converting the total Sampurnat tax into word

    if ($("#totalSampurnaTax").length > 0) {
      covertToWords($("#totalSampurnaTax").val());
    }

    let lastFilledWaterTax =
      Number($("#lastSpacialWaterTax").val()) +
      Number($("#lastGenealWaterTax").val());
    let currentFilledWaterTax =
      Number($("#currentSpacialWaterTax").val()) +
      Number($("#currentGenealWaterTax").val());

    if ($("#totalPreviousFilledWaterTax"))
      $("#totalPreviousFilledWaterTax").val(lastFilledWaterTax);
    if ($("#totalCurrentFilledWaterTax"))
      $("#totalCurrentFilledWaterTax").val(currentFilledWaterTax);

    let totalPaniTax = lastFilledWaterTax + currentFilledWaterTax;

    $("#totalWaterTax").val(totalPaniTax);
    if ($("#totalWaterTax").length > 0) {
      covertToWords(totalPaniTax, "amountInWordsWater");
    }
  },
};

// Mobile / general page exit warning
// window.addEventListener('beforeunload', function (e) {
//     if (typeof allowRefreshPageDuringPayment !== 'undefined' && allowRefreshPageDuringPayment === false) {
//         e.preventDefault();
//         e.returnValue = ''; // Shows generic browser confirmation
//     }
// });

// Keyboard refresh catcher (desktop only)
$(document).on("keydown", function (e) {
  const isF5 = e.which === 116;
  const isCtrlR = e.ctrlKey && e.which === 82;
  const isCmdR = e.metaKey && e.which === 82;

  if (isF5 || isCtrlR || isCmdR) {
    e.preventDefault();

    if (
      typeof allowRefreshPageDuringPayment !== "undefined" &&
      allowRefreshPageDuringPayment === false
    ) {
      if (
        confirm("पेमेंटची प्रोसेस चालू आहे, तुम्ही नक्की रिफ्रेश करू इच्छिता?")
      ) {
        location.reload();
      }
    } else {
      location.reload();
    }
  }
});

var homeManager = {
  tempUserDetails: {},
  getUserDetails(id, callback) {
    var data = {
      url: "/nal-band-notice/new-user",
      method: "post",
      data: {
        id: id,
      },
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }
      callback(data);
    });
  },
};
