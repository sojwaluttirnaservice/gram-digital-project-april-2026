$(() => {
    const deleteNamuna13Entry = async (id) => {
        try {
            // API endpoint for deletion
            const deleteUrl = '/namuna/17/delete';

            // Send DELETE request with the entry ID
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            // Parse the response
            const responseData = await response.json();

            // Handle success or error response
            if (responseData.call === 1) {
                alertjs.success(
                    {
                        t: 'DELETE',
                        m: 'Entry deleted successfully',
                    },
                    () => window.location.reload() // Reload to reflect changes
                );
            } else {
                alertjs.warning({
                    t: 'ERROR',
                    m: responseData.message || 'Failed to delete the entry',
                });
            }
        } catch (err) {
            console.error('Error while deleting the entry:', err);
            alertjs.warning({
                t: 'ERROR',
                m: 'Something went wrong',
            });
        }
    };

    $(document).on('click', '.delete-namuna-17-entry-btn', function (e) {
        e.preventDefault();

        const id = $(this).attr('data-namuna17EntryId');

        // Confirm before deleting
        alertjs.deleteSpl('Confirm Delete?', (status) => {
            if (status) {
                deleteNamuna13Entry(id); // Call the function
            }
        });
    });
});
