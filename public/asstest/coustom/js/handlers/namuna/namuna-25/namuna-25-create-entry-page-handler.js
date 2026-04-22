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
    $('#namuna-25-form').validate({
        rules: {
            month: 'required',
            year: 'required',
            investment_date: 'required',
            investment_details: 'required',
            reference_number: 'required',
            reference_date: 'required',
            face_value: {
                required: true,
                number: true,
            },
            purchase_price: {
                required: true,
                number: true,
            },
            maturity_date: 'required',
            net_payable_amount: {
                required: true,
                number: true,
            },
            interest_earned_date: 'required',
            transfer_promotion_date: 'required',
            cashbook_deposited_amount: {
                required: true,
                number: true,
            },
            specific_details: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: 'कृपया वर्ष निवडा',
            investment_date: 'कृपया गुंतवणुकीची तारीख निवडा',
            investment_details: 'कृपया गुंतवणुकीचा तपशिल प्रविष्ट करा',
            reference_number: 'कृपया इतर क्रमांक प्रविष्ट करा',
            reference_date: 'कृपया इतर तारीख निवडा',
            face_value: {
                required: 'कृपया दर्शनी मूल्य प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            purchase_price: {
                required: 'कृपया खरेदी किंमत प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            maturity_date: 'कृपया परिणत होण्याची तारीख निवडा',
            net_payable_amount: {
                required: 'कृपया निव्वळ देय रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            interest_earned_date: 'कृपया उपार्जित व्याजाची तारीख निवडा',
            transfer_promotion_date: 'कृपया बदलीचा पदोन्नतीचा दिनांक निवडा',
            cashbook_deposited_amount: {
                required: 'कृपया दैनिक रोकडवहीतील जमा रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            specific_details: 'कृपया प्रकातीचा तपशिल प्रविष्ट करा',
        },
    });

    // Save Namuna 25 Entry
    $(document).on('click', '#submit-namuna-25-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-25-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-25-form');
            const namuna25FormData = new FormData(form);
            // Before sending the form data, reformat all date fields
            namuna25FormData.set(
                'investment_date',
                formatDate(namuna25FormData.get('investment_date'))
            );
            namuna25FormData.set(
                'reference_date',
                formatDate(namuna25FormData.get('reference_date'))
            );
            namuna25FormData.set(
                'maturity_date',
                formatDate(namuna25FormData.get('maturity_date'))
            );
            namuna25FormData.set(
                'interest_earned_date',
                formatDate(namuna25FormData.get('interest_earned_date'))
            );
            namuna25FormData.set(
                'transfer_promotion_date',
                formatDate(namuna25FormData.get('transfer_promotion_date'))
            );

            const response = await fetch('/namuna/25/save', {
                method: 'POST',
                body: namuna25FormData,
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
            console.error(`Error while saving the Namuna 25 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 25 Entry
    $(document).on('click', '#update-namuna-25-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            // Form validation
            if (!$('#namuna-25-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            // Collect form data
            const namuna25FormData = new FormData(document.getElementById('namuna-25-form'));

            // Reformat all date fields before sending
            namuna25FormData.set(
                'investment_date',
                formatDate(namuna25FormData.get('investment_date'))
            );
            namuna25FormData.set(
                'reference_date',
                formatDate(namuna25FormData.get('reference_date'))
            );
            namuna25FormData.set(
                'maturity_date',
                formatDate(namuna25FormData.get('maturity_date'))
            );
            namuna25FormData.set(
                'interest_earned_date',
                formatDate(namuna25FormData.get('interest_earned_date'))
            );
            namuna25FormData.set(
                'transfer_promotion_date',
                formatDate(namuna25FormData.get('transfer_promotion_date'))
            );

            // Send PUT request for updating
            const response = await fetch('/namuna/25/update', {
                method: 'PUT',
                body: namuna25FormData,
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
            console.error(`Error while updating the Namuna 25 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});
