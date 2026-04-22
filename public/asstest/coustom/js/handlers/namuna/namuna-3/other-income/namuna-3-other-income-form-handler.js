$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (otherIncomeFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-other-income-btn');
            const updateButton = $('#update-other-income-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!otherIncomeFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!otherIncomeFormData.get('id');
            
            const url = isEdit ? `/namuna/3/other-income/update` : `/namuna/3/other-income/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: otherIncomeFormData,
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
            $('#save-other-income-btn').prop('disabled', false);
            $('#update-other-income-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-other-income-btn', function (e) {
        e.preventDefault();
        const otherIncomeFormData = new FormData(document.getElementById('other-income-form'));
        handleSaveUpdate(otherIncomeFormData);
    });

    $(document).on('click', '#update-other-income-btn', function (e) {
        e.preventDefault();
        const otherIncomeFormData = new FormData(document.getElementById('other-income-form'));
        handleSaveUpdate(otherIncomeFormData);
    });
});
