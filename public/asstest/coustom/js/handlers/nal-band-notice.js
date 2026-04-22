$(document).ready(function () {
  var searchType = 3;
  $(document).on("click", ".getForm8Tax", function (e) {
    $("#homeId").val("");
    $("#divUserDetails").addClass("d-none");
    $("#masterModal").modal({
      show: true,
    });
  });
  $("#selectSearch-1").on("change", function () {
    searchType = Number($(this).val());
    $("#homeId-type").val("");
    $("#homeId").val("");
  });
  $("#homeId-type")
    .autocomplete({
      minLength: 1,
      source: function (request, response) {
        $("#homeId").val("");
        $("#divUserDetails").addClass("d-none");
        $.ajax({
          url: "/nal-band-notice/get-auto-search",
          method: "post",
          data: {
            q: request.term,
            sType: searchType,
          },
          success: function (data) {
            console.log(data.call);
            response(data.call);
          },
        });
      },
      focus: function (event, ui) {
        $("#homeId-type").val(ui.item.label);
        return false;
      },
      select: function (event, ui) {
        $("#homeId-type").val(ui.item.label);
        $("#homeId").val(ui.item.id);
        getUserDetails();
        return false;
      },
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
    return $("<li>")
      .data("ui-autocomplete-item", item)
      .append("<a> " + item.label + "</a>")
      .appendTo(ul);
  };
  $(document).on("click", "#btnGetUserDetails", function (e) {
    e.preventDefault();
    getUserDetails();
  });
  function getUserDetails() {
    var value = Number($("#homeId").val());
    if (isNaN(value) || value == null || value == 0) {
      return false;
    }
    homeManager.getUserDetails(value, function (data) {
      if (data.call == 1) {
        homeManager.tempUserDetails = data.data;
        data = data.data;
        $(".myMainId").val(data.id);
        $("#newMalmattaNo").val(data.feu_malmattaNo);
        $("#newWardNo").val(data.feu_wardNo);
        $("#oldHomeNo").val(data.feu_homeNo);
        $("#newOwnerName").val(data.feu_ownerName);
        $("#newSecondOwnerName").val(data.feu_secondOwnerName);
        $("#newMobileNo").val(data.feu_mobileNo);
        $("#newAadharNo").val(data.feu_aadharNo);
        $("#newGramPanchayet").val(data.feu_gramPanchayet);
        $("#newVillageName").val(data.feu_villageName);

        $("#totalSamanyaKar").val(data.totalSampurnaTax);
        $("#totalWaterKar").val(data.totalWaterTax);
        $("#totalKar").val(data.totalTax);
        $("#divUserDetails").removeClass("d-none");
      } else {
        $("#divUserDetails").addClass("d-none");

        alertjs.warning(
          {
            t: "माहिती",
            m: "वरील अनु/घर क्रमांक सापडले नाही.",
          },
          function () {},
        );
      }
    });
  }

  $(document).on("click", "#btnAddNalBandNext", function (e) {
    e.preventDefault();
    var id = Number($("#homeId").val());
    if (!isNaN(id)) {
      window.location.assign("/nal-band-notice?e=" + (Number(id) + 1));
    } else {
      alert("अनु क्रमांक मिळाला नाही");
    }
  });

  $(document).on("click", "#btnAddNalBand", function (e) {
    e.preventDefault();
    var value = {
      user_id: homeManager.tempUserDetails.id,
      tax_id: homeManager.tempUserDetails.tax_id,
    };
    homeManager.addUserToNalBand(value, function (data) {
      if (data.call == 1) {
        alertjs.success(
          {
            t: "माहिती",
            m: "वरील अनु/घर क्रमांक नळ बंद नोटीस मध्ये यशस्वी  जतन केला.",
          },
          function () {
            window.location.assign(
              "/nal-band-notice?e=" + (Number(value.user_id) + 1),
            );
          },
        );
      } else {
        alertjs.warning(
          {
            t: "माहिती",
            m: "वरील अनु/घर क्रमांक सापडले नाही.",
          },
          function () {},
        );
      }
    });
  });

  $(document).on("click", ".removeNalBand", function (e) {
    e.preventDefault();
    var value = {
      id: $(this).attr("data-id"),
    };
    homeManager.removeUserFromNalBand(value, function (data) {
      if (data.call == 1) {
        alertjs.success(
          {
            t: "माहिती",
            m: "वरील अनु/घर क्रमांक यशस्वी नळ बंद नोटीस मधून काढले गेले.",
          },
          function () {
            window.location.assign("/nal-band-notice");
          },
        );
      } else {
        alertjs.warning(
          {
            t: "माहिती",
            m: "वरील अनु/घर क्रमांक सापडले नाही.",
          },
          function () {},
        );
      }
    });
  });
});
var homeManager = {
  tempUserDetails: {},
  navigationType: 0,
  getUserDetails(id, callback) {
    var data = {
      url: "/nal-band-notice/new-user",
      method: "post",
      data: {
        id: id,
      },
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }
      callback(data);
    });
  },
  addUserToNalBand(data, callback) {
    var data = {
      url: "/nal-band-notice/add-user",
      method: "post",
      data: data,
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }
      callback(data);
    });
  },
  removeUserFromNalBand(data, callback) {
    var data = {
      url: "/nal-band-notice/remove-user",
      method: "post",
      data: data,
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }
      callback(data);
    });
  },
};
function loadModel(a) {
  if (a == 0) return false;
  $("#homeId").val("");
  $("#homeId-type").val(a);
  $("#homeId-type").autocomplete("search");
  $("#divUserDetails").addClass("d-none");
  $("#masterModal").modal({
    show: true,
  });
}
