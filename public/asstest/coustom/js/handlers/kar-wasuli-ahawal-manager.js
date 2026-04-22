'use strict';
$(document).ready(() => {
  console.log('script loaded');

  $(document).on('keyup', 'input', function () {
    // ******************* //
    // totalDemand //
    // ******************* //

    $('.totalDemandBuilding').val(
      Number($('.totalDemandBuildingLast').val()) +
        Number($('.totalDemandBuildingCurrent').val())
    );

    $('.totalDemandDiva').val(
      Number($('.totalDemanDivaLast').val()) +
        Number($('.totalDemanDivaCurrent').val())
    );

    $('.totalDemandArogya').val(
      Number($('.totalDemandArogyaLast').val()) +
        Number($('.totalDemandArogyaCurrent').val())
    );

    $('.totalDemandOther').val(
      Number($('.totalDemandOtherLast').val()) +
        Number($('.totalDemandOtherCurrent').val())
    );
    $('.totalDemandLast').val(
      Number($('.totalDemandBuildingLast').val()) +
        Number($('.totalDemanDivaLast').val()) +
        Number($('.totalDemandArogyaLast').val()) +
        Number($('.totalDemandOtherLast').val())
    );

    $('.totalDemandCurrent').val(
      Number($('.totalDemandBuildingCurrent').val()) +
        Number($('.totalDemanDivaCurrent').val()) +
        Number($('.totalDemandArogyaCurrent').val()) +
        Number($('.totalDemandOtherCurrent').val())
    );

    $('.totalDemandAll').val(
      Number($('.totalDemandLast').val()) +
        Number($('.totalDemandCurrent').val())
    );

    $('.totalDemandGeneralTotalWaterTax').val(
      Number($('.totalDemandGeneralWaterTaxLast').val()) +
        Number($('.totalDemandGeneralWaterTaxCurrent').val())
    );

    $('.totalDemandSpecialTotalWaterTax').val(
      Number($('.totalDemandSpecialWaterTaxLast').val()) +
        Number($('.totalDemandSpecialWaterTaxCurrent').val())
    );

    $('.totalDemandLastTotalWaterTax').val(
      Number($('.totalDemandGeneralWaterTaxLast').val()) +
        Number($('.totalDemandSpecialWaterTaxLast').val())
    );
    $('.totalDemandCurrentTotalWaterTax').val(
      Number($('.totalDemandGeneralWaterTaxCurrent').val()) +
        Number($('.totalDemandSpecialWaterTaxCurrent').val())
    );

    $('.totalDemandWaterTaxAll').val(
      Number($('.totalDemandLastTotalWaterTax').val()) +
        Number($('.totalDemandCurrentTotalWaterTax').val())
    );

    // A + B total last
    $('.totalDemandLastABTotal').val(
      Number($('.totalDemandLast').val()) +
        Number($('.totalDemandLastTotalWaterTax').val())
    );

    // A + B total current
    $('.totalDemandCurrentABTotal').val(
      Number($('.totalDemandCurrent').val()) +
        Number($('.totalDemandCurrentTotalWaterTax').val())
    );

    // A + B total all
    $('.totalDemandAllAB').val(
      Number($('.totalDemandLastABTotal').val()) +
        Number($('.totalDemandCurrentABTotal').val())
    );

    // ******************* //
    // lastMonth //
    // ******************* //
    $('.lastMonthRecoveryTotal').val(
      Number($('.lastMonthRecoveryLast').val()) +
        Number($('.lastMonthRecoveryCurrent').val())
    );

    $('.lastMonthDivaTotal').val(
      Number($('.lastMonthDivaLast').val()) +
        Number($('.lastMonthDivaCurrent').val())
    );

    $('.lastMonthArogyaTotal').val(
      Number($('.lastMonthArogyaLast').val()) +
        Number($('.lastMonthArogyaCurrent').val())
    );

    $('.lastMonthOtherTotal').val(
      Number($('.lastMonthOtherLast').val()) +
        Number($('.lastMonthOtherCurrent').val())
    );

    $('.lastMonthTotalLast').val(
      Number($('.lastMonthRecoveryLast').val()) +
        Number($('.lastMonthDivaLast').val()) +
        Number($('.lastMonthArogyaLast').val()) +
        Number($('.lastMonthOtherLast').val())
    );

    $('.lastMonthTotalCurrent').val(
      Number($('.lastMonthRecoveryCurrent').val()) +
        Number($('.lastMonthDivaCurrent').val()) +
        Number($('.lastMonthArogyaCurrent').val()) +
        Number($('.lastMonthOtherCurrent').val())
    );

    $('.lastMonthAll').val(
      Number($('.lastMonthTotalLast').val()) +
        Number($('.lastMonthTotalCurrent').val())
    );

    $('.lastMonthGeneralTotalWaterTax').val(
      Number($('.lastMonthGeneralWaterTaxLast').val()) +
        Number($('.lastMonthGeneralWaterTaxCurrent').val())
    );

    $('.lastMonthSpecialTotalWaterTax').val(
      Number($('.lastMonthSpecialWaterTaxLast').val()) +
        Number($('.lastMonthSpecialWaterTaxCurrent').val())
    );

    $('.lastMonthLastTotalWaterTax').val(
      Number($('.lastMonthGeneralWaterTaxLast').val()) +
        Number($('.lastMonthSpecialWaterTaxLast').val())
    );
    $('.lastMonthCurrentTotalWaterTax').val(
      Number($('.lastMonthGeneralWaterTaxCurrent').val()) +
        Number($('.lastMonthSpecialWaterTaxCurrent').val())
    );

    $('.lastMonthWaterTaxAll').val(
      Number($('.lastMonthLastTotalWaterTax').val()) +
        Number($('.lastMonthCurrentTotalWaterTax').val())
    );

    // A + B total last
    $('.lastMonthLastABTotal').val(
      Number($('.lastMonthTotalLast').val()) +
        Number($('.lastMonthLastTotalWaterTax').val())
    );

    // A + B total current
    $('.lastMonthCurrentABTotal').val(
      Number($('.lastMonthTotalCurrent').val()) +
        Number($('.lastMonthCurrentTotalWaterTax').val())
    );

    // A + B total all
    $('.lastMonthAllAB').val(
      Number($('.lastMonthLastABTotal').val()) +
        Number($('.lastMonthCurrentABTotal').val())
    );

    // ******************* //
    // currentMonth //
    // ******************* //
    $('.currentMonthRecoveryTotal').val(
      Number($('.currentMonthRecoveryLast').val()) +
        Number($('.currentMonthRecoveryCurrent').val())
    );

    $('.currentMonthDivaTotal').val(
      Number($('.currentMonthDivaLast').val()) +
        Number($('.currentMonthDivaCurrent').val())
    );

    $('.currentMonthArogyaTotal').val(
      Number($('.currentMonthArogyaLast').val()) +
        Number($('.currentMonthArogyaCurrent').val())
    );

    $('.currentMonthOtherTotal').val(
      Number($('.currentMonthOtherLast').val()) +
        Number($('.currentMonthOtherCurrent').val())
    );

    $('.currentMonthTotalLast').val(
      Number($('.currentMonthRecoveryLast').val()) +
        Number($('.currentMonthDivaLast').val()) +
        Number($('.currentMonthArogyaLast').val()) +
        Number($('.currentMonthOtherLast').val())
    );

    $('.currentMonthTotalCurrent').val(
      Number($('.currentMonthRecoveryCurrent').val()) +
        Number($('.currentMonthDivaCurrent').val()) +
        Number($('.currentMonthArogyaCurrent').val()) +
        Number($('.currentMonthOtherCurrent').val())
    );

    $('.currentMonthAll').val(
      Number($('.currentMonthTotalLast').val()) +
        Number($('.currentMonthTotalCurrent').val())
    );

    //
    $('.currentMonthGeneralTotalWaterTax').val(
      Number($('.currentMonthGeneralWaterTaxLast').val()) +
        Number($('.currentMonthGeneralWaterTaxCurrent').val())
    );

    $('.currentMonthSpecialTotalWaterTax').val(
      Number($('.currentMonthSpecialWaterTaxLast').val()) +
        Number($('.currentMonthSpecialWaterTaxCurrent').val())
    );

    $('.currentMonthLastTotalWaterTax').val(
      Number($('.currentMonthGeneralWaterTaxLast').val()) +
        Number($('.currentMonthSpecialWaterTaxLast').val())
    );
    $('.currentMonthCurrentTotalWaterTax').val(
      Number($('.currentMonthGeneralWaterTaxCurrent').val()) +
        Number($('.currentMonthSpecialWaterTaxCurrent').val())
    );

    $('.currentMonthWaterTaxAll').val(
      Number($('.currentMonthLastTotalWaterTax').val()) +
        Number($('.currentMonthCurrentTotalWaterTax').val())
    );

    // A + B total last
    $('.currentMonthLastABTotal').val(
      Number($('.currentMonthTotalLast').val()) +
        Number($('.currentMonthLastTotalWaterTax').val())
    );

    // A + B total current
    $('.currentMonthCurrentABTotal').val(
      Number($('.currentMonthTotalCurrent').val()) +
        Number($('.currentMonthCurrentTotalWaterTax').val())
    );

    // A + B total all
    $('.currentMonthAllAB').val(
      Number($('.currentMonthLastABTotal').val()) +
        Number($('.currentMonthCurrentABTotal').val())
    );

    // ******************* //
    // totalRecovery //
    // ******************* //

    //==start==Calculate last and curretnt automatically from previous

    // for last 
    // इमारत कर	
    $('.totalRecoveryRecoveryLast').val(
      Number($('.lastMonthRecoveryLast').val()) +
      Number($('.currentMonthRecoveryLast').val())
    )
    // दिवाबत्ती कर
    $('.totalRecoveryDivaLast').val(
      Number($('.lastMonthDivaLast').val()) +
      Number($('.currentMonthDivaLast').val())
    )

    // आरोग्य कर
    $('.totalRecoveryArogyaLast').val(
      Number($('.lastMonthArogyaLast').val()) +
      Number($('.currentMonthArogyaLast').val())
    )

    // इतर कर
    $('.totalRecoveryOtherLast').val(
      Number($('.lastMonthOtherLast').val()) +
      Number($('.currentMonthOtherLast').val())
    )

    // सामान्य पाणी कर
    $('.totalRecoveryGeneralWaterTaxLast').val(
      Number($('.lastMonthGeneralWaterTaxLast').val()) +
      Number($('.currentMonthGeneralWaterTaxLast').val())
    )

    // विशेष पाणी कर
    $('.totalRecoverySpecialWaterTaxLast').val(
      Number($('.lastMonthSpecialWaterTaxLast').val()) +
      Number($('.currentMonthSpecialWaterTaxLast').val())
    )

    // for Current
    // इमारत कर	
    $('.totalRecoveryRecoveryCurrent').val(
      Number($('.lastMonthRecoveryCurrent').val()) +
      Number($('.currentMonthRecoveryCurrent').val())
    )
    // दिवाबत्ती कर
    $('.totalRecoveryDivaCurrent').val(
      Number($('.lastMonthDivaCurrent').val()) +
      Number($('.currentMonthDivaCurrent').val())
    )

    // आरोग्य कर
    $('.totalRecoveryArogyaCurrent').val(
      Number($('.lastMonthArogyaCurrent').val()) +
      Number($('.currentMonthArogyaCurrent').val())
    )

    // इतर कर
    $('.totalRecoveryOtherCurrent').val(
      Number($('.lastMonthOtherCurrent').val()) +
      Number($('.currentMonthOtherCurrent').val())
    )

    // सामान्य पाणी कर
    $('.totalRecoveryGeneralWaterTaxCurrent').val(
      Number($('.lastMonthGeneralWaterTaxCurrent').val()) +
      Number($('.currentMonthGeneralWaterTaxCurrent').val())
    )

    // विशेष पाणी कर
    $('.totalRecoverySpecialWaterTaxCurrent').val(
      Number($('.lastMonthSpecialWaterTaxCurrent').val()) +
      Number($('.currentMonthSpecialWaterTaxCurrent').val())
    )


    // for Remaining
    //last
    // इमारत कर	
    $('.totalRemainRecoveryLast').val(
      Number($('.totalDemandBuildingLast').val()) -
      Number($('.totalRecoveryRecoveryLast').val())
    )
    // दिवाबत्ती कर
    $('.totalRemainDivaLast').val(
      Number($('.totalDemanDivaLast').val()) -
      Number($('.totalRecoveryDivaLast').val())
    )

    // आरोग्य कर
    $('.totalRemainArogyaLast').val(
      Number($('.totalDemandArogyaLast').val()) -
      Number($('.totalRecoveryArogyaLast').val())
    )

    // इतर कर
    $('.totalRemainOtherLast').val(
      Number($('.totalDemandOtherLast').val()) -
      Number($('.totalRecoveryOtherLast').val())
    )

    // सामान्य पाणी कर
    $('.totalRemainGeneralWaterTaxLast').val(
      Number($('.totalDemandGeneralWaterTaxLast').val()) -
      Number($('.totalRecoveryGeneralWaterTaxLast').val())
    )

    // विशेष पाणी कर
    $('.totalRemainSpecialWaterTaxLast').val(
      Number($('.totalDemandSpecialWaterTaxLast').val()) -
      Number($('.totalRecoverySpecialWaterTaxCurrent').val())
    )

    // for Remaining
    //Current
    // इमारत कर	
    $('.totalRemainRecoveryCurrent').val(
      Number($('.totalDemandBuildingCurrent').val()) -
      Number($('.totalRecoveryRecoveryCurrent').val())
    )
    // दिवाबत्ती कर
    $('.totalRemainDivaCurrent').val(
      Number($('.totalDemanDivaCurrent').val()) -
      Number($('.totalRecoveryDivaCurrent').val())
    )

    // आरोग्य कर
    $('.totalRemainArogyaCurrent').val(
      Number($('.totalDemandArogyaCurrent').val()) -
      Number($('.totalRecoveryArogyaCurrent').val())
    )

    // इतर कर
    $('.totalRemainOtherCurrent').val(
      Number($('.totalDemandOtherCurrent').val()) -
      Number($('.totalRecoveryOtherCurrent').val())
    )

    // सामान्य पाणी कर
    $('.totalRemainGeneralWaterTaxCurrent').val(
      Number($('.totalDemandGeneralWaterTaxCurrent').val()) -
      Number($('.totalRecoveryGeneralWaterTaxCurrent').val())
    )

    // विशेष पाणी कर
    $('.totalRemainSpecialWaterTaxCurrent').val(
      Number($('.totalDemandSpecialWaterTaxCurrent').val()) -
      Number($('.totalRecoverySpecialWaterTaxCurrent').val())
    )

    //==End==Calculate last and curretnt automatically from previous


    $('.totalRecoveryRecoveryTotal').val(
      Number($('.totalRecoveryRecoveryLast').val()) +
        Number($('.totalRecoveryRecoveryCurrent').val())
    );

    $('.totalRecoveryDivaTotal').val(
      Number($('.totalRecoveryDivaLast').val()) +
        Number($('.totalRecoveryDivaCurrent').val())
    );

    $('.totalRecoveryArogyaTotal').val(
      Number($('.totalRecoveryArogyaLast').val()) +
        Number($('.totalRecoveryArogyaCurrent').val())
    );

    $('.totalRecoveryOtherTotal').val(
      Number($('.totalRecoveryOtherLast').val()) +
        Number($('.totalRecoveryOtherCurrent').val())
    );

    $('.totalRecoveryTotalLast').val(
      Number($('.totalRecoveryRecoveryLast').val()) +
        Number($('.totalRecoveryDivaLast').val()) +
        Number($('.totalRecoveryArogyaLast').val()) +
        Number($('.totalRecoveryOtherLast').val())
    );

    $('.totalRecoveryTotalCurrent').val(
      Number($('.totalRecoveryRecoveryCurrent').val()) +
        Number($('.totalRecoveryDivaCurrent').val()) +
        Number($('.totalRecoveryArogyaCurrent').val()) +
        Number($('.totalRecoveryOtherCurrent').val())
    );

    $('.totalRecoveryAll').val(
      Number($('.totalRecoveryTotalLast').val()) +
        Number($('.totalRecoveryTotalCurrent').val())
    );

    $('.totalRecoveryGeneralTotalWaterTax').val(
      Number($('.totalRecoveryGeneralWaterTaxLast').val()) +
        Number($('.totalRecoveryGeneralWaterTaxCurrent').val())
    );

    $('.totalRecoverySpecialTotalWaterTax').val(
      Number($('.totalRecoverySpecialWaterTaxLast').val()) +
        Number($('.totalRecoverySpecialWaterTaxCurrent').val())
    );

    $('.totalRecoveryLastTotalWaterTax').val(
      Number($('.totalRecoveryGeneralWaterTaxLast').val()) +
        Number($('.totalRecoverySpecialWaterTaxLast').val())
    );
    $('.totalRecoveryCurrentTotalWaterTax').val(
      Number($('.totalRecoveryGeneralWaterTaxCurrent').val()) +
        Number($('.totalRecoverySpecialWaterTaxCurrent').val())
    );

    $('.totalRecoveryWaterTaxAll').val(
      Number($('.totalRecoveryLastTotalWaterTax').val()) +
        Number($('.totalRecoveryCurrentTotalWaterTax').val())
    );

    // A + B total last
    $('.totalRecoveryLastABTotal').val(
      Number($('.totalRecoveryTotalLast').val()) +
        Number($('.totalRecoveryLastTotalWaterTax').val())
    );

    // A + B total current
    $('.totalRecoveryCurrentABTotal').val(
      Number($('.totalRecoveryTotalCurrent').val()) +
        Number($('.totalRecoveryCurrentTotalWaterTax').val())
    );

    // A + B total all
    $('.totalRecoveryAllAB').val(
      Number($('.totalRecoveryLastABTotal').val()) +
        Number($('.totalRecoveryCurrentABTotal').val())
    );

    //////

    // ******************* //
    // totalRemain //
    // ******************* //
    $('.totalRemainRecoveryTotal').val(
      Number($('.totalRemainRecoveryLast').val()) +
        Number($('.totalRemainRecoveryCurrent').val())
    );

    $('.totalRemainDivaTotal').val(
      Number($('.totalRemainDivaLast').val()) +
        Number($('.totalRemainDivaCurrent').val())
    );

    $('.totalRemainArogyaTotal').val(
      Number($('.totalRemainArogyaLast').val()) +
        Number($('.totalRemainArogyaCurrent').val())
    );

    $('.totalRemainOtherTotal').val(
      Number($('.totalRemainOtherLast').val()) +
        Number($('.totalRemainOtherCurrent').val())
    );

    $('.totalRemainTotalLast').val(
      Number($('.totalRemainRecoveryLast').val()) +
        Number($('.totalRemainDivaLast').val()) +
        Number($('.totalRemainArogyaLast').val()) +
        Number($('.totalRemainOtherLast').val())
    );

    $('.totalRemainTotalCurrent').val(
      Number($('.totalRemainRecoveryCurrent').val()) +
        Number($('.totalRemainDivaCurrent').val()) +
        Number($('.totalRemainArogyaCurrent').val()) +
        Number($('.totalRemainOtherCurrent').val())
    );

    $('.totalRemainAll').val(
      Number($('.totalRemainTotalLast').val()) +
        Number($('.totalRemainTotalCurrent').val())
    );

    $('.totalRemainGeneralTotalWaterTax').val(
      Number($('.totalRemainGeneralWaterTaxLast').val()) +
        Number($('.totalRemainGeneralWaterTaxCurrent').val())
    );

    $('.totalRemainSpecialTotalWaterTax').val(
      Number($('.totalRemainSpecialWaterTaxLast').val()) +
        Number($('.totalRemainSpecialWaterTaxCurrent').val())
    );

    $('.totalRemainLastTotalWaterTax').val(
      Number($('.totalRemainGeneralWaterTaxLast').val()) +
        Number($('.totalRemainSpecialWaterTaxLast').val())
    );
    $('.totalRemainCurrentTotalWaterTax').val(
      Number($('.totalRemainGeneralWaterTaxCurrent').val()) +
        Number($('.totalRemainSpecialWaterTaxCurrent').val())
    );

    $('.totalRemainWaterTaxAll').val(
      Number($('.totalRemainLastTotalWaterTax').val()) +
        Number($('.totalRemainCurrentTotalWaterTax').val())
    );

    // A + B total last
    $('.totalRemainLastABTotal').val(
      Number($('.totalRemainTotalLast').val()) +
        Number($('.totalRemainLastTotalWaterTax').val())
    );

    // A + B total current
    $('.totalRemainCurrentABTotal').val(
      Number($('.totalRemainTotalCurrent').val()) +
        Number($('.totalRemainCurrentTotalWaterTax').val())
    );

    // A + B total all
    $('.totalRemainAllAB').val(
      Number($('.totalRemainLastABTotal').val()) +
        Number($('.totalRemainCurrentABTotal').val())
    );

    // *******************
    // RECOVERY PERCENTAGE
    // *******************

    function calculateRecoveryPercentage(val1, val2, val3) {
      let v1 = Number($(`.${val1}`).val());
      let v2 = Number($(`.${val2}`).val());
      let v3 = Number($(`.${val3}`).val());

      let percentage = ((v1 + v2) / v3) * 100;

      // CHECK NUMBER - NAN OR FINITE
      isNaN(percentage) || !isFinite(percentage)
        ? (percentage = '0 %')
        : (percentage = `${percentage.toFixed(2)} %`);

      return percentage;
    }

    // BUILDING

    $('.buildingRecoveryPercentage').val(
      calculateRecoveryPercentage(
        'lastMonthRecoveryTotal',
        'currentMonthRecoveryTotal',
        'totalDemandBuilding'
      )
    );

    // DIVA
    $('.divaRecoveryPercentage').val(
      calculateRecoveryPercentage(
        'lastMonthDivaTotal',
        'currentMonthDivaTotal',
        'totalDemandDiva'
      )
    );

    // AROGYA
    $('.arogyaRecoveryPercentage').val(
      calculateRecoveryPercentage(
        'lastMonthArogyaTotal',
        'currentMonthArogyaTotal',
        'totalDemandArogya'
      )
    );

    // OTHER
    $('.otherRecoveryPercentage').val(
      calculateRecoveryPercentage(
        'lastMonthOtherTotal',
        'currentMonthOtherTotal',
        'totalDemandOther'
      )
    );

    // A TOTAL
    $('.aRecoveryPercentage').val(
      calculateRecoveryPercentage(
        'lastMonthAll',
        'currentMonthAll',
        'totalDemandAll'
      )
    );

    // GENERAL WATER TAX
    $('.generalRecoveryPercentage').val(
      calculateRecoveryPercentage(
        'lastMonthGeneralTotalWaterTax',
        'currentMonthGeneralTotalWaterTax',
        'totalDemandGeneralTotalWaterTax'
      )
    );

    // SPECIAL WATER TAX
    $('.specialRecoveryPercentage').val(
      calculateRecoveryPercentage(
        'lastMonthSpecialTotalWaterTax',
        'currentMonthSpecialTotalWaterTax',
        'totalDemandSpecialTotalWaterTax'
      )
    );

    // B TOTAL
    $('.bRecoveryPercentage').val(
      calculateRecoveryPercentage(
        'lastMonthWaterTaxAll',
        'currentMonthWaterTaxAll',
        'totalDemandWaterTaxAll'
      )
    );

    // AB TOTAL
    $('.abRecoveryPercentage').val(
      calculateRecoveryPercentage(
        'lastMonthAllAB',
        'currentMonthAllAB',
        'totalDemandAllAB'
      )
    );
  });

  // show newKarVasuliAvahalModal function
  function showNewKarVasuliAvahalModal() {
    $('#newKarVasuliAvahalModal').modal('show');
  }

  // close newKarVasuliAvahalModal function
  function closeNewKarVasuliAvahalModal() {
    $('#newKarVasuliAvahalModal').modal('hide');
  }

  $('.closeKarVasuliAvahalModal').click(function () {
    closeNewKarVasuliAvahalModal();
  });

  $('#newKarVasuliAvahalButton').click(function () {
    showNewKarVasuliAvahalModal();
  });

  $('#addNewKarVasuli').click(function () {
    let data = {
      month: $('#monthDropdown').val(),
      year: $('#karVasuliAvahalYear').val()
    };
    if (data.month == '-1') {
      alertjs.warning({
        t: 'कृपया महिना निवडा.'
      });
      return false;
    }
    if (data.year == '') {
      alertjs.warning({
        t: 'कृपया वर्ष निवडा.'
      });
      return false;
    }
    if (data.year.length < 4) {
      alertjs.warning({
        t: 'वर्ष बरोबर निवडा.'
      });
      return false;
    }

    // checking if vasuli of the selected month is already filled or not.
    $.ajax({
      url: '/kar-wasuli/checkFilledDetails',
      method: 'POST',
      data: data,
      success: function (result) {
        console.log(result);
        if (result.call === 1) {
          alertjs.warning({
            t: 'निवडलेल्या महिना आणि वर्षाचा वसुली अवहाल आधीच भरला आहे.',
            m: 'नवीन भारयाचा असल्यास कृपया आधीचा डिलीट करा.'
          });
          return false;
        }
        if (result.call === 2) {
          window.open(
            `/kar-wasuli/newKarVasuliAvahalView?month=${data.month}&year=${data.year}`
          );
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  });

  $('input').click(function () {
    $(this).select();
  });

  $('#submitNewAhawalBtn').click(function (e) {
    e.preventDefault();

    let searchParams = new URLSearchParams(window.location.search);

    let dataArray = $('#formNewKarVasuliAvahal').serializeArray();
    var formData = new FormData();

    formData.append('month', searchParams.get('month'));
    formData.append('year', searchParams.get('year'));

    $.each(dataArray, function (_, value) {
      formData.append(value.name, value.value);
    });

    $.ajax({
      url: '/kar-wasuli/postNewKarVasuliAvahal',
      method: 'POST',
      processData: false,
      contentType: false,
      cache: false,
      data: formData,
      success: function (result) {
        console.log(result);
        if (result.call === 1) {
          alertjs.success(
            {
              t: 'यशस्वी!',
              m: 'यशस्वीरित्या कर वसुली जतन झाली.'
            },
            function () {
              window.location.reload();
            }
          );
        }
      },
      error: function (error) {
        alert('You have error please check in console');
        console.log(error);
      }
    });
  });


  $('#updateAhawalBtn').click(function (e) {
    e.preventDefault();

    // let searchParams = new URLSearchParams(window.location.search);

   
    const formData = new FormData(document.getElementById('formNewKarVasuliAvahal'));

    $.ajax({
      url: '/kar-wasuli/updateKarVasuliAvahal',
      method: 'put',
      processData: false,
      contentType: false,
      cache: false,
      data: formData,
      success: function (result) {
        console.log(result);
        if (result.call === 1) {
          alertjs.success(
            {
              t: 'यशस्वी!',
              m: 'यशस्वीरित्या कर वसुली अद्ययावत  झाली.'
            },
            function () {
              window.location.reload();
            }
          );
        }
      },
      error: function (error) {
        alert('You have error please check in console');
        console.log(error);
      }
    });
  });
  

  // get vasuli avahal as per year selected
  let selectedYear;
  if (localStorage.getItem('selectedYear') === null) {
    selectedYear = '';
    $('#selectAvahalYear').val();
  } else {
    selectedYear = localStorage.getItem('selectedYear');
    console.log(selectedYear, '---');
    $('#selectAvahalYear').val(selectedYear);
  }

  $('#selectAvahalYear').change(function () {
    selectedYear = $(this).val();
    localStorage.setItem('selectedYear', selectedYear);
    getVasuliData(selectedYear);
  });

  if ($('#selectAvahalYear').val() !== -1) {
    getVasuliData(selectedYear);
  }

  function getVasuliData(selectedYear) {
    // CHECK SELECTED EMPTY
    if (selectedYear === '-1') {
      $('#karVasuliList').html('');
      $('.kar-wasuli-list-table').addClass('d-none');
      return false;
    }
    let monthsMap = [
      { monthName: 'जानेवारी', monthNumber: '०१' },
      { monthName: 'फेब्रुवारी', monthNumber: '०२' },
      { monthName: 'मार्च', monthNumber: '०३' },
      { monthName: 'एप्रिल', monthNumber: '०४' },
      { monthName: 'मे', monthNumber: '०५' },
      { monthName: 'जून', monthNumber: '०६' },
      { monthName: 'जुलै', monthNumber: '०७' },
      { monthName: 'ऑगस्ट', monthNumber: '०८' },
      { monthName: 'सप्टेंबर', monthNumber: '०९' },
      { monthName: 'ऑक्टोबर', monthNumber: '१०' },
      { monthName: 'नोव्हेंबर', monthNumber: '११' },
      { monthName: 'डिसेंबर', monthNumber: '१2' }
    ];

    // GET VASULI DATA
    $.ajax({
      url: `/kar-wasuli/list?year=${selectedYear}`,
      method: 'GET',
      success: function (result) {
        console.log(result);
        $('#karVasuliList').html('');

        let html = result.ahavalListYearwise
          .sort((a, b) => a.month - b.month)
          .map((el) => {
            const index = Number(el.month);
            const { monthName, monthNumber } = monthsMap[index - 1];
            return ` 
                    <tr> 
                        <td class='font-weight-bold'> ${monthName} (${monthNumber}) </td>
                        <td> <a href='/kar-wasuli/editKarVasuliAvahalView/${el.id}?month=${el.month}&year=${el.year}' class='btn btn-success' > <i class='fa fa-edit'> </i> </a> </td>
                        <td> <button type='button' class='btn btn-success print-karvasuli-avahal-gramsevak' data-month=${el.month} data-year=${el.year}> <i class='fa fa-print'> </i> </button> </td>
                        <td> <button type='button' class='btn btn-danger delete-karvasuli-avahal-gramsevak' data-month=${el.month} data-year=${el.year}> <i class='fa fa-trash'> </i> </button> </td>
                    </tr>
                    `;
          });
        $('table').removeClass('d-none');
        $('#karVasuliList').append(html);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  // print-karvasuli-avahal-gramsevak
  $(document).on('click', '.print-karvasuli-avahal-gramsevak', function (e) {
    e.preventDefault();
    console.log('print-karvasuli-avahal-gramsevak');

    let printData = {
      month: $(this).data('month'),
      year: $(this).data('year')
    };
    window.open(
      `/kar-wasuli/print-kar-wasuli?month=${printData.month}&year=${printData.year}`,
      '_blank'
    );
  });

  // delete-karvasuli-avahal-gramsevak
  $(document).on('click', '.delete-karvasuli-avahal-gramsevak', function () {
    let deleteData = {
      month: $(this).data('month'),
      year: $(this).data('year')
    };
    alertjs.delete(function (status) {
      // if true then delete vasuli details
      if (status) {
        deleteVasuli(deleteData);
      }
    });
  });

  // DELETE AVAHAL FUNCTION
  function deleteVasuli(deleteData) {
    console.log(deleteData);
    $.ajax({
      url: '/kar-wasuli/delete-kar-wasuli',
      method: 'POST',
      data: deleteData,
      success: function (result) {
        if (result.call === 1) {
          alertjs.success(
            {
              t: 'यशस्वी',
              m: 'कर वसुली डिलीट केली.'
            },
            function () {
              window.location.reload();
            }
          );
        }
      }
    });
  }
});
