$(document).ready(function () {
    $(document).on('click', '#print-namuna-1-btn', function (e) {
        e.preventDefault();

        // const month = $('#month-year-form [name="month"]').val();
        const fromYear = $('#month-year-form [name="fromYear"]').val();
        const toYear = $('#month-year-form [name="toYear"]').val();


        if (!fromYear || !toYear) {
            alertjs.warning({
                t: 'Warning',
                m: 'वर्ष निवडा',
            });
            return;
        }
        window.open(`/namuna/1/print?fromYear=${fromYear}&toYear=${toYear}`, '_blank');
    });
});
