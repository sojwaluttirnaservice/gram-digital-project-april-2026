$(function () {
  function convertDateToWords(dateStr) {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return "";

    const [day, month, year] = dateStr.split("-").map(Number);

    const days = [
      "",
      "FIRST",
      "SECOND",
      "THIRD",
      "FOURTH",
      "FIFTH",
      "SIXTH",
      "SEVENTH",
      "EIGHTH",
      "NINTH",
      "TENTH",
      "ELEVENTH",
      "TWELFTH",
      "THIRTEENTH",
      "FOURTEENTH",
      "FIFTEENTH",
      "SIXTEENTH",
      "SEVENTEENTH",
      "EIGHTEENTH",
      "NINETEENTH",
      "TWENTIETH",
      "TWENTY-FIRST",
      "TWENTY-SECOND",
      "TWENTY-THIRD",
      "TWENTY-FOURTH",
      "TWENTY-FIFTH",
      "TWENTY-SIXTH",
      "TWENTY-SEVENTH",
      "TWENTY-EIGHTH",
      "TWENTY-NINTH",
      "THIRTIETH",
      "THIRTY-FIRST",
    ];

    const months = [
      "",
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];

    const yearWords = convertNumberToWords(year);

    return `${days[day]}-${months[month]}-${yearWords}`;
  }

  function convertNumberToWords(num) {
    const singleDigits = [
      "",
      "ONE",
      "TWO",
      "THREE",
      "FOUR",
      "FIVE",
      "SIX",
      "SEVEN",
      "EIGHT",
      "NINE",
    ];
    const teens = [
      "TEN",
      "ELEVEN",
      "TWELVE",
      "THIRTEEN",
      "FOURTEEN",
      "FIFTEEN",
      "SIXTEEN",
      "SEVENTEEN",
      "EIGHTEEN",
      "NINETEEN",
    ];
    const tens = [
      "",
      "",
      "TWENTY",
      "THIRTY",
      "FORTY",
      "FIFTY",
      "SIXTY",
      "SEVENTY",
      "EIGHTY",
      "NINETY",
    ];
    const thousands = ["", "THOUSAND"];

    if (num < 10) return singleDigits[num];
    if (num < 20) return teens[num - 10];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 ? `-${singleDigits[num % 10]}` : "")
      );

    if (num < 1000) {
      const hundredPart = Math.floor(num / 100);
      const remainder = num % 100;
      return `${singleDigits[hundredPart]} HUNDRED${remainder ? ` AND ${convertNumberToWords(remainder)}` : ""}`;
    }

    const thousandPart = Math.floor(num / 1000);
    const remainder = num % 1000;
    return `${convertNumberToWords(thousandPart)} ${thousands[1]}${remainder ? ` ${convertNumberToWords(remainder)}` : ""}`;
  }

  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    defaultDate: new Date(), // Set default date to current date
  });

  function _dateFormatYYYYMMDD(_date) {
    _date = _date?.trim();
    return _date ? _date.split("-").reverse().join("-") : "";
  }

  $("#death-certificate-form").validate({
    rules: {
      name_of_deceased: {
        required: true,
      },
      name_of_deceased_m: {
        required: true,
      },
      aadhar_of_deceased: {
        required: true,
      },

      aadhar_of_deceased_m: {
        required: true,
      },
      gender: {
        required: true,
      },
      gender_m: {
        required: true,
      },
      date_of_death: {
        required: true,
      },
      date_of_death_m: {
        required: true,
      },
      date_of_death_in_words: {
        required: true,
      },
      reason_of_death: {
        required: true,
      },
      reason_of_death_m: {
        required: true,
      },
      place_of_death: {
        required: true,
      },
      place_of_death_m: {
        required: true,
      },
      age_of_deceased: {
        required: true,
      },
      age_of_deceased_m: {
        required: true,
      },
      name_of_husband_or_wife: {
        required: false,
      },
      name_of_husband_or_wife_m: {
        required: false,
      },
      name_of_mother: {
        required: false,
      },
      name_of_mother_m: {
        required: false,
      },

      aadhar_number_of_mother: {
        required: false,
        maxlength: 12,
        minlength: 12,
      },
      aadhar_number_of_mother_m: {
        required: false,
        maxlength: 12,
        minlength: 12,
      },

      name_of_father: {
        required: false,
      },
      name_of_father_m: {
        required: false,
      },

      aadhar_number_of_father: {
        required: false,
        maxlength: 12,
        minlength: 12,
      },
      aadhar_number_of_father_m: {
        required: false,
        maxlength: 12,
        minlength: 12,
      },
      aadhar_number_of_husband_or_wife: {
        required: false,
      },
      aadhar_number_of_husband_or_wife_m: {
        required: false,
      },
      address_of_deceased_at_death_time: {
        required: true,
      },
      address_of_deceased_at_death_time_m: {
        required: true,
      },
      permanent_address_of_deceased: {
        required: true,
      },
      permanent_address_of_deceased_m: {
        required: true,
      },
      remarks: {
        required: false,
      },
      date_of_registration: {
        required: true,
      },
      date_of_registration_m: {
        required: true,
      },
      date_of_issue: {
        required: false,
      },

      informer_name: {
        required: false,
      },

      informer_name_m: {
        required: false,
      },

      informer_address: {
        required: false,
      },

      informer_address_m: {
        required: false,
      },
      gp_registration_number: {
        required: true,
      },
    },
    messages: {
      name_of_deceased: "Please enter the name of the deceased",
      name_of_deceased_m: "कृपया मृत व्यक्तीचे नाव प्रविष्ट करा",
      aadhar_of_deceased: "Please enter the Aadhar number of the deceased",
      aadhar_of_deceased_m: "कृपया मृत व्यक्तीचा आधार क्रमांक प्रविष्ट करा",
      gender: "Please select the gender",
      gender_m: "कृपया लिंग निवडा",
      date_of_death: "Please enter the date of death",
      date_of_death_m: "कृपया मृत्यूची तारीख प्रविष्ट करा",
      date_of_death_in_words: "Please enter the date of death in words",
      place_of_death: "Please enter the place of death",
      place_of_death_m: "कृपया मृत्यूचे ठिकाण प्रविष्ट करा",
      age_of_deceased: "Please enter the age of the deceased",
      age_of_deceased_m: "कृपया मृत व्यक्तीचे वय प्रविष्ट करा",
      reason_of_death: "Enter the reason of death",
      reason_of_death_m: "मृत्यूचे कारण टाका ",
      name_of_husband_or_wife: "Please enter the name of husband or wife",
      name_of_husband_or_wife_m: "कृपया पती किंवा पत्न्याचे नाव प्रविष्ट करा",
      name_of_mother: "Please enter the name of mother",
      name_of_mother_m: "कृपया आईचे नाव प्रविष्ट करा",
      aadhar_number_of_mother: "Please enter the aadhar number of mother",
      aadhar_number_of_mother_m: "कृपया आईचा आधार क्रमांक प्रविष्ट करा",
      aadhar_number_of_husband_or_wife:
        "Please enter the aadhar number of husband or wife",
      aadhar_number_of_husband_or_wife_m:
        "कृपया पती किंवा पत्नीचा आधार क्रमांक प्रविष्ट करा",
      address_of_deceased_at_death_time:
        "Please enter the address at death time",
      address_of_deceased_at_death_time_m:
        "कृपया मृत्यूच्या वेळीचा पत्ता प्रविष्ट करा",
      permanent_address_of_deceased:
        "Please enter the permanent address of deceased",
      permanent_address_of_deceased_m:
        "कृपया मृत व्यक्तीचा कायमचा पत्ता प्रविष्ट करा",
      date_of_registration: "Please enter the date of registration",
      date_of_registration_m: "कृपया नोंदणीची तारीख प्रविष्ट करा",
      gp_registration_number: "कृपया ग्रामपंचायत नोंदणी क्रमांक प्रविष्ट करा",
    },
  });

  $(document).on("input", ".is-number", function (e) {
    e.preventDefault();
    e.preventDefault();
    const inputValue = $(this).val();
    // Regular expression to match digits (numbers)
    const numberPattern = /^\d+$/;
    // Check if the input value contains non-numeric characters
    $(this).val(numberPattern.test(inputValue) ? inputValue : "");
  });

  $(document).on("input change", `[name='date_of_death']`, function () {
    const dateStr = $(this).val();
    const dateWords = convertDateToWords(dateStr);
    $(`[name='date_of_death_in_words']`).val(dateWords);
  });

  $(document).on("change", ".to-marathi", function (e) {
    e.preventDefault();
    let englishWord = $(this).val();
    const closestNextInputTagForMarathi = $(this)
      .closest(".form-group")
      .find("input")
      .eq(1);

    // alert(34)

    commonHandler.translateWord(englishWord, function (data) {
      // console.log(data)
      closestNextInputTagForMarathi.val(data);
    });
  });

  $(document).on("input change", '[name="gender"]', function (e) {
    e.preventDefault();
    let _gender = $(this).val()?.trim().toLowerCase();
    let _marathiGender = "";

    switch (_gender) {
      case "male":
        _marathiGender = "पुरुष";
        break;

      case "female":
        _marathiGender = "स्त्री";
        break;

      case "others":
        _marathiGender = "इतर";
        break;
    }

    $(`[name='gender_m']`).val(_marathiGender);
  });

  $(document).on("click", "#save-death-certificate-btn", function (e) {
    e.preventDefault();

    const certificateData = new FormData(
      document.getElementById("death-certificate-form"),
    );

    if (!$("#death-certificate-form").valid()) {
      alertjs.warning({ t: "Please fill in all required fields" });
      return;
    }

    handleSaveDeathCertificate(certificateData, false);
  });

  $(document).on("click", "#update-death-certificate-btn", function (e) {
    e.preventDefault();

    const certificateData = new FormData(
      document.getElementById("death-certificate-form"),
    );

    if (!$("#death-certificate-form").valid()) {
      alertjs.warning({ t: "Please fill in all required fields" });
      return;
    }

    handleSaveDeathCertificate(certificateData, true);
  });

  async function handleSaveDeathCertificate(certificateData, isUpdate) {
    try {
      // for (const [key, val] of certificateData) {
      // 	console.log(key, '----------------', val)
      // }

      certificateData.set(
        "date_of_death",
        _dateFormatYYYYMMDD(certificateData.get("date_of_death")),
      );
      certificateData.set(
        "date_of_issue",
        _dateFormatYYYYMMDD(certificateData.get("date_of_issue")),
      );
      certificateData.set(
        "date_of_registration",
        _dateFormatYYYYMMDD(certificateData.get("date_of_registration")),
      );
    //   certificateData.set(
    //     "created_on",
    //     _dateFormatYYYYMMDD(certificateData.get("created_on")),
    //   );

      const _url = !isUpdate
        ? `/death-certificate/save-death-certificate`
        : `/death-certificate/update-death-certificate`;

      const _response = await fetch(_url, {
        method: !isUpdate ? "POST" : "PUT",
        body: certificateData,
      });

      const { success, data } = await _response.json();

      if (success) {
        const msg = !isUpdate
          ? "Certificate saved successfully"
          : "Certificate updated successfully";
        // $.notify(msg, {
        //   className: "success",
        //   globalPosition: "top center",
        // });

        alertjs.success({
          t: "Death Certificate",
          m: msg,
        });

        if (!isUpdate) {
          document.getElementById("death-certificate-form").reset();
        }

        // $('#save-death-certificate-btn').css('display', 'block')
        // $('#update-death-certificate-btn').css('display', 'none')
      } else {
        alertjs.warning({
          t: "Error: Unable to save the certificate",
          m: data?.message,
        });
      }
    } catch (err) {
      console.log(`Error while saving the certificate: ${err}`);
      alertjs.warning({ t: "Error: Unable to save the certificate" });
    }
  }
});
