var image = '';
var image2 = '';
$(document).ready(function () {


    let sarpanchDetails = null
    let gramsevakDetails = null

    if(typeof _gp != 'undefined'){
        
        if(_gp?.gp_member){
            let members = JSON.parse(_gp?.gp_member || "[]")
                sarpanchDetails = members && members.length > 0 ? members.find((member) => member && (member.p_name == 'सरपंच')) : null
                gramsevakDetails = members && members.length > 0 ? members.find((member) => member && (member.p_name == 'ग्रामसेवक' || member.p_name == 'ग्रामविकास अधिकारी' || member.p_name == 'ग्रामपंचायत अधिकारी')) : null
                console.log(sarpanchDetails, gramsevakDetails)
        }
    }

    //======================
    //Redirected back from the payment page of tax
    const searchParams = new URLSearchParams(window.location.search);
    let paymentDone = searchParams.get('paymentDone');
    let state = searchParams.get('state');
    const idToLoad = searchParams.get('id');

    // console.log('is done = ', paymentDone, paymentDone === 'success');

    if (paymentDone === 'success') {
        // console.log('loading');
        $('#masterModal1').modal({
            show: true,
        });
        $('#printAll8Btn').removeClass('d-none');
        $('#btnPrintEight').removeClass('d-none');

        $('#btnPrintEightNoImage').removeClass('d-none');
        $('#btnPrintEightQr').removeClass('d-none');
        $('#btnPrintEightQrImage').removeClass('d-none');

        $('.modal-title').html('प्रिंट नमुना 8');

        if (typeof state != undefined && state == 'openPrintModal') {
            $('#paymentModeModal').modal('show');
            $('#paymentModeModal .modal-title').html('पेमेंट');

            $('#paymentModeModal #payCheckoutForm .print-certificate-div')
                .css('display', 'flex')
                .attr('style', 'display: flex !important');
            $('#paymentModeModal #payCheckoutForm .pay-details-div')
                .css('display', 'none')
                .attr('style', 'display: none !important');

            $('#paymentModeModal #payCheckoutForm .payment-mode-buttons-div')
                .css('display', 'none')
                .attr('style', 'display: none !important');
        }

        $('#d1').removeClass('d-none').val('');
        $('#d2').removeClass('d-none').val('');
        $('#pavtiName').removeClass('d-none').val('');
        $('#pavtiRuppe').removeClass('d-none').val('20');
        homeManager.getUserDetails(idToLoad, function (data) {
            console.log('DAATa.call  = ', data);
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
                // console.log('wasssss scuessfull')
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

    //======================

    $('#newAadharNo').mask('0000-0000-0000');
    $('#date31').mask('00-00-00');

    $(document).on('keyup', '.isNaN', function (e) {
        console.log('event');
        homeManager.calculateArea1(
            Number($('#newAreaHeightFoot').val()),
            Number($('#newAreaWidthFoot').val())
        );
    });

    $(document).on('keyup', '.isNaN2', function (e) {
        $('.isNaN').val('-');
        console.log(Number($('#newAreaHeightMeter').val()));

        homeManager.calculateFeet(
            Number($('#newAreaHeightMeter').val()),
            Number($('#newAreaWidthMeter').val())
        );
    });

    $(document).on('keyup', '#newTotalAreaSquareFoot', function (e) {
        if (e.which == 9) {
            return false;
        }
        $('.isNaN').val('');
        $('.isNaN2').val('');
        var _value = Number($(this).val());
        if (isNaN(_value)) {
            $(this).val('');
            $('#newTotalAreaSquareFoot').val('');
            $('#newTotalAreaSquareMeter').val('');
            return false;
        }
        homeManager.calculateSqMeter('#newTotalAreaSquareFoot', '#newTotalAreaSquareMeter');
    });

    $(document).on('keyup', '#newTotalAreaSquareMeter', function (e) {
        if (e.which == 9) {
            return false;
        }
        $('.isNaN').val('');
        $('.isNaN2').val('');
        var _value = Number($(this).val());
        if (isNaN(_value)) {
            $(this).val('');
            $('#newTotalAreaSquareFoot').val('');
            $('#newTotalAreaSquareMeter').val('');
            return false;
        }
        homeManager.calculateSqFeet('#newTotalAreaSquareMeter', '#newTotalAreaSquareFoot');
    });

    var idArray = [];
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

    $('.readOnly').prop('readonly', true);
    $(document).on('click', '.getForm8', function (e) {
        window.location.assign('/form-8');
    });

    // $(document).on("keyup", ".isNaN", function (e) {
    //   if (e.which == 9) {
    //     return false;
    //   }
    //   var _value = Number($(this).val());
    //   if (isNaN(_value)) {
    //     $(this).val("");
    //     $("#newTotalArea").val("");
    //     $("#newTotalAreaSquareMeter").val("");
    //     return false;
    //   }
    //   homeManager.calculateArea(
    //     "#newAreaHeight",
    //     "#newAreaWidth",
    //     "#newTotalArea",
    //     "#newTotalAreaSquareMeter"
    //   );
    // });
    $(document).on('click', '#btnGetPrintSpace1', function (e) {
        if ($('#date11').val() == '') {
            return false;
        }
        if ($('#date21').val() == '') {
            return false;
        }
        if ($('#date31').val() == '') {
            return false;
        }
        var data = `?p=0&tp=100&y1=${$('#date11').val()}&y2=${$(
            '#date21'
        ).val()}&date=${$('#date31').val()}`;

        switch (homeManager.navigationType) {
            case 6:
                homeManager.openPrintToNewTab(
                    '/print/magni-bill' +
                    `?year1=${$('#date11').val()}&year2=${$('#date21').val()}&date=${$(
                        '#date31'
                    ).val()}&p=0&tp=100`
                );

                break;
            case 11:
                homeManager.openPrintToNewTab('/print/nal-band-notice' + data);
                break;
            default:
                break;
        }
    });

    $(document).on('click', '#print-kar-nihay-yadi-and-other-btn', function (e) {
        e.preventDefault();
        if ($('#date-1').val() == '') {
            return false;
        }
        if ($('#date-2').val() == '') {
            return false;
        }
        var data = `${$('#date-1').val()}/${$('#date-2').val()}`;
        let y1 = $('#date-1').val();
        let y2 = $('#date-2').val();

        window.open(`/print/form-8All-kar-nihay-yadi-and-other/${data}`, '_blank');
    });

    $(document).on('click', '#print-kar-nihay-yadi-btn', function (e) {
        e.preventDefault();
        if ($('#date-1').val() == '') {
            return false;
        }
        if ($('#date-2').val() == '') {
            return false;
        }
        var data = `${$('#date-1').val()}/${$('#date-2').val()}`;
        let y1 = $('#date-1').val();
        let y2 = $('#date-2').val();

        window.open(`/print/form-8All-kar-nihay-yadi/${data}`, '_blank');
    });

    $(document).on('click', '#print-malmatta-dharak-yadi-by-name-btn', function (e) {
        e.preventDefault();
        if ($('#date-1').val() == '') {
            return false;
        }
        if ($('#date-2').val() == '') {
            return false;
        }
        var data = `${$('#date-1').val()}/${$('#date-2').val()}`;
        let y1 = $('#date-1').val();
        let y2 = $('#date-2').val();

        window.open(`/print/form-8All/${data}?sortBy=name`, '_blank');
    });


    $(document).on('click', '#print-malmatta-dharak-yadi-by-malmatta-btn', function (e) {
        e.preventDefault();
        if ($('#date-1').val() == '') {
            return false;
        }
        if ($('#date-2').val() == '') {
            return false;
        }
        var data = `${$('#date-1').val()}/${$('#date-2').val()}`;
        let y1 = $('#date-1').val();
        let y2 = $('#date-2').val();

        window.open(`/print/form-8All/${data}?sortBy=malmatta`, '_blank');
    });

    $(document).on('click', '#btnGetPrintSpace', function (e) {
        if ($('#date1').val() == '') {
            return false;
        }
        if ($('#date2').val() == '') {
            return false;
        }
        var data = `${$('#date1').val()}/${$('#date2').val()}`;
        let y1 = $('#date1').val();
        let y2 = $('#date2').val();
        let showWaterMark = $('#show-watermark').val();

        switch (homeManager.navigationType) {
            case 4:
                homeManager.openPrintToNewTab('/print/form-9-samanya/' + data);
                break;
            case 5:
                homeManager.openPrintToNewTab('/print/form-9-pani/' + data);
                break;
            case 115:
                window.open(`/print/form-9-samanya-kar/${y1}/${y2}`, '_blank');
                break;

            case 117:
                window.open(`/print/form-9-samanya-other/${y1}/${y2}`, '_blank');
                break;
            case 116:
                window.open(`/watertax/watertax-print/${y1}/${y2}`, '_blank');
                break;
            case 6:
                homeManager.openPrintToNewTab(
                    '/print/magni-bill' + `?year1=${y1}&year2=${y2}&p=0&tp=100`
                );
                break;
            case 7:
                homeManager.openPrintToNewTab(
                    '/print/form-8-all' +
                    `?year1=${y1}&year2=${y2}&showWatermark=${showWaterMark}&p=0&tp=100`
                );
                break;
            case 100:
                homeManager.openPrintToNewTab('/print/form-9-all/' + data);
                break;

            case 109:
                homeManager.openPrintToNewTab('/print/form-9-all-samanya/' + data);
                break;

            case 102:
                homeManager.openPrintToNewTab(
                    '/print/form-8-pratidnyapatra' + `?year1=${y1}&year2=${y2}&p=0&tp=100`
                );
                break;
            case 103:
                homeManager.openPrintToNewTab('/print/form-9-pageNusar-samanya/' + data);
                break;
            case 104:
                homeManager.openPrintToNewTab('/print/form-9-pageNusar-pani/' + data);
                break;
            case 105:
                homeManager.openPrintToNewTab('/print/printSamanyKarMagniDemand/' + data);
                break;
            case 107:
                homeManager.openPrintToNewTab('/print/printPaniKarMagniDemand/' + data);
                break;
            case 106:
                homeManager.openPrintToNewTab('/print/printSamanyaChaluKarMagniDemand/' + data);
                break;
            case 108:
                homeManager.openPrintToNewTab('/print/printPaniChaluKarMagniDemand/' + data);
                break;

            case 401:
                homeManager.openPrintToNewTab("/print/form-9-all-samanya-total/"+data)
                break;

            case 71:
                homeManager.openPrintToNewTab(
                    '/print/form-8-all-image' +
                    `?year1=${y1}&year2=${y2}&showWatermark=${showWaterMark}&p=0&tp=100`
                );
                break;
            case 72:
                homeManager.openPrintToNewTab(
                    '/print/form-8-QR' +
                    `?year1=${y1}&year2=${y2}&showWatermark=${showWaterMark}&p=0&tp=100`
                );
                break;
            case 9:
                $('#printDate').css('display', 'inline-block');
                let printDate = $('#printDate').val();
                homeManager.openPrintToNewTab(
                    `/print/magni-lekh?year1=${y1}&year2=${y2}&printDate=${printDate}`
                );
                // console.log(data, y1, y2);
                break;

            default:
                break;
        }
    });

    $(document).on('click', '.commonModalFrom', function (e) {
        // setting navigation type at the begining
        homeManager.navigationType = Number($(this).data('id'));

        // this is for blank certificate, not interferring with the other types, separated further
        blankCertificateNavigation.navigationId = Number($(this).data('id'));

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

        switch (homeManager.navigationType) {
            case 2:
                $('#masterModal1').modal({
                    show: true,
                });
                
                $('#नमुना ९ सामन्य व पाण्याचे नोदणी फॉर्म').removeClass('d-none');
                $('.modal-title').html('नमुना ९ सामन्य व पाण्याचे नोदणी फॉर्म');
                $('#sendNineNavigation').removeClass('d-none');
                break;



            // This will be triggered on the click of the button/tab नमुना ८ प्रिंट present in the file formEightPrintTab 
            case 3:
                $('#masterModal1').modal({
                    show: true,
                });

                $('#printAll8Btn').removeClass('d-none');
                $('#btnPrintEight').removeClass('d-none');

                $('#btnPrintEightNoImage').removeClass('d-none');
                $('#btnPrintEightQr').removeClass('d-none');
                $('#btnPrintEightQrImage').removeClass('d-none');

                $('.modal-title').html('नमुना ८ प्रिंट');
                $('#d1').removeClass('d-none').val('');
                $('#d2').removeClass('d-none').val('');

                $('#pavtiName').removeClass('d-none').val('');
                $('#pavtiRuppe').removeClass('d-none').val('20');
                break;
            case 4:
                $('#yearModal').modal('show');
                $('.modal-title').html('वर्ष निवडा');
                break;
            case 5:
                $('#yearModal').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा');
                break;
            case 115:
                $('#yearModal').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा');
                break;

            case 116:
                $('#yearModal').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा');
                break;

            case 117:
                $('#yearModal').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा (नमुना ९ सामान्य व इतर कर)');
                break;
            case 6:
                $('#yearModal1').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा');
                break;
            case 7:
                $('#yearModal').modal({
                    show: true,
                });

                $('.modal-title').html('वर्ष निवडा (नमुना ८ सर्व प्रिंट)');
                break;
            case 100:
                $('#yearModal').modal({
                    show: true,
                });
                $('.modal-title').html(
                    'वर्ष निवडा(नमुना ९ वसुली यादी (सामान्य व पाणी कर)) इ.दि.आ.स्व.कर'
                );
                break;

            case 109:
                $('#yearModal').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा(नमुना ९ वसुली यादी (सामान्य व पाणी कर))');
                break;
            case 101:
                $('#namuna8MalamattaDharakYadiModal').modal('show');
                $('#namuna8MalamattaDharakYadiModal .modal-title').html('वर्ष निवडा(नमुना ८ मालमत्ता धारक यादी)');

                break;
            case 102:
                $('#yearModal').modal('show');
                $('.modal-title').html('वर्ष निवडा (नमुना ८ अर्ज प्रतिज्ञापत्र (मोजणी फॉर्म))');
                $('.watermark-div').hide()
                // When modal is closed, show the watermark again
                // .one attaches the event only once
                $('#yearModal').one('hidden.bs.modal', function () {
                    $('.watermark-div').show();
                });
                break;
            case 103:
                $('#yearModal').modal('show');
                $('.modal-title').html('वर्ष निवडा(नमुना 9 यादी सामान्य पेज नुसार)');
                break;
            case 104:
                $('#yearModal').modal('show');
                $('.modal-title').html('वर्ष निवडा (नमुना 9 यादी पाणी पेज नुसार)');
                break;
            case 105:
                $('#yearModal').modal('show');
                $('.modal-title').html('वर्ष निवडा (सामान्य कर मागणी (डिमांड))');
                break;
            case 107:
                $('#yearModal').modal('show');
                $('.modal-title').html('वर्ष निवडा (पाणी कर मागणी (डिमांड))');
                break;
            case 106:
                $('#yearModal').modal('show');
                $('.modal-title').html('वर्ष निवडा (सामान्य चालू कर मागणी (डिमांड))');


                $('.watermark-div').hide()
                // When modal is closed, show the watermark again
                // .one attaches the event only once
                $('#yearModal').one('hidden.bs.modal', function () {
                    $('.watermark-div').show();
                });
                break;
            case 108:
                $('#yearModal').modal('show');
                $('.modal-title').html('वर्ष निवडा (पाणी चालू कर मागणी (डिमांड))');
                $('.watermark-div').hide()
                // When modal is closed, show the watermark again
                // .one attaches the event only once
                $('#yearModal').one('hidden.bs.modal', function () {
                    $('.watermark-div').show();
                });
                break;

            case 401: 

                $('#yearModal').modal('show');
                $('.modal-title').html('वर्ष निवडा (नमुना 9 सामान्य कर व विशेष कर एकूण रक्कम याद)');
                $('.watermark-div').hide()
                // When modal is closed, show the watermark again
                // .one attaches the event only once
                $('#yearModal').one('hidden.bs.modal', function () {
                    $('.watermark-div').show();
                });
                break; 
            case 8:
                window.location.assign('/magni-lekh');
                break;
            case 9:
                $('#printDate').css('display', 'inline-block');
                $('#yearModal').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा');
                break;

            // ================================================
            // from 201 to 203, for header print of namuna 8 print
            case 201:
                $('#select-year-modal').modal({ show: true })
                $('#select-year-modal .modal-title').html('वर्ष निवडा (ठराव प्रमाणपत्र)')
                break
            case 202:
                $('#select-year-modal').modal({ show: true })
                $('#select-year-modal .modal-title').html('वर्ष निवडा (दरपत्रक प्रमाणपत्र)')
                break;
            case 203:
                $('#select-year-modal').modal({ show: true })
                $('#select-year-modal .modal-title').html('वर्ष निवडा (नमुना ८ हेडर प्रिंट)')
                break

            case 204:
                // here for downloading namuna 8 yaadi
                homeManager.openPrintToNewTab('/exports/form-eight');
                break;

            // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

            // ================================================
            // form namuna 9 blank prints from 301 to 305 (open modal or redirect things)
            case 301:
                $('#select-year-modal').modal({ show: true })
                $('#select-year-modal .modal-title').html('वर्ष निवडा (नमुना ९ सामन्य हेडर प्रिंट)')
                break
            case 302:
                $('#select-year-modal').modal({ show: true })
                $('#select-year-modal .modal-title').html('वर्ष निवडा (नमुना ९ पाणीपट्टी प्रमाणपत्र ठराव प्रिंट)')
                break;
            case 303:
                $('#select-year-modal').modal({ show: true })
                $('#select-year-modal .modal-title').html('वर्ष निवडा (नमुना ९ पाणी हेडर प्रिंट)')
                break
            case 304:
                $('#select-year-modal').modal({ show: true })
                $('#select-year-modal .modal-title').html('वर्ष निवडा (नमुना ९ सामान्यकर प्रमाणपत्र ठराव प्रिंट)')
                break;
            case 305:
                window.open('/print/blankCertificate/n-9-pending-taxes')
                break

            // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

            case 71:
                $('#yearModal').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा (फोटो नमुना ८ सर्व QR)');
                break;
            case 72:
                $('#yearModal').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा (फोटो नमुना ८ सर्व प्रिंट)');
                break;
            case 10:
                window.location.assign('/nal-band-notice');
                break;
            case 11:
                $('#yearModal1').modal({
                    show: true,
                });
                $('.modal-title').html('वर्ष निवडा');
                break;
            case 12:
                homeManager.openPrintToNewTab('http://crsorgi.gov.in/web/index.php/auth/login');
                break;
            case 13:
                /*homeManager.openPrintToNewTab(
          "http://crsorgi.gov.in/web/index.php/auth/login"
        );*/
                $('#webListModal').modal('show');
                break;
            case 14:
                window.location.assign('/marriage/list');
                break;
            case 15:
                window.location.assign('/certificate');
                break;
            case 16:
                window.location.assign('/application/');
                break;
            case 17:
                window.open('/sms/gram-sandesh-seva-view');
                break;
            case 18:
                window.location.assign('/self-declaration');
                break;
            case 19:
                window.location.assign('/tax-payer');
                break;
            case 20:
                window.location.assign('/gram-panchayet-ahaval');
                break;
            case 21:
                homeManager.openPrintToNewTab('exports/eight-form');
                break;
            case 22:
                homeManager.openPrintToNewTab('exports/nine-form');
                break;
            case 23:
                window.location.assign('/web-notice');
                break;
            case 24:
                window.location.assign('/gallery');
                break;
            case 25:
                window.location.assign('/meter');
                break;
            case 26:
                $('#meterModel').modal({
                    show: true,
                });
                $('.modal-title').html('मीटर प्रिंट करा');
                break;
            case 27:
                $('#meterModelPaniNondaniBill').modal({
                    show: true,
                });

                async function getYears() {
                    const _res = await fetch(
                        `/meter/fetch-distinct-month-year?startFrom=${''}&isDescending=true`
                    );

                    const { success, data } = await _res.json();

                    if (success) {
                        // console.log('getting')
                        const { distinctMonthYear } = data;
                        console.log(distinctMonthYear);
                        // distinctMonthsYears = distinctMonthYear

                        console.log(distinctMonthYear);

                        $('#meterModelPaniNondaniBill #from-date').html(
                            `<option selected disabled> पासून</option>` +
                            distinctMonthYear
                                .map((entry, ind) => {
                                    return `<option value='${entry.monthYear}'>${entry.monthYear}</option>`;
                                })
                                .join(' ')
                        );
                    }
                }

                getYears();
                $('.modal-title').html('मीटर पाण्याचे नमुना ९ नोंदणी वही');
                break;
            case 28:
                window.location.assign('/masik-notice');
                break;
            default:
                break;
        }
    });

    function setNextDate() {
        var fromDate = $('#meterModelPaniNondaniBill #from-date').val();

        // Split the date into month and year
        var parts = fromDate.split('/');
        var month = parseInt(parts[0]);
        var year = parseInt(parts[1]);

        // Calculate the end month
        var endMonth = month + 2;
        var endYear = year;

        // Adjust the year if necessary
        while (endMonth > 12) {
            endMonth -= 12;
            endYear += 1;
        }

        // Format the start and end dates MM/YYYY
        var toDate = (endMonth < 10 ? '0' : '') + endMonth + '/' + endYear;

        // Update the value of $('#mbl_water_usage_to')
        $('#meterModelPaniNondaniBill #to-date').val(toDate);
    }

    $(document).on('change', '#meterModelPaniNondaniBill #from-date', function (e) {
        setNextDate();
    });

    //-- Meter Model

    $(document).on('input', '#meterModel #valve-number', async function (e) {
        e.preventDefault();

        const valveNumber = $(this).val();

        try {
            const _res = await fetch(`/meter/valve-numbers?valveNumber=${valveNumber}`);

            const { success, data } = await _res.json();

            if (success) {
                const { valveNumbers } = data;
                console.log(valveNumbers);
                console.log(valveNumbers);
                $(this).autocomplete({
                    source: function (request, response) {
                        var term = request.term.toLowerCase();

                        // Format the filtered data as per your requirement
                        var formattedData = (valveNumbers || []).map(function (entry) {
                            return {
                                label: entry['mbl_valve_number'], // What to show in the UI
                                value: entry['mbl_valve_number'], // What to set in the input field when an item is selected
                                // otherProperty: entry.otherProperty, // You can include other properties if needed
                            };
                        });

                        response(formattedData);
                    },
                    minLength: 0, // Show suggestions even when there's no user input
                    select: function (event, ui) {
                        const id = ui.item.value;
                        $(this).val(ui.item.label);
                        return false;
                    },
                });
            }
        } catch (err) { }
    });

    $(document).on('click', '#printMeterBill', function (e) {
        e.preventDefault();
        var printDate = $('#meterPrintDate').val();
        let valveNumber = $('#valve-number').val() || '';
        let fromDate = $('#date-from').val();
        let toDate = $('#date-to').val();
        if (printDate !== '') {
            homeManager.openPrintToNewTab(
                `/print/page-meter-bill?printDate=${printDate}&valveNumber=${valveNumber}&fromDate=${fromDate}&toDate=${toDate}`
            );
        }
    });

    async function handleSuggestionDates(value) {
        const _res = await fetch(
            `/meter/fetch-distinct-month-year?startFrom=${value}&isDescending=false`
        );

        //

        const { success, data } = await _res.json();

        if (success) {
            console.log('getting');
            const { distinctMonthYear } = data;
            console.log(distinctMonthYear);
            // distinctMonthsYears = distinctMonthYear

            console.log(distinctMonthYear);

            $('#date-from').autocomplete({
                source: function (request, response) {
                    var term = request.term.toLowerCase();

                    // Format the filtered data as per your requirement
                    var formattedData = (distinctMonthYear || []).map(function (entry) {
                        return {
                            label: entry['monthYear'], // What to show in the UI
                            value: entry['monthYear'], // What to set in the input field when an item is selected
                            // otherProperty: entry.otherProperty, // You can include other properties if needed
                        };
                    });

                    response(formattedData);
                },
                minLength: 0, // Show suggestions even when there's no user input
                select: function (event, ui) {
                    const id = ui.item.value;
                    $(this).val(ui.item.label);

                    var fromDate = $('#date-from').val();
                    // Split the date into month and year
                    var parts = fromDate.split('/');
                    var month = parseInt(parts[0]);
                    var year = parseInt(parts[1]);

                    // Calculate the end month
                    var endMonth = month + 2;
                    var endYear = year;

                    // Adjust the year if necessary
                    while (endMonth > 12) {
                        endMonth -= 12;
                        endYear += 1;
                    }

                    // Format the start and end dates MM/YYYY
                    var toDate = (endMonth < 10 ? '0' : '') + endMonth + '/' + endYear;

                    // Update the value of $('#mbl_water_usage_to')
                    $('#date-to').val(toDate);
                    return false;
                },
            });
        }
    }

    $(document).on('input', '#date-from', function (e) {
        e.preventDefault();
        let value = $(this).val();
        handleSuggestionDates(value);
    });

    $(document).on('focus', '#date-from', function (e) {
        e.preventDefault();
        // let distinctMonthsYears = []
        let value = $(this).val() || '';
        handleSuggestionDates(value);
    });

    $(document).on('click', '#printMeterPaniNondaniBill', function (e) {
        e.preventDefault();
        var d1 = $('#meterPaniNondaniBillFrom').val();
        var d2 = $('#meterPaniNondaniBillTo').val();
        let usageFrom = $('#meterModelPaniNondaniBill #from-date').val();
        let usageTo = $('#meterModelPaniNondaniBill #to-date').val();
        if (d1 !== '' && d2 !== '') {
            homeManager.openPrintToNewTab(
                `/print/page-meter-pani-nondani-bill?from=${d1}&to=${d2}&usageFrom=${usageFrom}&usageTo=${usageTo}`
            );
        }
    });

    $(document).on('click', '.getForm8Tax', function (e) {
        e.preventDefault();

        //old code not necessary now - sojwal
        /*
        $('#homeId').val('')
        $('#homeId-type').val('')
        homeManager.navigationType = Number($(this).data('id'))
        switch (homeManager.navigationType) {
            case 1:
                $('.modal-title').html('नमुना ८ कर दुरुस्ती')
                break
                alert(3434343)
    
            default:
                break
        }
        $('#divUserDetails').addClass('d-none')
        $('#masterModal').modal({
            show: true,
        })
    
        */

        window.location.href = `/form-8-update-view`;
    });

    // THIS FUNCTION CHECKS IF THE TAX IS PAID
    const checkTaxPaid = async (malmattaNo) => {
        let response = await fetch('/form-8/check-tax-paid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ malmattaNo }),
        });
        let data = await response.json();
        let paniKar = data.result[0]?.totalWaterTax;
        let samanyaKar = data.result[0]?.totalSampurnaTax;

        if (paniKar > 0 || samanyaKar > 0) {
            alertjs.warning(
                {
                    t: 'ग्रामपंचायत चा सामान्य कर व विशेष पाणी पट्टी कर भरणा करावा',
                    m: 'टीप: सदर कर भरणा केल्या शिवाय कोणताच दाखला मिळणार नाही',
                },
                function () {
                    $('.pending-tax-pani').val(paniKar);
                    $('.pending-tax-samanya').val(samanyaKar);
                }
            );

            $('#checkTaxPaidModal').modal({
                show: true,
                // backdrop: 'static'
            });
            $('#masterModal1').modal('hide');
            homeManager.d1 = '';
            homeManager.d2 = '';
            return false;
        }
        return true;
    };

    const paymentDetails = {
        amount: '-',
        personName: '-',
        malmattaNo: '-',
        transactionNumber: '-',
        paymentNumber: '-',
        paymentFor: '-',
        paymentMode: '-', // 0 OFFLINE 1 ONLINE
    };

    // PAY FOR FORM EIGHT PRINT
    function payForFormEight() {
        $('#paymentModeModal').modal('show');
        $('.modal-title').html('पेमेंट');
        $('#pay-amount').attr('readonly', false);
        let payPersonName = homeManager.tempUserDetails.feu_ownerName;
        let malmattaNo = homeManager.tempUserDetails.feu_malmattaNo;

        $('#pay-malmatta-no').val(malmattaNo);
        $('#pay-person-name').val(payPersonName);
        $('#pay-mobile-no').val($('#newMobileNo1').val() !== '-' ? $('#newMobileNo1').val() : '');

        paymentDetails.personName = payPersonName;
        paymentDetails.malmattaNo = malmattaNo;
    }

    // REDICRECT TO TAX PAYMENT PAGE FOR PAYING TAX (taking id which is first column of form eight user table)
    $(document).on('click', '.pay-pending-tax-btn', function () {
        window.location.assign(
            `/tax-payer?malmattaNo=${homeManager.tempUserDetails.feu_malmattaNo}&user_id=${homeManager.tempUserDetails.id}`
        );
    });

    let certificatePrintDetails = { ...paymentDetails };


    // sms for namuna 8 print -

    // single print
    const handleSendNamuna8PrintSms = async (smsData) =>{
        try {
            let res = await fetch('/sms/send-gp-sms', {
                method: 'POST',
                body: JSON.stringify(smsData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 

            let {call, message} = await res.json()

            // if(call){
            //     alertjs.success({
            //         t: 'SMS Success',
            //         m: message 
            //     })
            // }else{
            //     alertjs.warning({
            //         t: 'SMS Warning',
            //         m: message 
            //     })
            // }
        } catch (err) {
            // console.error('Error:', err);
            // alertjs.warning({
            //     t: 'SMS Warning',
            //     m: message 
            // })
        }
    }

    // OFFLINE PAYMENT
    $(document).on('click', '.button-offline-pay', function (e) {
        e.preventDefault();

        paymentDetails.amount = $('#pay-amount').val();
        paymentDetails.paymentFor = 5;
        paymentDetails.paymentMode = 0; // 0 FOR OFFLINE PAYMENT MODE
        paymentDetails.tax_category = "SAMANYA"
        if (paymentDetails.amount === '') {
            alertjs.warning(
                {
                    t: 'कृपया पैसे लिहा.',
                },
                function () {
                    $('#pay-amount').focus();
                }
            );
            return;
        }

        if (!isPaymentModalMobileFilled()) return;

        $.ajax({
            url: '/payment/save',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(paymentDetails),
            success: function (result) {
                const data = {
                    paymentFor: 'नमुना ८ प्रिंट',
                    paymentMode: 0,
                    sms: '', //if sms is undefined or '' i.e. empty Strring, we will use defaultSms format
                    mobile: `${$('#pay-mobile-no').val()}`,
                };

                let smsData = {
                    sms: "",
                    header_id: '',
                    template_id: '',
                    template_name: '',
                    mobile: `91${$('#pay-mobile-no').val()}${gramsevakDetails?.sadasyaMobile?.trim()?.length == 10 ? `,91${gramsevakDetails?.sadasyaMobile?.trim()}`  : ''}`
                }
                
                // later we might need to uncomment this and check for sms template and backedn code, whre values are hardcoded
                // TODO: ABOVE IS MUST
                // handleSendNamuna8PrintSms(smsData)

                if (result.call === 1) {
                    alertjs.success(
                        {
                            t: 'Payment successfully done.',
                        },
                        function () {
                            // HIDING THE FIELDS AFTER PAYMENT DONE SUCCESSFULLY AND SHOWING PRINT BUTTON FOR TAKING OUT PRINT
                            $('.pay-details-div').addClass('d-none');
                            $('.payment-mode-buttons-div').removeClass('d-flex');
                            $('.payment-mode-buttons-div').addClass('d-none');
                            $('.print-certificate-div').removeClass('d-none');
                            certificatePrintDetails.reciptNumber = result.reciptNumber;

                            // alert('Payment is done');

                            //Afet the payment is done
                            let currentUrl = window.location.href;
                            // Create a new URL without the specified parameters
                            let newUrl = currentUrl.replace(/[?&](id|paymentDone)=[^&]+/g, '');
                            // Use history.replaceState to update the URL without reloading the page
                            history.replaceState({}, document.title, newUrl);
                            paymentDone = '';
                        }
                    );
                } else {
                    throw new Error('Something went wrong');
                }
            },
            error: function (error) {
                alertjs.warning({
                    t: 'Something went wrong',
                    m: 'Payment not done, please try again later',
                });
            },
        });
    });

    // PRINTING THE CERTIFICATES NOW AFTER PAYMENT DONE
    $(document).on('click', '.print-payment-recipt-btn', function (e) {
        e.preventDefault();

        // translate the amount into marathi
        $.ajax({
            url: '/currency/toWords',
            type: 'POST',
            data: {
                data: paymentDetails.amount,
            },
            success: (data) => {
                certificatePrintDetails.amountInwords = data.words;
                printCertificatePaymentRecipt(certificatePrintDetails);
            },
            error: (err) => {
                console.log(err);
            },
        });
    });

    function printCertificatePaymentRecipt(certificatePrintDetails) {
        window.open(
            `/print/certificate-payment-recipt?amtWrd=${certificatePrintDetails.amountInwords}&type=नमुना ८&reciptNo=${certificatePrintDetails.reciptNumber}`
        );
    }

    // d1 and d2 are years
    function checkInputFilled() {
        if (!homeManager.d1 || !homeManager.d2) {
            alertjs.warning(
                {
                    t: 'कृपया वर्ष लिहा.',
                },
                () => { }
            );
            return false;
        }
        return true;
    }

    // FOR DEV PURPOSE ONLY
    // homeManager.d1 = '2022';
    // homeManager.d2 = '2023';
    // **************************

    $(document).on('click', '#authorityToBypassBtn', function (e) {
        e.preventDefault();
        payForFormEight();
    });

    $(document).on('click', '.form-eight-print-pay-btn', async function (e) {
        e.preventDefault();
        if (!checkInputFilled()) return;
        if (paymentDone === 'success') {
            payForFormEight();
            return;
        }
        if (!(await checkTaxPaid(homeManager.tempUserDetails.feu_malmattaNo))) {
            return;
        }
        payForFormEight();
    });

    // NO IMAGE FORM EIGHT PRINT
    $(document).on('click', '#btnPrintEightNoImage', async function (e) {
        e.preventDefault();
        homeManager.openPrintToNewTab(
            `/print/form-8-w/o-image?id=${homeManager.tempUserDetails.id}&y1=${homeManager.d1}&y2=${homeManager.d2}`
        );
    });
    // PRINT EIGHT QR ONLY
    $(document).on('click', '#btnPrintEightQr', async function (e) {
        e.preventDefault();
        homeManager.openPrintToNewTab(
            `/print/form-8?id=${homeManager.tempUserDetails.id}&y1=${homeManager.d1}&y2=${homeManager.d2}`
        );
    });
    // PRINT EIGHT QR+IMAGE
    $(document).on('click', '#btnPrintEightQrImage', async function (e) {
        e.preventDefault();
        homeManager.openPrintToNewTab(
            `/print/form-8-image?id=${homeManager.tempUserDetails.id}&y1=${homeManager.d1}&y2=${homeManager.d2}`
        );
    });

    $(document).on('click', '#sendNineNavigation', function (e) {
        e.preventDefault();
        window.location.assign('/form-9/' + homeManager.tempUserDetails.id);
    });

    $(document).on('click', '#btnGetUserDetails1', function (e) {
        e.preventDefault();
        console.log('I am doing');
        getUserDetails1();
        $('#ferfar-avahal-list-table').addClass('d-none');
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

    $(document).on('click', '#saveNewUserForm', function (e) {
        e.preventDefault();
        if ($('#divUserDetails').valid()) {
            var detailsArray = $('#divUserDetails').serializeArray();
            details = {};

            var formData = new FormData();
            $.each(detailsArray, function (index, value) {
                formData.append(value.name, value.value);
            });
            formData.append('id', homeManager.tempUserDetails.id);
            //Old code to upload file
            /*
            if (image !== '') {
                var ImageURL = image; // 'photo' is your base64 image
                var block = ImageURL.split(';');
                var contentType = block[0].split(':')[1]; // In this case "image/gif"
                var realData = block[1].split(',')[1];
                var blob = b64toBlob(realData, contentType);
                formData.append('file1', blob);
            }
    
            if (image2 !== '') {
                var ImageURL = image2; // 'photo' is your base64 image
                var block = ImageURL.split(';');
                var contentType = block[0].split(':')[1]; // In this case "image/gif"
                var realData = block[1].split(',')[1];
                var blob2 = b64toBlob(realData, contentType);
                formData.append('file2', blob2);
            }
            */

            // Using camera
            if (homePhoto !== '') {
                let ImageURL = homePhoto; // 'photo' is your base64 image
                let block = ImageURL.split(';');
                let contentType = block[0].split(':')[1]; // In this case "image/gif"
                let realData = block[1].split(',')[1];
                let blob = b64toBlob(realData, contentType);
                formData.append('file1', blob);
            }

            if (mapPhoto !== '') {
                let ImageURL = mapPhoto; // 'photo' is your base64 image
                let block = ImageURL.split(';');
                let contentType = block[0].split(':')[1]; // In this case "image/gif"
                let realData = block[1].split(',')[1];
                let blob2 = b64toBlob(realData, contentType);
                formData.append('file2', blob2);
            }

            var data = {
                url: '/form-8/updateFormEntry',
                method: 'post',
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
            };

            $.ajax(data)
                .done(function (data) {
                    if (data.call == 1) {
                        alertjs.success(
                            {
                                t: 'मालमत्ताधाराकाची माहिती',
                                m: 'यशस्वी रित्या बद्दली आहे.',
                            },
                            function () { }
                        );
                    }
                })
                .fail(function (data) {
                    alert('You Have An Error, PLease check Console');
                    console.log(data, 'here');
                    return false;
                });
        }
    });

    $('#divUserDetails').validate({
        rules: {
            newMalmattaNo: {
                required: true,
            },
            oldHomeNo: {
                required: true,
            },
            newSecondOwnerName: {
                required: true,
            },
            newGramPanchayet: {
                required: true,
            },
            newVillageName: {
                required: true,
            },
            gharkulYojna: {
                required: true,
            },
            havingToilet: {
                required: true,
            },
            newTotalAreaSquareFoot: {
                required: true,
            },
            newTotalAreaSquareMeter: {
                required: true,
            },
        },
    });













    // ==========================================================================================
    // code associated with the file formEightPrintTab.pug file and formNinePrintTab.pug

    //A. Below code is for blank certificates related tabs in this page

    // on the button of print (#print-with-years-btn) in #select-year-modal

    $(document).on('click', `#select-year-modal #print-with-years-btn`, function (e) {
        e.preventDefault()

        // if (blankCertificateNavigation.navigationId == -1) {
        //     return;
        // }

        let y1 = $('#select-year-modal #from-date').val()
        let y2 = $('#select-year-modal #to-date').val()

        let openInNew = (baseUrl) => window.open(`${baseUrl}?y1=${y1}&y2=${y2}`, '_blank')




        switch (blankCertificateNavigation.navigationId) {



            // this swithc case will apply for  formEightPrintTab.pug file from startign from 201 to 203
            case 201:
                openInNew('/print/blankCertificate/tharav-pramanpatra')
                break;

            case 202:
                openInNew('/print/blankCertificate/darpatrak-pramanpatra')
                break;

            case 203:
                openInNew('/print/blankCertificate/namuna-8-header')
                break



            // below swithc case is for the file formNinePrintTab.pug 
            // starting from 301 to 305
            case 301:
                openInNew('/print/blankCertificate/namuna-9-samanya-header')
                break;

            case 302:
                openInNew('/print/blankCertificate/namuna-9-panipatti-tharav')
                break;

            case 303:
                openInNew('/print/blankCertificate/namuna-9-pani-header')
                break

            case 304:
                openInNew('/print/blankCertificate/namuna-9-samanya-kar-pramanpatra-tharav')
                break

        }
    })

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
});

var blankCertificateNavigation = {
    navigationId: -1
}

// handler
$(document).on('keyup', '#d1', function () {
    homeManager.d1 = $('#d1').val();
});
$(document).on('keyup', '#d2', function () {
    homeManager.d2 = $('#d2').val();
    homeManager.pavtiName = $('#pavtiName').val();
    homeManager.ruppe = $('#pavtiRuppe').val();
});

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

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data); // window.atob(b64Data)
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
