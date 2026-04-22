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
    $('#namuna-30-form').validate({
        rules: {
            month: 'required',
            audit_report_year: {
                required: true,
                number: true,
            },
            objection_count: {
                required: true,
                number: true,
            },
            objection_sequence: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            audit_report_year: {
                required: 'कृपया लेखापरीक्षण अहवाल वर्ष प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            objection_count: {
                required: 'कृपया आक्षेपांची संख्या प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            objection_sequence: 'कृपया आक्षेप अनुक्रमांक प्रविष्ट करा',
        },
    });

    // Save Namuna 30 Entry
    $(document).on('click', '#submit-namuna-30-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-30-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-30-form');
            const namuna30FormData = new FormData(form);

            namuna30FormData.set(
                'report_received_date',
                formatDate(namuna30FormData.get('report_received_date'))
            );
            namuna30FormData.set(
                'resolved_objection_outward_date',
                formatDate(namuna30FormData.get('resolved_objection_outward_date'))
            );
            namuna30FormData.set(
                'resolution_forwarded_date',
                formatDate(namuna30FormData.get('resolution_forwarded_date'))
            );

            // Send POST request for saving
            const response = await fetch('/namuna/30/save', {
                method: 'POST',
                body: namuna30FormData,
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
            console.error(`Error while saving the Namuna 30 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 30 Entry
    $(document).on('click', '#update-namuna-30-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            if (!$('#namuna-30-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-30-form');
            const namuna30FormData = new FormData(form);
            namuna30FormData.set(
                'report_received_date',
                formatDate(namuna30FormData.get('report_received_date'))
            );
            namuna30FormData.set(
                'resolved_objection_outward_date',
                formatDate(namuna30FormData.get('resolved_objection_outward_date'))
            );
            namuna30FormData.set(
                'resolution_forwarded_date',
                formatDate(namuna30FormData.get('resolution_forwarded_date'))
            );

            // Send PUT request for updating
            const response = await fetch('/namuna/30/update', {
                method: 'PUT',
                body: namuna30FormData,
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
            console.error(`Error while updating the Namuna 30 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});
