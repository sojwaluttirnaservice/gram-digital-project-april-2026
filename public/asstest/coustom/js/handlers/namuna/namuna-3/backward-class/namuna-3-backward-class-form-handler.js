$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    // Initialize the datepicker
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (backwardClassFormData) => {
        try {
            // Disable the button before making the API call
            const saveButton = $('#save-backward-class-btn');
            const updateButton = $('#update-backward-class-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!backwardClassFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!backwardClassFormData.get('id');

            const url = isEdit ? `/namuna/3/backward-class/update` : `/namuna/3/backward-class/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: backwardClassFormData,
            });

            const { call, message } = await _res.json();

            if (call) {
                alertjs.success(
                    {
                        t: 'SUCCESS',
                        m: !isEdit ? 'सेव झाले' : 'अपडेट झाले',
                    },
                    () => location.reload()
                );
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: !isEdit ? 'सेव नाही झाले' : 'अपडेट नाही झाले',
                });
            }

        } catch (error) {
            console.error('Error:', error);
            alertjs.warning({
                t: 'Error',
                m: 'काहीतरी चुकले',
            });
        } finally {
            // Re-enable the button after the API call is complete
            $('#save-backward-class-btn').prop('disabled', false);
            $('#update-backward-class-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-backward-class-btn', function (e) {
        e.preventDefault();
        const backwardClassFormData = new FormData(document.getElementById('backward-class-form'));
        handleSaveUpdate(backwardClassFormData);
    });

    $(document).on('click', '#update-backward-class-btn', function (e) {
        e.preventDefault();
        const backwardClassFormData = new FormData(document.getElementById('backward-class-form'));
        handleSaveUpdate(backwardClassFormData);
    });
});
