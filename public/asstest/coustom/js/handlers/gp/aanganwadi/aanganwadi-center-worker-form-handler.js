$(() => {
    const $form = $('#aanganwadi-worker-form');

    // 🛡️ Validation setup
    $form.validate({
        rules: {
            name: {
                required: true
            },
            role: {
                required: true
            },
        },
        messages: {
            name: {
                required: "कृपया नाव भरा."
            },
            role: {
                required: "कृपया भूमिका निवडा."
            },

        }
    });

    /**
     * Generic form submit handler
     * @param {Event} e
     * @param {'POST'|'PUT'} method
     */
    const handleSubmit = async (e, method) => {
        e.preventDefault();

        if (!$form.valid()) return;

        const form = $form[0];
        const formData = new FormData(form);

        try {
            const res = await fetch('/aanganwadi/workers', {
                method,
                body: formData
            });

            const { success, message, data } = await res.json();

            if (success) {
                alertjs.success({
                    t: "SUCCESS",
                    m: message
                }, () => {
                    if (method === 'POST') {
                        form.reset();
                        location.href = `/aanganwadi/workers/${formData.get('center_id_fk')}`
                    }
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
                m: "काहीतरी चुकले."
            });
        }
    };
    // 🖱️ Attach event handlers

    $(document).on('click', '#save-aanganwadi-worker-btn', e => handleSubmit(e, 'POST'));
    $(document).on('click', '#update-aanganwadi-worker-btn', e => handleSubmit(e, 'PUT'));
})