$(document).ready(function () {
  var searchType = 3;
  $(document).on('click', '.getForm8Tax', function (e) {
    $('#homeId').val('');
    $('#divUserDetails').addClass('d-none');
    $('#masterModal').modal({
      show: true
    });
  });

  $('#selectSearch-1').on('change', function () {
    searchType = Number($(this).val());
    $('#homeId-type').val('');
    $('#homeId').val('');
  });
  $('#homeId-type')
    .autocomplete({
      minLength: 1,
      source: function (request, response) {
        $('#homeId').val('');
        $('#divUserDetails').addClass('d-none');
        $.ajax({
          url: '/magni-lekh/get-auto-search',
          method: 'post',
          data: {
            q: request.term,
            sType: searchType
          },
          success: function (data) {
            console.log(data.call);
            response(data.call);
          }
        });
      },
      focus: function (event, ui) {
        $('#homeId-type').val(ui.item.label);
        return false;
      },
      select: function (event, ui) {
        $('#homeId-type').val(ui.item.label);
        $('#homeId').val(ui.item.id);
        getUserDetails();
        return false;
      }
    })
    .data('ui-autocomplete')._renderItem = function (ul, item) {
    return $('<li>')
      .data('ui-autocomplete-item', item)
      .append('<a style="display:block;width:100%;"> ' + item.label + '</a>')
      .appendTo(ul);
  };
  $(document).on('click', '#btnGetUserDetails', function (e) {
    e.preventDefault();
    getUserDetails();
  });
  function getUserDetails() {
    var value = Number($('#homeId').val());
    if (isNaN(value) || value == null || value == 0) {
      return false;
    }
    homeManager.getUserDetails(value, function (data) {
      if (data.call == 1) {
        homeManager.tempUserDetails = data.data;
        data = data.data;
        $('.myMainId').val(data.id);
        $('#newMalmattaNo').val(data.feu_malmattaNo);
        $('#newWardNo').val(data.feu_wardNo);
        $('#oldHomeNo').val(data.feu_homeNo);
        $('#newOwnerName').val(data.feu_ownerName);
        $('#newSecondOwnerName').val(data.feu_secondOwnerName);
        $('#newMobileNo').val(data.feu_mobileNo);
        $('#newAadharNo').val(data.feu_aadharNo);
        $('#newGramPanchayet').val(data.feu_gramPanchayet);
        $('#newVillageName').val(data.feu_villageName);

        $('#totalSamanyaKar').val(data.totalSampurnaTax);
        $('#totalWaterKar').val(data.totalWaterTax);
        $('#totalKar').val(data.totalTax);
        $('#divUserDetails').removeClass('d-none');
      } else {
        $('#divUserDetails').addClass('d-none');

        alertjs.warning(
          {
            t: 'माहिती',
            m: 'वरील अनु/घर क्रमांक सापडले नाही.'
          },
          function () {}
        );
      }
    });
  }
  $(document).on('click', '#btnGetUserDetailsNext', function (e) {
    e.preventDefault();
    var id = Number($('#homeId').val());
    if (!isNaN(id)) {
      window.location.assign('/magni-lekh?e=' + (Number(id) + 1));
    } else {
      alert('अनु क्रमांक मिळाला नाही');
    }
  });
  $(document).on('click', '#btnAddMagniLekh', function (e) {
    e.preventDefault();
    var value = {
      user_id: homeManager.tempUserDetails.id,
      tax_id: homeManager.tempUserDetails.tax_id
    };
    homeManager.addUserToMagniLekh(value, function (data) {
      if (data.call == 1) {
        alertjs.success(
          {
            t: 'माहिती',
            m: 'वरील अनु/घर क्रमांक यशस्वी मागणी लेख मध्ये जतन केला.'
          },
          function () {
            window.location.assign(
              '/magni-lekh?e=' + (Number(value.user_id) + 1)
            );
          }
        );
      } else {
        alertjs.warning(
          {
            t: 'माहिती',
            m: 'वरील अनु/घर क्रमांक सापडले नाही.'
          },
          function () {}
        );
      }
    });
  });

  // Confirmation to delete the magni lekh data from the list
  $(document).on('click', '.removeMagniLekh', function (e) {
    e.preventDefault();

    let id = +$(this).attr('data-id');
    alertjs.delete(function (status) {
      if (status == true) {
        magniLekhDelete(id);
      }
    });
  });
});

function magniLekhDelete(id) {
  let sendData = {
    id: id
  };
  $.ajax({
    url: '/magni-lekh/remove-user',
    method: 'POST',
    data: sendData,
    success: function (data) {
      if (data.call == 1) {
        alertjs.success(
          {
            t: 'माहिती',
            m: 'वरील अनु/घर क्रमांक यशस्वी मागणी लेख मधून काढले गेले.'
          },
          function () {
            window.location.assign('/magni-lekh');
          }
        );
      } else {
        alertjs.warning(
          {
            t: 'माहिती',
            m: 'वरील अनु/घर क्रमांक सापडले नाही.'
          },
          function () {}
        );
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}

var homeManager = {
  tempUserDetails: {},
  navigationType: 0,
  getUserDetails(id, callback) {
    var data = {
      url: '/magni-lekh/new-user',
      method: 'post',
      data: {
        id: id
      }
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert('You Have An Error, PLease check Console');
        console.log(data);
        return false;
      }
      callback(data);
    });
  },
  addUserToMagniLekh(data, callback) {
    var data = {
      url: '/magni-lekh/add-user',
      method: 'post',
      data: data
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert('You Have An Error, PLease check Console');
        console.log(data);
        return false;
      }
      callback(data);
    });
  },
  removeUserToMagniLekh(data, callback) {
    var data = {
      url: '/magni-lekh/remove-user',
      method: 'post',
      data: data
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert('You Have An Error, PLease check Console');
        console.log(data);
        return false;
      }
      callback(data);
    });
  }
};
function loadModel(a) {
  if (a == 0) return false;
  $('#homeId').val('');
  $('#homeId-type').val(a);
  $('#homeId-type').autocomplete('search');
  $('#divUserDetails').addClass('d-none');
  $('#masterModal').modal({
    show: true
  });
}
