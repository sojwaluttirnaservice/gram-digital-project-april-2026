$(() => {
    // Form validation
    $('#wg-group-form').validate({
        rules: {
            group_name: {
                required: true
            },
            village_name: {
                required: true
            }
        },
        messages: {
            point_desc: {
                required: "कृपया उपक्रमाचे वर्णन भरा"
            },
            village_name: {
                required: 'गावाचे नाव भरा.'
            }
        }
    });

    // POST: Save new initiative
    async function handleSaveInitiative(e) {
        e.preventDefault()
        const form = document.getElementById('wg-group-form');

        if (!$('#wg-group-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/wg-names', {
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
                    location.href = '/wg-names';
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

        const form = document.getElementById('wg-group-form');

        if (!$('#wg-group-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/wg-names', {
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
                    location.href = '/wg-names';
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
    $(document).on('click', '#save-group-btn', handleSaveInitiative);
    $(document).on('click', '#update-group-btn', handleUpdateInitiative);
});
