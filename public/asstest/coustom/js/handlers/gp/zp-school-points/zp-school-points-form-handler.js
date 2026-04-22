$(() => {

    // ✅ Setup validation rules
    $('#zp-school-points-form').validate({
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

    // ✅ POST: Save new ZP school point
    async function handleSaveZpPoint(e) {
        e.preventDefault();

        const form = document.getElementById('zp-school-points-form');

        if (!$('#zp-school-points-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/zp-school-points', {
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
                    location.href = '/zp-school-points';
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

    // ✅ PUT: Update ZP school point
    async function handleUpdateZpPoint(e) {
        e.preventDefault();

        const form = document.getElementById('zp-school-points-form');

        if (!$('#zp-school-points-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/zp-school-points', {
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
                    location.href = '/zp-school-points';
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

    // ✅ Attach button events
    $(document).on('click', '#save-zp-point-btn', handleSaveZpPoint);
    $(document).on('click', '#update-zp-point-btn', handleUpdateZpPoint);

});
