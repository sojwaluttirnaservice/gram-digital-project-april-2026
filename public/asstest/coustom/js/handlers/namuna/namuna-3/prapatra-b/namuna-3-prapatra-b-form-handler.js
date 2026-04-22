$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (prapatraBFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-prapatra-b-btn');
            const updateButton = $('#update-prapatra-b-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!prapatraBFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!prapatraBFormData.get('id');

            prapatraBFormData.set(
                'establishment_date',
                _formatDate(prapatraBFormData.get('establishment_date'))
            );
            prapatraBFormData.set(
                'last_election_date',
                _formatDate(prapatraBFormData.get('last_election_date'))
            );
            prapatraBFormData.set(
                'regular_term_expiry_date',
                _formatDate(prapatraBFormData.get('regular_term_expiry_date'))
            );

            const url = isEdit ? `/namuna/3/prapatra-b/update` : `/namuna/3/prapatra-b/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: prapatraBFormData,
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
            $('#save-prapatra-b-btn').prop('disabled', false);
            $('#update-prapatra-b-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-prapatra-b-btn', function (e) {
        e.preventDefault();
        const prapatraBFormData = new FormData(document.getElementById('prapatra-b-form'));
        handleSaveUpdate(prapatraBFormData);
    });

    $(document).on('click', '#update-prapatra-b-btn', function (e) {
        e.preventDefault();
        const prapatraBFormData = new FormData(document.getElementById('prapatra-b-form'));
        handleSaveUpdate(prapatraBFormData);
    });
});
