$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });
    
    const handleSaveUpdate = async (prapatraCATaxFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-prapatra-c-a-tax-btn');
            const updateButton = $('#update-prapatra-c-a-tax-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!prapatraCATaxFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!prapatraCATaxFormData.get('id');

            const url = isEdit
                ? `/namuna/3/prapatra-c-a-tax/update`
                : `/namuna/3/prapatra-c-a-tax/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: prapatraCATaxFormData,
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
            $('#save-prapatra-c-a-tax-btn').prop('disabled', false);
            $('#update-prapatra-c-a-tax-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-prapatra-c-a-tax-btn', function (e) {
        e.preventDefault();
        const prapatraCATaxFormData = new FormData(
            document.getElementById('prapatra-c-a-tax-form')
        );
        handleSaveUpdate(prapatraCATaxFormData);
    });

    $(document).on('click', '#update-prapatra-c-a-tax-btn', function (e) {
        e.preventDefault();
        const prapatraCATaxFormData = new FormData(
            document.getElementById('prapatra-c-a-tax-form')
        );
        handleSaveUpdate(prapatraCATaxFormData);
    });
});
