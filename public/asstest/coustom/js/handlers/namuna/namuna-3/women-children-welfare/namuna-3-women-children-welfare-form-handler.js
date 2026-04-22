$(() => {
    // Format the date if needed
    const _formatDate = (_date) =>
        _date?.trim() ? _date?.trim().split('-').reverse().join('-') : '';

    // Initialize the date picker
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // Disable the buttons during API calls
    const toggleButtonState = (isDisabled) => {
        $('#save-women-children-welfare-btn').prop('disabled', isDisabled);
        $('#update-women-children-welfare-btn').prop('disabled', isDisabled);
    };

    const handleSaveUpdate = async (formData) => {
        try {
            // Validate required fields
            if (!formData.get('year')) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                return;
            }

            // Prepare the data before submitting
            const isEdit = !!formData.get('id');

            formData.set(
                'establishment_date',
                _formatDate(formData.get('establishment_date'))
            );
            formData.set(
                'last_election_date',
                _formatDate(formData.get('last_election_date'))
            );
            formData.set(
                'regular_term_expiry_date',
                _formatDate(formData.get('regular_term_expiry_date'))
            );

            // Determine the correct API URL based on whether it's an edit or new submission
            const url = isEdit ? `/namuna/3/wc-welfare/update` : `/namuna/3/wc-welfare/save`;

            // Disable buttons to prevent multiple submissions
            toggleButtonState(true);

            // Make the API call
            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: formData,
            });

            const { call, message } = await _res.json();

            // Handle the API response
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
            toggleButtonState(false);
        }
    };

    // Handle the form submission when the Save button is clicked
    $(document).on('click', '#save-women-children-welfare-btn', function (e) {
        e.preventDefault();
        const formData = new FormData(document.getElementById('women-children-welfare-form'));
        handleSaveUpdate(formData);
    });

    // Handle the form submission when the Update button is clicked
    $(document).on('click', '#update-women-children-welfare-btn', function (e) {
        e.preventDefault();
        const formData = new FormData(document.getElementById('women-children-welfare-form'));
        handleSaveUpdate(formData);
    });
});
