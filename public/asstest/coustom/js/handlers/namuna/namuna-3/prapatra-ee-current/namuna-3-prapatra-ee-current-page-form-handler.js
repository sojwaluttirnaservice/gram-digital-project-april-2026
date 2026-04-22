$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (prapatraEECurrentFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-prapatra-ee-current-btn');
            const updateButton = $('#update-prapatra-ee-current-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!prapatraEECurrentFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!prapatraEECurrentFormData.get('id');

            const url = isEdit
                ? `/namuna/3/prapatra-ee-current/update`
                : `/namuna/3/prapatra-ee-current/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: prapatraEECurrentFormData,
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
            $('#save-prapatra-ee-current-btn').prop('disabled', false);
            $('#update-prapatra-ee-current-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-prapatra-ee-current-btn', function (e) {
        e.preventDefault();
        const prapatraEECurrentFormData = new FormData(
            document.getElementById('prapatra-ee-current-form')
        );
        handleSaveUpdate(prapatraEECurrentFormData);
    });

    $(document).on('click', '#update-prapatra-ee-current-btn', function (e) {
        e.preventDefault();
        const prapatraEECurrentFormData = new FormData(
            document.getElementById('prapatra-ee-current-form')
        );
        handleSaveUpdate(prapatraEECurrentFormData);
    });
});
