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

    // jQuery validation for the Namuna 32 form
    $('#namuna-32-form').validate({
        rules: {
            month: 'required',
            year: { required: true, number: true },
            amount_refund_order: 'required',
            certificate_number: 'required',
            receipt_number: 'required',
            given_original_amount_date: 'required',
            amount: { required: true, number: true },
            amount_to_return: { required: true, number: true },
            depositor_name: 'required',
            refund_person_name: 'required',
            location: 'required',
            date_of_receipt: 'required',
            remarks: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: { required: 'कृपया वर्ष प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            amount_refund_order: 'कृपया रकमेच्या परताव्यासाठीचा आदेश प्रविष्ट करा',
            certificate_number: 'कृपया प्रमाणक क्रमांक प्रविष्ट करा',
            receipt_number: 'कृपया पावती क्रमांक प्रविष्ट करा',
            given_original_amount_date: 'कृपया दिलेल्या मूळ रक्कम दिनांक निवडा',
            amount: { required: 'कृपया रक्कम प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            amount_to_return: { required: 'कृपया परत करावयाची रक्कम प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            depositor_name: 'कृपया ठेविदाराचे नाव प्रविष्ट करा',
            refund_person_name: 'कृपया परतावा करणाऱ्या करणाऱ्याचे नाव प्रविष्ट करा',
            location: 'कृपया ठिकाण प्रविष्ट करा',
            date_of_receipt: 'कृपया पावती दिनांक निवडा',
            remarks: 'कृपया शेरा प्रविष्ट करा',
        },
    });

    // Save Namuna 32 Entry
    $('#submit-namuna-32-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-32-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-32-form')[0];
            let namuna32FormData = new FormData(form);

            // Format date fields before sending the data
            const givenOriginalAmountDate = namuna32FormData.get('given_original_amount_date');
            const dateOfReceipt = namuna32FormData.get('date_of_receipt');

            // Reformat dates before setting them back into FormData
            namuna32FormData.set('given_original_amount_date', formatDate(givenOriginalAmountDate));
            namuna32FormData.set('date_of_receipt', formatDate(dateOfReceipt));

            // Send POST request for saving
            const response = await fetch('/namuna/32/save', {
                method: 'POST',
                body: namuna32FormData,
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
            console.error(`Error while saving the Namuna 32 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 32 Entry
    $('#update-namuna-32-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-32-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-32-form')[0];
            let namuna32FormData = new FormData(form);

            // Format date fields before sending the data
            const givenOriginalAmountDate = namuna32FormData.get('given_original_amount_date');
            const dateOfReceipt = namuna32FormData.get('date_of_receipt');

            // Reformat dates before setting them back into FormData
            namuna32FormData.set('given_original_amount_date', formatDate(givenOriginalAmountDate));
            namuna32FormData.set('date_of_receipt', formatDate(dateOfReceipt));

            // Send PUT request for updating
            const response = await fetch(`/namuna/32/update`, {
                method: 'PUT',
                body: namuna32FormData,
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
            console.error(`Error while updating the Namuna 32 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);     
        }
    });
});
