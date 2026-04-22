$(() => {
    // Function to handle the deletion of a Namuna 19 Employee Entry
    const handleDeleteNamuna19EmployeeEntry = async (id) => {
        try {
            const deleteUrl = '/namuna/19/employees/delete'; // Update to your delete endpoint

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
                        m: 'Employee entry deleted successfully',
                    },
                    () => window.location.reload() // Reload the page after deletion
                );
            } else {
                alertjs.warning({
                    t: 'ERROR',
                    m: 'Failed to delete the entry',
                });
            }
        } catch (err) {
            console.log('Error while deleting the entry:', err);
            alertjs.warning({
                t: 'ERROR',
                m: 'Something went wrong',
            });
        }
    };

    // Event listener for delete button click
    $(document).on('click', '.delete-namuna-19-employee-entry-btn', function (e) {
        e.preventDefault();

        // Get the employee entry ID from the button's data attribute
        const id = $(this).attr('data-namuna19EmployeeEntryId');

        // Confirm the deletion using alertjs
        alertjs.deleteSpl('Confirm Delete?', (status) => {
            if (status) {
                handleDeleteNamuna19EmployeeEntry(id);
            }
        });
    });

    // HANDLE THE PRINT EVENT

    $(document).on('click', '#print-employee-payment-btn', function (e) {
        e.preventDefault();
        let month = $(`#selected-print-month`).val();
        let year = $(`#selected-print-year`).val();

        if (!month || !year) {
            alertjs.warning({
                t: 'Warning',
                m: 'महिना आणि वर्ष निवडा',
            });
            return; // Exit the function if month or year is not selected.
        }
        let redirectUrl = `/namuna/19/payment/print?month=${month}&year=${year}`;
        window.open(redirectUrl, '_blank');
    });


    $(document).on('click', '#print-namuna-19-attendance-payment-btn', function (e) {
        e.preventDefault();
        let month = $(`#selected-print-month`).val();
        let year = $(`#selected-print-year`).val();

        if (!month || !year) {
            alertjs.warning({
                t: 'Warning',
                m: 'महिना आणि वर्ष निवडा',
            });
            return; // Exit the function if month or year is not selected.
        }
        let redirectUrl = `/namuna/19/payment/attendance-print?month=${month}&year=${year}`;
        window.open(redirectUrl, '_blank');
    });
});


