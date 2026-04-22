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
    $('#namuna-22-form').validate({
        rules: {
            month: 'required',
            year: {
                required: true,
                number: true,
            },
            acquisition_date: 'required',
            resolution_number: 'required',
            resolution_date: 'required',
            survey_number: 'required',
            property_description: 'required',
            usage_reason: 'required',
            construction_or_editing_expense: {
                required: true,
                number: true,
            },
            repairs_expenditure_date: 'required',
            ongoing_repairs: 'required',
            special_repairs: 'required',
            original_construction: 'required',
            original_construction_type: 'required',
            year_end_depreciation: {
                required: true,
                number: true,
            },
            disposal_resolution_number: 'required',
            disposal_order_number: 'required',
            disposal_order_date: 'required',
            remarks: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: {
                required: 'कृपया वर्ष प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            acquisition_date: 'कृपया तारीख निवडा',
            resolution_number: 'कृपया क्रमांक प्रविष्ट करा',
            resolution_date: 'कृपया तारीख निवडा',
            survey_number: 'कृपया भूमापन क्रमांक प्रविष्ट करा',
            property_description: 'कृपया मालमत्तेचे वर्णन प्रविष्ट करा',
            usage_reason: 'कृपया वापराचे कारण प्रविष्ट करा',
            construction_or_editing_expense: {
                required: 'कृपया खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            repairs_expenditure_date: 'कृपया तारीख निवडा',
            ongoing_repairs: 'कृपया चालू दुरुस्त्या प्रविष्ट करा',
            special_repairs: 'कृपया विशेष दुरुस्त्या प्रविष्ट करा',
            original_construction: 'कृपया मूळ बांधकाम प्रविष्ट करा',
            original_construction_type: 'कृपया बांधकामाचे स्वरूप प्रविष्ट करा',
            year_end_depreciation: {
                required: 'कृपया घटलेली किंमत प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            disposal_resolution_number: 'कृपया ठराव क्रमांक प्रविष्ट करा',
            disposal_order_number: 'कृपया आदेश क्रमांक प्रविष्ट करा',
            disposal_order_date: 'कृपया तारीख निवडा',
            remarks: 'कृपया शेरा प्रविष्ट करा',
        },
    });

    // Save Namuna 22 Entry
    $(document).on('click', '#submit-namuna-22-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-22-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-22-form');
            let namuna22FormData = new FormData(form);

            // Format date fields before sending the data
            const acquisition_date = namuna22FormData.get('acquisition_date');
            const resolution_date = namuna22FormData.get('resolution_date');
            const repairs_expenditure_date = namuna22FormData.get('repairs_expenditure_date');
            const disposal_order_date = namuna22FormData.get('disposal_order_date');

            // Reformat dates before setting them back into FormData
            namuna22FormData.set('acquisition_date', formatDate(acquisition_date));
            namuna22FormData.set('resolution_date', formatDate(resolution_date));
            namuna22FormData.set('repairs_expenditure_date', formatDate(repairs_expenditure_date));
            namuna22FormData.set('disposal_order_date', formatDate(disposal_order_date));

            // Send POST request for saving
            const response = await fetch('/namuna/22/save', {
                method: 'POST',
                body: namuna22FormData,
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
            console.error(`Error while saving the Namuna 22 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 22 Entry
    $(document).on('click', '#update-namuna-22-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            if (!$('#namuna-22-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-22-form');
            let namuna22FormData = new FormData(form);

            
            // Format date fields before sending the data
            const acquisition_date = namuna22FormData.get('acquisition_date');
            const resolution_date = namuna22FormData.get('resolution_date');
            const repairs_expenditure_date = namuna22FormData.get('repairs_expenditure_date');
            const disposal_order_date = namuna22FormData.get('disposal_order_date');

            // Reformat dates before setting them back into FormData
            namuna22FormData.set('acquisition_date', formatDate(acquisition_date));
            namuna22FormData.set('resolution_date', formatDate(resolution_date));
            namuna22FormData.set('repairs_expenditure_date', formatDate(repairs_expenditure_date));
            namuna22FormData.set('disposal_order_date', formatDate(disposal_order_date));

            // Send PUT request for updating
            const response = await fetch('/namuna/22/update', {
                method: 'PUT',
                body: namuna22FormData,
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
            console.error(`Error while updating the Namuna 22 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'काहीतरी चुकले',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});
