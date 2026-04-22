$(document).ready(function () {
    // Initialize datepickers for any date fields
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation for the form
    $('#namuna-20-form').validate({
        rules: {
            month: 'required',
            year: {
                required: true,
                number: true,
            },
            quantity: {
                required: true,
                number: true,
            },
            item_description: 'required',
            rate: {
                required: true,
                number: true,
            },
            per_unit: 'required',
            amount: {
                required: true,
                number: true,
            },
            serial_number: 'required',
            length: {
                required: true,
                number: true,
            },
            width: {
                required: true,
                number: true,
            },
            depth: {
                required: true,
                number: true,
            },
            calculated_quantity: {
                required: true,
                number: true,
            },
            total: {
                required: true,
                number: true,
            },
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: {
                required: 'कृपया वर्ष प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            quantity: {
                required: 'कृपया परिमाण प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            item_description: 'कृपया बाब प्रविष्ट करा',
            rate: {
                required: 'कृपया दर प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            per_unit: 'कृपया प्रत्येकी प्रविष्ट करा',
            amount: {
                required: 'कृपया रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            serial_number: 'कृपया क्रमांक प्रविष्ट करा',
            length: {
                required: 'कृपया लांबी प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            width: {
                required: 'कृपया रुंदी प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            depth: {
                required: 'कृपया खोली प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            calculated_quantity: {
                required: 'कृपया परिमाण दशांशात प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            total: {
                required: 'कृपया एकूण प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
        },
    });

    // Save Namuna 20 Entry
    $(document).on('click', '#submit-namuna-20-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-20-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-20-form');
            const namuna20FormData = new FormData(form);

            // Send POST request for saving
            const response = await fetch('/namuna/20/save', {
                method: 'POST',
                body: namuna20FormData,
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
            console.error(`Error while saving the Namuna 20 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 20 Entry
    $(document).on('click', '#update-namuna-20-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            if (!$('#namuna-20-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-20-form');
            const namuna20FormData = new FormData(form);

            // Send PUT request for updating
            const response = await fetch('/namuna/20/update', {
                method: 'PUT',
                body: namuna20FormData,
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
            console.error(`Error while updating the Namuna 20 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});
