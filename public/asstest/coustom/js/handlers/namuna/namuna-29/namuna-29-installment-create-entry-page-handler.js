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
    $('#namuna-29-installment-form').validate({
        rules: {
            installment_month: 'required',  // Added for month field
            installment_year: {
                required: true,
                number: true,
            },
            installment_principal: {
                required: true,
                number: true,
            },
            installment_interest_amount: {
                required: true,
                number: true,
            },
            disbursement_date: 'required',  // Added for disbursement date
            disbursement_principal: {
                required: true,
                number: true,
            },
            disbursement_interest: {
                required: true,
                number: true,
            },
            total_balance: {
                number: true,
            },
            balance_principal: {
                required: true,
                number: true,
            },
            balance_interest: {
                required: true,
                number: true,
            },
            remarks: 'required',  // Added for remarks field
        },
        messages: {
            installment_month: 'कृपया महिना निवडा',
            installment_year: {
                required: 'कृपया वर्ष प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            installment_principal: {
                required: 'कृपया मुद्दली रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            installment_interest_amount: {
                required: 'कृपया व्याज रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            disbursement_date: 'कृपया प्रदानाची दिनांक निवडा',
            disbursement_principal: {
                required: 'कृपया मुद्दल प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            disbursement_interest: {
                required: 'कृपया व्याज प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            total_balance: {
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            balance_principal: {
                required: 'कृपया शिल्लक मुद्दल प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            balance_interest: {
                required: 'कृपया शिल्लक व्याज प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            remarks: 'कृपया शेरा प्रविष्ट करा',
        },
    });

    // Save Namuna 29 Entry
    $(document).on('click', '#submit-namuna-29-installment-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-29-installment-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-29-installment-form');
            const namuna29FormData = new FormData(form);

            // Get and format the date fields before sending
            const disbursementDate = namuna29FormData.get('disbursement_date');
            const installmentStartDate = namuna29FormData.get('installment_start_date'); // New date field

            // Format the dates using the formatDate function
            namuna29FormData.set('disbursement_date', formatDate(disbursementDate));
            namuna29FormData.set('installment_start_date', formatDate(installmentStartDate));

            // Send POST request for saving
            const response = await fetch('/namuna/29/installment/save', {
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
    $(document).on('click', '#update-namuna-29-installment-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

      

        try {
            if (!$('#namuna-29-installment-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-29-installment-form');
            const namuna29FormData = new FormData(form);

            // Get and format the date fields before sending
            const disbursementDate = namuna29FormData.get('disbursement_date');
            const installmentStartDate = namuna29FormData.get('installment_start_date'); // New date field

            // Format the dates using the formatDate function
            namuna29FormData.set('disbursement_date', formatDate(disbursementDate));
            namuna29FormData.set('installment_start_date', formatDate(installmentStartDate));

            // Send PUT request for updating
            const response = await fetch('/namuna/29/installment/update', {
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
