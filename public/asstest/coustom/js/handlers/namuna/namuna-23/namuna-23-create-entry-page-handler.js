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
    $('#namuna-23-form').validate({
        rules: {
            month: 'required',
            year: { required: true, number: true },
            road_name: 'required',
            start_village: 'required',
            end_village: 'required',
            length_km: { required: true, number: true },
            width_km: { required: true, number: true },
            road_type: 'required',
            completion_date: 'required',
            cost_per_km: { required: true, number: true },
            ongoing_repairs_cost: { required: true, number: true },
            ongoing_repairs_form: 'required',
            special_repairs_cost: { required: true, number: true },
            special_repairs_form: 'required',
            original_construction_cost: { required: true, number: true },
            original_construction_form: 'required',
            remarks: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: { required: 'कृपया वर्ष प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            road_name: 'कृपया रस्त्याचे नाव प्रविष्ट करा',
            start_village: 'कृपया गावाचे नाव प्रविष्ट करा',
            end_village: 'कृपया गावापर्यंतचे नाव प्रविष्ट करा',
            length_km: {
                required: 'कृपया लांबी प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            width_km: {
                required: 'कृपया रुंदी प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            road_type: 'कृपया रस्त्याचा प्रकार प्रविष्ट करा',
            completion_date: 'कृपया पूर्ण होण्याची तारीख निवडा',
            cost_per_km: {
                required: 'कृपया प्रति किलोमीटर रस्ता खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            ongoing_repairs_cost: {
                required: 'कृपया चालू दुरुस्तीचा खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            ongoing_repairs_form: 'कृपया चालू दुरुस्तीचा स्वरूप प्रविष्ट करा',
            special_repairs_cost: {
                required: 'कृपया विशेष दुरुस्तीचा खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            special_repairs_form: 'कृपया विशेष दुरुस्तीचा स्वरूप प्रविष्ट करा',
            original_construction_cost: {
                required: 'कृपया मूळ बांधकामाचा खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            original_construction_form: 'कृपया मूळ बांधकामाचा स्वरूप प्रविष्ट करा',
            remarks: 'कृपया शेरा प्रविष्ट करा',
        },
    });

    // Save Namuna 23 Entry
    $('#submit-namuna-23-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-23-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-23-form')[0];
            let namuna23FormData = new FormData(form);

            // Format date fields before sending the data
            const completion_date = namuna23FormData.get('completion_date');

            // Reformat dates before setting them back into FormData
            namuna23FormData.set('completion_date', formatDate(completion_date));

            // Send POST request for saving
            const response = await fetch('/namuna/23/save', {
                method: 'POST',
                body: namuna23FormData,
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
            console.error(`Error while saving the Namuna 23 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    $('#update-namuna-23-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-23-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-23-form')[0];
            let namuna23FormData = new FormData(form);

            // Format date fields before sending the data
            const completion_date = namuna23FormData.get('completion_date');
            // Reformat the date if it's present
            namuna23FormData.set('completion_date', formatDate(completion_date));

            // Assuming the 'id' of the Namuna 23 entry is stored in a hidden input or as part of the form




            // Send the PUT request to update the entry
            const response = await fetch(`/namuna/23/update`, {
                method: 'PUT', // Using PUT for update
                body: namuna23FormData,
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
            console.error(`Error while updating the Namuna 23 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });
});
