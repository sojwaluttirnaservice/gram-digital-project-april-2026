$(document).ready(function () {
    // Initialize datepicker for any date fields
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation for the Namuna 14 form
    $('#namuna-14-form').validate({
        rules: {
            month: 'required',
            year: { required: true, number: true },
            date: 'required',
            certificate_number: 'required',
            received_stamp_value: { required: true, number: true },
            letter_number: 'required',
            receipt_number: 'required',
            receipt_date: 'required',
            used_stamp_value: { number: true },
            daily_balance: { required: true, number: true },
            remarks: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: { required: 'कृपया वर्ष प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            date: 'कृपया दिनांक निवडा',
            certificate_number: 'कृपया प्रमाणक क्रमांक प्रविष्ट करा',
            received_stamp_value: {
                required: 'कृपया मिळालेल्या मुद्रकाची किमत प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            letter_number: 'कृपया पत्र क्रमांक प्रविष्ट करा',
            receipt_number: 'कृपया पावती क्रमांक प्रविष्ट करा',
            receipt_date: 'कृपया पावती दिनांक निवडा',
            used_stamp_value: {
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            daily_balance: {
                required: 'कृपया दैनिक शिल्लक प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            remarks: 'कृपया शेरा प्रविष्ट करा',
        },
    });

    // Save Namuna 14 Entry
    $('#submit-namuna-14-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-14-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-14-form')[0];
            let namuna14FormData = new FormData(form);

            // Format date fields before sending the data
            const date = namuna14FormData.get('date');
            const receipt_date = namuna14FormData.get('receipt_date');

            // Reformat dates before setting them back into FormData
            namuna14FormData.set('date', formatDate(date));
            namuna14FormData.set('receipt_date', formatDate(receipt_date));

            // Send POST request for saving
            const response = await fetch('/namuna/14/save', {
                method: 'POST',
                body: namuna14FormData,
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
            console.error(`Error while saving the Namuna 14 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 14 Entry
    $('#update-namuna-14-entry').on('click', async function (e) {
        e.preventDefault();

        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-14-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-14-form')[0];
            let namuna14FormData = new FormData(form);

            // Format date fields before sending the data
            const date = namuna14FormData.get('date');
            const receipt_date = namuna14FormData.get('receipt_date');

            // Reformat dates before setting them back into FormData
            namuna14FormData.set('date', formatDate(date));
            namuna14FormData.set('receipt_date', formatDate(receipt_date));

            // Send PUT request for updating
            const response = await fetch(`/namuna/14/update`, {
                method: 'PUT', // Using PUT for update
                body: namuna14FormData,
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
            console.error(`Error while updating the Namuna 14 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });
});
