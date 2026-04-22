function commonjsPrintFormData(_formData) {
  if (!_formData) {
    console.error("❌ FormData is null or undefined");
    return;
  }

  if (typeof _formData.entries !== "function") {
    console.error("❌ Provided object is not a valid FormData instance");
    return;
  }

  console.log("========= FormData Debug Start =========");

  let totalEntries = 0;
  const keyCount = {};

  for (const [key, value] of _formData.entries()) {
    totalEntries++;

    // Count duplicate keys
    keyCount[key] = (keyCount[key] || 0) + 1;

    console.log(`\n🔹 Field #${totalEntries}`);
    console.log(`   Key   : ${key}`);

    // Detect File
    if (typeof File !== "undefined" && value instanceof File) {
      console.log("   Type  : File");
      console.log(`   Name  : ${value.name}`);
      console.log(`   Size  : ${value.size} bytes`);
      console.log(`   MIME  : ${value.type}`);
      console.log(
        `   Last Modified : ${new Date(value.lastModified).toISOString()}`,
      );
    }
    // Detect Blob (but not File)
    else if (typeof Blob !== "undefined" && value instanceof Blob) {
      console.log("   Type  : Blob");
      console.log(`   Size  : ${value.size} bytes`);
      console.log(`   MIME  : ${value.type}`);
    }
    // Regular value
    else {
      console.log("   Type  : String");
      console.log(`   Value : ${value === "" ? "(empty string)" : value}`);
    }
  }

  console.log("\n--------- Summary ---------");
  console.log(`Total fields: ${totalEntries}`);

  const duplicateKeys = Object.entries(keyCount)
    .filter(([_, count]) => count > 1)
    .map(([key, count]) => `${key} (${count} times)`);

  if (duplicateKeys.length > 0) {
    console.log("Duplicate keys detected:");
    duplicateKeys.forEach((k) => console.log("  - " + k));
  } else {
    console.log("No duplicate keys.");
  }

  console.log("========= FormData Debug End =========");
}

function commonjsDebounce(fn, delay) {
  let timer;

  return function (...args) {
    const context = this;

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

/**
 * Compress an image given as a data URL (base64) while preserving its original type.
 *
 * This function resizes the image and compresses it iteratively until it is
 * within the target size range or the maximum iterations are reached.
 * If the image is already smaller than the target max size, it will resolve immediately.
 *
 * @param {string} imageData - The image as a data URL (e.g., "data:image/png;base64,...").
 * @param {Object} [options] - Optional compression settings.
 * @param {number} [options.minSizeKB=100] - Minimum target size in kilobytes.
 * @param {number} [options.maxSizeKB=200] - Maximum target size in kilobytes.
 * @param {number} [options.maxWidth=800] - Maximum width of the compressed image.
 * @param {number} [options.maxHeight=1000] - Maximum height of the compressed image.
 * @param {number} [options.maxIterations=10] - Maximum number of iterations for compression.
 *
 * @returns {Promise<string>} - Resolves with an ObjectURL of the compressed image.
 *
 * @example
 * const compressedUrl = await commonCompressImage(base64Data);
 * const imgElement = document.createElement('img');
 * imgElement.src = compressedUrl;
 */
async function commonCompressImage(imageData, options = {}) {
  const {
    minSizeKB = 100,
    maxSizeKB = 200,
    maxWidth = 800,
    maxHeight = 1000,
    maxIterations = 10,
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageData;

    img.onload = async function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Detect original image type
      const typeMatch = imageData.match(/^data:(image\/[a-zA-Z0-9+.-]+);/);
      const originalType = typeMatch ? typeMatch[1] : "image/jpeg";

      // Function to perform iterative compression
      async function compress(iteration, currentMaxWidth, currentMaxHeight) {
        const [newWidth, newHeight] = calculateSize(
          img,
          currentMaxWidth,
          currentMaxHeight,
        );

        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          async (blob) => {
            const compressedSizeKB = blob.size / 1024;
            console.log(
              `Iteration ${iteration}: Compressed Size = ${compressedSizeKB.toFixed(2)} KB`,
            );

            // Early exit if within target range or smaller than maxSize
            if (compressedSizeKB <= maxSizeKB) {
              resolve(URL.createObjectURL(blob));
            } else if (iteration < maxIterations) {
              await compress(
                iteration + 1,
                currentMaxWidth * 0.9,
                currentMaxHeight * 0.9,
              );
            } else {
              // Maximum iterations reached, return current blob anyway
              console.warn(
                "Maximum iterations reached. Returning last compressed image.",
              );
              resolve(URL.createObjectURL(blob));
            }
          },
          originalType,
          originalType === "image/png" ? undefined : 0.9,
        );
      }

      // Start compression
      compress(1, maxWidth, maxHeight);
    };

    img.onerror = () => reject("Failed to load image");
  });
}

