$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (jPatrakMasikSabhaFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-j-patrak-masik-sabha-btn');
            const updateButton = $('#update-j-patrak-masik-sabha-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!jPatrakMasikSabhaFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!jPatrakMasikSabhaFormData.get('id');

          

            const url = isEdit ? `/namuna/3/j-patrak-masik-sabha/update` : `/namuna/3/j-patrak-masik-sabha/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: jPatrakMasikSabhaFormData,
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
            $('#save-j-patrak-masik-sabha-btn').prop('disabled', false);
            $('#update-j-patrak-masik-sabha-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-j-patrak-masik-sabha-btn', function (e) {
        e.preventDefault();
        const jPatrakMasikSabhaFormData = new FormData(document.getElementById('j-patrak-masik-sabha-form'));
        handleSaveUpdate(jPatrakMasikSabhaFormData);
    });

    $(document).on('click', '#update-j-patrak-masik-sabha-btn', function (e) {
        e.preventDefault();
        const jPatrakMasikSabhaFormData = new FormData(document.getElementById('j-patrak-masik-sabha-form'));
        handleSaveUpdate(jPatrakMasikSabhaFormData);
    });
});
