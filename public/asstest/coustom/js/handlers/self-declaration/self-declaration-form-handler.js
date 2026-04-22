let imageData = "";
// temp purpose only,
// when we are capturing the applicant photo, we will store the file in this temporarily.
// in final submit event, get this data later in the main sending form data if present
let applicantPhotoFormData = new FormData();

$(() => {
  // Initialize datepicker for any date fields
  $(".datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
  });

  // Borrowed from the file self-declaration-manager.js
  $(document).on("blur", ".mainText", function (e) {
    e.preventDefault();
    let value = $(this).val();
    var input = $(this).siblings(".secText");
    commonHandler.translateWord(value, function (data) {
      console.log(data);
      $(input).val(data).trigger("input");
    });
  });

  $(document).on("click", "#saveDeclarationFormBtn", async function (e) {
    e.preventDefault();

    const $btn = $(this);
    const originalText = $btn.text();
    const form = $("#self-declaration-form");

    // -------------------------
    // BASIC VALIDATION
    // -------------------------
    if (!form.length) {
      alert("Form not found");
      return;
    }

    // -------------------------
    // DISABLE BUTTON
    // -------------------------
    $btn
      .prop("disabled", true)
      .addClass("disabled")
      .css({
        cursor: "not-allowed",
        backgroundColor: "#ccc",
        color: "#666",
      })
      .text("Saving...");

    try {
      const formData = new FormData(form[0]);
      const documents = [];
      const imagePromises = [];

      // -------------------------
      // DOCUMENTS LOOP
      // -------------------------

      $(".required-document-row").each(function (i) {
        const $row = $(this);

        // 🔹 Pick label text shown to user
        const labelText = $row.find("label:first").text().trim();

        const doc = {
          id:
            $row.data("doc-id") ||
            `d-${Date.now()}-${Math.floor(Math.random() * 10000)}`,

          document_name: $row.data("doc-name") || labelText, // fallback safe
          document_label: labelText, // ✅ NEW
          was_required: $row.attr("data-required") == "1",
        };

        documents.push(doc);

        const fileInput = $row.find("input[type='file']")[0];

        if (fileInput && fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];

          if (file.type && file.type.startsWith("image/")) {
            imagePromises.push(
              compressImageFile(file).then((compressedFile) => {
                formData.append(`document_file_${i}`, compressedFile);
              }),
            );
          } else {
            formData.append(`document_file_${i}`, file);
          }
        }
      });

      // -------------------------
      // SIGNATURE (IMAGE)
      // -------------------------
      const signInput = form.find("[name='applicantSign']")[0];

      // file exists
      if (signInput && signInput.files && signInput.files[0]) {
        const signFile = signInput.files[0];

        // compress ONLY if image
        if (signFile.type && signFile.type.startsWith("image/")) {
          imagePromises.push(
            compressImageFile(signFile).then((compressedFile) => {
              formData.set("applicantSign", compressedFile);
            }),
          );
        } else {
          formData.set("applicantSign", signFile);
        }
      }

      if (applicantPhotoFormData.get("file1")) {
        formData.set("applicantPhoto", applicantPhotoFormData.get("file1"));
      }

      // wait for all image compressions
      await Promise.all(imagePromises);

      // -------------------------
      // ATTACH DOCUMENT METADATA
      // -------------------------
      formData.set("documents", JSON.stringify(documents));

      //   Dates
      formData.set(
        "familySeparationDate",
        _commonjsDateFormat(formData.get("familySeparationDate")),
      );
      formData.set(
        "husbandDeathDate",
        _commonjsDateFormat(formData.get("husbandDeathDate")),
      );
      formData.set(
        "desertedSinceDate",
        _commonjsDateFormat(formData.get("desertedSinceDate")),
      );

      // -------------------------
      // SEND TO BACKEND
      // -------------------------
      const response = await fetch("/self-declaration", {
        method: "POST",
        body: formData,
      });

      const { success, message } = await response.json();

      if (success) {
        alertjs.success({
          t: "SUCCESS",
          m: message,
        }, () => `/self-declaration?cert=${formData.get('certificateType')}`);
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error(err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "Something went wrong",
      });
    } finally {
      // -------------------------
      // RESTORE BUTTON
      // -------------------------
      $btn
        .prop("disabled", false)
        .removeClass("disabled")
        .css({
          cursor: "",
          backgroundColor: "",
          color: "",
        })
        .text(originalText);
    }
  });

  //   intialize the applicant photo feature, wrapping it inside this and iniitalizing once,
  // not chaning any previous input file names
  (function () {
    const isMobileDevice = hasTouchSupport();

    let takeSnapShot = function () {
      Webcam.snap(function (data_uri) {
        imageData = data_uri;
        let ImageURL = imageData; // 'photo' is your base64 image
        let block = ImageURL.split(";");
        let contentType = block[0].split(":")[1]; // In this case "image/gif"
        let realData = block[1].split(",")[1];
        let blob = b64toBlob(realData, contentType);
        applicantPhotoFormData.set("file1", blob);
        $("#image-1-preview").prop("src", data_uri);
      });
    };

    $(document).on(
      "click",
      "#capture-applicant-photo",
      !isMobileDevice ? takeSnapShot : () => {},
    );

    $("#image_1").change(function () {
      compressAndDisplayImage(this, "image-1-preview", "file1");
    });

    if (!isMobileDevice) {
      Webcam.set({
        width: 220,
        height: 190,
        image_format: "jpeg",
        jpeg_quality: 100,
      });
      Webcam.attach("#camera");

      // SHOW THE SNAPSHOT.
    }

    if (isMobileDevice) {
      $("#webcam-preview-btn").addClass("d-none");
      $("#webcam-preview-div").addClass("d-none");
    }
  })();
});

function hasTouchSupport() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function compressAndDisplayImage(fileInput, previewImageId, formDataKey) {
  if (fileInput.files && fileInput.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
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
                `Iteration ${iteration}: Compressed ${formDataKey} Size: ${compressedSizeKB} KB`,
              );

              // Display the compressed image in the preview
              $("#" + previewImageId).attr("src", URL.createObjectURL(blob));

              // If the compressed size is within the target range, stop
              if (
                compressedSizeKB <= targetMaxSizeKB ||
                compressedSizeKB >= targetMinSizeKB
              ) {
                // Add the compressed image to FormData
                applicantPhotoFormData.set(formDataKey, blob);
                console.log(
                  `Final Compressed ${formDataKey} Size: ${compressedSizeKB} KB`,
                );
              } else if (iteration < maxIterations) {
                // Adjust the dimensions for the next iteration
                maxWidth *= 0.9; // Decrease by 10%
                maxHeight *= 0.9; // Decrease by 10%

                // Continue to the next iteration
                compress(iteration + 1);
              } else {
                console.log("Maximum iterations reached. Compression stopped.");
              }
            },
            "image/jpeg",
            0.9,
          ); // Adjust the quality as needed
        }

        // Start the iterative compression process
        compress(1);
      };
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;
  var byteCharacters = atob(b64Data); // window.atob(b64Data)
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

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