/**
 * Compress an image File while preserving its original type and name.
 *
 * This function converts the File into a base64 DataURL, reuses `commonCompressImage`
 * for resizing/compression, and returns a new File object ready for upload.
 * If the file is already within the target size range, it returns the original file.
 *
 * @param {File} file - The original image file to compress.
 * @param {Object} [options] - Optional compression settings.
 * @param {number} [options.minSizeKB=100] - Minimum target size in KB.
 * @param {number} [options.maxSizeKB=200] - Maximum target size in KB.
 * @param {number} [options.maxWidth=800] - Maximum width of the compressed image.
 * @param {number} [options.maxHeight=1000] - Maximum height of the compressed image.
 * @param {number} [options.maxIterations=10] - Maximum number of iterations for compression.
 *
 * @returns {Promise<File>} - Resolves with a compressed File object or original file if already in range.
 *
 * @example
 * const compressedFile = await compressImageFile(fileInput.files[0]);
 * formData.set('image', compressedFile);
 */
async function compressImageFile(file, options = {}) {
  const { minSizeKB = 100, maxSizeKB = 200 } = options;

  // Early exit if file size is already within target range
  const fileSizeKB = file.size / 1024;
  if (fileSizeKB >= minSizeKB && fileSizeKB <= maxSizeKB) {
    console.log(
      `File "${file.name}" is already within target range (${fileSizeKB.toFixed(2)} KB).`,
    );
    return file;
  }

  // Convert File to base64 DataURL
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const base64Image = await fileToBase64(file);

  // Compress using commonCompressImage
  const compressedObjectUrl = await commonCompressImage(base64Image, options);

  // Convert compressed ObjectURL back to Blob/File
  const blob = await fetch(compressedObjectUrl).then((res) => res.blob());

  return new File([blob], file.name, { type: blob.type });
}

