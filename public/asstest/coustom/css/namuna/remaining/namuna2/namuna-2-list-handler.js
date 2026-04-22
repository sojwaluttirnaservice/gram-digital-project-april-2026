$(() => {

    // ===============================
    // DELETE REQUEST FUNCTION
    // ===============================
    const handleDelete = async (id, btnEl) => {
        try {

            if (!id) {
                return alertjs.warning({
                    t: 'WARNING',
                    m: 'अवैध आयडी (Invalid ID).'
                });
            }

            // Disable button
            const originalText = btnEl.text();
            btnEl.prop('disabled', true).text('Deleting...');

            let res = await fetch('/namuna/2', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            let { success, message } = await res.json();

            if (success) {
                alertjs.success(
                    { t: 'SUCCESS', m: message },
                    () => window.location.reload()
                );
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: message
                });
                btnEl.prop('disabled', false).text(originalText);
            }

        } catch (err) {
            console.error('Delete Error:', err);
            alertjs.error({
                t: 'ERROR',
                m: 'काहीतरी त्रुटी आली.'
            });

            // Restore button
            btnEl.prop('disabled', false).text(originalText);

        }
    };

    // ===============================
    // CLICK HANDLER FOR DELETE BUTTON
    // ===============================
    $(document).on('click', '.delete-namuna-2-entry-btn', function (e) {
        e.preventDefault();

        const id = $(this).data('n2id');
        const btnEl = $(this); // reference delete button

        alertjs.deleteSpl("Confirm Delete?", (isYes) => {
            if (isYes) {
                handleDelete(id, btnEl);
            }
        });
    });


    $(document).on('click', '#print-namuna-2-btn', function (e) {
        e.preventDefault();

        // const month = $('#month-year-form [name="month"]').val();
        const fromYear = $('#month-year-form [name="fromYear"]').val();
        const toYear = $('#month-year-form [name="toYear"]').val();


        if (!fromYear || !toYear) {
            alertjs.warning({
                t: 'Warning',
                m: 'वर्ष निवडा',
            });
            return;
        }
        window.open(`/namuna/2/print?fromYear=${fromYear}&toYear=${toYear}`, '_blank');
    });

});
