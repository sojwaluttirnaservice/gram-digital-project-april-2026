$(function () {
  function assignLocation(url) {
    window.location.assign(url);
  }

  function open(url) {
    window.open(url, '_blank');
  }

  $(document).on('click', '.commonModalFrom', function (e) {
    let data = $(this).data('id');

    switch (data) {
      // case 'नमुना-५-क':
      //   assignLocation('/namuna5K');
      //   break;

      case 'सामान्य कर वसुली वही':
        open('/samanya-rokad-vahi');
        break;

      case 'पाणी कर वसुली वही':
        open('/pani-rokad-vahi');
        break;

      // case 'नमुना 7':
      //   open('/dakhle-pay-list');
      //   break;

      case 'सर्व कर वसुली':
        $('#getAllKarVasuliDateToDateModal').modal('show');
        break;


      default:
        break;
    }
  });

  $('#getAllKarVasuliDateToDateBtn').on('click', function(){
    let date_from = $('#from-date').val().trim();
    let date_to = $('#to-date').val().trim();

    window.open(`/all-rokad-vahi-records?date_from=${date_from}&date_to=${date_to}`, '_blank')
  })
});
