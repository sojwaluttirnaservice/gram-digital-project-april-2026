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

    // jQuery validation for the Namuna 11 form
    $('#namuna-11-form').validate({
        rules: {
            month: 'required',
            year: { required: true, number: true },
            name_of_person: 'required',
            address_of_person: 'required',
            nature_of_demand: 'required',
            authority_for_demand: 'required',
            demand_installment: { required: true, number: true },
            demand_amount: { required: true, number: true },
            demand_total_amount: { required: true, number: true },
            bill_number: 'required',
            bill_date: 'required',
            receipt_number: 'required',
            receipt_date: 'required',
            recovered_amount: { required: true, number: true },
            order_number: 'required',
            order_date: 'required',
            exemption_amount: { required: true, number: true },
            remaining_amount: { required: true, number: true },
            remarks: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: { required: 'कृपया वर्ष प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            name_of_person: 'कृपया व्यक्तीचे नाव प्रविष्ट करा',
            address_of_person: 'कृपया पत्याचा तपशील प्रविष्ट करा',
            nature_of_demand: 'कृपया मागणीचा प्रकार प्रविष्ट करा',
            authority_for_demand: 'कृपया अधिकार प्रविष्ट करा',
            demand_installment: { required: 'कृपया हप्त्याचा नंबर प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            demand_amount: { required: 'कृपया मागणीची रक्कम प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            demand_total_amount: { required: 'कृपया एकूण मागणीची रक्कम प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            bill_number: 'कृपया बिल नंबर प्रविष्ट करा',
            bill_date: 'कृपया बिल तारीख निवडा',
            receipt_number: 'कृपया रिसीट नंबर प्रविष्ट करा',
            receipt_date: 'कृपया रिसीट तारीख निवडा',
            recovered_amount: { required: 'कृपया वसुल रक्कम प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            order_number: 'कृपया आदेश नंबर प्रविष्ट करा',
            order_date: 'कृपया आदेश तारीख निवडा',
            exemption_amount: { required: 'कृपया सूट रक्कम प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            remaining_amount: { required: 'कृपया उर्वरित रक्कम प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            remarks: 'कृपया शेरा प्रविष्ट करा',
        },
    });

    // Save Namuna 11 Entry
    $('#submit-namuna-11-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-11-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-11-form')[0];
            let namuna11FormData = new FormData(form);

            // Format date fields before sending the data
            const bill_date = namuna11FormData.get('bill_date');
            const receipt_date = namuna11FormData.get('receipt_date');
            const order_date = namuna11FormData.get('order_date');

            // Reformat dates before setting them back into FormData
            namuna11FormData.set('bill_date', formatDate(bill_date));
            namuna11FormData.set('receipt_date', formatDate(receipt_date));
            namuna11FormData.set('order_date', formatDate(order_date));

            // Send POST request for saving
            const response = await fetch('/namuna/11/save', {
                method: 'POST',
                body: namuna11FormData,
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
            console.error(`Error while saving the Namuna 11 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 11 Entry
    $('#update-namuna-11-entry').on('click', async function (e) {
        e.preventDefault();

        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-11-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-11-form')[0];
            let namuna11FormData = new FormData(form);

            // Format date fields before sending the data
            const bill_date = namuna11FormData.get('bill_date');
            const receipt_date = namuna11FormData.get('receipt_date');
            const order_date = namuna11FormData.get('order_date');

            // Reformat dates before setting them back into FormData
            namuna11FormData.set('bill_date', formatDate(bill_date));
            namuna11FormData.set('receipt_date', formatDate(receipt_date));
            namuna11FormData.set('order_date', formatDate(order_date));

            // Send PUT request for updating
            const response = await fetch('/namuna/11/update', {
                method: 'PUT', // Using PUT for update
                body: namuna11FormData,
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
            console.error(`Error while updating the Namuna 11 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });
});
