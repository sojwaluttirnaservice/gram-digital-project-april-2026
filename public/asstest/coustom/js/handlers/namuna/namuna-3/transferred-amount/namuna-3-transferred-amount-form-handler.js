$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (transferredAmountFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-transferred-amount-btn');
            const updateButton = $('#update-transferred-amount-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!transferredAmountFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!transferredAmountFormData.get('id');

            const url = isEdit
                ? `/namuna/3/transferred-amount/update`
                : `/namuna/3/transferred-amount/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: transferredAmountFormData,
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
            $('#save-transferred-amount-btn').prop('disabled', false);
            $('#update-transferred-amount-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-transferred-amount-btn', function (e) {
        e.preventDefault();
        const transferredAmountFormData = new FormData(
            document.getElementById('transferred-amount-form')
        );
        handleSaveUpdate(transferredAmountFormData);
    });

    $(document).on('click', '#update-transferred-amount-btn', function (e) {
        e.preventDefault();
        const transferredAmountFormData = new FormData(
            document.getElementById('transferred-amount-form')
        );
        handleSaveUpdate(transferredAmountFormData);
    });
});
