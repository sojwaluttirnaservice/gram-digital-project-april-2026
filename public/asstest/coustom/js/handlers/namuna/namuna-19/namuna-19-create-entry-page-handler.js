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
            date: 'required',
            reference_number: 'required',
            sender_receiver_details: 'required',
            amount: {
                required: true,
                number: true,
            },
            details: 'required',
            total_amount: {
                required: true,
                number: true,
            },
            transaction_type: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: 'कृपया वर्ष निवडा',
            date: 'कृपया दिनांक प्रविष्ट करा',
            reference_number: 'कृपया धनादेश क्रमांक प्रविष्ट करा',
            sender_receiver_details: 'कृपया प्राप्त/दिलेल्या तपशील प्रविष्ट करा',
            amount: {
                required: 'कृपया रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            details: 'कृपया तपशील प्रविष्ट करा',
            total_amount: {
                required: 'कृपया एकूण रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            transaction_type: 'कृपया हिशोब प्रकार निवडा',
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
            namuna18FormData.set('date', formatDate(namuna18FormData.get('date')));

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
            namuna18FormData.set('date', formatDate(namuna18FormData.get('date')));

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
