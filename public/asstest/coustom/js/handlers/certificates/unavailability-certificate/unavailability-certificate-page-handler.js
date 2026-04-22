$(function () {
   
  
    const handleDeleteUnavailabilityCertificate = async (id) => {
      const url = `/unavailability-certificate/delete`;
  
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
 
  
    $(document).on("click", ".delete-unavailability-certificate-btn", function (e) {
      e.preventDefault();
      const certificateId = $(this).attr("data-unavailabilityCertificateId");
      // Call the delete function
  
      alertjs.deleteSpl("Confirm Delete ?", (status) => {
        if (status) {
          handleDeleteUnavailabilityCertificate(+certificateId);
        }
      });
    });
  });
  