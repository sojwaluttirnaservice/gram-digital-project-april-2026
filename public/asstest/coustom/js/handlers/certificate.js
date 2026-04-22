$(document).ready(function () {
    var homeManager = {
        // these d1, d2, pavatiName,rupee are for form eight print
        // d1: $('#d1').val(),
        // d2: $('#d2').val(),
        // pavtiName: $('#pavtiName').val(),
        // ruppe: $('#pavtiRuppe').val(),

        // tempUserDetails: {},
        // navigationType: 0,
        // openPrintToNewTab: function (url) {
        //   w = window.open(url);
        //   w.onunload = function () {
        //     console.log('closed!');
        //   };
        // },

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
    };

    //======================
    //Redirected back from the payment page of tax
    const searchParams = new URLSearchParams(window.location.search);
    let paymentDone = searchParams.get('paymentDone');
    const idToLoad = searchParams.get('id');

    console.log('is done = ', paymentDone, paymentDone === 'success');

    //======================

    if (paymentDone === 'success') {
        $('#paymentModeModal').modal({ show: true });

        console.log('herere');
        let storedFormData = localStorage.getItem('certificateFormData');
        let formData = storedFormData ? JSON.parse(storedFormData) : {};

        $('#pay-amount').attr('readonly', false);
        $('#pay-malmatta-no').val(formData.malmatta_no);

        $('#pay-person-name').val(formData.certificateHolderNameM);

        Object.keys(formData).forEach((key) => {
            const inputField = $(`[name="${key}"]`);
            if (inputField.length > 0) {
                inputField.val(formData[key]);
            }
        });
    }

    // AADHAR NUMBER MASKING (EG. 0000-0000-0000)
    $('.certificateAadharE').mask('0000-0000-0000');
    $('.certificateAadharM').mask('0000-0000-0000');

    // VALIDATE FORM
    $('#newCertificateForm').validate({
        rules: {
            certificateHolderNameE: {
                required: true,
            },
            certificateHolderNameM: {
                required: true,
            },
            certificateAadharE: {
                required: true,
            },
            certificateAadharM: {
                required: true,
            },
            certificateVillageE: {
                required: true,
            },
            certificateVillageM: {
                required: true,
            },
            certificateTalukaE: {
                required: true,
            },
            certificateTalukaM: {
                required: true,
            },
            certificateDistE: {
                required: true,
            },
            certificateDistM: {
                required: true,
            },
        },
    });

    // ENGLISH TO MARATHI TRANSLATE
    $(document).on('blur', '.mainText', function (e) {
        e.preventDefault();
        let value = $(this).val();
        var input = $(this).siblings('.secText');
        commonHandler.translateWord(value, function (data) {
            console.log(data);
            $(input).val(data);
        });
    });

    // THIS FUNCTION CHECKS IF THE TAX IS PAID

    let user_id;

    $(document).on('click', '.search-pending-tax-btn', async function () {
        let malmattaNo = +$('.malmatta-no').val();
        if (localStorage.getItem('certificateFormData')) {
            const formDataObject = JSON.parse(localStorage.getItem('certificateFormData'));
            formDataObject.malmatta_no = malmattaNo;
            localStorage.setItem('certificateFormData', JSON.stringify(formDataObject));
        } else {
            console.error('Data not found in localStorage');
        }
        paymentDetails.personName = $('input[name=certificateHolderNameM]').val();
        paymentDetails.malmattaNo = $('#malmatta-no').val();

        user_id = await commonHandler.checkTaxPaidByMalmattaNo(malmattaNo);

        console.log('I am the user id as per the information : ', user_id);
        // user_id = data;/
    });

    // OFFLINE PAYMENT
    $(document).on('click', '.button-offline-pay', function (e) {
        e.preventDefault();

        if (!isPaymentModalMobileFilled()) return;

        let storedFormData = localStorage.getItem('certificateFormData');
        let formData = storedFormData ? JSON.parse(storedFormData) : {};

        paymentDetails.amount = $('#pay-amount').val();
        paymentDetails.paymentFor = 6; // FOR THAK BAKI & NIRADHAR (SEE common.js FOR MORE DESCRIPTION)

        paymentDetails.personName = formData['certificateHolderNameM'];
        paymentDetails.malmattaNo = formData['malmatta_no']
            ? formData['malmatta_no']
            : $('#pay-malmatta-no').val();

        paymentDetails.tax_category = "SAMANYA"
        

        console.log(paymentDetails.personName);
        console.log(paymentDetails.malmattaNo);

        paymentMode.offline(paymentDetails, function (result, actualResult) {
            if (result === 1) {
                const data = {
                    paymentFor: 'नवीन प्रमाणपत्र नोंदणी',
                    paymentMode: 0,
                    sms: '', //if sms is undefined or '' i.e. empty Strring, we will use defaultSms format
                    mobile: `${$('#pay-mobile-no').val()}`,
                };
                handleSendGpSMS(data);
                const paymentId = actualResult.reciptNumber

                submitCertificate(paymentId);
            }
        });
    });

    // Addded this btn here
    $(document).on('click', '.pay-pending-tax-btn', function () {
        // alert('This is gonna be my alert');
        // return;
        window.location.assign(
            `/tax-payer?malmattaNo=${$('#malmatta-no').val()}&user_id=${user_id}`
        );
    });

    // PRINTING THE CERTIFICATES NOW AFTER PAYMENT DONE
    $(document).on('click', '.print-payment-recipt-btn', function (e) {
        e.preventDefault();
        commonHandler.translate(paymentDetails.amount, function (inWord) {
            paymentDetails.amountInwords = inWord;
            printCertificatePaymentRecipt(paymentDetails);
        });
    });

    $(document).on('click', '#authorityToBypassBtn', (e) => {
        e.preventDefault();
        if ($('[name="certificateHolderNameM"]').val() === '') {
            alertjs.warning(
                {
                    t: 'मराठी नाव रिक्त आहे',
                },
                function () {}
            );
            return;
        }
        saveFormData();

        $('#paymentModeModal').modal('show');
        $('#pay-amount').attr('readonly', false);
        $('#pay-malmatta-no').attr('readonly', false);
        $('#pay-person-name').val($('[name="certificateHolderNameM"]').val());
    });

    function saveFormData() {
        var formDataArray = $('#newCertificateForm').serializeArray();
        var formDataObject = {};

        formDataArray.forEach(function (item) {
            formDataObject[item.name] = item.value;
            console.log(item.name, ' ======== ', formDataObject[item.name]);
        });

        localStorage.setItem('certificateFormData', JSON.stringify(formDataObject));
    }


    // SAVE DATA
    $(document).on('click', '#saveCertificate', function (e) {
        e.preventDefault();
        // alert("thunk")
        if (!$('#newCertificateForm').valid()) {
            return false;
        }
        saveFormData();
        $('.check-tax-paid-modal').modal({ show: true });
    });

    // old
    function submitCertificate(paymentId) {
        let storedFormData = localStorage.getItem('certificateFormData');
        let details = storedFormData ? JSON.parse(storedFormData) : {};
        var detailsArray = $('#newCertificateForm').serializeArray();
        // let details = {};
        $.each(detailsArray, function (index, value) {
          details[value.name] = value.value;
        });
        details.ps_payment_information_id_fk =paymentId 

        var data = {
            url: '/certificate',
            method: 'post',
            data: details,
        };

        console.log('doing payment bbroo');

        // /**
        commonHandler.ajaxManager(data, function (type, data) {
            if (type == false) {
                alert('You Have An Error, PLease check Console');
                console.log(data);
                return false;
            }
            if (data.call == 1) {
                alertjs.success(
                    {
                        t: 'नवीन प्रमाणपत्र नोंदणी',
                        m: 'यशस्वी रित्या जतन केली आहे.',
                    },
                    function () {
                        localStorage.removeItem('certificateFormData');
                        var currentUrl = window.location.href;
                        // Create a new URL without the specified parameters
                        var newUrl = currentUrl.replace(/[?&](id|paymentDone)=[^&]+/g, '');
                        // Use history.replaceState to update the URL without reloading the page
                        history.replaceState({}, document.title, newUrl);
                        paymentDone = '';

                        localStorage.removeItem('certificateFormData');
                    }
                );
            }
        });
        // */
    }


    // new code- NOT YET INTEGRATEd
    // function submitCertificateNew() {

    //     const formData = new FormData();


    //     let certificateData;
    //     let paymentScreenshot;

    //     formData.set('paymentData', JSON.stringify(paymentDone))
    //     formData.set('certificateData', JSON.stringify(certificateData))
    // }

    // PRINT CERTIFICATE
    $(document).on('click', '.print-certificate-button', function (e) {
        e.preventDefault();
        $('#printPlace').val('');
        $('#date31').val('');
        var data1 = Number($(this).attr('data-type'));
        $('#p_type').val(data1);
        var data = Number($(this).attr('data-id'));
        $('#idData').val(data);
        $('#paymentModeModal').hide();
        $('#marriageModel').modal({
            show: true,
        });
        if (data1 == '1') {
            $('.modal-title').html('थकबाकी नसल्याचे प्रमाणपत्र');
        } else {
            $('.modal-title').html('निराधार असल्याचा दाखला');
        }
    });

    $(document).on('click', '#btnPrintCertificate', function (e) {
        e.preventDefault();
        var printPlace = $('#printPlace').val();
        var date31 = $('#date31').val();
        var type = $('#p_type').val();
        if (type == '1') {
            window.open(
                `/print/no-dues-certificate?p=${printPlace}&d=${date31}&i=${$('#idData').val()}`
            );
        } else {
            window.open(
                `/print/certificate-of-niradhar?p=${printPlace}&d=${date31}&i=${$('#idData').val()}`
            );
        }
    });

    // DELETE THE CERTIFICATE
    $(document).on('click', '.removeCertificate', function (e) {
        e.preventDefault();
        let deleteId = $(this).attr('data-id');

        alertjs.delete(function (status) {
            if (status) {
                deleteCertificate(deleteId);
            }
        });
    });

    function deleteCertificate(deleteId) {
        var data = {
            url: '/certificate/remove-certificate',
            method: 'post',
            data: {
                id: deleteId,
            },
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
                        t: 'प्रमाणपत्र नोंदणी',
                        m: 'यशस्वी रित्या काढल्या गेली.',
                    },
                    function () {
                        window.location.reload();
                    }
                );
            }
        });
    }

    $(document).on('click', '.editCertificate', function () {
        let editId = $(this).attr('data-id');
        window.open(`/certificate/edit-certificate?certificateId=${editId}`);
    });

    // SAVE EDITED DETAILS
    $(document).on('click', '#editCertificate', function () {
        let editId = $(this).attr('data-id');
        console.log(editId);
        var detailsArray = $('#newCertificateForm').serializeArray();
        let details = {};
        $.each(detailsArray, function (index, value) {
            details[value.name] = value.value;
        });
        details.id = editId;
        $.ajax({
            url: '/certificate/post-edit-data',
            method: 'POST',
            data: details,
            success: function (result) {
                console.log(result);
                if (result.call === 1) {
                    alertjs.success(
                        {
                            t: 'यशस्वी!',
                        },
                        function () {
                            window.close();
                        }
                    );
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
});
