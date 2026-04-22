$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (patrakJCleanlinessFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-patrak-j-cleanliness-btn');
            const updateButton = $('#update-patrak-j-cleanliness-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!patrakJCleanlinessFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!patrakJCleanlinessFormData.get('id');

            patrakJCleanlinessFormData.set(
                'establishment_date',
                _formatDate(patrakJCleanlinessFormData.get('establishment_date'))
            );
            patrakJCleanlinessFormData.set(
                'last_election_date',
                _formatDate(patrakJCleanlinessFormData.get('last_election_date'))
            );
            patrakJCleanlinessFormData.set(
                'regular_term_expiry_date',
                _formatDate(patrakJCleanlinessFormData.get('regular_term_expiry_date'))
            );

            const url = isEdit ? `/namuna/3/patrak-j-cleanliness/update` : `/namuna/3/patrak-j-cleanliness/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: patrakJCleanlinessFormData,
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
            $('#save-patrak-j-cleanliness-btn').prop('disabled', false);
            $('#update-patrak-j-cleanliness-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-patrak-j-cleanliness-btn', function (e) {
        e.preventDefault();
        const patrakJCleanlinessFormData = new FormData(document.getElementById('patrak-j-cleanliness-form'));
        handleSaveUpdate(patrakJCleanlinessFormData);
    });

    $(document).on('click', '#update-patrak-j-cleanliness-btn', function (e) {
        e.preventDefault();
        const patrakJCleanlinessFormData = new FormData(document.getElementById('patrak-j-cleanliness-form'));
        handleSaveUpdate(patrakJCleanlinessFormData);
    });
});
