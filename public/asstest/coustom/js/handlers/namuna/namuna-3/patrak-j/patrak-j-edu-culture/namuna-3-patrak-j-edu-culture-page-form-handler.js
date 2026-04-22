$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (patrakJEducationCultureFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-patrak-j-edu-culture-btn');
            const updateButton = $('#update-patrak-j-edu-culture-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!patrakJEducationCultureFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!patrakJEducationCultureFormData.get('id');

            const url = isEdit
                ? `/namuna/3/patrak-j-edu-culture/update`
                : `/namuna/3/patrak-j-edu-culture/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: patrakJEducationCultureFormData,
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
            $('#save-patrak-j-edu-culture-btn').prop('disabled', false);
            $('#update-patrak-j-edu-culture-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-patrak-j-edu-culture-btn', function (e) {
        e.preventDefault();
        const patrakJEducationCultureFormData = new FormData(
            document.getElementById('patrak-j-edu-culture-form')
        );
        handleSaveUpdate(patrakJEducationCultureFormData);
    });

    $(document).on('click', '#update-patrak-j-edu-culture-btn', function (e) {
        e.preventDefault();
        const patrakJEducationCultureFormData = new FormData(
            document.getElementById('patrak-j-edu-culture-form')
        );
        handleSaveUpdate(patrakJEducationCultureFormData); 
    });
});
