$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (patrakJPublicInfra2FormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-patrak-j-public-infra-2-btn');
            const updateButton = $('#update-patrak-j-public-infra-2-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!patrakJPublicInfra2FormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!patrakJPublicInfra2FormData.get('id');

            const url = isEdit
                ? `/namuna/3/patrak-j-p-infra-2/update`
                : `/namuna/3/patrak-j-p-infra-2/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: patrakJPublicInfra2FormData,
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
            $('#save-patrak-j-public-infra-2-btn').prop('disabled', false);
            $('#update-patrak-j-public-infra-2-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-patrak-j-public-infra-2-btn', function (e) {
        e.preventDefault();
        const patrakJPublicInfra2FormData = new FormData(
            document.getElementById('patrak-j-public-infra-2-form')
        );
        handleSaveUpdate(patrakJPublicInfra2FormData);
    });

    $(document).on('click', '#update-patrak-j-public-infra-2-btn', function (e) {
        e.preventDefault();
        const patrakJPublicInfra2FormData = new FormData(
            document.getElementById('patrak-j-public-infra-2-form')
        );
        handleSaveUpdate(patrakJPublicInfra2FormData);
    });
});
