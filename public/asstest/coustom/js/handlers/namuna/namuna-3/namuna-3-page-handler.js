$(() => {
    let redirectFormUrl = '';

    $(document).on('click', '#open-form-btn', function (e) {
        e.preventDefault();
        let year = $('#yearModal #year-form [name="year"]').val();
        window.open(`/namuna/3${redirectFormUrl}?year=${year}`, '_blank');
    });

    $(document).on('click', '.open-form-modal-btn', function (e) {
        e.preventDefault();

        $('#yearModal').modal('show');

        let _redirectUrl = $(this).attr('data-redirectUrl');
        redirectFormUrl = _redirectUrl;
    });
});
