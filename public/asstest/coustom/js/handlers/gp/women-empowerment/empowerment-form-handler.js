$(() => {

    // Setup validation rules (we'll trigger them manually)
    $('#empowerment-form').validate({
        rules: {
            point_desc: {
                required: true
            }
        },
        messages: {
            point_desc: {
                required: "कृपया मुद्द्याचे वर्णन भरा"
            }
        }
    });

    // POST: Save new point
    async function handleSaveEmpowerment(e) {
        e.preventDefault();

        const form = document.getElementById('empowerment-form');

        if (!$('#empowerment-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/women-empowerment', {
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
                    location.href = '/women-empowerment';
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

    // PUT: Update point
    async function handleUpdateEmpowerment(e) {
        e.preventDefault();

        const form = document.getElementById('empowerment-form');

        if (!$('#empowerment-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/women-empowerment', {
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
                    location.href = '/women-empowerment';
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

    // Attach handlers to button clicks
    $(document).on('click', '#save-empowerment-btn', handleSaveEmpowerment);
    $(document).on('click', '#update-empowerment-btn', handleUpdateEmpowerment);

});
