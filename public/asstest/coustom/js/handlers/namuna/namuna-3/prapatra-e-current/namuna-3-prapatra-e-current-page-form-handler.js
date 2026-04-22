$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (prapatraECurrentFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-prapatra-e-current-btn');
            const updateButton = $('#update-prapatra-e-current-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!prapatraECurrentFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!prapatraECurrentFormData.get('id');

            const url = isEdit
                ? `/namuna/3/prapatra-e-current/update`
                : `/namuna/3/prapatra-e-current/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: prapatraECurrentFormData,
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
            // Re-enable the buttons after the API call is complete
            $('#save-prapatra-e-current-btn').prop('disabled', false);
            $('#update-prapatra-e-current-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-prapatra-e-current-btn', function (e) {
        e.preventDefault();
        const prapatraECurrentFormData = new FormData(
            document.getElementById('prapatra-e-current-form')
        );
        handleSaveUpdate(prapatraECurrentFormData);
    });

    $(document).on('click', '#update-prapatra-e-current-btn', function (e) {
        e.preventDefault();
        const prapatraECurrentFormData = new FormData(
            document.getElementById('prapatra-e-current-form')
        );
        handleSaveUpdate(prapatraECurrentFormData);
    });
});
