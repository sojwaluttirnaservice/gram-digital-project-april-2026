$(() => {
  const handleDeleteWorker = async (id) => {
    try {
      const res = await fetch("/labor-attendance/workers", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { success, message } = await res.json();

      if (success) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: message,
          },
          () => {
            location.reload();
          }
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "WARNING",
        m: err?.message || "काहीतरी चुकले.",
      });
    }
  };

  $(document).on("click", ".delete-labor-worker-btn", function (e) {
    e.preventDefault();

    const id = $(this).attr("data-laborWorkerId");

    if (!id) {
      alertjs.warning({
        t: "WARNING",
        m: "कामगार ID मिळाला नाही.",
      });
      return;
    }

    alertjs.deleteSpl("Confirm Delete?", (isYes) => {
      if (isYes) {
        handleDeleteWorker(id);
      }
    });
  });
});

