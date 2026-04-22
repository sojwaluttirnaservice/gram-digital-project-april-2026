let _doc = $(document);

$(() => {
  const updatePaymentStatus = async (updateDetails) => {
    try {
      const { success, message } = await fetch("/payment/status-water", {
        method: "PUT",
        body: JSON.stringify(updateDetails),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (!success) {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
        return;
      }

      alertjs.success(
        {
          t: "SUCCESS",
          m: message,
        },
        () => location.reload()
      );
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || err || "Something Went Wrong",
      });
    }
  };

  _doc.on("click", ".approve-status-btn", function (e) {
    e.preventDefault();
    let paymentId = +$(this).attr("data-paymentId");
    let formNineId = $(this).attr("data-form-nine-id");
    let f8UserId = $(this).attr("data-user-id");
    updatePaymentStatus({
      paymentId,
      formNineId,
      f8UserId,
      updatePaymentStatusTo: "APPROVED",
    });
  });

  _doc.on("click", ".reject-status-btn", function (e) {
    e.preventDefault();
    let paymentId = +$(this).attr("data-paymentId");
    let formNineId = $(this).attr("data-form-nine-id");
    let f8UserId = $(this).attr("data-user-id");

    updatePaymentStatus({
      paymentId,
      formNineId,
      f8UserId,
      updatePaymentStatusTo: "REJECTED",
    });
  });
});