$(document).ready(function () {
  // console.log('common js loaded')

  // let bgColor = '#f5f5f571';
  // if ($('input')) {
  //     $('input').css('background-color', bgColor);
  // }
  // if ($('textarea')) {
  //     $('textarea').css('background-color', bgColor);
  // }
  // if ($('select')) {
  //     $('select').css('background-color', bgColor);
  // }

  const urlParams = new URLSearchParams(window.location.search);

  const redirectBack = urlParams.get("redirectBack");
  // console.log('in common js')
  if (redirectBack)
    localStorage.setItem("redirectBackToAfterLogout", redirectBack || "");

  $(document).on("click", "#finalLogoutBtn", async function (e) {
    e.preventDefault();

    try {
      const res = await fetch(
        "/logout?redirect=" +
          encodeURIComponent(
            localStorage.getItem("redirectBackToAfterLogout") || "/",
          ),
        {
          method: "post",
        },
      );

      const resData = await res.json();
      if (resData?.success) {
        let gobackToMainGpSite = localStorage.getItem(
          "redirectBackToAfterLogout",
        );

        if (gobackToMainGpSite) {
          localStorage.removeItem("redirectBackToAfterLogout");
          window.open(gobackToMainGpSite);
        } else {
          window.location.href = "/";
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  });
});

const dateFormat = (_date) => {
  _date = _date?.trim();
  return _date ? _date.split("-").reverse().join("-") : "";
};

// from dd-mm-yyyy to yyyy-mm-dd
const _commonjsDateFormat = (_d) => dateFormat(_d);

// console.log($('.modal'));

// $('.modal')?.each(function() {
//   alert(3)
//   this.style.setProperty('z-index', '1000', 'important');
// });

let alertjs = {
  success: function (data, callback = () => {}) {
    swal
      .fire({
        title: data.t,
        text: data.m,
        icon: "success",
      })
      .then(function () {
        callback();
      });
  },
  warning: function (data, callback = () => {}) {
    swal
      .fire({
        title: data.t,
        text: data.m,
        icon: "warning",
      })
      .then(function () {
        callback();
      });
  },
  delete: function (callback = () => {}) {
    swal
      .fire({
        title: "सरद माहिती काढायची आहे का?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "होय",
        cancelButtonText: "नाही",
      })
      .then((willDelete) => {
        if (willDelete.value) {
          callback(true);
        } else {
          callback(false);
        }
      });
  },
  deleteSpl: function (text, callback = () => {}) {
    swal
      .fire({
        title: text,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "होय",
        cancelButtonText: "नाही",
      })
      .then((willDelete) => {
        if (willDelete.value) {
          callback(true);
        } else {
          callback(false);
        }
      });
  },
  common: function (data) {
    swal(data.m);
  },
  input: function (data) {
    $(data.id).notify(data.m, { autoHideDelay: 2500 });
    //$.notify(data.m, { autoHideDelay: data.s });
  },

  confirm: function (data, callback = () => {}) {
    swal
      .fire({
        title: data.t || "Are you sure?",
        text: data.m || "",
        icon: "question", // or remove icon completely
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6", // normal blue
        cancelButtonColor: "#6c757d", // neutral gray
        background: "#fff", // normal bg
      })
      .then((result) => {
        if (result.value) {
          callback(true);
        }
      });
  },
};

var commonHandler = {
  isIntNumber: function (v) {
    var num = /^-?[0-9]+$/;
    return num.test(v);
  },
  isFloatNumber: function (v) {
    var num = /^[-+]?[0-9]+\.[0-9]+$/;
    return num.test(v);
  },
  getValue: function (this_element) {
    if (this_element == undefined) {
      return "";
    } else {
      return $(this_element).val();
    }
  },
  setValue: function (this_element, value_to_set) {
    if (this_element == undefined) {
      return false;
    }
    $(this_element).val(value_to_set);
    return true;
  },
  ajaxManager(data, callback = () => {}) {
    $.ajax({
      url: data.url,
      method: data.method,
      data: data.data,
    })
      .done(function (responseData) {
        callback(true, responseData);
      })
      .fail(async function (xhr) {
        const responseData = xhr.responseJSON; // No need for await or .json()
        console.log(responseData);
        callback(false, xhr, responseData);
      });
  },
  ajaxPromise(data) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: data.url,
        method: data.method,
        data: data.data,
      })
        .done(function (data) {
          resolve(data);
        })
        .fail(function (xhr) {
          reject({ type: false, error: xhr });
        });
    });
  },

  fetchPromiseRequest: (request_data, cb) => {
    fetch(request_data.url, {
      method: request_data.method,
      body: request_data.data,
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        cb(result);
      })
      .catch((err) => {
        alertjs.warning({ t: "Error", m: err }, () => {});
      });
  },

  translate: function (value, callback = () => {}) {
    $.ajax({
      url: "/currency/toWords",
      type: "POST",
      data: {
        data: value,
      },
      success: (data) => {
        callback(data.words);
      },
      error: (err) => {
        console.log(err);
      },
    });
  },

  translateWord: function (value, callback = () => {}) {
    $.ajax({
      url: "/translate/word",
      type: "POST",
      data: {
        data: value,
      },
      success: (data) => {
        callback(data.translatedWord);
      },
      error: (err) => {
        console.log(err, "cannot translate the word");
      },
    });
  },

  checkTaxPaidByMalmattaNo: async function (malmattaNo) {
    let response = await fetch("/form-8/check-tax-paid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ malmattaNo }),
    });
    let data = await response.json();
    console.log("DATA is here,", data);
    if (data.result?.length === 0) {
      alertjs.warning({
        t: "मालमत्ता क्रमांक मिळाला नाही.",
      });
      return;
    }

    let paniKar = data?.result[0]?.totalWaterTax;
    let samanyaKar = data?.result[0]?.totalSampurnaTax;
    let user_id = data?.result[0]?.user_id;

    if (paniKar > 0 || samanyaKar > 0) {
      alertjs.warning(
        {
          t: "ग्रामपंचायत चा सामान्य कर व विशेष पाणी पट्टी कर भरणा करावा",
          m: "टीप: सदर कर भरणा केल्या शिवाय कोणताच दाखला मिळणार नाही",
        },
        function () {
          $(".pending-tax-pani").val(paniKar);
          $(".pending-tax-samanya").val(samanyaKar);
          $(".check-tax-paid-modal").modal("hide");
        },
      );
      $("#checkTaxPaidModal").modal({
        show: true,
      });

      return user_id;
    } else {
      $(".check-tax-paid-modal").modal("hide");
      $("#paymentModeModal").modal({
        show: true,
      });
      $("#pay-amount").attr("readonly", false);
      $("#pay-malmatta-no").val(paymentDetails.malmattaNo);

      $("#pay-person-name").val(paymentDetails.personName);
    }

    return user_id;
  },
};

