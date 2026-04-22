var snapMale = '';
var snapFemale = '';
$(document).ready(function () {
  //Kar Vasuli done
  $(document).on('click', '#karVasuliAvahal', function () {
    $('#monthName').val('0');
    $('#karAhavalModel').modal({
      show: true
    });
    $('#karAhavalModel .modal-title').html('कर वसुली अहवाल प्रिंट');
  });

  //Bleaching ahaval done
  $('#bleachingAvahal').click(function () {
    window.open('/bleaching-avahal', '_self');
  });

  //Print
  $(document).on('click', '#btnPrintAhaval', function (e) {
    e.preventDefault();
    var monthName = $('#monthName').val();
    if (Number(monthName) !== 0) {
      window.open(`/print/gp-ahaval-kar-vasuli?m=${monthName}`, '_self');
    }
  });

  $(document).on('click', '.removeMarriage', function (e) {
    e.preventDefault();

    var data = {
      url: '/marriage/remove-marriage',
      method: 'post',
      data: {
        id: $(this).attr('data-id')
      }
    };

    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert('You Have An Error, PLease check Console');
        console.log(data);
        return false;
      }
      if (data.call == 1) {
        alertjs.success(
          {
            t: 'विवाह नोंदणी',
            m: 'यशस्वी रित्या काढल्या गेली.'
          },
          function () {
            window.location.reload();
          }
        );
      }
    });
  });

  //Marriage ahaval
  $('#marriageAvahal').click(function () {
    window.open('/marriage-registration-avahal', '_self');
  });

  //BD (birth-death) ahaval done
  $('#birthDeathAvahal').click(function () {
    window.open('/bd-avahal', '_self');
  });
});
