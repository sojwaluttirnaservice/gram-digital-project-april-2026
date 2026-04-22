$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (stateAuxiliaryGrantsFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-state-auxiliary-grants-btn');
            const updateButton = $('#update-state-auxiliary-grants-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!stateAuxiliaryGrantsFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!stateAuxiliaryGrantsFormData.get('id');

            const url = isEdit ? `/namuna/3/state-auxiliary-grants/update` : `/namuna/3/state-auxiliary-grants/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: stateAuxiliaryGrantsFormData,
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
            $('#save-state-auxiliary-grants-btn').prop('disabled', false);
            $('#update-state-auxiliary-grants-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-state-auxiliary-grants-btn', function (e) {
        e.preventDefault();
        const stateAuxiliaryGrantsFormData = new FormData(document.getElementById('state-auxiliary-grants-form'));
        handleSaveUpdate(stateAuxiliaryGrantsFormData);
    });

    $(document).on('click', '#update-state-auxiliary-grants-btn', function (e) {
        e.preventDefault();
        const stateAuxiliaryGrantsFormData = new FormData(document.getElementById('state-auxiliary-grants-form'));
        handleSaveUpdate(stateAuxiliaryGrantsFormData);
    });
});
