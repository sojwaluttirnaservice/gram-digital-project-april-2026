$(document).ready(function () {
    // Initialize datepicker for any date fields
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    $("[name='employee_id_fk").on('change', function (e) {
        e.preventDefault();

        let selectedEmployeeId = $(this).val();

        let selectedOption = $(this).find('option:selected');
        let employeeName = '';
        let employeePost = '';

        if (selectedEmployeeId) {
            employeeName = selectedOption.attr('data-employeeName');
            employeePost = selectedOption.attr('data-postName');
        }
        $("[name='employee_name']").val(employeeName);
        $("[name='employee_post']").val(employeePost);
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation for the form
    $('#namuna-21-form').validate({
        rules: {
            month: 'required',
            year: { required: true, number: true },
            employee_id_fk: 'required',
            employee_post: 'required',
            pay_grade: 'required',
            salary: { required: true, number: true },
            leave_salary: { required: true, number: true },
            placement_salary: { required: true, number: true },
            allowances: { required: true, number: true },
            future_contribution_reserved: 'required',
            collections_and_penalties: { required: true, number: true },
            state_pf_contribution: { required: true, number: true },
            state_other_deductions: { required: true, number: true },
            gp_pf_contribution: { required: true, number: true },
            gp_other_deductions: { required: true, number: true },
            remarks: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: { required: 'कृपया वर्ष प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            employee_id_fk: 'कृपया कर्मचारी निवडा',
            employee_post: 'कृपया कर्मचारी पद प्रविष्ट करा',
            pay_grade: 'कृपया वेतनश्रेणी प्रविष्ट करा',
            salary: 'कृपया वेतन प्रविष्ट करा',
            leave_salary: 'कृपया रजा वेतन प्रविष्ट करा',
            placement_salary: 'कृपया स्थानापत्र वेतन प्रविष्ट करा',
            allowances: 'कृपया भत्ते प्रविष्ट करा',
            future_contribution_reserved: 'कृपया पुढील अधिदानासाठी ठेवलेली रक्कम प्रविष्ट करा',
            collections_and_penalties: 'कृपया वसुली व दंड प्रविष्ट करा',
            state_pf_contribution: 'कृपया शासनासाठी रक्कम प्रविष्ट करा',
            state_other_deductions: 'कृपया शासनासाठी वसुली व दंड प्रविष्ट करा',
            gp_pf_contribution: 'कृपया ग्रामपंचायतीसाठी रक्कम प्रविष्ट करा',
            gp_other_deductions: 'कृपया ग्रामपंचायतीसाठी वसुली व दंड प्रविष्ट करा',
            remarks: 'कृपया शेरा प्रविष्ट करा',
        },
    });

    // Save Namuna 21 Entry
    $('#submit-namuna-21-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-21-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-21-form')[0];
            let namuna21FormData = new FormData(form);

            // Format any date fields before sending the data if there are any
            const month = namuna21FormData.get('month');
            const year = namuna21FormData.get('year');

            // Example of reformatting if required (for example, formatting dates)
            // Reformatting is not necessary here but can be used for any future dates

            // Send POST request for saving
            const response = await fetch('/namuna/21/save', {
                method: 'POST',
                body: namuna21FormData,
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
            console.error(`Error while saving the Namuna 21 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 21 Entry (If needed, similar structure for updating)
    $('#update-namuna-21-entry').on('click', async function (e) {
        e.preventDefault();

        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-21-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-21-form')[0];
            let namuna21FormData = new FormData(form);

            // Send PUT request for updating
            const response = await fetch(`/namuna/21/update`, {
                method: 'PUT', // Using PUT for update
                body: namuna21FormData,
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
            console.error(`Error while updating the Namuna 21 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });
});
