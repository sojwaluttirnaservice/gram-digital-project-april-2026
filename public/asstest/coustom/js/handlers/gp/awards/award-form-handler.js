$(() => {

    // Setup validation rules (we'll trigger them manually)
    $('#award-form').validate({
        rules: {
            award_name: {
                required: true
            },
            award_year: {
                required: true,

            }
        },
        messages: {
            award_name: {
                required: "कृपया पुरस्काराचे नाव भरा"
            },
            award_year: {
                required: "कृपया वर्ष भरा",
            }
        }
    });

    // POST: Save new award
    async function handleSaveAward(e) {
        e.preventDefault()

        const form = document.getElementById('award-form');

        if (!$('#award-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/awards', {
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
                    location.href = '/awards';
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

    // PUT: Update award
    async function handleUpdateAward(e) {
        e.preventDefault()

        const form = document.getElementById('award-form');

        if (!$('#award-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/awards', {
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
                    location.href = '/awards';
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
    $(document).on('click', '#save-award-btn', handleSaveAward);
    $(document).on('click', '#update-award-btn', handleUpdateAward);

});
