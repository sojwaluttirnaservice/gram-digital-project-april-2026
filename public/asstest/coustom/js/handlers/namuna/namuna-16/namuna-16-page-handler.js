$(document).ready(function () {
    $(document).on('click', '#show-namuna-16-report-btn', function (e) {
        e.preventDefault();
        const optionValue = +$('[name="show-report-by"]').val();
        const reportBaseUrl = '/namuna/16/report';

 
        if (optionValue === '' || optionValue === '-1') {
            alertjs.warning({
                t: 'WARNING',
                m: 'Select Report Type',
            });
            return;
        }
        switch (optionValue) {
            case 1:
                const selectedYear = $('[name="selected_year"]').val();
                if (selectedYear === '' || selectedYear === '-1') {
                    alertjs.warning({
                        t: 'वर्ष निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?year=${selectedYear}`, '_blank');
                break;

            case 2:
                const fromYear = $('[name="selected_from_year"]').val();
                const toYear = $('[name="selected_to_year"]').val();
                if (fromYear === '' || fromYear === '-1' || toYear === '' || toYear === '-1') {
                    alertjs.warning({
                        t: 'वर्ष श्रेणी निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?fromYear=${fromYear}&toYear=${toYear}`, '_blank');
                break;

            case 3:
                const month = $('[name="selected_month"]').val();
                const year = $('[name="selected_year_2"]').val();
                if (month === '' || month === '-1' || year === '' || year === '-1') {
                    alertjs.warning({
                        t: 'महिना व वर्ष निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?month=${month}&year=${year}`, '_blank');
                break;
        }
    });

    $(document).on('change', '[name="show-report-by"]', function (e) {
        e.preventDefault();
        const selectedOptionValue = $(this).val();
        $('#show-report-by-div div[data-target]').css('display', 'none');
        if (selectedOptionValue !== '-1') {
            $(`#show-report-by-div div[data-target="${selectedOptionValue}"]`).css(
                'display',
                'block'
            );
        }
    });

    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    // jQuery validation
    $('#namuna-16-form')?.validate({
        rules: {
            item_description: 'required',
            purchase_authority: 'required',
            purchase_date: 'required',
            quantity: 'required',
            cost: 'required',
            disposal_count: 'required',
            month: 'required',
            year: 'required',
            disposal_details: 'required',
            authorization_certificate: 'required',
            recovered_amount: 'required',
            treasury_date: 'required',
            stock_balance: 'required',
        },
        messages: {
            item_description: 'कृपया वस्तूचे वर्णन प्रविष्ट करा',
            purchase_authority: 'कृपया खरेदी प्राधिकृत करणारे प्रविष्ट करा',
            purchase_date: 'कृपया खरेदीची तारीख प्रविष्ट करा',
            quantity: 'कृपया संख्या प्रविष्ट करा',
            cost: 'कृपया किंमत प्रविष्ट करा',
            disposal_count: 'कृपया विल्हेवाट केलेल्या वस्तूंची संख्या प्रविष्ट करा',
            disposal_details: 'कृपया विल्हेवाटाची स्वरूप प्रविष्ट करा',
            authorization_certificate: 'कृपया प्रमाणपत्र/प्राधिकृत पत्र प्रविष्ट करा',
            recovered_amount: 'कृपया वसूल केलेली रक्कम प्रविष्ट करा',
            treasury_date: 'कृपया कोषागार तारीख प्रविष्ट करा',
            stock_balance: 'कृपया साठ्यातील शिल्लक प्रविष्ट करा',
        },
    });

    $(document).on('click', '#submit-namuna-16-entry', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            if (!$('#namuna-16-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'Please fill all required fields',
                });
                submitButton.prop('disabled', false);
                return;
            }

            const namuna16FormData = new FormData(document.getElementById('namuna-16-form'));
            namuna16FormData.set(
                'purchase_date',
                formatDate(namuna16FormData.get('purchase_date'))
            );
            namuna16FormData.set(
                'treasury_date',
                formatDate(namuna16FormData.get('treasury_date'))
            );

            const _res = await fetch('/namuna/16/save', {
                method: 'POST',
                body: namuna16FormData,
            });

            const { call, message } = await _res.json();

            if (call) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: 'Saved Successfully',
                });
            } else {
                alertjs.warning({
                    t: 'ERROR',
                    m: message || 'Failed to save',
                });
            }
        } catch (err) {
            console.log(`Error while saving the namuna 16 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'Something went wrong',
            });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    $(document).on('click', '#update-namuna-16-entry', async function (e) {
        e.preventDefault();
        const updateButton = $(this);
        updateButton.prop('disabled', true);

        try {
            if (!$('#namuna-16-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'Please fill all required fields',
                });
                updateButton.prop('disabled', false);
                return;
            }

            const namuna16FormData = new FormData(document.getElementById('namuna-16-form'));
            namuna16FormData.set(
                'purchase_date',
                formatDate(namuna16FormData.get('purchase_date'))
            );
            namuna16FormData.set(
                'treasury_date',
                formatDate(namuna16FormData.get('treasury_date'))
            );

            const _res = await fetch('/namuna/16/update', {
                method: 'PUT',
                body: namuna16FormData,
            });

            const { call, message } = await _res.json();

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
            console.log(`Error while updating the namuna 16 entry: ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'Something went wrong',
            });
        } finally {
            updateButton.prop('disabled', false);
        }
    });
});
