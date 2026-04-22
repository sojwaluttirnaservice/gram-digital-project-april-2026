$(() => {

    $(".datepicker").datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true,
        defaultDate: new Date(), // Set default date to current date
        yearRange: "-50:+0", //
    });

    function _dateFormatYYYYMMDD(_date) {
        _date = _date?.trim();
        return _date ? _date.split("-").reverse().join("-") : "";
    }

    const $form = $('#committee-form');

    // 🛡️ Validation setup
    $form.validate({
        rules: {
            committee_name: {
                required: true
            },
            resolution_number: {
                required: true
            }
        },
        messages: {
            committee_name: {
                required: "कृपया समितीचे नाव भरा"
            },
            resolution_number: {
                required: "कृपया ठराव क्रमांक भरा"
            }
        }
    });

    /**
     * Generic form submit handler
     * @param {Event} e
     * @param {'POST'|'PUT'} method
     */
    const handleSubmit = async (e, method) => {
        e.preventDefault();

        if (!$form.valid()) return;

        const form = $form[0];

        try {
            let committeeData = new FormData(form)
            committeeData.set('resolution_date', _dateFormatYYYYMMDD(committeeData.get('resolution_date')))

            const res = await fetch('/committees', {
                method,
                body: committeeData
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({
                    t: "SUCCESS",
                    m: message
                }, () => {
                    form.reset();
                    // location.href = '/committees/members';
                });
            } else {
                alertjs.warning({
                    t: "WARNING",
                    m: message
                });
            }
        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({
                t: "ERROR",
                m: "काहीतरी चुकले"
            });
        }
    };

    // 🖱️ Attach event handlers
    $(document).on('click', '#save-committee-btn', e => handleSubmit(e, 'POST'));
    $(document).on('click', '#update-committee-btn', e => handleSubmit(e, 'PUT'));
});