const paymentMode = {
  offline: function (paymentDetails, callback) {
    paymentDetails.paymentMode = 0; // 0 FOR OFFLINE PAYMENT MODE
    if (!paymentDetails.amount || paymentDetails.amount === "") {
      alertjs.warning(
        {
          t: "कृपया पैसे लिहा.",
        },
        function () {
          $("#pay-amount").focus();
        },
      );
      return;
    }

    if (!paymentDetails.personName || paymentDetails.personName === "") {
      alertjs.warning(
        {
          t: "कृपया नाव लिहा.",
        },
        function () {
          $("#pay-person-name").focus();
        },
      );
      return;
    }

    // if (!paymentDetails.malmattaNo || paymentDetails.malmattaNo === '') {
    // 	alertjs.warning(
    // 		{
    // 			t: 'कृपया मालमत्ता लिहा.',
    // 		},
    // 		function () {
    // 			$('#pay-malmatta-no').focus()
    // 		}
    // 	)
    // 	return
    // }

    // return;

    $.ajax({
      url: "/payment/save",
      method: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(paymentDetails),
      success: function (result) {
        if (result.call === 1) {
          alertjs.success(
            {
              t: "Payment Successfully Done.",
            },
            function () {
              // HIDING THE FIELDS AFTER PAYMENT DONE SUCCESSFULLY AND SHOWING PRINT BUTTON FOR TAKING OUT PRINT
              $(".pay-details-div").addClass("d-none");
              $(".payment-mode-buttons-div").removeClass("d-flex");
              $(".payment-mode-buttons-div").addClass("d-none");
              $(".print-certificate-div").removeClass("d-none");

              paymentDetails.reciptNumber = result.reciptNumber;
              callback(result.call, result);
            },
          );
        } else {
          console.log("Going in here");
          console.log("i dont know, but smth went wrong");
          throw new Error("Something went wrong");
        }
      },
      error: function (err) {
        console.log("The error is ", err);
        alertjs.warning({
          t: "Something went wrong",
          m: "Payment not done, please try again later",
        });
      },
    });
  },
};

