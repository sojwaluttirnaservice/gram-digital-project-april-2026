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

    // jQuery validation for the form
    $('#namuna-28-form').validate({
        rules: {
            month: 'required',
            year: { required: true, number: true },
            bc_15_provision: { required: false, number: true },
            bc_15_income: { required: false, number: true },
            bc_15_exp_amount: { required: false, number: true },
            bc_15_expenditure_scheme: { required: false, number: true },
            bc_15_expenditure_prev_month: { required: false, number: true },
            bc_15_expenditure_current_month: { required: false, number: true },
            bc_15_total_expenditure: { required: false, number: true },
            bc_15_expenditure_percentage: { required: false, number: true },
            wc_10_provision: { required: false, number: true },
            wc_10_income: { required: false, number: true },
            wc_10_exp_amount: { required: false, number: true },
            wc_10_expenditure_scheme: { required: false, number: true },
            wc_10_expenditure_prev_month: { required: false, number: true },
            wc_10_expenditure_current_month: { required: false, number: true },
            wc_10_total_expenditure: { required: false, number: true },
            wc_10_expenditure_percentage: { required: false, number: true },
            dw_5_provision: { required: false, number: true },
            dw_5_income: { required: false, number: true },
            dw_5_exp_amount: { required: false, number: true },
            dw_5_expenditure_scheme: { required: false, number: true },
            dw_5_expenditure_prev_month: { required: false, number: true },
            dw_5_expenditure_current_month: { required: false, number: true },
            dw_5_total_expenditure: { required: false, number: true },
            dw_5_expenditure_percentage: { required: false, number: true },
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: { required: 'कृपया वर्ष प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            bc_15_provision: {
                required: 'कृपया मागासवर्गीयांसाठी १५% साठी तरतूद प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            bc_15_income: {
                required: 'कृपया मागासवर्गीयांसाठी १५% उत्पन्न प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            bc_15_exp_amount: {
                required: 'कृपया मागासवर्गीयांसाठी १५% खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            bc_15_expenditure_scheme: {
                required: 'कृपया मागासवर्गीयांसाठी १५% योजनांवरील खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            bc_15_expenditure_prev_month: {
                required: 'कृपया मागासवर्गीयांसाठी १५% मागील महिन्यातील खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            bc_15_expenditure_current_month: {
                required: 'कृपया मागासवर्गीयांसाठी १५% चालू महिन्यातील खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            bc_15_total_expenditure: {
                required: 'कृपया मागासवर्गीयांसाठी १५% एकूण खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            bc_15_expenditure_percentage: {
                required: 'कृपया मागासवर्गीयांसाठी १५% खर्चाची टक्केवारी प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            wc_10_provision: {
                required: 'कृपया महिला आणि बालकल्याणासाठी १०% साठी तरतूद प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            wc_10_income: {
                required: 'कृपया महिला आणि बालकल्याणासाठी १०% उत्पन्न प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            wc_10_exp_amount: {
                required: 'कृपया महिला आणि बालकल्याणासाठी १०% खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            wc_10_expenditure_scheme: {
                required: 'कृपया महिला आणि बालकल्याणासाठी १०% योजनांवरील खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            wc_10_expenditure_prev_month: {
                required: 'कृपया महिला आणि बालकल्याणासाठी १०% मागील महिन्यातील खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            wc_10_expenditure_current_month: {
                required: 'कृपया महिला आणि बालकल्याणासाठी १०% चालू महिन्यातील खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            wc_10_total_expenditure: {
                required: 'कृपया महिला आणि बालकल्याणासाठी १०% एकूण खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            wc_10_expenditure_percentage: {
                required: 'कृपया महिला आणि बालकल्याणासाठी १०% खर्चाची टक्केवारी प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            dw_5_provision: {
                required: 'कृपया अपंग कल्याणासाठी ३% साठी तरतूद प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            dw_5_income: {
                required: 'कृपया अपंग कल्याणासाठी ३% उत्पन्न प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            dw_5_exp_amount: {
                required: 'कृपया अपंग कल्याणासाठी ३% खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            dw_5_expenditure_scheme: {
                required: 'कृपया अपंग कल्याणासाठी ३% योजनांवरील खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            dw_5_expenditure_prev_month: {
                required: 'कृपया अपंग कल्याणासाठी ३% मागील महिन्यातील खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            dw_5_expenditure_current_month: {
                required: 'कृपया अपंग कल्याणासाठी ३% चालू महिन्यातील खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            dw_5_total_expenditure: {
                required: 'कृपया अपंग कल्याणासाठी ३% एकूण खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            dw_5_expenditure_percentage: {
                required: 'कृपया अपंग कल्याणासाठी ३% खर्चाची टक्केवारी प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
        },
    });

    // Save Namuna 28 Entry
    $('#submit-namuna-28-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-28-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-28-form')[0];
            let namuna28FormData = new FormData(form);

            // Send POST request for saving
            const response = await fetch('/namuna/28/save', {
                method: 'POST',
                body: namuna28FormData,
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
            console.error(`Error while saving the Namuna 28 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 28 Entry
    $('#update-namuna-28-entry').on('click', async function (e) {
        e.preventDefault();

        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-28-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-28-form')[0];
            let namuna28FormData = new FormData(form);

            // Send PUT request for updating
            const response = await fetch('/namuna/28/update', {
                method: 'PUT', // Using PUT for update
                body: namuna28FormData,
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
            console.error(`Error while updating the Namuna 28 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });
});
