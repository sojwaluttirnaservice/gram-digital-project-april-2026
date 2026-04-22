$(() => {

    const SAVE_URL = '/namuna/2';       // POST
    const UPDATE_URL = '/namuna/2';     // PUT

    // ====================================================
    // Utility: Get Form Data
    // ====================================================
    const getFormData = () => new FormData(document.getElementById('namuna-2-form'));

    // ====================================================
    // Save Handler
    // ====================================================
    const handleSave = async () => {
        try {
            let fd = getFormData();

            // Required fields
            if (!fd.get('month') || !fd.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया महिना आणि वर्ष निवडा.'
                });
                return;
            }

            // Disable button
            let btn = $('#save-namuna-2-btn');
            btn.prop('disabled', true).text('Saving...');

            let res = await fetch(SAVE_URL, {
                method: 'POST',
                body: fd
            });

            let { success, message } = await res.json();

            if (success) {
                alertjs.success(
                    { t: 'SUCCESS', m: message },
                    () => window.location.reload()
                );
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: message
                });
            }

        } catch (err) {
            console.error('Save Error:', err);

            alertjs.error({
                t: 'ERROR',
                m: 'त्रुटी आली आहे. कृपया पुन्हा प्रयत्न करा.'
            });

        } finally {
            $('#save-namuna-2-btn').prop('disabled', false).text('Save');
        }
    };

    // ====================================================
    // Update Handler
    // ====================================================
    const handleUpdate = async () => {
        try {
            let fd = getFormData();

            if (!fd.get('id')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'अवैध ID. अपडेट करू शकत नाही.'
                });
                return;
            }

            let btn = $('#update-namuna-2-btn');
            btn.prop('disabled', true).text('Updating...');

            let res = await fetch(UPDATE_URL, {
                method: 'PUT',
                body: fd
            });

            let { success, message } = await res.json();

            if (success) {
                alertjs.success(
                    { t: 'SUCCESS', m: message },
                    () => window.location.reload()
                );
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: message
                });
            }

        } catch (err) {
            console.error('Update Error:', err);

            alertjs.error({
                t: 'ERROR',
                m: 'त्रुटी आली आहे. कृपया पुन्हा प्रयत्न करा.'
            });

        } finally {
            $('#update-namuna-2-btn').prop('disabled', false).text('Update');
        }
    };

    // ====================================================
    // Event Listeners
    // ====================================================
    $(document).on('click', '#save-namuna-2-btn', handleSave);
    $(document).on('click', '#update-namuna-2-btn', handleUpdate);

});
