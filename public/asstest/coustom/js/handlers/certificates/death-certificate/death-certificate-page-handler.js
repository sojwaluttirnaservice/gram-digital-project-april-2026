$(function () {
  const handleDeleteDeathCertificate = async (id) => {
    const url = `/death-certificate/delete-death-certificate`;

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

  $(document).on("click", ".delete-death-certificate-btn", function (e) {
    e.preventDefault();
    const certificateId = $(this).attr("data-deathCertificateId");
    // Call the delete function

    alertjs.deleteSpl("Confirm Delete ?", (status) => {
      if (status) {
        handleDeleteDeathCertificate(+certificateId);
      }
    });
  });

  $(document).on("click", "#print-death-registration-record-btn", (e) => {
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
      `/death-certificate/print-death-certificate-report?year=${year}`
    );
  });
});
