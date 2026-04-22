$(() => {

    async function handleDeleteBplCertificate(id) {
        try {
            const { success, message } = await fetch('/bpl-certificate', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())


            if (success) {
                alertjs.success({ t: 'SUCCESS', m: message }, () => location.reload())
            } else {
                alertjs.warning({ t: 'WARNING', m: message })
            }

        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({ t: 'WARNING', m: err?.message || 'काहीतरी चुकले' })

        }
    }

    $(document).on('click', '.delete-bpl-certificate-btn', function (e) {
        e.preventDefault()
        let id = $(this).attr('data-bplCertificateId')
        alertjs.deleteSpl('Confirm Delete?', (isYes) => {
            if (isYes) handleDeleteBplCertificate(id);
        });
    });

})