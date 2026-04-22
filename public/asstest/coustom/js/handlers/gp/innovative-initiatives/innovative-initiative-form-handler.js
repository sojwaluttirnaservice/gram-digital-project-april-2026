$(() => {

    const $form = $('#innovative-initiative-form');

    // 🛡️ Validation setup
    $form.validate({
        rules: {
            initiative_name: {
                required: true
            }
        },
        messages: {
            initiative_name: {
                required: "कृपया उपक्रमाचे नाव भरा"
            }
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
            const res = await fetch('/innovative-initiatives', {
                method,
                body: formData
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({
                    t: "SUCCESS",
                    m: message
                }, () => {
                    if (method == 'POST')
                        form.reset();
                    location.href = '/innovative-initiatives';
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
    };

    // 🖱️ Attach event handlers
    $(document).on('click', '#save-innovative-initiative-btn', e => handleSubmit(e, 'POST'));
    $(document).on('click', '#update-innovative-initiative-btn', e => handleSubmit(e, 'PUT'));

});
