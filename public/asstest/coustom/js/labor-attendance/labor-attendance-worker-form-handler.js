$(() => {
    const handleSaveUpdateWorker = async (e) => {
      e.preventDefault();

    try {
      const form = document.getElementById("worker-form");
      const formData = new FormData(form);

      const method = formData.get("id") ? "PUT" : "POST";
      
      const res = await fetch("/labor-attendance/workers", {
        method,
        body: formData,
      });

      const { success, message } = await res.json();

      if (success) {
        alertjs.success({
          t: "SUCCESS",
          m: message,
        }, () =>{
           form.reset() 
        });
      } else {
        alertjs.warning({
          t: "warning",
          m: message,
        });
      }
    } catch (err) {
      console.error("error:", err);
      alertjs.warning({
        t: "warning",
        m: err?.message || "काहीतरी चुकले",
      });
    }
  };

  $(document).on(
    "click",
    "#save-worker-btn, #update-worker-btn",
    handleSaveUpdateWorker
  );
});
