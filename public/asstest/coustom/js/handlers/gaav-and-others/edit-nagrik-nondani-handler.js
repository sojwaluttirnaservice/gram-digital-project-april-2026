$(function () {
  let formDataObj = new FormData();

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

  function compressAndDisplayImage(fileInput, formDataKey) {
    if (fileInput.files && fileInput.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        let img = new Image();
        img.src = e.target.result;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let maxWidth = 800;
          let maxHeight = 1000;
          const maxIterations = 10;

          function compress(iteration) {
            let [newWidth, newHeight] = calculateSize(img, maxWidth, maxHeight);

            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            canvas.toBlob(
              function (blob) {
                if (!blob) return;

                formDataObj.set(formDataKey, blob);

                if (iteration < maxIterations) {
                  maxWidth *= 0.9;
                  maxHeight *= 0.9;
                  compress(iteration + 1);
                }
              },
              "image/jpeg",
              0.9,
            );
          }

          compress(1);
        };
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  $("#image").on("change", function () {
    compressAndDisplayImage(this, "userImage");
  });

  // Datepicker
  $(".datepicker").mask("00/00/0000");

  $(".datepicker").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-90:+0",
  });

  // Format date
  let formatDate = (_date) => {
    if (!_date?.trim()) return "";
    return _date.split("/").reverse().join("-");
  };

  // Validation (Bootstrap form)
  $("#editNagrikForm").validate({
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
  });

  $("#fAadhar").mask("0000-0000-0000");

  // UPDATE BUTTON
  $("#update-nagrik-nondani-btn").click(async function (e) {
    e.preventDefault();

    if (!$("#editNagrikForm").valid()) {
      alertjs.warning({
        t: "Warning",
        m: "कृपया सर्व आवश्यक फील्ड्स भरा.",
      });
      return;
    }

    let formData = new FormData($("#editNagrikForm")[0]);

    // Format dates
    formData.set("fDob", formatDate(formData.get("fDob")));
    formData.set("createdAt", formatDate(formData.get("createdAt")));

    // If new image selected, use compressed
    if (formDataObj.get("userImage")) {
      formData.set("userImage", formDataObj.get("userImage"));
    }

    try {
      // 👉 YOU WILL SET ENDPOINT HERE
      const response = await fetch("/nagrik", {
        method: "PUT", // or PATCH
        body: formData,
      });

      const { success, message } = await response.json();

      if (success) {
        alertjs.success({
          t: "SUCCESS",
          m: message,
        }, () => window.open('/nagrik/report'));
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error(err);
      alertjs.warning({
        t: "ERROR",
        m: err?.message,
      });
    }
  });
});
