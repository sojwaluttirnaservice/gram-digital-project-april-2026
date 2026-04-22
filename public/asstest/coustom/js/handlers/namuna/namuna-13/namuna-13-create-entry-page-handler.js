$(document).ready(function () {
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    $(document).on('click', '#show-namuna-13-report-btn', function (e) {
        e.preventDefault();
        const optionValue = +$('[name="show-report-by"]').val();
        // alert(optionValue);

        const reportBaseUrl = '/namuna/13/report';

        if (optionValue == '' || optionValue == '-1') {
            alertjs.warning({
                t: 'WARNING',
                m: 'Select Report Type',
            });
            return;
        }
        switch (optionValue) {
            case 1:
                const selectedYear = $('[name="selected_year"]').val();
                if (selectedYear == '' || selectedYear == '-1') {
                    alertjs.warning({
                        t: 'वर्ष निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?year=${selectedYear}`, '_blank');
                break;

            case 2:
                const fromYear = $('[name="selected_from_year"]').val();
                const toYear = $('[name="selected_to_year"]').val();
                if (fromYear == '' || fromYear == '-1' || toYear == '' || toYear == '-1') {
                    alertjs.warning({
                        t: 'वर्ष श्रेणी निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?fromYear=${fromYear}&toYear=${toYear}`, '_blank');
                break;

            case 3:
                const month = $('[name="selected_month"]').val();
                const year = $('[name="selected_year_2"]').val();
                if (month == '' || month == '-1' || year == '' || year == '-1') {
                    alertjs.warning({
                        t: 'महिना व वर्ष निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?month=${month}&year=${year}`, '_blank');

                break;
        }
    });

    $(document).on('change', '[name="show-report-by"]', function (e) {
        e.preventDefault();

        const selectedOptionValue = $(this).val();

        // alert(selectedOptionValue);
        $('#show-report-by-div div[data-target').css('display', 'none');
        if (selectedOptionValue != -1) {
            $(`#show-report-by-div div[data-target="${selectedOptionValue}"]`).css(
                'display',
                'block'
            );
        }
    });

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy', // Specify your desired date format
        changeMonth: true,
        changeYear: true,
    });

    const formatDate = (_date) =>
        _date && _date?.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation
    $('#namuna-13-form')?.validate({
        rules: {
            post_name: { required: true },

            order_number: { required: true },
            // order_date: {required: true},
            employment_type: { required: true },
            salary_grade: { required: true },
            employee_name: { required: true },
            appointment_date: { required: true },
            retirement_date: { required: false },
        },
        messages: {
            post_name: 'Please enter a post name',
            // month: {
            //     required: 'Please enter a month',
            //     min: 'Month must be at least 1',
            //     max: 'Month cannot be more than 12',
            // },
            // year: 'Please enter a year',
            // post_count: 'Please enter post count',
            // approved_post: 'Please enter approved posts',
            order_number: 'Please enter order number',
            // order_date: 'Please enter order date',
            employment_type: 'Please select an employment type',
            salary_grade: 'Please enter salary grade',
            employee_name: 'Please enter employee name',
            appointment_date: 'Please enter appointment date',
        },
    });

    $(document).on('click', '#submit-namuna-13-entry', async function (e) {
        e.preventDefault();

        // Disable the button to prevent multiple clicks
        const submitButton = $(this);
        submitButton.prop('disabled', true);
        try {
            if (!$('#namuna-13-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'Please fill all required fields',
                });
                // Re-enable the button if the form is invalid
                submitButton.prop('disabled', false);
                return;
            }

            const namuna13FormData = new FormData(document.getElementById('namuna-13-form'));
            // namuna13FormData.set('order_date', formatDate(namuna13FormData.get('order_date')));
            namuna13FormData.set(
                'appointment_date',
                formatDate(namuna13FormData.get('appointment_date'))
            );
            

            const _res = await fetch('/namuna/13/save', {
                method: 'POST',
                body: namuna13FormData,
            });

            const { call, message } = await _res.json();

            if (call) {
                alertjs.success(
                    {
                        t: 'SUCCESS',
                        m: 'Saved Successfully',
                    },
                    () => {
                        document.getElementById('namuna-13-form').reset();
                    }
                );
            } else {
                // Handle unsuccessful save
                alertjs.warning({
                    t: 'ERROR',
                    m: message || 'Failed to save',
                });
            }
        } catch (err) {
            console.log(`Error while saving the namuna 13 entry: ${err}`);

            alertjs.warning({
                t: 'ERROR',
                m: 'Something went wrong',
            });
        } finally {
            // Re-enable the button regardless of the outcome
            submitButton.prop('disabled', false);
        }
    });

    $(document).on('click', '#update-namuna-13-entry', async function (e) {
        e.preventDefault();

        // Disable the button to prevent multiple clicks
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            // Validate the form before making the API call
            if (!$('#namuna-13-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'Please fill all required fields',
                });
                // Re-enable the button if the form is invalid
                updateButton.prop('disabled', false);
                return;
            }

            // Gather form data
            const namuna13FormData = new FormData(document.getElementById('namuna-13-form'));
            namuna13FormData.set('order_date', formatDate(namuna13FormData.get('order_date')));
            namuna13FormData.set(
                'appointment_date',
                formatDate(namuna13FormData.get('appointment_date'))
            );

            namuna13FormData.set(
                'retirement_date',
                formatDate(namuna13FormData.get('retirement_date'))
            );

            // Make the API call to update the entry
            const _res = await fetch('/namuna/13/update', {
                method: 'PUT',
                body: namuna13FormData,
            });

            // Parse the JSON response
            const { call, message } = await _res.json();

            if (call) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: 'Updated Successfully',
                });
            } else {
                // Handle unsuccessful update
                alertjs.warning({
                    t: 'ERROR',
                    m: message || 'Failed to update',
                });
            }
        } catch (err) {
            console.log(`Error while updating the namuna 13 entry: ${err}`);

            alertjs.warning({
                t: 'ERROR',
                m: 'Something went wrong',
            });
        } finally {
            // Re-enable the button regardless of the outcome
            updateButton.prop('disabled', false);
        }
    });
});
