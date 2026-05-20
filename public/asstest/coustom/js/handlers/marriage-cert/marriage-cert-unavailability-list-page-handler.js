$(() => {

    $(document).on('click', '.delete-marriage-cert-unavailability-btn', function () {

        const btn = $(this);

        const id = btn.data('id');

        if (!id) {

            alertjs.error({
                t: 'Error',
                m: 'Invalid certificate ID'
            });

            return;
        }

        alertjs.deleteSpl('Are you sure you want to delete this certificate?', async (status) => {

            try {

                if (!status) return;

                btn.prop('disabled', true);

                const response = await $.ajax({
                    url: `/marriage-cert-unavailability/${id}`,
                    type: 'DELETE'
                });

                if (response.success) {

                    alertjs.success({
                        t: 'Success',
                        m: response.message || 'Certificate deleted successfully'
                    });

                    btn.closest('tr').remove();

                } else {

                    alertjs.error({
                        t: 'Error',
                        m: response.message || 'Failed to delete certificate'
                    });

                    btn.prop('disabled', false);

                }

            } catch (error) {

                console.error(error);

                alertjs.error({
                    t: 'Error',
                    m: error?.responseJSON?.message || 'Something went wrong'
                });

                btn.prop('disabled', false);

            }

        });

    });

});