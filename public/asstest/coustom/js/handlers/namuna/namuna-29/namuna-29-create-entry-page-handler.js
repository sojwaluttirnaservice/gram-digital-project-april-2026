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
    $('#namuna-29-form').validate({
        rules: {
            month: 'required',
            year: {
                required: true,
                number: true,
            },
            borrower_name: 'required',
            loan_sources: 'required',
            loan_approval_order_number: 'required',
            loan_approval_order_date: 'required',
            loan_purpose: 'required',
            loan_amount: {
                required: true,
                number: true,
            },
            interest_rate: {
                required: true,
                number: true,
            },
            loan_received_date: 'required',
            number_of_installments: {
                required: true,
                number: true,
                min: 1, // Ensuring at least 1 installment
            },
            installment_start_date: 'required',
            installment_amount: {
                required: true,
                number: true,
                min: 0, // Ensuring installment amount is a positive value
            },
            installment_interest: {
                required: true,
                number: true,
                min: 0, // Ensuring installment interest is a positive value
            },
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: {
                required: 'कृपया वर्ष प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            borrower_name: 'कृपया कर्ज घेणाऱ्याचे नाव प्रविष्ट करा',
            loan_sources: 'कृपया कर्ज उभारणेची साधने प्रविष्ट करा',
            loan_approval_order_number: 'कृपया कर्ज मंजूरी आदेश क्रमांक प्रविष्ट करा',
            loan_approval_order_date: 'कृपया कर्ज मंजूरी आदेश दिनांक निवडा',
            loan_purpose: 'कृपया कर्जाचे प्रयोजन प्रविष्ट करा',
            loan_amount: {
                required: 'कृपया कर्जाची रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            interest_rate: {
                required: 'कृपया व्याज दर प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            loan_received_date: 'कृपया कर्ज मिळाल्याची तारीख निवडा',
            number_of_installments: {
                required: 'कृपया हफ्त्यांची संख्या प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
                min: 'हफ्त्यांची संख्या किमान 1 असावी.',
            },
            installment_start_date: 'कृपया हफ्त्याची तारीख निवडा',
            installment_amount: {
                required: 'कृपया हफ्त्याची रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
                min: 'हफ्त्याची रक्कम किमान 0 असावी.',
            },
            installment_interest: {
                required: 'कृपया हफ्त्याचे व्याज प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
                min: 'हफ्त्याचे व्याज किमान 0 असावे.',
            },
        },
    });

    // Save Namuna 29 Entry
    $(document).on('click', '#submit-namuna-29-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-29-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-29-form');
            const namuna29FormData = new FormData(form);

            // Get and format the date fields before sending
            const loanApprovalOrderDate = namuna29FormData.get('loan_approval_order_date');
            const loanReceivedDate = namuna29FormData.get('loan_received_date');
            const installmentStartDate = namuna29FormData.get('installment_start_date'); // New date field

            // Format the dates using the formatDate function
            namuna29FormData.set('loan_approval_order_date', formatDate(loanApprovalOrderDate));
            namuna29FormData.set('loan_received_date', formatDate(loanReceivedDate));
            namuna29FormData.set('installment_start_date', formatDate(installmentStartDate)); //
            // Send POST request for saving
            const response = await fetch('/namuna/29/save', {
                method: 'POST',
                body: namuna29FormData,
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
            console.error(`Error while saving the Namuna 29 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 29 Entry
    $(document).on('click', '#update-namuna-29-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            if (!$('#namuna-29-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-29-form');
            const namuna29FormData = new FormData(form);

            // Get and format the date fields before sending
            const loanApprovalOrderDate = namuna29FormData.get('loan_approval_order_date');
            const loanReceivedDate = namuna29FormData.get('loan_received_date');
            const installmentStartDate = namuna29FormData.get('installment_start_date'); // New date field

            // Format the dates using the formatDate function
            namuna29FormData.set('loan_approval_order_date', formatDate(loanApprovalOrderDate));
            namuna29FormData.set('loan_received_date', formatDate(loanReceivedDate));
            namuna29FormData.set('installment_start_date', formatDate(installmentStartDate)); //

            // Send PUT request for updating
            const response = await fetch('/namuna/29/update', {
                method: 'PUT',
                body: namuna29FormData,
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
            console.error(`Error while updating the Namuna 29 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});
