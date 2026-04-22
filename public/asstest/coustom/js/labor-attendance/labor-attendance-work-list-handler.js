$(() => {
  const handleDeleteWork = async (id) => {
    try {
      const res = await fetch("/labor-attendance/work", {
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

  $(document).on("click", ".delete-labor-work-btn", function (e) {
    e.preventDefault();

    const id = $(this).attr("data-laborWorkId");

    if (!id) {
      alertjs.warning({
        t: "WARNING",
        m: "काम ID मिळाले नाही.",
      });
      return;
    }

    alertjs.deleteSpl("Confirm Delete?", (isYes) => {
      if (isYes) {
        handleDeleteWork(id);
      }
    });
  });
});

