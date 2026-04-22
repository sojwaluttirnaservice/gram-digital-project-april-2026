$(document).ready(function () {
    // Initialize datepicker for the `order_date` and `appointment_date` fields
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation for the form
    $('#namuna-33-form').validate({
        rules: {
            month: 'required',
            year: 'required',
            land_or_road_details: 'required',
            tree_type: 'required',
            tree_count: {
                required: true,
                number: true,
            },
            expected_annual_income: {
                required: true,
                number: true,
            },
            actual_income_received: {
                required: true,
                number: true,
            },
            tree_cut_or_destroyed_details: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: 'कृपया वर्ष निवडा',
            land_or_road_details: 'कृपया जमिनीचा / रस्त्याचा तपशिल प्रविष्ट करा',
            tree_type: 'कृपया वृक्षाचा प्रकार प्रविष्ट करा',
            tree_count: {
                required: 'कृपया वृक्षाची संख्या प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            expected_annual_income: {
                required: 'कृपया अपेक्षित वार्षिक उत्पन्न प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            actual_income_received: {
                required: 'कृपया प्रत्यक्ष प्राप्त उत्पन्न प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            tree_cut_or_destroyed_details: 'कृपया वृक्ष तोडल्यास नष्ट झाल्यास तपशिल प्रविष्ट करा',
        },
    });

    // Save Namuna 33 Entry
    $(document).on('click', '#submit-namuna-33-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-33-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-33-form');
            const namuna33FormData = new FormData(form);

            const response = await fetch('/namuna/33/save', {
                method: 'POST',
                body: namuna33FormData,
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
            console.error(`Error while saving the Namuna 33 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 33 Entry
    $(document).on('click', '#update-namuna-33-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            if (!$('#namuna-33-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const namuna33FormData = new FormData(document.getElementById('namuna-33-form'));
            const response = await fetch('/namuna/33/update', {
                method: 'PUT',
                body: namuna33FormData,
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
            console.error(`Error while updating the Namuna 33 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});


