$(() => {
     $("#aadhar-number").mask("0000-0000-0000");
  $(document).on("click", "#edit-divyanga-application-btn", async function (e) {
    e.preventDefault();

    const form = document.getElementById("divyangaEditForm");
    const formData = new FormData(form);

    try {
      const response = await fetch("/divyanga", {
        method: "PUT",
        body: formData,
      });

      const { success, message, data } = await response.json();

      if (success) {
        alertjs.success({
          t: "दिव्यांग अपेडट",
          m: message,
        }, () => window.open('/divyanga/applications', '_self'));
      } else {
        alertjs.warning({
          t: "WARNING: दिव्यांग अपेडट",
          m: message,
        });
      }
    } catch (err) {
      console.log(err);
      alertjs.warning({
        t: "WARNING: दिव्यांग अपेडट",
        m: err?.message || "काहीतरी चुकले",
      });
    }
  });
});
