$(() => {
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const handleSaveUpdate = async (gpWaterSupplyFundFormData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-gp-water-supply-fund-btn');
            const updateButton = $('#update-gp-water-supply-fund-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!gpWaterSupplyFundFormData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!gpWaterSupplyFundFormData.get('id');

            const url = isEdit ? `/namuna/3/gp-water-supply-fund/update` : `/namuna/3/gp-water-supply-fund/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: gpWaterSupplyFundFormData,
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
            $('#save-gp-water-supply-fund-btn').prop('disabled', false);
            $('#update-gp-water-supply-fund-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-gp-water-supply-fund-btn', function (e) {
        e.preventDefault();
        const gpWaterSupplyFundFormData = new FormData(document.getElementById('gp-water-supply-fund-form'));
        handleSaveUpdate(gpWaterSupplyFundFormData);
    });

    $(document).on('click', '#update-gp-water-supply-fund-btn', function (e) {
        e.preventDefault();
        const gpWaterSupplyFundFormData = new FormData(document.getElementById('gp-water-supply-fund-form'));
        handleSaveUpdate(gpWaterSupplyFundFormData);
    });
});
