$(() => {

    // save page

    async function handleSaveLokAdalatNotice(e) {
        e.preventDefault()
        try {

            const formData = new FormData(document.getElementById('lok-adalat-notice-form'))


            const applicant_name = $('input[name="applicant_name"]').val().trim();
            const court_date = $('input[name="court_date"]').val().trim(); // उपस्थिती दिनांक
            const month = $('input[name="month"]').val().trim();
            const year = $('input[name="year"]').val().trim();
            const amount = $('input[name="amount"]').val().trim();

            // jQuery-based field validation
            if (!applicant_name) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया अर्जदाराचे नाव भरा.' });
                $('input[name="applicant_name"]').focus();
                return;
            }

            if (!court_date) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया उपस्थिती दिनांक भरा.' });
                $('input[name="court_date"]').focus();
                return;
            }

            if (!amount || isNaN(amount)) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया वैध रक्कम भरा.' });
                $('input[name="amount"]').focus();
                return;
            }

            if (!month || isNaN(month) || month < 1 || month > 12) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया 1 ते 12 दरम्यानचा महिना भरा.' });
                $('input[name="month"]').focus();
                return;
            }

            if (!year || isNaN(year) || year < 2020 || year > 2099) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया 2020 ते 2099 दरम्यानचे वर्ष भरा.' });
                $('input[name="year"]').focus();
                return;
            }

            const res = await fetch('/lok-adalat-notices/add', {
                body: formData,
                method: 'post'
            })



            const { success, message } = await res.json()


            if (success) {
                alertjs.success({
                    t: 'लोक अदालत नोटीस',
                    m: message
                }, () => location.href = '/lok-adalat-notices/list')
            } else {
                alertjs.warning({
                    t: 'लोक अदालत नोटीस',
                    m: 'काहीतरी चुकले'
                })
            }
        } catch (err) {
            console.error('Error:', err);
            // alertjs.warning({
            //     t: 
            // })
        }
    }


    $(document).on('click', '#add-lok-adalat-notice-btn', handleSaveLokAdalatNotice)



    $(document).on('blur', "input[name='amount']", function (e) {


        e.preventDefault()
        try {


            let value = $(this).val()
            var input = $("input[name='amount_in_words']")
            commonHandler.translate(value, function (data) {

                console.log('jerer')

                if (input)
                    $(input).val(data)
            })
        } catch (err) {
            console.error('Error:', err);
        }
    })



    // edit page




    async function handleUpdateLokAdalatNotice(e) {
        e.preventDefault()
        try {

            const formData = new FormData(document.getElementById('lok-adalat-notice-form'))


            const applicant_name = $('input[name="applicant_name"]').val().trim();
            const court_date = $('input[name="court_date"]').val().trim(); // उपस्थिती दिनांक
            const month = $('input[name="month"]').val().trim();
            const year = $('input[name="year"]').val().trim();
            const amount = $('input[name="amount"]').val().trim();

            // jQuery-based field validation
            if (!applicant_name) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया अर्जदाराचे नाव भरा.' });
                $('input[name="applicant_name"]').focus();
                return;
            }

            if (!court_date) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया उपस्थिती दिनांक भरा.' });
                $('input[name="court_date"]').focus();
                return;
            }

            if (!amount || isNaN(amount)) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया वैध रक्कम भरा.' });
                $('input[name="amount"]').focus();
                return;
            }

            if (!month || isNaN(month) || month < 1 || month > 12) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया 1 ते 12 दरम्यानचा महिना भरा.' });
                $('input[name="month"]').focus();
                return;
            }

            if (!year || isNaN(year) || year < 2020 || year > 2099) {
                alertjs.warning({ t: 'लोक अदालत नोटीस', m: 'कृपया 2020 ते 2099 दरम्यानचे वर्ष भरा.' });
                $('input[name="year"]').focus();
                return;
            }

            const res = await fetch('/lok-adalat-notices/update', {
                body: formData,
                method: 'put'
            })


            const { success, message } = await res.json()

            if (success) {
                alertjs.success({
                    t: 'लोक अदालत नोटीस',
                    m: message
                }, () => location.href = '/lok-adalat-notices/list')
            } else {
                alertjs.warning({
                    t: 'लोक अदालत नोटीस',
                    m: 'काहीतरी चुकले'
                })
            }
        } catch (err) {
            console.error('Error:', err);
            // alertjs.warning({
            //     t: 
            // })
        }
    }


    $(document).on('click', '#update-lok-adalat-notice-btn', handleUpdateLokAdalatNotice)





    // lits page 

    $(document).on('click', '#print-lok-adalat-notice-btn', function (e) {
        e.preventDefault(); // Prevent default form submission if any

        const fromYear = $('input[name="fromYear"]').val();
        const toYear = $('input[name="toYear"]').val();
        const printPlace = $('input[name="printPlace"]').val();
        const printDate = $('input[name="printDate"]').val();

        // Clear previous error messages
        $('.form-error').remove();

        let hasError = false;

        // Basic validation: Check if years are numbers and fromYear <= toYear
        if (!fromYear || isNaN(fromYear)) {
            $('input[name="fromYear"]').after('<div class="text-danger form-error">कृपया योग्य वर्ष प्रविष्ट करा</div>');
            hasError = true;
        }

        if (!toYear || isNaN(toYear)) {
            $('input[name="toYear"]').after('<div class="text-danger form-error">कृपया योग्य वर्ष प्रविष्ट करा</div>');
            hasError = true;
        }

        if (parseInt(fromYear) > parseInt(toYear)) {
            $('input[name="toYear"]').after('<div class="text-danger form-error">"वर्षापासून" हे "वर्षापर्यंत" पेक्षा कमी असावे</div>');
            hasError = true;
        }

        if (hasError) {
            return;
        }


        location.href = `/lok-adalat-notices/print?fromYear=${encodeURIComponent(fromYear)}&toYear=${encodeURIComponent(toYear)}&printPlace=${encodeURIComponent(printPlace)}&printDate=${encodeURIComponent(printDate)}`;

        // // Proceed with the form submission or other logic
        // let message = `Validated!\nFrom Year: ${fromYear}\nTo Year: ${toYear}\nPrint Place: ${printPlace}\nPrint Date: ${printDate}`
        // ajertjs.warning({
        //     t: 'Warning',
        //     m: message
        // });
    });


    $(document).on('click', '#print-lok-adalat-notice-for-samanya-btn', function(e){
        e.preventDefault()



        const fromYear = $('input[name="fromYearForSamanya"]').val();
        const toYear = $('input[name="toYearForSamanya"]').val();
         // Clear previous error messages
        $('.form-error').remove();

        let hasError = false;

        // Basic validation: Check if years are numbers and fromYear <= toYear
        if (!fromYear || isNaN(fromYear)) {
            $('input[name="fromYearForSamanya"]').after('<div class="text-danger form-error">कृपया योग्य वर्ष प्रविष्ट करा</div>');
            hasError = true;
        }

        if (!toYear || isNaN(toYear)) {
            $('input[name="toYearForSamanya"]').after('<div class="text-danger form-error">कृपया योग्य वर्ष प्रविष्ट करा</div>');
            hasError = true;
        }

        if (parseInt(fromYear) > parseInt(toYear)) {
            $('input[name="toYearForSamanya"]').after('<div class="text-danger form-error">"वर्षापासून" हे "वर्षापर्यंत" पेक्षा कमी असावे</div>');
            hasError = true;
        }

        if (hasError) {
            alert(hasError)
            return;
        }


        location.href = `/lok-adalat-notices/print/printFormNineAllSamanya?fromYear=${encodeURIComponent(fromYear)}&toYear=${encodeURIComponent(toYear)}`;

    })



    // delete operation


    async function handleDeleteLokAdalatNotice(e) {
        e.preventDefault();


        alertjs.deleteSpl('Confirm Delete?', async (status) => {
            if (status) {

                try {

                    const id = $(this).attr('data-lokAdalatNoticeId');

                    const res = await fetch('/lok-adalat-notices/delete', {
                        body: JSON.stringify({ id: +id }),
                        method: 'delete',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    const { success, message } = await res.json()

                    if (success) {
                        alertjs.success({
                            t: 'लोक अदालत नोटीस',
                            m: message
                        }, () => location.reload())
                    } else {
                        alertjs.warning({
                            t: 'लोक अदालत नोटीस',
                            m: 'काहीतरी चुकले'
                        })
                    }

                } catch (err) {
                    console.error('Error:', err);
                    alertjs.warning({
                        t: 'लोक अदालत नोटीस',
                        m: 'काहीतरी चुकले'
                    })
                }
            }
        })

    }


    $(document).on('click', '.delete-lok-adalat-notice-btn', handleDeleteLokAdalatNotice)

})