$(() => {
    const handleDeleteNamuna16Entry = async (id) => {
        try {
            const deleteUrl = '/namuna/16/delete';

            const _deleteRes = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const _deleteData = await _deleteRes.json();

            if (_deleteData.call === 1) {
                alertjs.success(
                    {
                        t: 'DELETE',
                        m: 'Entry deleted successfully',
                    },
                    () => window.location.reload() // Refresh the page to show the updated list of entries.
                );
            }
        } catch (err) {
            console.log('Error while deleting the entry:', err);
            alertjs.warning({
                t: 'ERROR',
                m: 'Something went wrong',
            });
        }
    };

    $(document).on('click', '.delete-namuna-16-entry-btn', function (e) {
        e.preventDefault();

        const id = $(this).attr('data-namuna16EntryId');

        alertjs.deleteSpl('Confirm Delete?', (status) => {
            if (status) {
                handleDeleteNamuna16Entry(id);
            }
        });
    });
});
