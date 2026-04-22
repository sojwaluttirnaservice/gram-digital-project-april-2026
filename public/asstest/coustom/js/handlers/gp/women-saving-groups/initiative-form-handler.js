$(() => {
    // Form validation
    $('#wg-initiative-form').validate({
        rules: {
            point_desc: {
                required: true
            }
        },
        messages: {
            point_desc: {
                required: "कृपया उपक्रमाचे वर्णन भरा"
            }
        }
    });

    // POST: Save new initiative
    async function handleSaveInitiative(e) {
        e.preventDefault()
        const form = document.getElementById('wg-initiative-form');

        if (!$('#wg-initiative-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/wg-initiatives', {
                method: 'POST',
                body: new FormData(form)
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({
                    t: "यशस्वी",
                    m: message
                }, () => {
                    form.reset();
                    location.href = '/wg-initiatives';
                });
            } else {
                alertjs.warning({
                    t: "सूचना",
                    m: message
                });
            }
        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({
                t: "त्रुटी",
                m: "काहीतरी चुकले"
            });
        }
    }

    // PUT: Update initiative
    async function handleUpdateInitiative(e) {
        e.preventDefault()

        const form = document.getElementById('wg-initiative-form');

        if (!$('#wg-initiative-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/wg-initiatives', {
                method: 'PUT',
                body: new FormData(form)
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({
                    t: "यशस्वी",
                    m: message
                }, () => {
                    form.reset();
                    location.href = '/wg-initiatives';
                });
            } else {
                alertjs.warning({
                    t: "सूचना",
                    m: message
                });
            }
        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({
                t: "त्रुटी",
                m: "काहीतरी चुकले"
            });
        }
    }

    // Attach to buttons
    $(document).on('click', '#save-initiative-btn', handleSaveInitiative);
    $(document).on('click', '#update-initiative-btn', handleUpdateInitiative);
});
