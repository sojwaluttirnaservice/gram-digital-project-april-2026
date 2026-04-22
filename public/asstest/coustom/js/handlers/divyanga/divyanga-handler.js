$(function () {
  // console.log('Divyanga handler')

  function hasTouchSupport() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  const isMobileDevice = hasTouchSupport();

  $("#aadhar-number").mask("0000-0000-0000");
  let divyangaUserFormData = new FormData();

  $("#divyangaRegistrationForm").validate({
    rules: {
      full_name: { required: true },
      address: { required: true },
      education: { required: true },
      demand: { required: true },
      mobile: { required: true },
      type_of_disability: { required: true },
      percentage_of_disability: { required: true },
      age: { required: true },
      application_number: { required: true },
      shera: { required: true },
      aadhar_number: { required: true },
      bank_name: { required: true },
      bank_ifsc_code: { required: true },
      bank_account_number: { required: true },
      // certificate_file_name: { required: true },
    },

    errorPlacement: function (error, element) {
      // Custom position: Full Name
      if (element.attr("name") === "full_name") {
        $("#full-name")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Address
      if (element.attr("name") === "address") {
        $("#address")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Education
      if (element.attr("name") === "education") {
        $("#education")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Demand
      if (element.attr("name") === "demand") {
        $("#demand")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Mobile
      if (element.attr("name") === "mobile") {
        $("#mobile")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Type of Disability
      if (element.attr("name") === "type_of_disability") {
        $("#type-of-disability")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Percentage of Disability
      if (element.attr("name") === "percentage_of_disability") {
        $("#percentage-of-disability")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Age
      if (element.attr("name") === "age") {
        $("#age")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Application Number
      if (element.attr("name") === "application_number") {
        $("#application-number")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Shera
      if (element.attr("name") === "shera") {
        $("#shera")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Aadhar Number
      if (element.attr("name") === "aadhar_number") {
        $("#aadhar-number")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Bank Name
      if (element.attr("name") === "bank_name") {
        $("#bank-name")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Bank IFSC Code
      if (element.attr("name") === "bank_ifsc_code") {
        $("#bank-ifsc-code")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Bank Account Number
      if (element.attr("name") === "bank_account_number") {
        $("#bank-account-number")
          .closest(".input-group")
          .append('<div class="text-red-500 text-xs mt-1"></div>')
          .find("div.text-red-500")
          .append(error);
      }

      // Custom position: Certificate File (if used)
      // if (element.attr("name") === "certificate_file_name") {
      //   $("#certificate-file-name")
      //     .closest(".input-group")
      //     .append('<div class="text-red-500 text-xs mt-1"></div>')
      //     .find("div.text-red-500")
      //     .append(error);
      // }
    },
    messages: {
      full_name: "संपूर्ण नाव भरले नाही.",
      address: "संपूर्ण पत्ता भरले नाही.",
      education: "शिक्षण भरले नाही.",
      demand: "मागणी भरले नाही.",
      mobile: "मोबाइल नंबर भरले नाही.",
      type_of_disability: "अपंगत्वाचा प्रकार भरले नाही.",
      percentage_of_disability: "अपंगत्वाची टक्केवारी भरले नाही.",
      age: "वय भरले नाही.",
      shera: "शेरा भरले नाही.",
      application_number: "Application Number भरले नाही.",
      aadhar_number: "आधार क्र. भरले नाही.",
      bank_name: "बँकेचे नाव भरले नाही.",
      bank_ifsc_code: "IFSC कोड भरले नाही.",
      bank_account_number: "खाते क्र. भरले नाही.",
      // certificate_file_name: 'प्रमाणपत्र अपलोड नाही.',
    },
  });

  const messages = {
    full_name: "संपूर्ण नाव भरले नाही.",
    address: "संपूर्ण पत्ता भरले नाही.",
    education: "शिक्षण भरले नाही.",
    demand: "मागणी भरले नाही.",
    mobile: "मोबाइल नंबर भरले नाही.",
    type_of_disability: "अपंगत्वाचा प्रकार भरले नाही.",
    percentage_of_disability: "अपंगत्वाची टक्केवारी भरले नाही.",
    age: "वय भरले नाही.",
    shera: "शेरा भरले नाही.",
    application_number: "Application Number भरले नाही.",
    aadhar_number: "आधार क्र. भरले नाही.",
    bank_name: "बँकेचे नाव भरले नाही.",
    bank_ifsc_code: "IFSC कोड भरले नाही.",
    bank_account_number: "खाते क्र. भरले नाही.",
    // certificate_file_name: 'प्रमाणपत्र अपलोड नाही.',
  };

  let currentUrl = window.location.href;

  let divyangaUserPic = "";
  let image = undefined;
  // Check if the substring is present in the URL
  if (!currentUrl.includes("/divyanga/applications")) {
    // Camera image saving

    // const cameraContainer = document.getElementById('#camera-capture-image')

    if (!isMobileDevice) {
      Webcam.set({
        width: 175,
        height: 210,
        image_format: "jpeg",
        jpeg_quality: 100,
      });

      Webcam.attach("#camera-capture-image");
      $(document).on("click", "#capture-image", function (e) {
        Webcam.snap(function (data_uri) {
          divyangaUserPic = data_uri;
          $("#capture-image-preview").prop("src", data_uri);
        });
        image = undefined;
      });
    } else {
      document
        .querySelectorAll(".webcam-js-related")
        ?.forEach((element) => (element.style.display = "none"));
    }
  }

  $(".isNumber").on("input", function () {
    if (isNaN($(this).val())) {
      $(this).val("");
    }
  });

  // showing uploaded image file preview

  $("#image").change(function () {
    // Get the selected file
    let file = this.files[0];

    // Checking  if a file is selected
    if (file) {
      // Creating a FileReader to read the file
      let reader = new FileReader();
      // Setting the callback function when the file is loaded
      reader.onload = function (e) {
        // Updating the src attribute of the preview img element
        $("#capture-image-preview").attr("src", e.target.result);
      };
      // Reading the file as a data URL
      reader.readAsDataURL(file);
      divyangaUserPic = "";
    }
  });

  async function handleRegisterNewDivyangaUser(formData) {
    try {
      const response = await fetch("/divyanga/register-new-divyanga-user", {
        method: "POST",

        body: formData,
      });

      const result = await response.json();
      console.log("result = ", result);

      if (result.call === 1) {
        const dateTime = getDateTime(); //refer common js
        handleSendGpSMS({
          sms: `${formData.full_name} कडून ${dateTime.date} रोजी ${dateTime.time} वाजता दिव्यांग नोंदणीचा अर्ज प्राप्त झाला.`,
          mobile: `${formData.mobile}`,
        });

        alertjs.success({
          t: "यशवीरित्या नोंदणी झाली ",
        });
        window.location.reload();
      } else if (result.call === 2 || result.call === 0) {
        alertjs.warning({
          t: "नोंदणी झाली नाही.",
          m: "पुन्हा प्रयत्न  करा ",
        });
      }
    } catch (error) {
      console.error("Error registering new divyanga user:", error.message);
    }
  }

  async function handleCheckIfDivyangaUserAlreadyExists(formData) {
    try {
      const route = `/divyanga/check-divyanga-user-exists`;
      const options = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(route, options);

      const result = await response.json();

      if (result.call === 1) {
        if (result.existingUserCount > 0) {
          alertjs.warning({
            t: "सदर आधार क्रमांक व अँप्लिकेशन नंबर आधीच भरला गेला आहे. ",
          });
        } else {
          handleRegisterNewDivyangaUser(formData);
        }
      }
    } catch (err) {
      console.log("Error while checking preexisting user");
    }
  }

  function saveForm() {
    let isValid = $("#divyangaRegistrationForm").valid();
    if (!isValid) {
      let formFields = $("#divyangaRegistrationForm").find(
        ":input, select, textarea"
      );

      for (let i = 0; i < formFields.length; i++) {
        let fieldName = $(formFields[i]).attr("name");
        let isValidField = $(formFields[i]).valid();

        if (!isValidField) {
          let errorMessage = messages[fieldName];

          console.log(errorMessage);
          alertjs.warning({
            t: errorMessage,
          });
          return false;
        }
      }
    }

    if (+$("#percentage-of-disability").val() < 18) {
      alertjs.warning({
        t: "अपंगत्वाची टक्केवारी १८% किंवा १८% पेक्षा जास्त पाहिजे",
      });
      return false;
    }

    image = $("#image")[0].files[0];

    if (image == undefined && divyangaUserPic === "") {
      alertjs.warning({
        t: "कृपया फोटो निवडा ",
      });
      return false;
    }

    let certificate_file = $("#certificate-file")[0].files[0];

    if (!certificate_file) {
      alertjs.warning({
        t: "प्रमाणपत्र अपलोड नाही",
      });
      return false;
    }
    // // Clear the previous FormData
    // divyangaUserFormData = new FormData();

    // Convert the serialized array to an object
    $.each(
      $("#divyangaRegistrationForm").serializeArray(),
      function (i, field) {
        divyangaUserFormData.set(field.name, field.value);
      }
    );

    if (divyangaUserPic !== "") {
      let ImageURL = divyangaUserPic;
      let block = ImageURL.split(";");
      let contentType = block[0].split(":")[1];
      let realData = block[1].split(",")[1];
      let blob = b64toBlob(realData, contentType);
      divyangaUserFormData.set("user_profile_photo", blob);
    } else {
      let size = image.size / 1024 ** 2;
      if (size > 1) {
        alertjs.warning({
          t: "Size of image must be less than 1 MB",
        });
        return false;
      }
      divyangaUserFormData.set("user_profile_photo", image);
    }
    divyangaUserFormData.set("certificate_file", certificate_file);
    return true;
  }

  $("button#divyangaRegisrtationBtn").on("click", async function (e) {
    e.preventDefault();
    if (saveForm()) {
      handleCheckIfDivyangaUserAlreadyExists(divyangaUserFormData);
    }
  });

  $(document).on("click", ".showDivyangaUserDetailsBtn", function (e) {
    e.preventDefault();
    // alert( )

    let id = $(this).attr("data-id");

    $(`#divyangaApplicantModal-${id}`).modal("show");
  });

  async function handleApproveDivyangaUserApplication(id) {
    let route = "/divyanga/approve-divyanga-user-application-form";
    try {
      let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      };
      let response = await fetch(route, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      console.log(data);

      if (data.call === 1) {
        alertjs.success(
          {
            t: "Aprroved Successfully",
          },
          () => {
            $(`#divyangaApplicantModal-${id}`).modal("hide");
            window.location.reload();
          }
        );
      } else {
        alertjs.warning({
          t: "Error. Could not approve ",
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
      alertjs.warning({
        t: "Error. Could not approve ",
      });
    }
  }

  $(document).on("click", ".approveDivyangaApplicationBtn", function (e) {
    e.preventDefault();
    // alert( )

    let id = $(this).attr("data-id");

    alertjs.deleteSpl("Confirm Approval", (status) => {
      if (status) {
        handleApproveDivyangaUserApplication(id);
      }
    });
  });

  async function handleRejectDivyangaUserApplication(id, full_name, mobile) {
    let route = "/divyanga/reject-divyanga-user-application-form";

    try {
      let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      };
      let response = await fetch(route, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      console.log(data);

      if (data.call === 1) {
        //refer common js
        handleSendGpSMS({
          sms: `${full_name}चा दिव्यांग नोंदणीचा अर्ज नाकारण्यात आला आहे.`,
          mobile: `${mobile}`,
        });
        alertjs.success(
          {
            t: "Rejected Successfully",
          },
          () => {
            $(`#divyangaApplicantModal-${id}`).modal("hide");
            window.location.reload();
          }
        );
      } else {
        alertjs.warning({
          t: "Error. Could not reject ",
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
      alertjs.warning({
        t: "Error. Could not reject ",
      });
    }
  }

  $(document).on("click", ".rejectDivyangaApplicationBtn", function (e) {
    e.preventDefault();
    // alert( )

    let id = $(this).attr("data-id");
    let mobile = $(this).attr("data-mobile");
    let full_name = $(this).attr("data-fullName");
    alertjs.deleteSpl("Confirm Rejection", (status) => {
      // alert('hih')
      if (status) {
        handleRejectDivyangaUserApplication(id, full_name, mobile);
      }
    });
  });

  $("#pendingApplicationsList").show();

  // Handle button clicks
  $("#pendingApplicationsBtn").click(function () {
    // Show the pending applications div and hide others
    $("#pendingApplicationsList").show();
    $("#approvedApplicationsList").hide();
    $("#rejectedApplicationsList").hide();
  });

  $("#approvedApplicationsBtn").click(function () {
    // Show the approved applications div and hide others
    $("#pendingApplicationsList").hide();
    $("#approvedApplicationsList").show();
    $("#rejectedApplicationsList").hide();
  });

  $("#rejectedApplicationsBtn").click(function () {
    // Show the rejected applications div and hide others
    $("#pendingApplicationsList").hide();
    $("#approvedApplicationsList").hide();
    $("#rejectedApplicationsList").show();
  });
});
