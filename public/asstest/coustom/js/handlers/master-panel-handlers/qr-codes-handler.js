$(() => {
  function showImageSelectedByFileInput(inputElement, imageElement) {
    const file = inputElement.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        imageElement.attr("src", e.target.result);
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  $('[name="bankQrCodeImage"]').on("change", function () {
    const imageTag = $('[name="bankQrCodeImagePreview"]');
    showImageSelectedByFileInput(this, imageTag);
  });

  $('[name="bankQrCodeImageForWater"]').on("change", function () {
    const imageTag = $('[name="bankQrCodeImagePreviewForWater"]');
    showImageSelectedByFileInput(this, imageTag);
  });


  
  // fetch and display bank details
  const handleUploadBankQrCode = async (bankQrCodeImageData) => {
    try {
      const response = await fetch("/master/qr-codes/upload-bank-qr-code", {
        method: "POST",
        body: bankQrCodeImageData,
      });

      const data = await response.json();

      if (data.call == 1) {
        alert("image uploaded successfully");
        location.reload();
        return;
      }
    } catch (err) {
      console.log(`Errror while uploading the qr code: ${err}`);
    }
  };

  $("#upload-bank-qr-code-btn").on("click", function (e) {
    e.preventDefault();

    const bankQrCodeImageData = new FormData(
      document.getElementById("bank-qr-code-form")
    );

    if (!bankQrCodeImageData.get("bankQrCodeImage")) {
      alert("uplaod image");
      return;
    }

    handleUploadBankQrCode(bankQrCodeImageData);
  });

  const handleToggleBankQrCodeVisibility = async (visibilityToSet) => {
    try {
      const res = await fetch(
        `/master/qr-codes/toggle-bank-qr-code-visbility?visibilityToSet=${visibilityToSet}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (data.call) {
        alert(`Visibility changed`);
        location.reload();
      }
    } catch (err) {
      console.log(`Error while toggling the visibiltiy : ${err}`);
    }
  };

  $("#show-hide-bank-qr-code-btn").on("click", function (e) {
    e.preventDefault();
    const currentVisibility = +$(this).attr("data-currentVisibility");

    let visibilityToSet = currentVisibility == 1 ? 0 : 1;

    handleToggleBankQrCodeVisibility(visibilityToSet);
  });



  // For Water

  const handleUploadBankQrCodeWater = async (bankQrCodeImageDataWater) => {
    try {
      const response = await fetch("/master/qr-codes/upload-bank-qr-code-water", {
        method: "POST",
        body: bankQrCodeImageDataWater,
      });

      const data = await response.json();

      if (data.call == 1) {
        alert("water image uploaded successfully");
        location.reload();
        return;
      }
    } catch (err) {
      console.log(`Error while uploading the qr code: ${err}`);
    }
  };

  $("#upload-bank-qr-code-water-btn").on("click", function (e) {
    e.preventDefault();

    const bankQrCodeImageDataWater = new FormData(
      document.getElementById("bank-qr-code-water-form")
    );

    if (!bankQrCodeImageDataWater.get("bankQrCodeImageForWater")) {
      alert("uplaod image");    
      return;
    }

    handleUploadBankQrCodeWater(bankQrCodeImageDataWater);
  });

  const handleToggleBankQrCodeWaterVisibility = async (visibilityToSet) => {
    try {
      const res = await fetch(
        `/master/qr-codes/toggle-bank-qr-code-water-visbility?visibilityToSet=${visibilityToSet}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (data.call) {
        alert(`Visibility changed`);
        location.reload();
      }
    } catch (err) {
      console.log(`Error while toggling the visibiltiy : ${err}`);
    }
  };

  $("#show-hide-bank-qr-code-water-btn").on("click", function (e) {
    e.preventDefault();
    const currentVisibility = +$(this).attr("data-currentVisibility");

    let visibilityToSet = currentVisibility == 1 ? 0 : 1;

    handleToggleBankQrCodeWaterVisibility(visibilityToSet);
  });
});
