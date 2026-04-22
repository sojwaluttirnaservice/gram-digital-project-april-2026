$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (initialBalanceFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-initial-balance-btn');
            const updateButton = $('#update-initial-balance-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!initialBalanceFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!initialBalanceFormData.get('id');

            const url = isEdit
                ? `/namuna/3/initial-balance/update`
                : `/namuna/3/initial-balance/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: initialBalanceFormData,
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
            $('#save-initial-balance-btn').prop('disabled', false);
            $('#update-initial-balance-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-initial-balance-btn', function (e) {
        e.preventDefault();
        const initialBalanceFormData = new FormData(
            document.getElementById('initial-balance-form')
        );
        handleSaveUpdate(initialBalanceFormData);
    });

    $(document).on('click', '#update-initial-balance-btn', function (e) {
        e.preventDefault();
        const initialBalanceFormData = new FormData(
            document.getElementById('initial-balance-form')
        );
        handleSaveUpdate(initialBalanceFormData);
    });
});
