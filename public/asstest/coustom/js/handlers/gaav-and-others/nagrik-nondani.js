$(function () {
  let formData = new FormData();

  function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }

    return [width, height];
  }

  function compressAndDisplayImage(fileInput, previewImageId, formDataKey) {
    if (fileInput.files && fileInput.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        let img = new Image();
        img.src = e.target.result;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set the target file size range in kilobytes (e.g., between 100 KB and 300 KB)
          const targetMinSizeKB = 100;
          const targetMaxSizeKB = 200;

          // Initial dimensions
          let maxWidth = 800;
          let maxHeight = 1000;

          // Maximum number of iterations to avoid an infinite loop
          const maxIterations = 10;

          function compress(iteration) {
            // Calculate new width and height while maintaining proportions
            let [newWidth, newHeight] = calculateSize(img, maxWidth, maxHeight);

            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert the canvas content to a blob (compressed image)
            canvas.toBlob(
              function (blob) {
                const compressedSizeKB = blob.size / 1024;

                console.log(
                  `Iteration ${iteration}: Compressed ${formDataKey} Size: ${compressedSizeKB} KB`
                );

                // Display the compressed image in the preview
                $("#" + previewImageId).attr("src", URL.createObjectURL(blob));

                // If the compressed size is within the target range, stop
                if (
                  compressedSizeKB <= targetMaxSizeKB ||
                  compressedSizeKB >= targetMinSizeKB
                ) {
                  // Add the compressed image to FormData
                  formData.set(formDataKey, blob);
                  console.log(
                    `Final Compressed ${formDataKey} Size: ${compressedSizeKB} KB`
                  );
                } else if (iteration < maxIterations) {
                  // Adjust the dimensions for the next iteration
                  maxWidth *= 0.9; // Decrease by 10%
                  maxHeight *= 0.9; // Decrease by 10%

                  // Continue to the next iteration
                  compress(iteration + 1);
                } else {
                  console.log(
                    "Maximum iterations reached. Compression stopped."
                  );
                }
              },
              "image/jpeg",
              0.9
            ); // Adjust the quality as needed
          }

          // Start the iterative compression process
          compress(1);
        };
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  $("#image").on("change", function (e) {
    compressAndDisplayImage(this, "capture-image-preview", "userImage");
  });

  $(".datepicker").mask("00/00/0000")
  
  $(".datepicker").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-90:+0",
  });

  function getAge(dateString) {
    if (Number(dateString[0]) < 1900) {
      return 0;
    }
    
    if (Number(dateString[1]) > 12) {
      return 0;
    }
    if (Number(dateString[2]) > 31) {
      return 0;
    }

    let today = new Date();
    let birthDate = new Date(dateString[0], dateString[1] - 1, dateString[2]);
    console.log(birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  let formatDate = (_date) => {
    if (!_date?.trim()) return;
    return _date.split("/").reverse().join("-");
  };

  $("#signupForm").validate({
    errorPlacement: function (error, element) {
      const errorContainer = element
        .closest(".input-group")
        .find(".error-message");
      if (!errorContainer.length) {
        element
          .closest(".input-group")
          .append(
            '<div class="error-message text-red-500 text-xs mt-1"></div>'
          );
      }
      element.closest(".input-group").find(".error-message").html(error);
    },
    rules: {
      fName: "required",
      fAadhar: {
        required: true,
        minlength: 14,
        maxlength: 14,
      },
      fMobile: {
        required: true,
        minlength: 10,
        maxlength: 10,
        number: true,
      },
      fAltMobile: {
        minlength: 10,
        maxlength: 10,
        number: true,
      },
      fEmail: {
        email: true,
      },
      fVillage: "required",
      fDob: "required",
      fBloodGroup: "required",
    },
    messages: {
      fName: "संपूर्ण नाव आवशक आहे",
      fAadhar: {
        required: "आधार क्रमांक आवशक आहे",
        minlength: "योग्य आधार क्रमांक आवशक आहे",
        maxlength: "योग्य आधार क्रमांक आवशक आहे",
      },
      fMobile: {
        required: "मोबाईल क्रमांक आवशक आहे",
        minlength: "योग्य मोबाईल क्रमांक आवशक आहे",
        maxlength: "योग्य मोबाईल क्रमांक आवशक आहे",
        number: "योग्य मोबाईल क्रमांक आवशक आहे",
      },
      fAltMobile: {
        minlength: "योग्य मोबाईल क्रमांक आवशक आहे",
        maxlength: "योग्य मोबाईल क्रमांक आवशक आहे",
        number: "योग्य मोबाईल क्रमांक आवशक आहे",
      },
      fEmail: "योग्य ई-मेल आवशक आहे",
      fVillage: "Select Village",
      fDob: "Select Date Of Birth",
      fBloodGroup: "Select Blood Group",
    },
  });

  $("#fAadhar").mask("0000-0000-0000");

  $("#saveUser").click(async function (e) {
    e.preventDefault();

    if (!$("#signupForm").valid()) {
      alertjs.warning({
        t: "Warning",
        m: "कृपया सर्व आवश्यक फील्ड्स भरा.",
      });
      return;
    }

    let formData = new FormData($("#signupForm")[0]);
    let image = $("#image")[0].files[0];

    formData.set("fDob", formatDate(formData.get("fDob")));
    formData.set("createdAt", formatDate(formData.get("createdAt")))

    let selectedScheme = $("#ayushman_bharat_yojana_select").val();

    if (selectedScheme === "other") {
      let otherValue = $("#ayushman_bharat_yojana_other").val().trim();
      if (!otherValue) {
        alertjs.warning({
          t: "Warning",
          m: "कृपया योजनेचे नाव टाइप करा",
        });
        return;
      }
      formData.set("ayushman_bharat_yojana_name", otherValue);
    } else {
      formData.set("ayushman_bharat_yojana_name", selectedScheme);
    }

    if (!image) {
      alertjs.warning({
        t: "Warning",
        m: "फोटो  निवडा",
      });
      return;
    }

    let compressedPhoto =  await compressImageFile(image)
    formData.append("userImage", compressedPhoto);


    // console.log(compressedPhoto)


    try {
        const {success, message} = await fetch('/add-new-member', {
            method: "POST",
            body: formData
        }).then(r => r.json())


        if(success){
            alertjs.success({
                t: "SUCCESS",
                m: message
            }, () =>{
                $("#signupForm")[0].reset();
                $("#capture-image-preview").attr(
                    "src",
                    $("#capture-image-preview").attr("data-fallback")
                );
            })
        }else{
            alertjs.warning({
                t: "WARNING",
                m: message
            })
        }
    } catch (err) {
        console.error('Error:', err);
        alertjs.warning({
            t: "WARNING",
            m: err?.message
        })
    }finally {
        $("#saveUser").prop("disabled", false).text("नोंदणी करा");
    }
  });

  // for dropdwon
  const select = document.getElementById("ayushman_bharat_yojana_select");
  const otherInput = document.getElementById("ayushman_bharat_yojana_other");

  select.addEventListener("change", function () {
    if (this.value === "other") {
      otherInput.classList.remove("hidden");
      otherInput.focus();
    } else {
      otherInput.classList.add("hidden");
      otherInput.value = "";
    }
  });
});
