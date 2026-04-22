// const paymentDet = require('../common.js');

// console.log(paymentDet);
$(document).ready(function () {
    console.log('tax-payer-manager-file');
    // const srcUrl = document.referrer;

    // console.log(srcUrl)

    const searchParams = new URLSearchParams(window.location.search);
    // console.log("SEARch params object : ", searchParams )
    let srcPage = searchParams?.get('srcPage');
    let oldId = searchParams?.get('id');
    // console.log("Src page url =======", srcPage)
    // console.log('src page id =========', oldId)

    $(document).on('click', '#getTaxPayerView', function (e) {
        $('#homeId').val('');
        $('#divUserDetails').addClass('d-none');
        $('#selectSearch-1').val(1);
        $('#masterModal').modal({
            show: true,
        });
    });
    let searchType = 1;
    $('#selectSearch-1').on('change', function () {
        searchType = Number($(this).val());
        $('#homeId-type').val('');
        $('#homeId').val('');

        // console.log('Selecting search type in tax manager', searchType);
    });

    $(document).on('blur', '.amountText', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/currency/toWords',
            type: 'POST',
            data: {
                data: $('#totalSampurnaTax').val(),
            },
            success: (data) => {
                $('#amountInWords').val(data.words);
            },
            error: (err) => {
                console.log(err);
            },
        });
    });

    $(document).on('blur', '.amountTextWater', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/currency/toWords',
            type: 'POST',
            data: {
                data: $('#totalWaterTax').val(),
            },
            success: (data) => {
                $('#amountInWordsWater').val(data.words);
            },
            error: (err) => {
                console.log(err);
            },
        });
    });
    if ($('#homeId-type')) {
        $('#homeId-type')
            .autocomplete({
                minLength: 1,
                source: function (request, response) {
                    $('#homeId').val('');
                    $('#divUserDetails').addClass('d-none');
                    $.ajax({
                        url: '/tax-payer/get-auto-search',
                        method: 'post',
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
                    $('#homeId-type').val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    $('#homeId-type').val(ui.item.label);
                    $('#homeId').val(ui.item.id);
                    getUserDetails();
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

    // if (userId !== 'undefined' && typeof userId === 'string' && userId != -1) {
    //   // let newId  = userId
    //   userId = Number(userId);
    //   getUserDetails(userId);
    //   $('#masterModal').modal({
    //     show: true
    //   });
    // } else if (
    //   malNo !== 'undefined' &&
    //   typeof malNo === 'string' &&
    //   malNo != '-1'
    // ) {
    //   getUserDetails(malNo);
    //   $('#masterModal').modal({
    //     show: true
    //   });
    // }
    console.log(userId, '--');

    if (userId !== 9999) {
        getUserDetails(userId);
        $('#masterModal').modal({
            show: true,
        });
    }

    function getUserDetails(userId = 9999) {
        let value = Number($('#homeId').val());
        if (userId !== 9999) {
            value = +userId;
        }

        console.log(value, '--');
        console.log(typeof value, '----');

        homeManager.getUserDetails(value, function (data) {
            if (data.call == 1) {
                homeManager.tempUserDetails = data.data;
                data = data.data;
                console.log(data, '115');
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
                console.log('Not working na');
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

    $(document).on('click', '.isNaN', function (e) {
        $(this).select();
    });


    // this event is added on the inputs having the class .isNaN
    $(document).on('keyup change input', '.isNaN', function (e) {
        var _inputValue = Number($(this).val());
        var currentId = $(this).prop('id');
        if (isNaN(_inputValue) || _inputValue == '') {
            $('#' + currentId).val('0');
        }

        // this is related to vasulii  calculation
        vasuli.checkValidInput(currentId);

        // adding another thing for the caculation for samanya, which is left to the vasuli in the form

    });















    //----------------------------------------------------------------------------------------- 

    // PAYMENT DETAILS OBJECT
    /**
     * Note - PAYMENT FOR INDICATORS
     * 1 = samanya tax payment
     * 2 = pani tax payment
     * 3 = vivah tax payment
     * 4 = ghoshna patra payment
     * * CHECK common.js FOR MORE INDICATORS
     */
    const paymentDetails = {
        amount: '-',
        personName: $('.pay-owner-name').val(),
        malmattaNo: '-',
        transactionNumber: '-',
        paymentNumber: '-',
        paymentFor: '-',
        paymentMode: '', // 0 OFFLINE 1 ONLINE
    };

    function openPaymentTypeModel() {
        $('#paymentModeModal').modal('show');

        /**
         * IF PAYMET IS FOR SAMANYA TAX THEN TAKE payAmount = #totalSampurnaTax
         * IF PAYMENT IS FOR PANI TAX THEN TAKE payAmount = #totalWaterTax
         */

        let payAmount;

        switch (paymentDetails.paymentFor) {
            case 1:
                // step 2
                payAmount = $('#totalSampurnaTax').val();
                break;
            case 2:
                payAmount = $('#totalWaterTax').val();
                break;
            default:
                break;
        }
        // $('.pay-amount').html('Rs', payAmount);

        paymentDetails.amount = payAmount;
        paymentDetails.malmattaNo = malNo;
        paymentDetails.personName = $('.pay-owner-name').val();



        // This is for prefilling purpose when the modal is opened
        $('#pay-amount').val(paymentDetails.amount);
        $('#pay-person-name').val(paymentDetails.personName);
        $('#pay-malmatta-no').val(paymentDetails.malmattaNo);
        $('#pay-mobile-no').val($('#feu_mobile_no').val() === '-' ? '' : $('#feu_mobile_no').val());
    }

    $(document).on('click', '#goPani', function (e) {
        let id = homeManager.tempUserDetails.id;
        e.preventDefault();
        const previousPageUrl = document.referrer;

        let nextPageUrl = `/tax-payer/new/pani/${id}`;

        if (
            previousPageUrl.includes('form8/formEightPrintTab') ||
            previousPageUrl.includes('certificate/add-new') ||
            previousPageUrl.includes('marriage/add-new')
        ) {
            nextPageUrl += `?srcPage=${previousPageUrl}&id=${$('#anuKramank').val()}`;
        }
        window.location.assign(nextPageUrl);
    });

    $(document).on('click', '#goSamanya', function (e) {
        e.preventDefault();
        let id = homeManager.tempUserDetails.id;
        const previousPageUrl = document.referrer;

        let nextPageUrl = `/tax-payer/new/samanya/${id}`;
        if (
            previousPageUrl.includes('form8/formEightPrintTab') ||
            previousPageUrl.includes('certificate/add-new') ||
            previousPageUrl.includes('marriage/add-new')
        ) {
            nextPageUrl += `?srcPage=${previousPageUrl}&id=${$('#anuKramank').val()}`;
        }
        window.location.assign(nextPageUrl);
    });

    //Check if user paying old tax or not
    const previewSamanyaTaxData = {
        previewDataLastBuildingTax: $('#previewDataLastBuildingTax'),
        previewDataLastDivaTax: $('#previewDataLastDivaTax'),
        previewDataLastArogyaTax: $('#previewDataLastArogyaTax'),
        previewDataLastTaxFine: $('#previewDataLastTaxFine'),

        // Four new Taxes
        previewDataLastCleaningTax: $('#previewDataLastCleaningTax'),
        previewDataLastFireblegateTax: $('#previewDataLastFireblegateTax'),
        previewDataLastTreeTax: $('#previewDataLastTreeTax'),
        previewDataLastEducationTax: $('#previewDataLastEducationTax'),
    };

    const currentSamanyaTaxData = {
        currentBuildingTax: $('#currentBuildingTax'),
        currentDivaTax: $('#currentDivaTax'),
        currentArogyaTax: $('#currentArogyaTax'),
        lastTaxRelief: $('#lastTaxRelief'),

        // Four new Taxed
        lastCleaningTax: $('#lastCleaningTax'),
        lastFireblegateTax: $('#lastFireblegateTax'),
        lastTreeTax: $('#lastTreeTax'),
        lastEducationTax: $('#lastEducationTax'),
    };

    let totalPreviewPreviousSamanyaTax =
        +previewSamanyaTaxData.previewDataLastBuildingTax.val() +
        +previewSamanyaTaxData.previewDataLastDivaTax.val() +
        +previewSamanyaTaxData.previewDataLastArogyaTax.val() +
        +previewSamanyaTaxData.previewDataLastTaxFine.val() +
        // Four new Taxes
        +previewSamanyaTaxData.previewDataLastCleaningTax.val() +
        +previewSamanyaTaxData.previewDataLastFireblegateTax.val() +
        +previewSamanyaTaxData.previewDataLastTreeTax.val() +
        +previewSamanyaTaxData.previewDataLastEducationTax.val();

    let totalPreviewCurrentSamanyaTax =
        +$('#previewDataCurrentBuildingTax').val() +
        +$('#previewDataCurrentDivaTax').val() +
        +$('#previewDataCurrentArogyaTax').val() +
        +$('#previewDataLastTaxRelief').val() +
        // Four new taxes
        +$('#previewDataCurrentCleaningTax').val() +
        +$('#previewDataCurrentFireblegateTax').val() +
        +$('#previewDataCurrentTreeTax').val() +
        +$('#previewDataCurrentEducationTax').val();

    function isOldTaxPaidForSamanyaKar() {
        if (
            previewSamanyaTaxData.previewDataLastBuildingTax.val() > 0 ||
            previewSamanyaTaxData.previewDataLastDivaTax.val() > 0 ||
            previewSamanyaTaxData.previewDataLastArogyaTax.val() > 0 ||
            previewSamanyaTaxData.previewDataLastTaxFine.val() > 0 ||
            previewSamanyaTaxData.previewDataLastCleaningTax.val() > 0 ||
            previewSamanyaTaxData.previewDataLastFireblegateTax.val() > 0 ||
            previewSamanyaTaxData.previewDataLastTreeTax.val() > 0 ||
            previewSamanyaTaxData.previewDataLastEducationTax.val() > 0
        ) {
            //It means the user is not filling the old tax
            return false;
        }
        return true;
    }

    if (!isOldTaxPaidForSamanyaKar()) {
        // $.each(currentSamanyaTaxData, function (key, el) {
        //   el.prop("readonly", true);
        // });
        $('#tax-notice').removeClass('d-none');
    }

    // SAVE SAMANYA  KER PAYMENT
    $(document).on('click', '#saveVasuliDetails', function (e) {
        e.preventDefault();
        //नमुना ९ सामान्य करासंदर्भात वसुली फॉर्म
        vasuli.checkValidInput();

        $('.samanya-qr-holder').css('display', 'block')

        let totalPreviousTax =
            +$('#lastBuildingTax').val() +
            +$('#lastDivaTax').val() +
            +$('#lastArogyaTax').val() +
            +$('#lastTaxFine').val() +
            // New Taxes
            +$('#lastCleaningTax').val() +
            +$('#lastFireblegateTax').val() +
            +$('#lastTreeTax').val() +
            +$('#lastEducationTax').val();

        let totalCurrentTax =
            +currentSamanyaTaxData.currentBuildingTax.val() +
            +currentSamanyaTaxData.currentDivaTax.val() +
            +currentSamanyaTaxData.currentArogyaTax.val() +
            +currentSamanyaTaxData.lastTaxRelief.val() +
            // Four new Taxes

            +currentSamanyaTaxData.lastCleaningTax.val() +
            +currentSamanyaTaxData.lastFireblegateTax.val() +
            +currentSamanyaTaxData.lastTreeTax.val() +
            +currentSamanyaTaxData.lastEducationTax.val();

        // console.log('Total = ', totalPreviewCurrentSamanyaTax);
        // console.log(totalPreviousTax === NaN);
        if (
            isOldTaxPaidForSamanyaKar() &&
            $('#previewDataCurrentBuildingTax').val() <= 0 &&
            $('#previewDataCurrentDivaTax').val() <= 0 &&
            $('#previewDataCurrentArogyaTax').val() <= 0 &&
            $('#previewDataLastTaxRelief').val() <= 0 &&
            // Four taxes
            $('#previewDataCurrentCleaningTax').val() <= 0 &&
            $('#previewDataCurrentFireblegateTax').val() <= 0 &&
            $('#previewDataCurrentTreeTax').val() <= 0 &&
            $('#previewDataCurrentEducationTax').val() <= 0
        ) {
            alertjs.warning({
                t: `सर्व कर आधीच भरला गेला आहे`,
            });
        } else if (totalPreviewPreviousSamanyaTax != 0) {
            //CASE 1
            if (isNaN(totalPreviousTax)) {
                alertjs.warning({
                    t: `कृपया रक्कम टाका`,
                });
                console.log(true);
            }
            // Disabling 100 Rs validation, DONT DELETE THIS CODE
            //CASE 2
            // else if (
            //   totalPreviewPreviousSamanyaTax > 1000 &&
            //   totalPreviousTax < Math.ceil(totalPreviewPreviousSamanyaTax / 2)
            // ) {
            //   alertjs.warning(
            //     {
            //       t: `₹1000 वरील रकमेसाठी कमीत कमी ५०% (₹${Math.ceil(
            //         totalPreviewPreviousSamanyaTax / 2
            //       )}) कर भरा`,
            //     },
            //     function () {}
            //   );
            // } else if (
            //   totalPreviewPreviousSamanyaTax <= 1000 &&
            //   totalPreviousTax !== totalPreviewPreviousSamanyaTax
            // ) {
            //   alertjs.warning({
            //     t: `₹1000 खाली रकमेसाठी संपूर्ण कर भरा`,
            //   });
            // }
            else {
                paymentDetails.paymentFor = 1; // THIS IS FOR PAYMENT INDICATORS
                //OPEN PAYMENT TYPE MODEL
                openPaymentTypeModel();
            }
        } //NEXTCASE
        else if (totalPreviewCurrentSamanyaTax != 0) {
            //CASE 1
            if (isNaN(totalCurrentTax)) {
                alertjs.warning({
                    t: `कृपया रक्कम टाका `,
                });
                console.log(true);
            }
            //CASE 2

            // DONT DELETE THIS CODE, DISALBING 1000 RS VALIDATION

            // else if (
            //   totalPreviewCurrentSamanyaTax > 1000 &&
            //   totalCurrentTax < Math.ceil(totalPreviewCurrentSamanyaTax / 2)
            // ) {
            //   alertjs.warning({
            //     t: `₹1000 वरील रकमेसाठी कमीत कमी ५०% (₹${Math.ceil(
            //       totalPreviewCurrentSamanyaTax / 2
            //     )}) कर भरा`,
            //   });
            // } else if (
            //   totalPreviewCurrentSamanyaTax <= 1000 &&
            //   totalCurrentTax !== totalPreviewCurrentSamanyaTax
            // ) {
            //   alertjs.warning({
            //     t: `₹1000 खाली रकमेसाठी संपूर्ण कर भरा`,
            //   });
            // }
            else {
                paymentDetails.paymentFor = 1; // THIS IS FOR PAYMENT INDICATORS
                //OPEN PAYMENT TYPE MODEL
                openPaymentTypeModel();
            }
        } else if (finalTax === 0) {
            alertjs.warning({
                t: `कृपया वसुली कर भरा`,
            });
        } else {
            paymentDetails.paymentFor = 1; // THIS IS FOR PAYMENT INDICATORS
            //OPEN PAYMENT TYPE MODEL
            openPaymentTypeModel();
        }
    });

    // PANI KER PAYMENT

    function isOldTaxPaidForPaniKar() {
        if (
            $('#previewDataLastSpacialWaterTax').val() > 0 ||
            $('#previewDataLastGenealWaterTax').val() > 0
        ) {
            //It means the user has not filling the old tax
            return false;
        }
        return true;
    }

    if (!isOldTaxPaidForPaniKar()) {
        // $('#currentSpacialWaterTax').prop('readonly', true)
        // $('#currentGenealWaterTax').prop('readonly', true)
        $('#tax-notice').removeClass('d-none');
    }

    let totalPreviewDataPreviousPaniTax =
        +$('#previewDataLastSpacialWaterTax').val() + +$('#previewDataLastGenealWaterTax').val();

    // console.log('Tpani', totalPreviewDataPreviousPaniTax);

    let totalPreviewDataCurrentPaniTax =
        +$('#previewDataCurrentSpacialWaterTax').val() +
        +$('#previewDataCurrentGenealWaterTax').val();
    // console.log('Tpani2', totalPreviewDataCurrentPaniTax);

    // console.log('previw pani kar : ', totalPreviewDataPreviousPaniTax);

    $(document).on('click', '#savePaniVasuliDetails', function () {
        vasuli.checkValidInput();
        $('.water-qr-holder').css('display', 'block')
        var finalWaterTax = Number($('#totalWaterTax').val());

        let totalPreviousPaniTax =
            +$('#lastSpacialWaterTax').val() + +$('#lastGenealWaterTax').val();

        let totalCurrentPaniTax =
            +$('#currentSpacialWaterTax').val() + +$('#currentGenealWaterTax').val();

        if (
            isOldTaxPaidForPaniKar() &&
            $('#previewDataCurrentSpacialWaterTax').val() <= 0 &&
            $('#previewDataCurrentGenealWaterTax').val() <= 0
        ) {
            alertjs.warning({
                t: `सर्व कर आधीच भरला गेला आहे`,
            });
        } else if (totalPreviewDataPreviousPaniTax != 0) {
            //CASE 1
            // console.log('PPREVV YEERRRRRR')
            if (isNaN(totalPreviousPaniTax)) {
                alertjs.warning({
                    t: `कृपया रक्कम टाका`,
                });
                // console.log(true);
            }

            // Commented this code, uncommenting will again add 1000 amount validation here

            // Commenting 1000 Rs Validation with this comment,
            //*******DONT DELETE THIS CODE, might need in future again later

            //CASE 2
            // else if (
            // 	totalPreviewDataPreviousPaniTax > 1000 &&
            // 	totalPreviousPaniTax < Math.ceil(totalPreviewDataPreviousPaniTax / 2)
            // ) {
            // 	alertjs.warning(
            // 		{
            // 			t: `₹1000 वरील रकमेसाठी कमीत कमी ५०% (₹${Math.ceil(
            // 				totalPreviewDataPreviousPaniTax / 2
            // 			)}) कर भरा`,
            // 		},
            // 		() => {}
            // 	)
            // } else if (
            // 	totalPreviewDataPreviousPaniTax <= 1000 &&
            // 	totalPreviousPaniTax !== totalPreviewDataPreviousPaniTax
            // ) {
            // 	alertjs.warning({
            // 		t: `₹1000 खाली रकमेसाठी संपूर्ण कर भरा`,
            // 	})
            // }
            else {
                paymentDetails.paymentFor = 2; // THIS IS FOR PAYMENT INDICATORS
                //OPEN PAYMENT TYPE MODEL
                openPaymentTypeModel();
            }
        } //NEXTCASE
        else if (totalPreviewDataCurrentPaniTax != 0) {
            // console.log('dhufisdhfhdih', totalPreviewDataCurrentPaniTax);
            //CASE 1
            if (isNaN(totalCurrentPaniTax)) {
                alertjs.warning({
                    t: `कृपया रक्कम टाका`,
                });
                console.log(true);
            } //CASE 2

            // REmoving 1000 Rs Validation wiht this comment,
            //DONT DELETE THIS CODE
            // 	else if (
            // 		totalPreviewDataCurrentPaniTax > 1000 &&
            // 		totalCurrentPaniTax < Math.ceil(totalPreviewDataCurrentPaniTax / 2)
            // 	) {
            // 		alertjs.warning({
            // 			t: `₹1000 वरील रकमेसाठी कमीत कमी ५०% (₹${Math.ceil(
            // 				totalPreviewDataCurrentPaniTax / 2
            // 			)}) कर भरा`,
            // 		})
            // 	} else if (
            // 		totalPreviewDataCurrentPaniTax <= 1000 &&
            // 		totalCurrentPaniTax !== totalPreviewDataCurrentPaniTax
            // 	) {
            // 		alertjs.warning({
            // 			t: `₹1000 खाली रकमेसाठी संपूर्ण कर भरा`,
            // 		})
            // 	}
            // 	else {
            // 		paymentDetails.paymentFor = 2 // THIS IS FOR PAYMENT INDICATORS
            // 		//OPEN PAYMENT TYPE MODEL
            // 		openPaymentTypeModel()
            // 	}
            // } else if (finalWaterTax === 0) {
            // 	alertjs.warning(
            // 		{
            // 			t: `कृपया वसुली कर भरा`,
            // 		},
            // 		function () {}
            // 	)
            // }
            else {
                paymentDetails.paymentFor = 2; // THIS IS FOR PAYMENT INDICATORS
                //OPEN PAYMENT TYPE MODEL
                openPaymentTypeModel();
            }
        }
    });

    // OFFLINE PAY MODE on TAX PAGE
    $(document).on('click', '.button-offline-pay', function (e) {



        e.preventDefault();
        paymentDetails.paymentMode = 0;
        //common js
        if (!isPaymentModalMobileFilled()) {
            return false;
        }
        $('#transaction_number').val('')
        paymentDetails.transactionNumber = ''

        $.ajax({
            url: '/payment/save',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(paymentDetails),
            success: function (result) {
                console.log(result, 'result after payment');
                if (result.call === 1) {
                    alertjs.success(
                        {
                            t: 'Payment successfully done',
                        },
                        function () {
                            //Send SMS functionality needed to implement here
                            //dummy data

                            function getPaymentFor() {
                                switch (paymentDetails.paymentFor) {
                                    case 1:
                                        return 'सामान्य कर भरणा';
                                    case 2:
                                        return 'पाणी कर भरणा';
                                }
                            }

                            const data = {
                                paymentFor: getPaymentFor(),
                                paymentMode: 0,
                                sms: '', //if sms is undefined or '' i.e. empty Strring, we will use defaultSms format
                                mobile: `${$('#pay-mobile-no').val()}`,
                            };
                            handleSendGpSMS(data);

                            if (paymentDetails.paymentFor === 1) {
                                // console.log("I am updating in samanya tax");
                                updateSamanyaTaxIntoDB(result.reciptNumber);
                            }
                            if (paymentDetails.paymentFor === 2) {
                                // console.log("I am updatig in water tax");
                                updatePaniTaxIntoDB(result.reciptNumber);
                            }
                            $('#paymentModeModal').modal('hide');

                            // const searchParams = new URLSearchParams(window.location.search);
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


    // ONLINE BUTTON PAY ON TAX PAGE
    $(document).on('click', '.button-online-pay', function (e) {

        e.preventDefault();
        paymentDetails.paymentMode = 1;
        paymentDetails.transactionNumber = $('#transaction_number').val()

        let fileInput = $('#paymentScreenshot')[0]
        if (!fileInput?.files?.length) {
            alertjs.warning({
                t: 'WARNING',
                m: 'पेमेंटचा स्क्रीनशॉट जोडा.'
            })
            return
        }
        let paymentScreenshot = fileInput.files[0]


        //common js
        if (!isPaymentModalMobileFilled()) {
            return false;
        }

        if (paymentDetails.transactionNumber?.trim() == '') {
            alertjs.warning({
                t: 'WARNING',
                m: 'Transaction Number भरा.'
            })
            return;
        }

        let paymentData = new FormData()
        for (let key in paymentDetails) {
            if (paymentDetails.hasOwnProperty(key)) {
                paymentData.set(key, paymentDetails[key]);
            }
        }
        paymentData.set('paymentScreenshot', paymentScreenshot)

        $.ajax({
            url: '/payment/save',
            method: 'POST',
            processData: false, // prevent jQuery from processing the data
            // contentType: 'application/json',
            contentType: false, // let the browser set the correct multipart/form-data boundary
            dataType: 'json',
            data: paymentData,
            success: function (result) {
                console.log(result, 'result after payment');
                if (result.call === 1) {
                    alertjs.success(
                        {
                            t: 'Payment successfully done',
                        },
                        function () {
                            //Send SMS functionality needed to implement here
                            //dummy data

                            function getPaymentFor() {
                                switch (paymentDetails.paymentFor) {
                                    case 1:
                                        return 'सामान्य कर भरणा';
                                    case 2:
                                        return 'पाणी कर भरणा';
                                }
                            }

                            const data = {
                                paymentFor: getPaymentFor(),
                                paymentMode: 1,//setting online payment mode
                                sms: '', //if sms is undefined or '' i.e. empty Strring, we will use defaultSms format
                                mobile: `${$('#pay-mobile-no').val()}`,
                            };
                            // handleSendGpSMS(data)

                            if (paymentDetails.paymentFor === 1) {
                                // console.log("I am updating in samanya tax");
                                updateSamanyaTaxIntoDB();
                            }
                            if (paymentDetails.paymentFor === 2) {
                                // console.log("I am updatig in water tax");
                                updatePaniTaxIntoDB();
                            }
                            $('#paymentModeModal').modal('hide');

                            // const searchParams = new URLSearchParams(window.location.search);
                        }
                    );
                }
                else if (result.call == 0) {
                    alertjs.warning({
                        t: 'WARNING',
                        m: result.message
                    })
                }
                else {
                    throw new Error('Something went wrong');
                }
            },
            error: function (error) {
                // console.log('innnnnnnnnnnnn error')
                // console.log(error)
                alertjs.warning({
                    t: 'Something went wrong',
                    m: error?.responseJSON?.message || 'Payment not done, please try again later',
                });
            },
        });
    })

    //UPDATING SAMANYA TAX PAID INTO DB
    function updateSamanyaTaxIntoDB(paymentId='') {
        // console.log($("#bharnaDate").val());
        let _bharnaDate = $('#bharnaDate').val().split('/').reverse().join('-');
        // console.log("new bharana date = ", _bharnaDate);

        // this is saved as the entry in another table
        var newVasuliData = {
            lastBuildingTax: Number($('#lastBuildingTax').val()),
            currentBuildingTax: Number($('#currentBuildingTax').val()),
            lastDivaTax: Number($('#lastDivaTax').val()),
            currentDivaTax: Number($('#currentDivaTax').val()),
            lastArogyaTax: Number($('#lastArogyaTax').val()),
            currentArogyaTax: Number($('#currentArogyaTax').val()),
            lastTaxFine: Number($('#lastTaxFine').val()),
            lastTaxRelief: Number($('#lastTaxRelief').val()),

            // Four new taxes
            lastCleaningTax: Number($('#lastCleaningTax').val()),
            currentCleaningTax: Number($('#currentCleaningTax').val()),

            lastFireblegateTax: Number($('#lastFireblegateTax').val()),
            currentFireblegateTax: Number($('#currentFireblegateTax').val()),

            lastTreeTax: Number($('#lastTreeTax').val()),
            currentTreeTax: Number($('#currentTreeTax').val()),

            lastEducationTax: Number($('#lastEducationTax').val()),
            currentEducationTax: Number($('#currentEducationTax').val()),

            // New Taxes end

            formNineId: Number($('#formNineId').val()),
            userId: Number($('#userId').val()),
            bharnaDate: _bharnaDate,
            amountInWords: $('#amountInWords').val(),
            checkNo: $('#checkNo').val(),
            finalTax: Number($('#totalSampurnaTax').val()),
        };

        // and this updates in the original table i think
        var updateFormNine = {
            currentArogyaTax: details['currentArogyaTax'] - newVasuliData['currentArogyaTax'],
            currentBuildingTax: details['currentBuildingTax'] - newVasuliData['currentBuildingTax'],
            currentDivaTax: details['currentDivaTax'] - newVasuliData['currentDivaTax'],

            // New Four taxes (current)
            currentCleaningTax:
                details['currentCleaningTax'] - newVasuliData['currentCurrentCleaningTax'],
            currentEducationTax:
                details['currentEducationTax'] - newVasuliData['currentEducationTax'],
            currentFireblegateTax:
                details['currentFireblegateTax'] - newVasuliData['currentFireblegateTax'],
            currentTreeTax: details['currentTreeTax'] - newVasuliData['currentTreeTax'],

            lastArogyaTax: details['lastArogyaTax'] - newVasuliData['lastArogyaTax'],
            lastBuildingTax: details['lastBuildingTax'] - newVasuliData['lastBuildingTax'],
            lastDivaTax: details['lastDivaTax'] - newVasuliData['lastDivaTax'],
            lastTaxFine: details['lastTaxFine'] - newVasuliData['lastTaxFine'],
            lastTaxRelief: details['lastTaxRelief'] - newVasuliData['lastTaxRelief'],

            // New Four taxes (last)
            lastCleaningTax: details['lastCleaningTax'] - newVasuliData['lastCleaningTax'],
            lastEducationTax: details['lastEducationTax'] - newVasuliData['lastEducationTax'],
            lastFireblegateTax: details['lastFireblegateTax'] - newVasuliData['lastFireblegateTax'],
            lastTreeTax: details['lastTreeTax'] - newVasuliData['lastTreeTax'],

            formNineId: Number($('#formNineId').val()),
            userId: Number($('#userId').val()),
            checkNo: $('#checkNo').val(),
        };

        newVasuliData.ps_payment_information_id_fk = paymentId

        var data = {
            url: '/tax-payer/saveNewPay',
            method: 'post',
            data: {
                newVasuliData: newVasuliData,
                updateFormNine: updateFormNine,
            },
        };
        commonHandler.ajaxManager(data, function (type, data) {
            if (type == false) {
                alert('You Have An Error, PLease check Console here in taxmanager ');
                console.log(data);
                return false;
            }
            console.log(data);
            if (data.call == 1) {
                alertjs.success(
                    {
                        t: 'सामान्य कर वसुली भरणा',
                        m: 'यशस्वी  रित्या  जतन  केली आहे.',
                    },
                    function () {
                        window.open(
                            '/print/tax-payer/samanya?t_no=' + data.id + '&i=' + $('#userId').val() + "&txn=" + $('#transaction_number').val(),
                            '_blank'
                        );
                        $('#paymentModeModal').modal('hide');
                        // window.location.reload();
                        // window.history.go(-2);

                        console.log('Updating data in smanya tax');

                        if (
                            srcPage &&
                            (srcPage.includes('form8/formEightPrintTab') ||
                                srcPage.includes('certificate/add-new') ||
                                srcPage.includes('marriage/add-new'))
                        ) {
                            window.location.href = `${srcPage}?id=${oldId}&paymentDone=success&state=openPrintModal`;
                            // srcPage = '';
                            // oldId = null;
                        } else {
                            // alert("I am very samanya")
                            window.location.reload();
                        }
                    }
                );
            }
        });
    }

    // UPDATE PANI TAX PAYMENT INTO DB
    function updatePaniTaxIntoDB(paymentId='') {
        var newVasuliData = {
            lastSpacialWaterTax: Number($('#lastSpacialWaterTax').val()),
            currentSpacialWaterTax: Number($('#currentSpacialWaterTax').val()),
            lastGenealWaterTax: Number($('#lastGenealWaterTax').val()),
            currentGenealWaterTax: Number($('#currentGenealWaterTax').val()),
            formNineId: Number($('#formNineId').val()),
            userId: Number($('#userId').val()),
            checkNo: $('#checkNo').val(),
            finalWaterTax: $('#totalWaterTax').val(),
            bharnaDate: $('#bharnaDate').val()?.split('-').reverse().join('-'),
        };

        var updateFormNine = {
            lastSpacialWaterTax:
                details['lastSpacialWaterTax'] - newVasuliData['lastSpacialWaterTax'],
            currentSpacialWaterTax:
                details['currentSpacialWaterTax'] - newVasuliData['currentSpacialWaterTax'],
            lastGenealWaterTax: details['lastGenealWaterTax'] - newVasuliData['lastGenealWaterTax'],
            currentGenealWaterTax:
                details['currentGenealWaterTax'] - newVasuliData['currentGenealWaterTax'],
            formNineId: Number($('#formNineId').val()),
            userId: Number($('#userId').val()),
            checkNo: $('#checkNo').val(),
        };

        newVasuliData.ps_payment_information_id_fk = paymentId;

        var data = {
            url: '/tax-payer/saveNewWaterPay',
            method: 'post',
            data: {
                newVasuliData: newVasuliData,
                updateFormNine: updateFormNine,
            },
        };
        commonHandler.ajaxManager(data, function (type, data) {
            if (type == false) {
                alert('You Have An Error, PLease check Console1');
                console.log(data);
                return false;
            }
            console.log(data);
            if (data.call == 1) {
                alertjs.success(
                    {
                        t: 'पाणी कर वसुली भरणा',
                        m: 'यशस्वी  रित्या  जतन  केली आहे.',
                    },
                    function () {
                        // window.history.go(-2);
                        window.open(
                            '/print/tax-payer/pani?t_no=' + data.id + '&i=' + $('#userId').val() + '&txn=' + $('#transaction_number').val(),
                            '_blank'
                        );

                        console.log('I am updating data in pani');

                        // window.location.href = `${srcPage}?id=${oldId}&paymentDone=success`;
                        if (
                            srcPage &&
                            (srcPage.includes('form8/formEightPrintTab') ||
                                srcPage.includes('certificate/add-new') ||
                                srcPage.includes('marriage/add-new'))
                        ) {
                            window.location.href = `${srcPage}?id=${oldId}&paymentDone=success&state=openPrintModal`;
                            // srcPage = '';
                            // oldId = null;
                        } else {
                            // alert("I ma warter")
                            window.location.reload();
                        }
                    }
                );
            }
        });
    }



    // // ===========================================================

    // // this code is associated with the file tp_list.pug

    // // this code pritns the annual and monthly report for samanay and water for RECEIPTS


    // // for samanaya ------------------------------------------

    // // 1- annual


    $(document).on('click', '#annual-report-samanya-print-btn', function (e) {
        e.preventDefault();

        let startYear = $('#fromYearSamanya').val();
        let endYear = $('#endYearSamanya').val();


        if (!startYear || !endYear) {
            alertjs.warning({
                t: 'Warning',
                m: 'कृपया सुरुवातीचे आणि शेवटचे वर्ष भरा.'
            });
            return;
        }

        if (isNaN(startYear) || isNaN(endYear) || startYear.length !== 4 || endYear.length !== 4) {
            alert('कृपया योग्य चार अंकी वर्ष भरा.');
            return;
        }

        if (+startYear > +endYear) {
            alert('सुरुवातीचे वर्ष शेवटच्या वर्षापेक्षा मोठे असू शकत नाही.');
            return;
        }

        window.open(`/print/tax-payer/all-samanya?startYear=${startYear}&endYear=${endYear}`, '_blank');
    });

    $(document).on('click', '#monthly-report-samanya-print-btn', function (e) {
        e.preventDefault();

        let month = $('#monthSamanya').val();
        let year = $('#yearSamanya').val();

        if (!month || !year) {
            alertjs.warning({
                t: 'Warning',
                m: 'कृपया महिना आणि वर्ष भरा.'
            });
            return;
        }

        if (isNaN(month) || +month < 1 || +month > 12) {
            alertjs.warning({
                t: 'Warning',
                m: 'कृपया 1 ते 12 दरम्यानचा महिना निवडा.'
            });
            return;
        }

        if (isNaN(year) || year.length !== 4) {
            alertjs.warning({
                t: 'Warning',
                m: 'कृपया योग्य चार अंकी वर्ष भरा.'
            });
            return;
        }

        window.open(`/print/tax-payer/all-samanya?month=${month}&year=${year}`, '_blank');
    });



    // for pani ------------------------------------------


    $(document).on('click', '#annual-report-pani-print-btn', function (e) {
        e.preventDefault();

        let startYear = $('#fromYearPani').val();
        let endYear = $('#endYearPani').val();


        if (!startYear || !endYear) {
            alertjs.warning({
                t: 'Warning',
                m: 'कृपया सुरुवातीचे आणि शेवटचे वर्ष भरा.'
            });
            return;
        }

        if (isNaN(startYear) || isNaN(endYear) || startYear.length !== 4 || endYear.length !== 4) {
            alert('कृपया योग्य चार अंकी वर्ष भरा.');
            return;
        }

        if (+startYear > +endYear) {
            alert('सुरुवातीचे वर्ष शेवटच्या वर्षापेक्षा मोठे असू शकत नाही.');
            return;
        }

        window.open(`/print/tax-payer/all-pani?startYear=${startYear}&endYear=${endYear}`, '_blank');
    });

    $(document).on('click', '#monthly-report-pani-print-btn', function (e) {
        e.preventDefault();

        let month = $('#monthPani').val();
        let year = $('#yearPani').val();

        if (!month || !year) {
            alertjs.warning({
                t: 'Warning',
                m: 'कृपया महिना आणि वर्ष भरा.'
            });
            return;
        }

        if (isNaN(month) || +month < 1 || +month > 12) {
            alertjs.warning({
                t: 'Warning',
                m: 'कृपया 1 ते 12 दरम्यानचा महिना निवडा.'
            });
            return;
        }

        if (isNaN(year) || year.length !== 4) {
            alertjs.warning({
                t: 'Warning',
                m: 'कृपया योग्य चार अंकी वर्ष भरा.'
            });
            return;
        }

        window.open(`/print/tax-payer/all-pani?month=${month}&year=${year}`, '_blank');
    });




    // ===========================================================

});

var vasuli = {


    // this checks for the valid inputs 
    checkValidInput: function (theInputIdNameWhoseValueIsChangingName) {
        var value = Number($('#' + theInputIdNameWhoseValueIsChangingName).val());
        var value1 = Number(details[theInputIdNameWhoseValueIsChangingName]);

        if (isNaN(value)) {
            $('#' + theInputIdNameWhoseValueIsChangingName).val(0);
            this.calcInput();
            return false;
        }

        if (isNaN(value1)) {
            $('#' + theInputIdNameWhoseValueIsChangingName).val(0);
            this.calcInput();
            return false;
        }

        if (value > value1) {
            $('#' + theInputIdNameWhoseValueIsChangingName).val(value1);
            this.calcInput();
            return false;
        }

        this.calcInput();
    },


    calcInput: function () {


        let lastVasuliTaxAmount =
            Number($('#lastBuildingTax').val()) +
            Number($('#lastDivaTax').val()) +
            Number($('#lastArogyaTax').val()) +
            Number($('#lastTaxFine').val()) +
            Number($('#lastCleaningTax').val()) + // New tax field
            Number($('#lastFireblegateTax').val()) + // New tax field
            Number($('#lastTreeTax').val()) + // New tax field
            Number($('#lastEducationTax').val()) // New tax field
            ;


        $('#lastTotalVasuliTax').val(lastVasuliTaxAmount)



        let currentVasuliTaxAmount =
            Number($('#currentBuildingTax').val()) +
            Number($('#currentDivaTax').val()) +
            Number($('#currentArogyaTax').val()) +

            Number($('#lastTaxRelief').val()) +
            Number($('#currentCleaningTax').val()) + // New tax field
            Number($('#currentFireblegateTax').val()) + // New tax field
            Number($('#currentTreeTax').val()) + // New tax field
            Number($('#currentEducationTax').val()); // New tax field



        // set these values inside 

        $('#currentTotalVasuliTax').val(currentVasuliTaxAmount)



        // console.log(lastVasuliTaxAmount, '----------', currentVasuliTaxAmount)
        const totalVasuliTaxAmount = lastVasuliTaxAmount + currentVasuliTaxAmount
        $('#totalSampurnaTax').val(totalVasuliTaxAmount);


        var pani =
            Number($('#lastSpacialWaterTax').val()) +
            Number($('#currentSpacialWaterTax').val()) +
            Number($('#lastGenealWaterTax').val()) +
            Number($('#currentGenealWaterTax').val());
        $('#totalWaterTax').val(pani);
    },
};

var homeManager = {
    tempUserDetails: {},
    getUserDetails(id, callback) {
        console.log('home manger in tax-payer-manager');
        var data = {
            url: '/nal-band-notice/new-user',
            method: 'post',
            data: {
                id: id,
            },
        };
        commonHandler.ajaxManager(data, function (type, data) {
            if (type == false) {
                alert('You Have An Error, PLease check Console 2');
                console.log(data);
                return false;
            }
            callback(data);
        });
    },
};

const sms = `${$('#pay-person-name').val()}, मालमत्ता क्र. ${$(
    '#pay-malmatta-no'
).val()},  सामान्य कर भरणासाठी  ₹${$('#pay-amount').val()}  ऑफलाईन मोडने प्राप्त झाले.`;
