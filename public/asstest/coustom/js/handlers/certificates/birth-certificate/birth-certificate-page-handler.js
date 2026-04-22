$(function () {
  const handleDeleteBirthCertificate = async (id) => {
    const url = `/birth-certificate/delete-birth-certificate`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const { success, data, message } = await res.json();

    if (success) {
      alertjs.success(
        {
          m: message,
        },
        () => location.reload()
      );
    }
  };

  $(document).on("click", ".delete-birth-certificate-btn", function (e) {
    e.preventDefault();
    const certificateId = $(this).attr("data-birthCertificateId");
    // Call the delete function

    alertjs.deleteSpl("Confirm Delete ?", (status) => {
      if (status) {
        handleDeleteBirthCertificate(+certificateId);
      }
    });
  });

  $(document).on("click", "#print-birth-registration-record-btn", (e) => {
    e.preventDefault();

    const year = $(`[name="year"]`).val();

    if (year) {
      if (isNaN(year) || year.length != 4) {
        alertjs.warning({
          t: "Enter valid year",
        });
        return;
      }
    }

    window.open(
      `/birth-certificate/print-birth-certificate-report?year=${year}`
    );
  });
});
