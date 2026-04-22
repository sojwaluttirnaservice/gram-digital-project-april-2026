$(document).ready(function () {
    // Initialize datepickers for the fields
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation for the form
    $('#namuna-20c-form').validate({
        rules: {
            month: 'required',
            year: 'required',
            measurement: 'required',
            work_description: 'required',
            unit: 'required',
            total_measurement: {
                required: true,
                number: true,
            },
            total_quantity: {
                required: true,
                number: true,
            },
            grand_total: {
                required: true,
                number: true,
            },
            rate: {
                required: true,
                number: true,
            },
            amount: {
                required: true,
                number: true,
            },
            remarks: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: 'कृपया वर्ष निवडा',
            measurement: 'कृपया मोजमाप निवडा',
            work_description: 'कृपया कामाचे वर्णन प्रविष्ट करा',
            unit: 'कृपया एकक निवडा',
            total_measurement: {
                required: 'कृपया एकूण मोजमाप प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            total_quantity: {
                required: 'कृपया एकूण परिमाण प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            grand_total: {
                required: 'कृपया एकूण रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            rate: {
                required: 'कृपया दर प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            amount: {
                required: 'कृपया रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            remarks: 'कृपया निरीक्षण प्रविष्ट करा',
        },
    });

    // Save Namuna 20c Entry
    $(document).on('click', '#submit-namuna-20c-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-20c-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-20c-form');
            const namuna20cFormData = new FormData(form);
            // Before sending the form data, reformat all date fields
            namuna20cFormData.set(
                'maturity_date',
                formatDate(namuna20cFormData.get('maturity_date'))
            );
            namuna20cFormData.set(
                'interest_earned_date',
                formatDate(namuna20cFormData.get('interest_earned_date'))
            );
            namuna20cFormData.set(
                'transfer_promotion_date',
                formatDate(namuna20cFormData.get('transfer_promotion_date'))
            );

            const response = await fetch('/namuna/20/c/save', {
                method: 'POST',
                body: namuna20cFormData,
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
            console.error(`Error while saving the Namuna 20c entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 20c Entry
    $(document).on('click', '#update-namuna-20c-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            // Form validation
            if (!$('#namuna-20c-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            // Collect form data
            const namuna20cFormData = new FormData(document.getElementById('namuna-20c-form'));

            // Reformat all date fields before sending
            namuna20cFormData.set(
                'maturity_date',
                formatDate(namuna20cFormData.get('maturity_date'))
            );
            namuna20cFormData.set(
                'interest_earned_date',
                formatDate(namuna20cFormData.get('interest_earned_date'))
            );
            namuna20cFormData.set(
                'transfer_promotion_date',
                formatDate(namuna20cFormData.get('transfer_promotion_date'))
            );

            // Send PUT request for updating
            const response = await fetch('/namuna/20/c/update', {
                method: 'PUT',
                body: namuna20cFormData,
            });

            const { call, message } = await response.json();

            if (call) {
                alertjs.success(
                    {
                        t: 'SUCCESS',
                        m: 'सुरक्षितपणे अद्यतनित केले',
                    },
                    () => {
                        window.location.reload();
                    }
                );
            } else {
                alertjs.warning({
                    t: 'ERROR',
                    m: message || 'अद्यतन करण्यात अयशस्वी',
                });
            }
        } catch (err) {
            console.error(`Error while updating the Namuna 20c entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});
