$(() => {
    $(document).on('click', '#namuna-1-village-fund-list-btn', function (e) {
        e.preventDefault();

        const year = $('#month-year-form [name="year"]').val();

        if (!year) {
            alertjs.warning({
                t: 'Warning',
                m: 'वर्ष निवडा',
            });
            return;
        }
        window.open(`/namuna/1/collection/village-funds/list?year=${year}`, '_blank');
    });
});
