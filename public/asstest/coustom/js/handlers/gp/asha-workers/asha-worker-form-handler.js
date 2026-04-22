$(() => {
    // Setup validation rules
    $('#asha-worker-form').validate({
        rules: {
            name: {
                required: true
            },
            mobile: {
                required: true
            }
        },
        messages: {
            name: {
                required: "कृपया सेविकेचे नाव भरा"
            },
            mobile: {
                required: "कृपया मोबाईल नंबर भरा"
            }
        }
    });

    // POST: Save new ASHA worker
    async function handleSaveAshaWorker(e) {
        e.preventDefault();

        const form = document.getElementById('asha-worker-form');

        if (!$('#asha-worker-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/asha-workers', {
                method: 'POST',
                body: new FormData(form)
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({
                    t: "SUCCESS",
                    m: message
                }, () => {
                    form.reset();
                    location.href = '/asha-workers';
                });
            } else {
                alertjs.warning({
                    t: "WARNING",
                    m: message
                });
            }
        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({
                t: "ERROR",
                m: "काहीतरी चुकले"
            });
        }
    }

    // PUT: Update ASHA worker
    async function handleUpdateAshaWorker(e) {
        e.preventDefault();

        const form = document.getElementById('asha-worker-form');

        if (!$('#asha-worker-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/asha-workers', {
                method: 'PUT',
                body: new FormData(form)
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({
                    t: "SUCCESS",
                    m: message
                }, () => {
                    form.reset();
                    location.href = '/asha-workers';
                });
            } else {
                alertjs.warning({
                    t: "WARNING",
                    m: message
                });
            }
        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({
                t: "ERROR",
                m: "काहीतरी चुकले"
            });
        }
    }

    // Attach to button clicks
    $(document).on('click', '#save-asha-worker-btn', handleSaveAshaWorker);
    $(document).on('click', '#update-asha-worker-btn', handleUpdateAshaWorker);
});
