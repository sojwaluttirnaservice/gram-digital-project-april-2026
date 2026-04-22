$(() => {

    $(document).on('click', '#open-search-namuna-8-user-modal-btn', function () {

        // copying this code from the home-manager.js; line number 405
        $('#homeId1').val('');
        $('#homeId1-type').val('');
        $('#sendNineNavigation').addClass('d-none');
        $('#previewDetails').addClass('d-none');
        $('#printAll8Btn').addClass('d-none');
        $('#btnPrintEight').addClass('d-none');
        $('#btnPrintNineSamanya').addClass('d-none');
        $('#d1').addClass('d-none');
        $('#d2').addClass('d-none');
        $('#date1').val('');
        $('#date2').val('');
        $('#pavtiName').addClass('d-none').val('');
        $('#pavtiRuppe').addClass('d-none').val('20');

        $('#printDate').css('display', 'none');



        // using the case 2, for thsi from the same code

        $('#masterModal1').modal({
            show: true,
        });
        $('#नमुना ९ सामन्य व पाण्याचे नोदणी फॉर्म').removeClass('d-none');
        $('.modal-title').html('नमुना ९ सामन्य व पाण्याचे नोदणी फॉर्म');
        $('#sendNineNavigation').removeClass('d-none');
        // break;

    })


    $(document).on('click', '#sendNineNavigation', function (e) {
        e.preventDefault();
        window.location.assign('/form-9/' + homeManager.tempUserDetails.id);
    });



    function getUserDetails1() {
        var value = Number($('#homeId1').val());
        if (isNaN(value) || value == null || value == 0) {
            return false;
        }
        homeManager.getUserDetails(value, function (data) {
            if (data.call == 1) {
                homeManager.tempUserDetails = data.data;
                data = data.data;
                $('.myMainId1').val(data.id);
                $('#newMalmattaNo1').val(data.feu_malmattaNo);
                $('#newWardNo1').val(data.feu_wardNo);
                $('#oldHomeNo1').val(data.feu_homeNo);
                $('#waterTax1').val(data.feu_water_tax);
                $('#newOwnerName1').val(data.feu_ownerName);
                $('#pavtiName').val(data.feu_ownerName);
                $('#newSecondOwnerName1').val(data.feu_secondOwnerName);
                $('#newMobileNo1').val(data.feu_mobileNo);
                $('#newAadharNo1').val(data.feu_aadharNo);
                $('#newGramPanchayet1').val(data.feu_gramPanchayet);
                $('#newVillageName1').val(data.feu_villageName);
                $('#newOldDharak').val(data.feu_newOldDharak);
                $('#newNewDharak').val(data.feu_newNewDharak);
                $('#newPherfarDate').val(data.feu_newPherfarDate);
                $('#newPherfarTharav').val(data.feu_newPherfarTharav);
                $('#newPherfarDocument').val(data.feu_newPherfarDocument);
                $('#previewDetails').removeClass('d-none');
            } else {
                $('#previewDetails').addClass('d-none');

                alertjs.warning(
                    {
                        t: 'माहिती',
                        m: 'वरील अनु/घर क्रमांक सापडले नाही.',
                    },
                    function () { }
                );
            }
        });
    }

    var searchType = 1;


    $('#selectSearch').on('change', function () {
        searchType = Number($(this).val());
        $('#homeId1-type').val('');
        $('#homeId1').val('');
    });
    // homeId
    if ($('#homeId1-type')) {
        $('#homeId1-type')
            .autocomplete({
                minLength: 1,
                source: function (request, response) {
                    $('#homeId1').val('');
                    $('#previewDetails').addClass('d-none');
                    $.ajax({
                        url: '/get-user-info',
                        method: 'post',
                        data: {
                            q: request.term,
                            sType: searchType,
                        },
                        success: function (data) {
                            console.log(data.call);
                            // console.log("I am in homeid 158")
                            response(data.call);
                        },
                    });
                },
                focus: function (event, ui) {
                    $('#homeId1-type').val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    $('#homeId1-type').val(ui.item.label);
                    $('#homeId1').val(ui.item.id);
                    // console.log("I am in homeid 170")
                    getUserDetails1();
                    return false;
                },
            })
            .data('ui-autocomplete')._renderItem = function (ul, item) {
                return $('<li>')
                    .data('ui-autocomplete-item', item)
                    .append('<a style="display:block;width:100%;"> ' + item.label + '</a>')
                    .appendTo(ul);
            };
    }
})


var homeManager = {
    // these d1, d2, pavatiName,rupee are for form eight print
    d1: $('#d1').val(),
    d2: $('#d2').val(),
    pavtiName: $('#pavtiName').val(),
    ruppe: $('#pavtiRuppe').val(),

    tempUserDetails: {},
    navigationType: 0,
    openPrintToNewTab: function (url) {
        w = window.open(url);
        w.onunload = function () {
            console.log('closed!');
        };
    },

    getUserDetails(id, callback) {
        var data = {
            url: '/form-8/getSingleUserDetails',
            method: 'post',
            data: {
                id: id,
            },
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
    calculateArea1: function (heightFoot, widthFoot) {
        let sqAreaFoot = heightFoot * widthFoot;
        let sqAreaMeter = sqAreaFoot / 10.76;

        let areaHeightMeter = heightFoot / 3.28;
        let areaWidthMeter = widthFoot / 3.28;

        $('#newAreaHeightMeter').val(areaHeightMeter.toFixed(2));
        $('#newAreaWidthMeter').val(areaWidthMeter.toFixed(2));

        $('#newTotalAreaSquareFoot').val(sqAreaFoot.toFixed(2));
        $('#newTotalAreaSquareMeter').val(sqAreaMeter.toFixed(2));
    },
    calculateFeet: function (hM, wM) {
        let hF = Number(hM) * 3.28;
        let wF = Number(wM) * 3.28;
        $('#newAreaHeightFoot').val(hF.toFixed(2));
        $('#newAreaWidthFoot').val(wF.toFixed(2));

        let areaSqFoot = hF * wF;
        let areaSqMeter = hM * wM;

        $('#newTotalAreaSquareFoot').val(areaSqFoot.toFixed(2));
        $('#newTotalAreaSquareMeter').val(areaSqMeter.toFixed(2));
    },
    calculateArea: function (h, w, sqArea, sqMeter) {
        console.log(h, w);
        var _h = Number($(h));
        var _w = Number($(w));
        $(sqArea).val(Math.round(_h * _w));
        homeManager.calculateSqMeter(sqArea, sqMeter);
    },
    calculateSqMeter: function (sqArea, sqMeter) {
        var _sqArea = Number($(sqArea).val());
        $(sqMeter).val((_sqArea / 10.76).toFixed(2));
    },

    calculateSqFeet: function (sqArea, sqMeter) {
        var _sqArea = Number($(sqArea).val());
        $(sqMeter).val((_sqArea * 10.76).toFixed(2));
    },
    convertToMeter: function (value) {
        if (value == '') return 0;
        if (isNaN(value)) return 0;

        return (value / 3.2).toFixed(2);
    },
};
