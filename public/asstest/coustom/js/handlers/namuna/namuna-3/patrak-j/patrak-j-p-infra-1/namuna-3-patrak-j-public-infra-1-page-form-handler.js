$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (patrakJPublicInfra1FormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-patrak-j-public-infra-1-btn');
            const updateButton = $('#update-patrak-j-public-infra-1-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!patrakJPublicInfra1FormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!patrakJPublicInfra1FormData.get('id');

            const url = isEdit
                ? `/namuna/3/patrak-j-p-infra-1/update`
                : `/namuna/3/patrak-j-p-infra-1/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: patrakJPublicInfra1FormData,
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
            $('#save-patrak-j-public-infra-1-btn').prop('disabled', false);
            $('#update-patrak-j-public-infra-1-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-patrak-j-public-infra-1-btn', function (e) {
        e.preventDefault();
        const patrakJPublicInfra1FormData = new FormData(
            document.getElementById('patrak-j-public-infra-1-form')
        );
        handleSaveUpdate(patrakJPublicInfra1FormData);
    });

    $(document).on('click', '#update-patrak-j-public-infra-1-btn', function (e) {
        e.preventDefault();
        const patrakJPublicInfra1FormData = new FormData(
            document.getElementById('patrak-j-public-infra-1-form')
        );
        handleSaveUpdate(patrakJPublicInfra1FormData);
    });
});
