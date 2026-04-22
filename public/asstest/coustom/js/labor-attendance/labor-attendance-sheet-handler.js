$(() => {
  const handleMarkPresent = async (markDetails) => {
    try {
      const { work_id_fk, worker_id_fk, date } = markDetails;
      const res = await fetch("/labor-attendance/attendance", {
        method: "POST",
        body: JSON.stringify(markDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { success, message } = await res.json();

      if (success) {
        alertjs.success({
          t: "SUCCESS",
          m: message,
        }, () => location.reload());
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
        m: err?.message || "काहीतरी चुकले",
      });
    }
  };

  const handleMarkAbsent = async (attendanceId) => {
   try {
      const res = await fetch("/labor-attendance/attendance", {
        method: "DELETE",
        body: JSON.stringify({attendanceId}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { success, message } = await res.json();

      if (success) {
        alertjs.success({
          t: "SUCCESS",
          m: message,
        }, () => location.reload());
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
        m: err?.message || "काहीतरी चुकले",
      });
    }
  };

  $(document).on("click", ".mark-present-btn", function (e) {
    e.preventDefault()
    handleMarkPresent({
      work_id_fk: $(this).attr("data-workId"),
      worker_id_fk: $(this).attr("data-workerId"),
      date: $(this).attr("data-date")
    });
  });

  $(document).on("click", ".mark-absent-btn", function (e) {
    e.preventDefault()
    let attendanceId = $(this).attr("data-attendanceId");
    handleMarkAbsent(attendanceId);
  });
});
