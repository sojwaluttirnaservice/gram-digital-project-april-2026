$(document).ready(function () {
    $(document).on('click', '#show-namuna-28-report-btn', function (e) {
        e.preventDefault();
        const optionValue = +$('[name="show-report-by"]').val();
        const reportBaseUrl = '/namuna/28/report';

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

    const handleDeleteNamuna28Entry = async (id) => {
        try {
            const deleteUrl = '/namuna/28/delete';

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

    $(document).on('click', '.delete-namuna-28-entry-btn', function (e) {
        e.preventDefault();

        const id = $(this).attr('data-namuna28Entry');

        alertjs.deleteSpl('Confirm Delete?', (status) => {
            if (status) {
                handleDeleteNamuna28Entry(id);
            }
        });
    });

    $(document).on('click', '#print-namuna-28-btn', function (e) {
        e.preventDefault();

        const fromYear = $('#year-year-form [name="fromYear"]').val();
        const toYear = $('#year-year-form [name="toYear"]').val();

        if (!fromYear || !toYear) {
            alertjs.warning({
                t: 'Warning',
                m: 'दोन्ही वर्ष निवडा',
            });
            return;
        }
        window.open(`/namuna/28/print?fromYear=${fromYear}&toYear=${toYear}`, '_blank');
        $('#yearToYearModal').modal('hide');
    });
});
