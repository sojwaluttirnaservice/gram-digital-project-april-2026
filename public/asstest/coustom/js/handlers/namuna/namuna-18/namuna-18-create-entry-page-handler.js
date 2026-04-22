$(document).ready(function () {
    // Initialize datepicker for the `date` field
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation for the form
    $('#namuna-18-form').validate({
        rules: {
            month: 'required',
            year: 'required',
            recieved_date: 'required',
            cheque_number: 'required',
            received_from: 'required',
            recieved_amount: {
                required: true,
                number: true,
            },
            recieved_details: 'required',
            total_recieved_amount: {
                required: true,
                number: true,
            },
            spending_date: 'required',
            certificate_number: 'required',
            given_to: 'required',
            expense_amount: {
                required: true,
                number: true,
            },
            total_expense_amount: {
                required: true,
                number: true,
            },
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: 'कृपया वर्ष निवडा',
            recieved_date: 'कृपया प्राप्त तारीख प्रविष्ट करा',
            cheque_number: 'कृपया धनादेश क्रमांक प्रविष्ट करा',
            received_from: 'कृपया प्राप्तकर्ता तपशील प्रविष्ट करा',
            recieved_amount: {
                required: 'कृपया प्राप्त रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            recieved_details: 'कृपया प्राप्त तपशील प्रविष्ट करा',
            total_recieved_amount: {
                required: 'कृपया एकूण प्राप्त रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            spending_date: 'कृपया खर्च तारीख प्रविष्ट करा',
            certificate_number: 'कृपया प्रमाणपत्र क्रमांक प्रविष्ट करा',
            given_to: 'कृपया कोणाला दिले हे प्रविष्ट करा',
            expense_amount: {
                required: 'कृपया खर्च रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            total_expense_amount: {
                required: 'कृपया एकूण खर्च रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
        },
    });

    // Save Namuna 18 Entry
    $(document).on('click', '#submit-namuna-18-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-18-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-18-form');
            const namuna18FormData = new FormData(form);

            // Formatting the date
            namuna18FormData.set('recieved_date', formatDate(namuna18FormData.get('recieved_date')));
            namuna18FormData.set('spending_date', formatDate(namuna18FormData.get('spending_date')));

            const response = await fetch('/namuna/18/save', {
                method: 'POST',
                body: namuna18FormData,
            });

            const { call, message } = await response.json();

            if (call) {
                alertjs.success(
                    {
                        t: 'SUCCESS',
                        m: 'सुरक्षितपणे जतन केले',
                    },
                    () => {
                        window.location.reload();
                    }
                );
            } else {
                alertjs.warning({
                    t: 'ERROR',
                    m: message || 'जतन करण्यात अयशस्वी',
                });
            }
        } catch (err) {
            console.error(`Error while saving the Namuna 18 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 18 Entry
    $(document).on('click', '#update-namuna-18-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            if (!$('#namuna-18-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const namuna18FormData = new FormData(document.getElementById('namuna-18-form'));

            // Formatting the date
            namuna18FormData.set('recieved_date', formatDate(namuna18FormData.get('recieved_date')));
            namuna18FormData.set('spending_date', formatDate(namuna18FormData.get('spending_date')));

            const response = await fetch('/namuna/18/update', {
                method: 'PUT',
                body: namuna18FormData,
            });

            const { call, message } = await response.json();

            if (call) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: 'सुरक्षितपणे अद्यतनित केले',
                });
            } else {
                alertjs.warning({
                    t: 'ERROR',
                    m: message || 'अद्यतन करण्यात अयशस्वी',
                });
            }
        } catch (err) {
            console.error(`Error while updating the Namuna 18 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});
