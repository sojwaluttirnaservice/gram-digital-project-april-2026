$(() => {
    $(document).on('click', '.namuna-13-create-employee-btn', async function (e) {
        e.preventDefault();

        try {
            const postId = +$(this).attr('data-postId');
            const approvedPosts = +$(this).attr('data-approvedPosts');
            const link = $(this).attr('data-link');

            const url = `/namuna/13/list/` + postId;
            const _res = await fetch(url, {
                method: 'POST',
            });

            const { call, employees } = await _res.json();

            if (call == 0) {
                alertjs.warning({
                    t: 'ERROR',
                    m: 'Something went wrong',
                });
                return;
            }
            if (employees && employees.length >= approvedPosts) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'नोंदणीकृत कर्मचारी पूर्ण झाले आहेत',
                });
                return;
            }
            window.open(link, '_blank');
        } catch (err) {
            console.log(`Error while checking the registered status`, err);
        }
    });

    // Show/hide report type form
    $('select[name="show-report-by"]').change(function () {
        var target = $(this).val();
        $('#show-report-by-div > div').hide(); // Hide all report types
        $('#show-report-by-div')
            .find("[data-target='" + target + "']")
            .show(); // Show the selected one
    });

    $(document).on('click', '#show-namuna-13-report-btn', function (e) {
        e.preventDefault();
        const optionValue = +$('[name="show-report-by"]').val();
        // alert(optionValue);

        const reportBaseUrl = '/namuna/13/report';

        if (optionValue == '' || optionValue == '-1') {
            alertjs.warning({
                t: 'WARNING',
                m: 'Select Report Type',
            });
            return;
        }
        switch (optionValue) {
            case 1:
                const selectedYear = $('[name="selected_year"]').val();
                if (selectedYear == '' || selectedYear == '-1') {
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
                if (fromYear == '' || fromYear == '-1' || toYear == '' || toYear == '-1') {
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
                if (month == '' || month == '-1' || year == '' || year == '-1') {
                    alertjs.warning({
                        t: 'महिना व वर्ष निवडा',
                    });
                    return;
                }
                window.open(`${reportBaseUrl}?month=${month}&year=${year}`, '_blank');

                break;
        }
    });
});