const paymentDetails = {
  amount: "-",
  personName: "-",
  malmattaNo: "-",
  transactionNumber: "-",
  paymentNumber: "-",
  paymentFor: "-",
  paymentMode: "-", // 0 OFFLINE 1 ONLINE
};
// PAYMENT DETAILS OBJECT
/**
 * Note - PAYMENT  INDICATORS
 *  -1 =  // If payment for is -1, then it measn we need to fetch all
 * 1 = samanya tax payment
 * 2 = pani tax payment
 * 3 = vivah/marriage certificate payment
 * 4 = swayam ghoshna patra payment
 * 5 = form eight print payment
 * 6 = THAKBAKI NIRADHAR
 *
 * 0 = OFFLINE
 * 1 = ONLINE
 */

const printCertificatePaymentRecipt = (certificatePrintDetails) => {
  window.open(
    `/print/certificate-payment-recipt?amtWrd=${certificatePrintDetails.amountInwords}&reciptNo=${certificatePrintDetails.reciptNumber}`,
    "_blank",
  );
};

//SEND SMS functions
/*
data format for below functino: 

{
    paymentFor: '',
    paymentMode: '',
    sendTo: '', // Send to people or send to gp, bcz format will be different
    sms: '', //if sms is undefined or '', we will use defaultSms format
    mobile: 
}

*/

function isPaymentModalMobileFilled() {
  let mobileNo = $("#pay-mobile-no").val();
  // if (!isNaN(mobileNo)) {
  //   if (!mobileNo || mobileNo.length !== 10) {
  //     alertjs.warning({
  //       t: "वैध मोबाईल क्र भरा",
  //     });
  //     return false;
  //   }
  // }
  return true;
}

