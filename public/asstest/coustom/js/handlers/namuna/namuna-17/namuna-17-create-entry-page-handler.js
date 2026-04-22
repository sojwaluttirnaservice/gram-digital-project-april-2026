$(document).ready(function () {
    // Initialize datepicker for fields with the `datepicker` class
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation for the form
    $('#namuna-17-form')?.validate({
        rules: {
            person_name: 'required',
            company_name: 'required',
            order_number: 'required',
            work_description: 'required',
            payment_amount: {
                required: true,
                number: true,
            },
            date: 'required',
        },
        messages: {
            person_name: 'कृपया व्यक्तीचे नाव प्रविष्ट करा',
            company_name: 'कृपया कंपनीचे नाव प्रविष्ट करा',
            order_number: 'कृपया आदेश क्रमांक प्रविष्ट करा',
            work_description: 'कृपया कामाचे विवरण प्रविष्ट करा',
            payment_amount: {
                required: 'कृपया भरण्याची रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            date: 'कृपया दिनांक प्रविष्ट करा',
        },
    });

    // Save Namuna 17 Entry
    $(document).on('click', '#submit-namuna-17-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-17-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'Please fill all required fields',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = document.getElementById('namuna-17-form');
            const namuna17FormData = new FormData(form);
            namuna17FormData.set('date', formatDate(namuna17FormData.get('date')));

            const response = await fetch('/namuna/17/save', {
                method: 'POST',
                body: namuna17FormData,
            });

            const { call, message } = await response.json();

            if (call) {
                alertjs.success(
                    {
                        t: 'SUCCESS',
                        m: 'Saved Successfully',
                    },
                    () => {
                        // $('#namuna-17-form')[0].reset();
                        window.location.reload();

                        // Optionally reset datepickers
                        $('.datepicker').datepicker('setDate', null);
                    }
                );
            } else {
                alertjs.warning({
                    t: 'ERROR',
                    m: message || 'Failed to save',
                });
            }
        } catch (err) {
            console.error(`Error while saving the Namuna 17 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'Something went wrong',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 17 Entry
    $(document).on('click', '#update-namuna-17-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            if (!$('#namuna-17-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'Please fill all required fields',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const namuna17FormData = new FormData(document.getElementById('namuna-17-form'));
            namuna17FormData.set('date', formatDate(namuna17FormData.get('date')));

            const response = await fetch('/namuna/17/update', {
                method: 'PUT',
                body: namuna17FormData,
            });

            const { call, message } = await response.json();

            if (call) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: 'Updated Successfully',
                });
            } else {
                alertjs.warning({
                    t: 'ERROR',
                    m: message || 'Failed to update',
                });
            }
        } catch (err) {
            console.error(`Error while updating the Namuna 17 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'Something went wrong',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});
