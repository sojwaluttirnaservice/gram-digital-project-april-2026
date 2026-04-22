$(document).ready(function () {
    // Initialize datepicker for the `audit_report_year` field
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation for the form
    $('#namuna-27-form').validate({
        rules: {
            month: 'required',
            audit_report_year: 'required',
            paragraph_number: 'required',
            paragraphs_resolved_by_gp: {
                required: true,
                number: true,
            },
            objections_resolved_by_committee: {
                required: true,
                number: true,
            },
            objections_resolved_by_auditor: {
                required: true,
                number: true,
            },
            pending_objections: {
                required: true,
                number: true,
            },
            reasons_for_non_compliance: 'required',
            remarks: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            audit_report_year: 'कृपया वर्ष निवडा',
            paragraph_number: 'कृपया परिच्छेद क्रमांक प्रविष्ट करा',
            paragraphs_resolved_by_gp: {
                required: 'कृपया ग्रामपंचायतीने पूर्तता केलेले परिच्छेद प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            objections_resolved_by_committee: {
                required: 'कृपया पंचायत समितीने पूर्तता मान्य केलेली संख्या प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            objections_resolved_by_auditor: {
                required: 'कृपया लेख परीक्षकांनी पूर्तता मान्य केलेली संख्या प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            pending_objections: {
                required: 'कृपया प्रलंबित आक्षेप प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            reasons_for_non_compliance: 'कृपया पुर्तता न केल्याबद्दल कारणे प्रविष्ट करा',
            remarks: 'कृपया शेरा प्रविष्ट करा',
        },
    });

    // Save Namuna 27 Entry
    $(document).on('click', '#submit-namuna-27-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-27-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-27-form');
            const namuna27FormData = new FormData(form);

            const response = await fetch('/namuna/27/save', {
                method: 'POST',
                body: namuna27FormData,
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
            console.error(`Error while saving the Namuna 27 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 27 Entry
    $(document).on('click', '#update-namuna-27-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            if (!$('#namuna-27-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const namuna27FormData = new FormData(document.getElementById('namuna-27-form'));
            const response = await fetch('/namuna/27/update', {
                method: 'PUT',
                body: namuna27FormData,
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
            console.error(`Error while updating the Namuna 27 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});