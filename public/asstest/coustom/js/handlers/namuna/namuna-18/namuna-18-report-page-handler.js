$(() => {
   
    const handleDeleteNamuna18Entry = async (id) => {
        try {
            const deleteUrl = '/namuna/18/delete';

            const _deleteRes = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const _deleteData = await _deleteRes.json();

            if (_deleteData.call == 1) {
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
    


    $(document).on('click', '.delete-namuna-18-entry-btn', function (e) {
        e.preventDefault();
       

        const id = $(this).attr('data-namuna18Entry');

        alertjs.deleteSpl('Confirm Delete?', (status) => {
            if (status) {
                handleDeleteNamuna18Entry(id);
            }
        });
    });
});
