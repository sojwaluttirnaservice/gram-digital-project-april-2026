$(document).ready(function () {
    // Initialize datepicker for any date fields
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy', // Changed format to match 'YYYY-MM-DD'
        changeMonth: true,
        changeYear: true,
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation for the form
    $('#namuna-1-other-expenditures-form').validate({
        rules: {
            year: { required: true, number: true },
            monthly_resolution: 'required',
            monthly_resolution_date: 'required',
            backward_class_15_percent_expenditure: { required: true, number: true },
            women_and_child_welfare_10_percent_expenditure: { required: true, number: true },
            disabled_people_3_percent_expenditure: { required: true, number: true },
            district_rural_development_fund_contribution_025_percent: {
                required: true,
                number: true,
            },
            remarks: 'required',
        },
        messages: {
            year: { required: 'कृपया वर्ष प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            monthly_resolution: 'कृपया मासिक ठराव प्रविष्ट करा',
            monthly_resolution_date: 'कृपया मासिक ठराव तारीख निवडा',
            backward_class_15_percent_expenditure: {
                required: 'कृपया मागासवर्गीय खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            women_and_child_welfare_10_percent_expenditure: {
                required: 'कृपया महिला व बाल कल्याण खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            disabled_people_3_percent_expenditure: {
                required: 'कृपया अपंग कल्याण खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            district_rural_development_fund_contribution_025_percent: {
                required: 'कृपया जिल्हा ग्रामविकास निधी वर्गणी प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            remarks: 'कृपया शेरा प्रविष्ट करा',
        },
    });

    // Save Namuna 24 Entry
    $('#submit-namuna-1-other-expenditures-entry-btn').on('click', async function (e) {
        e.preventDefault();

        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-1-other-expenditures-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-1-other-expenditures-form')[0];
            let namuna1OtherExpendituresFormData = new FormData(form);

            // Format date fields before sending the data
            const monthly_resolution_date =
                namuna1OtherExpendituresFormData.get('monthly_resolution_date');

            // Reformat the date before setting it back into FormData
            namuna1OtherExpendituresFormData.set(
                'monthly_resolution_date',
                formatDate(monthly_resolution_date)
            );

            // Send POST request for saving
            const response = await fetch('/namuna/1/expenditure/other-expenditures/save', {
                method: 'POST',
                body: namuna1OtherExpendituresFormData,
            });

            const { call, message } = await response.json();

            if (call) {
                alertjs.success({ t: 'SUCCESS', m: 'सुरक्षितपणे जतन केले' }, () => {
                    window.location.reload();
                });
            } else {
                alertjs.warning({ t: 'ERROR', m: message || 'जतन करण्यात अयशस्वी' });
            }
        } catch (err) {
            console.error(`Error while saving the Namuna 24 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 24 Entry
    $('#update-namuna-1-other-expenditures-entry-btn').on('click', async function (e) {
        e.preventDefault();

        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-1-other-expenditures-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-1-other-expenditures-form')[0];
            let namuna1OtherExpendituresFormData = new FormData(form);

            // Format date fields before sending the data
            const monthly_resolution_date =
                namuna1OtherExpendituresFormData.get('monthly_resolution_date');

            // Reformat the date before setting it back into FormData
            namuna1OtherExpendituresFormData.set(
                'monthly_resolution_date',
                formatDate(monthly_resolution_date)
            );

            // alert(formatDate(monthly_resolution_date))

            // Send PUT request for updating
            const response = await fetch(`/namuna/1/expenditure/other-expenditures/update`, {
                method: 'PUT', // Using PUT for update
                body: namuna1OtherExpendituresFormData,
            });

            const { call, message } = await response.json();

            if (call) {
                alertjs.success({ t: 'SUCCESS', m: 'सुरक्षितपणे अपडेट केले' }, () => {
                    window.location.reload();
                });
            } else {
                alertjs.warning({ t: 'ERROR', m: message || 'अपडेट करण्यात अयशस्वी' });
            }
        } catch (err) {
            console.error(`Error while updating the Namuna 24 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });
});
