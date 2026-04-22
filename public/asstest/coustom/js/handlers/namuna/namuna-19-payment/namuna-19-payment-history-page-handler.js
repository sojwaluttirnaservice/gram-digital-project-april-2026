$(() => {
    const handleDeletePaymentRecord = async (paymentId) => {
        try {
            const url = '/namuna/19/payment/delete';

            const _res = await fetch(url, {
                method: 'DELETE',
                body: JSON.stringify({ id: paymentId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { call, message } = await _res.json();

            if (call == 1) {
                alertjs.success(
                    {
                        t: 'SUCCESS',
                        m: 'Deleted Successfully',
                    },
                    () => location.reload()
                );
            }
        } catch (err) {
            console.log(`Error while deleting the payment record: ${err.message}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'Failed to delete the payment record',
            });
        }
    };

    $(document).on('click', '.delete-payment-record-btn', function (e) {
        e.preventDefault();

        const paymentId = $(this).attr('data-paymentId');
        alertjs.deleteSpl('Confirm Delete ?', (status) => {
            if (status) handleDeletePaymentRecord(paymentId);
        });
    });
});
