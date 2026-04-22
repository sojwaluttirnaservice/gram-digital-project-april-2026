$(document).ready(function () {
    $(document).on('click', '#show-namuna-22-report-btn', function (e) {
        e.preventDefault();
        const optionValue = +$('[name="show-report-by"]').val();
        const reportBaseUrl = '/namuna/22/report';

        if (optionValue === '' || optionValue === '-1') {
            alertjs.warning({
                t: 'WARNING',
                m: 'Select Report Type',
            });
            return;
        }
        switch (optionValue) {
            case 1:
                const selectedYear = $('[name="selected_year"]').val();
                if (selectedYear === '' || selectedYear === '-1') {
                    alertjs.warning({
                        t: 'वर्ष निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?year=${selectedYear}`, '_blank');
                break;

            case 2:
                const fromYear = $('[name="selected_from_year"]').val();
                const toYear = $('[name="selected_to_year"]').val();
                if (fromYear === '' || fromYear === '-1' || toYear === '' || toYear === '-1') {
                    alertjs.warning({
                        t: 'वर्ष श्रेणी निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?fromYear=${fromYear}&toYear=${toYear}`, '_blank');
                break;

            case 3:
                const month = $('[name="selected_month"]').val();
                const year = $('[name="selected_year_2"]').val();
                if (month === '' || month === '-1' || year === '' || year === '-1') {
                    alertjs.warning({
                        t: 'महिना व वर्ष निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?month=${month}&year=${year}`, '_blank');
                break;
        }
    });

    $(document).on('change', '[name="show-report-by"]', function (e) {
        e.preventDefault();
        const selectedOptionValue = $(this).val();
        $('#show-report-by-div div[data-target]').css('display', 'none');
        if (selectedOptionValue !== '-1') {
            $(`#show-report-by-div div[data-target="${selectedOptionValue}"]`).css(
                'display',
                'block'
            );
        }
    });

    const handleDeleteNamuna22Entry = async (id) => {
        try {
            const deleteUrl = '/namuna/22/delete';

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

    $(document).on('click', '.delete-namuna-22-entry-btn', function (e) {
        e.preventDefault();

        const id = $(this).attr('data-namuna22Entry');

        alertjs.deleteSpl('Confirm Delete?', (status) => {
            if (status) {
                handleDeleteNamuna22Entry(id);
            }
        });
    });

    $(document).on('click', '#print-namuna-22-btn', function (e) {
        e.preventDefault();

        const month = $('#month-year-form [name="month"]').val();
        const year = $('#month-year-form [name="year"]').val();

        if (!month || !year) {
            alertjs.warning({
                t: 'Warning',
                m: 'महिना व वर्ष निवडा',
            });
            return;
        }
        window.open(`/namuna/22/print?month=${month}&year=${year}`, '_blank');
    });
});
