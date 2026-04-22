$(() => {
    
    $(document).on('click', '#namuna-1-auxiliary-grants-list-btn', function (e) {
        e.preventDefault();

        const year = $('#month-year-form [name="year"]').val();

        if (!year) {
            alertjs.warning({
                t: 'Warning',
                m: 'वर्ष निवडा',
            });
            return;
        }
        window.open(`/namuna/1/collection/auxiliary-grants/list?year=${year}`, '_blank');
    });
});
