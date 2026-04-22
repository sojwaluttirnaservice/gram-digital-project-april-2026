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
    yearRange: "-50:+0", //
  });

  function _dateFormatYYYYMMDD(_date) {
    _date = _date?.trim();
    return _date ? _date.split("-").reverse().join("-") : "";
  }

  $(document).on("input", ".is-number", function (e) {
    e.preventDefault();
    e.preventDefault();
    const inputValue = $(this).val();
    // Regular expression to match digits (numbers)
    const numberPattern = /^\d+$/;
    // Check if the input value contains non-numeric characters
    $(this).val(numberPattern.test(inputValue) ? inputValue : "");
  });

  $(document).on("input change", `[name='date_of_birth']`, function () {
    const dateStr = $(this).val();
    const dateWords = convertDateToWords(dateStr);
    $(`[name='date_of_birth_in_words']`).val(dateWords);
  });

  $(document).on("change", ".to-marathi", function (e) {
    e.preventDefault();
    let englishWord = $(this).val();
    const closestNextInputTagForMarathi = $(this)
      .closest(".form-group")
      .find("input")
      .eq(1);

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

  $("#birth-certificate-form").validate({
    rules: {
      name: {
        required: true,
      },
      name_m: {
        required: true,
      },
      gender: {
        required: true,
      },
      gender_m: {
        required: true,
      },
      date_of_birth: {
        required: true,
      },
      date_of_birth_m: {
        required: true,
      },
      date_of_birth_in_words: {
        required: true,
      },
      place_of_birth: {
        required: true,
      },
      place_of_birth_m: {
        required: true,
      },
      name_of_mother: {
        required: true,
      },
      name_of_mother_m: {
        required: true,
      },
      aadhar_number_of_mother: {
        required: true,
        maxlength: 12,
        minlength: 12,
      },
      aadhar_number_of_mother_m: {
        required: true,
        maxlength: 12,
        minlength: 12,
      },
      name_of_father: {
        required: true,
      },
      name_of_father_m: {
        required: true,
      },
      aadhar_number_of_father: {
        required: true,
        maxlength: 12,
        minlength: 12,
      },
      aadhar_number_of_father_m: {
        required: true,
        maxlength: 12,
        minlength: 12,
      },
      address_of_parents_at_birth_time_of_baby: {
        required: true,
      },
      address_of_parents_at_birth_time_of_baby_m: {
        required: true,
      },
      permanent_address_of_parents: {
        required: true,
      },
      permanent_address_of_parents_m: {
        required: true,
      },
      remark: {
        required: false,
      },

      date_of_registration: {
        required: true,
      },
      date_of_registration_m: {
        required: true,
      },
      gp_registration_number: {
        required: true
      }
    },
    messages: {
      name: "Please enter the name",
      name_m: "कृपया नाव प्रविष्ट करा",
      gender: "Please select the gender",
      gender_m: "कृपया लिंग निवडा",
      date_of_birth: "Please enter the date of birth",
      date_of_birth_m: "कृपया जन्म दिनांक प्रविष्ट करा",
      date_of_birth_in_words: "Please enter the date of birth in words",
      place_of_birth: "Please enter the place of birth",
      place_of_birth_m: "कृपया जन्म ठिकाण प्रविष्ट करा",
      name_of_mother: "Please enter the name of mother",
      name_of_mother_m: "कृपया आईचे नाव प्रविष्ट करा",
      aadhar_number_of_mother: "Please enter the aadhar number of mother",
      aadhar_number_of_mother_m: "कृपया आईचा आधार क्रमांक प्रविष्ट करा",
      name_of_father: "Please enter the name of father",
      name_of_father_m: "कृपया वडिलांचे नाव प्रविष्ट करा",
      aadhar_number_of_father: "Please enter the aadhar number of father",
      aadhar_number_of_father_m: "कृपया वडिलांचा आधार क्रमांक प्रविष्ट करा",
      address_of_parents_at_birth_time_of_baby:
        "Please enter the address at birth time",
      address_of_parents_at_birth_time_of_baby_m:
        "कृपया जन्माच्या वेळी पालकांचा पत्ता प्रविष्ट करा",
      permanent_address_of_parents:
        "Please enter the permanent address of parents",
      permanent_address_of_parents_m:
        "कृपया पालकांचा कायमचा पत्ता प्रविष्ट करा",
      date_of_registration: "Please enter the date of registration",
      date_of_registration_m: "कृपया नोंदणीची तारीख प्रविष्ट करा",
      gp_registration_number: "कृपया ग्रामपंचायत नोंदणी क्रमांक प्रविष्ट करा"
    },
  });

  $(document).on("click", "#save-birth-certificate-btn", function (e) {
    e.preventDefault();

    const certificateData = new FormData(
      document.getElementById("birth-certificate-form")
    );

    if (!$("#birth-certificate-form").valid()) {
      alertjs.warning({ t: "Please fill in all required fields" });
      return;
    }

    handleSaveDeathCertificate(certificateData, false);
  });

  $(document).on("click", "#update-birth-certificate-btn", function (e) {
    e.preventDefault();

    const certificateData = new FormData(
      document.getElementById("birth-certificate-form")
    );

    if (!$("#birth-certificate-form").valid()) {
      alertjs.warning({ t: "Please fill in all required fields" });
      return;
    }

    handleSaveDeathCertificate(certificateData, true);
  });


  async function handleSaveDeathCertificate(certificateData, isUpdate) {
    try {

      certificateData.set(
        "date_of_birth",
        _dateFormatYYYYMMDD(certificateData.get("date_of_birth"))
      );
      certificateData.set(
        "date_of_issue",
        _dateFormatYYYYMMDD(certificateData.get("date_of_issue"))
      );
      certificateData.set(
        "date_of_registration",
        _dateFormatYYYYMMDD(certificateData.get("date_of_registration"))
      );

      // for (const [key, val] of certificateData) {
      // 	console.log(key, '----------------', val)
      // }


      const _url = !isUpdate
        ? `/birth-certificate/save-birth-certificate`
        : `/birth-certificate/update-birth-certificate`;

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
          t: 'Success',
          m: msg
        })

        if (!isUpdate) {
          document.getElementById("birth-certificate-form").reset();
        }

        // $('#save-death-certificate-btn').css('display', 'block')
        // $('#update-death-certificate-btn').css('display', 'none')
      } else {
        alertjs.warning({ t: "Error: Unable to save the certificate" });
      }
    } catch (err) {
      console.log(`Error while saving the certificate: ${err}`);
      alertjs.warning({ t: "Error: Unable to save the certificate" });
    }
  }
});