const handleSendGpSMS = async (data) => {
  try {
    sendGpSms(data, "people");
    sendGpSms(data);
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};

async function sendGpSms(data, sendTo = "gp") {
  try {
    let defaultSms = `नाव : ${$("#pay-person-name").val()}, मालमत्ता क्र. : ${$(
      "#pay-malmatta-no",
    ).val()} ह्यांच्याकडून  ${data.paymentFor}साठी  ₹${$("#pay-amount").val()}  ${
      data.paymentMode == 1 ? "ऑनलाईन मोडने " : "रोख स्वरुपात"
    } प्राप्त झाले.${sendTo === "people" ? " ग्रामपंचायतकडून धन्यवाद!" : ""}`;

    let smsToSend = "";
    if (!data.sms?.trim()) {
      smsToSend = defaultSms;
    } else {
      smsToSend = data.sms;
    }

    let gpMobileList = [].join(",");

    const sendData = {
      sender_id: "", // toSet
      // people means to the individuals or few, and when sendTo == gp, it might mean to more people of grampanchayat
      mobile: sendTo === "people" ? data.mobile : gpMobileList,
      template_name: data.template_name,
      header_id: data.header_id,
      template_id: data.template_id,
      sms: smsToSend,
    };

    if (sendTo !== "people" && gpMobileList.length == 0) {
      return;
    }

    const response = await fetch("/sms/send-gp-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });

    const { call, success, message } = await response.json();

    if (call || success) {
      alertjs.success({
        t: "SMS",
        m: "SMS sent",
      });
    } else {
      alertjs.warning({
        t: "SMS Warning",
        m: "SMS सेंड नाही झाले.",
      });
    }
  } catch (err) {
    console.log("Error while sending the sms", err);
    alertjs.warning({
      t: "SMS Warning",
      m: "काहीतरी चुकले.",
    });
  }
}

// function imgExists(src) {
//   const img = new Image();
// }

const months = [
  { month: "Jan", id: 1 },
  { month: "Feb", id: 2 },
  { month: "Mar", id: 3 },
  { month: "Apr", id: 4 },
  { month: "May", id: 5 },
  { month: "Jun", id: 6 },
  { month: "Jul", id: 7 },
  { month: "Aug", id: 8 },
  { month: "Sept", id: 9 },
  { month: "Oct", id: 10 },
  { month: "Nov", id: 11 },
  { month: "Dec", id: 12 },
];

let months_map_marathi = [
  { monthName: "जानेवारी", monthNumber: "०१" },
  { monthName: "फेब्रुवारी", monthNumber: "०२" },
  { monthName: "मार्च", monthNumber: "०३" },
  { monthName: "एप्रिल", monthNumber: "०४" },
  { monthName: "मे", monthNumber: "०५" },
  { monthName: "जून", monthNumber: "०६" },
  { monthName: "जुलै", monthNumber: "०७" },
  { monthName: "ऑगस्ट", monthNumber: "०८" },
  { monthName: "सप्टेंबर", monthNumber: "०९" },
  { monthName: "ऑक्टोबर", monthNumber: "१०" },
  { monthName: "नोव्हेंबर", monthNumber: "११" },
  { monthName: "डिसेंबर", monthNumber: "१2" },
];

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

//Code to copy paste some functionality with slight changes
/*
    //common js
        isPaymentModalMobileFilled();
        const data = {
            paymentFor: ``,
            paymentMode: 0,
            c: 'people', // Send to people or send to gp, bcz format might be different
            sms: '', //if sms is undefined or '' i.e. empty Strring, we will use defaultSms format
            mobile: `${$('#pay-mobile-no').val()}`,
        };

        // console.log('Payyyyyyment data === ', data);
        handleSendGpSMS(data); 
        


        */

// show year select modal
function closeModal(modal) {
  $(modal).modal("hide");
}

function openModal(modal) {
  $(modal).modal("show");
}

$(document).on("click", ".close-modal-cross-btn", function () {
  let _modal_name = $(this).attr("data-dismiss");
  closeModal(`#${_modal_name}`);
});

function openLinkToNewTab(url) {
  window.open(url, "_blank");
}

//Image compression

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

function compressAndDisplayImage(
  fileInput,
  previewImageIdName,
  formDataKey,
  callback = function () {},
) {
  // if()
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
              $("#" + previewImageIdName).attr(
                "src",
                URL.createObjectURL(blob),
              );

              // If the compressed size is within the target range, stop
              if (
                compressedSizeKB <= targetMaxSizeKB ||
                compressedSizeKB >= targetMinSizeKB
              ) {
                // Add the compressed image to FormData
                if (typeof formData !== "undefined") {
                  formData.set(formDataKey, blob);
                }
                console.log(
                  `Final Compressed ${formDataKey} Size: ${compressedSizeKB} KB`,
                );

                callback();
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

//Example to us above function
/*
$('#home-camera-capture-image').change(function () {
    compressAndDisplayImage(this, 'home-photo-preview', 'file1')
})
*/
function makeAllModalsScrollable() {
  const modals = document.querySelectorAll(".vertically-scrollable");

  modals.forEach((modal) => {
    // Modal flex layout + max height
    modal.classList.add("flex", "flex-col", "max-h-[90vh]");

    // Scrollable body
    const modalBody = modal.querySelector(".modal-body-holder");
    if (modalBody) {
      modalBody.classList.add("flex-1", "overflow-y-auto");
    }

    // Header stays visible
    const header = modal.querySelector("form");
    if (header) {
      header.classList.add("flex-shrink-0", "bg-white", "z-10", "border-b");
    }

    const modalFooter = modal.querySelector(".modal-footer");
    if (modalFooter) {
      modalFooter.classList.add(
        "flex-shrink-0",
        "bg-white",
        "z-10",
        "border-t",
      );
    }
  });
}
makeAllModalsScrollable();

const daisyUIModal = {
  show: (_id) => {
    const modal = document.getElementById(_id);
    if (modal) {
      modal.showModal();
    } else {
      console.error(`Modal with ID ${_id} not found.`);
    }
  },

  close: (_id) => {
    const modal = document.getElementById(_id);
    if (modal) {
      modal.close();
    } else {
      console.error(`Modal with ID ${_id} not found.`);
    }
  },
};

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]',
);

const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
  try {
    // Ensure bootstrap object exists before calling Tooltip
    if (bootstrap && bootstrap.Tooltip) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    } else {
      console.warn("Bootstrap Tooltip is not available.");
    }
  } catch (error) {
    console.error("Error initializing tooltip:", error);
  }
});

// export { dateFormat };
// export default daisyUIModal;
