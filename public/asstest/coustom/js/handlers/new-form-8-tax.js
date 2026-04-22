let currentAreaSqFeet;
$(document).ready(function () {

  $("#taxYearCount").val(0);
  $("#propertyDesc")
    .select2({
      placeholder: "Select a option",
      data: formTaxHandler.propertyDesc,
    })
    .val("")
    .trigger("change");
  changeCSSStyleofSelect();


  $(document).on("click", ".navToFormNight", function (e) {
    window.location.assign("/form-9/" + formTaxHandler.userDetails[0].id);
  });


  $(document).on("click", ".navToNextForm8Tax", async function (e) {
    // this code will make it move by next malmatta number

    try {
      let payload = JSON.stringify({
        id: formTaxHandler.userDetails[0].id,
        malmattaNumber: formTaxHandler.userDetails[0].feu_malmattaNo,
      });

      let res = await fetch("/form-8/checkNextUserByMalmatta", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let { success, message, data } = await res.json();

      if (success) {
        window.location.assign(`/form-8/phase-2/${data?.nextUser?.id}`);
      } else {
        alertjs.warning({
          t: "WARNING",
          m: message,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alertjs.warning({
        t: "WARNING",
        m: "काहीतरी चुकले.",
      });
    }

    // DONT DELETE THIS , MIGHT NEED AGAIN
    // old code moves to next by id

    /*
		var data = {
			url: '/form-8/checkNextUser',
			method: 'post',
			data: {
				id: formTaxHandler.userDetails[0].id,
			},
		}
		commonHandler.ajaxManager(data, function (type, data) {
			if (type == false) {
				alert('You Have An Error, PLease check Console')
				console.log(data)
				return false
			}
			if (data.call == 1) {
				window.location.assign('/form-8/phase-2/' + data.data)
			} else {
				alertjs.warning(
					{
						t: 'नमुना ८ कर',
						m: 'वरील हि माहिती शिवाटची होती.',
					},
					function () {
						window.location.assign('/')
					}
				)
			}
		})


		*/
  });

  $(document).on("select2:select", "#propertySpecification", function (e) {
    $(".preCalculation").addClass("d-none");
  });

  $(document).on("select2:select", "#bahandkamPrakar", function (e) {
    $(".preCalculation").addClass("d-none");
  });

  $(document).on("input", "#taxYearTwo", function (e) {
    $(".preCalculation").addClass("d-none");
    var data = $(this).val(); //e.params.data;
    formTaxHandler.sendYear = Number(data);
    if (isNaN(formTaxHandler.sendYear)) {
      formTaxHandler.sendYear = 0;
      $(this).val(0);
      $("#taxYearCount").val(0);
      return false;
    }
    var yearCount = formTaxHandler.currentYear - formTaxHandler.sendYear;
    formTaxHandler.yearCount = yearCount;
    if (yearCount < 0) {
      formTaxHandler.sendYear = 0;
      formTaxHandler.yearCount = 0;
      $(this).val(0);
      $("#taxYearCount").val(0);
      return false;
    }
    if (formTaxHandler.sendYear == 0) {
      formTaxHandler.sendYear = 0;
      formTaxHandler.yearCount = 0;
      yearCount = 0;
      $("#taxYearCount").val(0);
    } else {
      $("#taxYearCount").val(yearCount);
    }

    formTaxHandler.selectedGhasaraValue = formTaxHandler.ghasaraRate.filter(
      function (el) {
        return el.gr_min <= Number(yearCount) && el.gr_max >= Number(yearCount);
      }
    );
    //console.log(formTaxHandler.selectedGhasaraValue);
  });

  $(document).on("input", "#taxYearCount", function () {
    let taxYearOne = $("#taxYearOne").val();
    let yearCount = $("#taxYearCount").val();

    let taxYearTwo = taxYearOne - yearCount;

    $("#taxYearTwo").val(taxYearTwo);
    // ✅ Properly fire the native input event
    const inputEvent = new Event("input", { bubbles: true });
    document.getElementById("taxYearTwo").dispatchEvent(inputEvent);
  });

  $(document).on("select2:select", "#propertyDesc", function (e) {
    $(".preCalculation").addClass("d-none");
    var data = e.params.data;
    var currentId = Number(data.id);
    var list = formTaxHandler.propertySpecification.filter((el) => {
      return el.pd_id == currentId;
    });
    var bandhkamPrakar = [];
    if (currentId < 4) {
      bandhkamPrakar = formTaxHandler.bahandkamPrakar.filter((el) => {
        return el.pd_id == 0;
      });
      formTaxHandler.loadDataToSelect("#bahandkamPrakar", bandhkamPrakar, 1);
      formTaxHandler.loadDataToSelect("#propertySpecification", list, 1);
    } else {
      bandhkamPrakar = formTaxHandler.bahandkamPrakar.filter((el) => {
        return el.pd_id == currentId;
      });
      formTaxHandler.loadDataToSelect("#bahandkamPrakar", bandhkamPrakar, 0);
      formTaxHandler.loadDataToSelect("#propertySpecification", list, 0);
    }
  });

  $(document).on("click", "#removeUserDetails", function () {});

  currentAreaSqFeet = +$("#newTotalArea").val();
  $(document).on("keyup", ".isNaN", function (e) {
    $(".preCalculation").addClass("d-none");
    if (e.which == 9) {
      return false;
    }
    var _value = Number($(this).val());
    if (isNaN(_value)) {
      $(this).val("");
      $("#idTaxTotalArea").val("");
      $("#idTaxSqMeter").val("");
      return false;
    }
    formTaxHandler.calculateArea(
      "#idTaxWidth",
      "#idTaxHeight",
      "#idTaxTotalArea",
      "#idTaxSqMeter"
    );
  });

  $(document).on("keyup", "#idTaxTotalArea", function (e) {
    $(".preCalculation").addClass("d-none");
    if (e.which == 9) {
      return false;
    }
    $(".isNaN").val("");
    var _value = Number($(this).val());
    if (isNaN(_value)) {
      $(this).val("");
      $("#idTaxTotalArea").val("");
      $("#idTaxSqMeter").val("");
      return false;
    }
    formTaxHandler.calculateSqMeter("#idTaxTotalArea", "#idTaxSqMeter");
  });

  $(document).on("keyup", "#idTaxSqMeter", function (e) {
    $(".preCalculation").addClass("d-none");
    if (e.which == 9) {
      return false;
    }
    $(".isNaN").val("");
    var _value = Number($(this).val());
    if (isNaN(_value)) {
      $(this).val("");
      $("#idTaxTotalArea").val("");
      $("#idTaxSqMeter").val("");
      return false;
    }
    formTaxHandler.calculateSqFeet("#idTaxSqMeter", "#idTaxTotalArea");
  });

  $(document).on("click", "#calculateDetails", function (e) {
    $(".preCalculation").addClass("d-none");

    var values = {
      _propDesc: Number($("#propertyDesc").val()),
      _propSpec: Number($("#propertySpecification").val()),
      _bahandkamPrakar: Number($("#bahandkamPrakar").val()),
      _height: $("#idTaxHeight").val(),
      _width: $("#idTaxWidth").val(),
      _sqArea: parseFloat($("#idTaxTotalArea").val()),
      _sqMeterArea: parseFloat($("#idTaxSqMeter").val()),
      _year: Number($("#taxYearTwo").val()),
      _year_one: Number($("#taxYearOne").val()),
    };

    if (values._propDesc == 0) {
      alert("Select मालमेचे वर्णन");
      return false;
    }

    if (values._propSpec == 0) {
      alert("Select बांधकामाचे विवरण");
      return false;
    }
    if (values._bahandkamPrakar == 0) {
      alert("Select बांधकामाचे प्रकार");
      return false;
    }

    if (values._propDesc < 5) {
      if ($("#taxYearTwo").val() == null) {
        alert("Select A Year");
        return false;
      }
    }

    if (values._bahandkamPrakar == 0) {
      alert("Select बांधकामाचे प्रकार");
      return false;
    }

    if (
      values._sqMeterArea == "" ||
      isNaN(values._sqMeterArea) ||
      parseFloat(values._sqMeterArea) == 0
    ) {
      alert("Please Enter जागेच क्षेत्रफळ");
      return false;
    }

    formTaxHandler.calculateTaxData(values, function (finalData) {
      formTaxHandler.printOverViewDetailsBeforeSaving(finalData);
      formTaxHandler.sendFinalData = formTaxHandler.returnFinalData(finalData);
    });
  });

  $(document).on("click", "#saveTaxSample", function (e) {
    formTaxHandler.sendFinalData["id"] = formTaxHandler.userDetails[0].id;
    console.log(formTaxHandler.sendFinalData, "finaltax data before sending");
    var data = {
      url: "/form-8/saveTaxSample",
      method: "post",
      data: formTaxHandler.sendFinalData,
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }
      if (data.call == 1) {
        alertjs.success(
          {
            t: "Success: कर नमुना",
            m: "यशस्वी  रित्या  जतन  केली आहे.",
          },
          function () {
            $("#propertySpecification").val("").trigger("change");
            $("#bahandkamPrakar").val("").trigger("change");
            $("#propertyDesc").val("").trigger("change");
            $("#taxYearTwo").val("");
            formTaxHandler.yearCount = 0;
            $("#taxYearCount").val("0");
            $("#idTaxTotalArea").val("");
            $("#idTaxSqMeter").val("");
            $(".isNaN").val("");
            $(".preCalculation").addClass("d-none");
            formTaxHandler.getFormEightTax();
          }
        );
      } else {
        alertjs.warning(
          {
            t: "Duplicate: कर नमुना",
            m: "वरील कर नमुना पहिलेच जतन केले आहे.",
          },
          function () {}
        );
      }
    });
  });

  //idTaxWidth;
  //idTaxHeight;
  //idTaxTotalArea;
  //idTaxSqMeter;

  /*idTaxWidth
  dTaxHeight;
  idTaxTotalArea;
  idTaxSqMeter;*/

  //$('#bahandkamPrakar').select2('destroy').empty().select2({data: data});
  //$('#propertyDesc').select2({placeholder: "Select a option"}).val("").trigger("change");
  //$('#propertySpecification').select2({placeholder: "Select a option"}).val("").trigger("change");

  changeCSSStyleofSelect();



//   for teh page form_8_phase_2.pug file


	let searchType = 1;
    $('#selectSearch-1').on('change', function () {
		searchType = Number($(this).val())
		$('#homeId-type').val('')
		$('#homeId').val('')
	})


	$('#homeId-type')
		.autocomplete({
			minLength: 1,
			source: function (request, response) {
				$('#homeId').val('')
				$('#divUserDetails').addClass('d-none')
				$.ajax({
					url: '/get-user-info',
					method: 'post',
					data: {
						q: request.term,
						sType: searchType,
					},
					success: function (data) {
						console.log(data.call)
						// console.log("I am in homeid 201")
						response(data.call)
					},
				})
			},
			focus: function (event, ui) {
				$('#homeId-type').val(ui.item.label)
				return false
			},
			select: function (event, ui) {
				$('#homeId-type').val(ui.item.label)
				$('#homeId').val(ui.item.id)
                window.open(`/form-8/phase-2/${ui.item.id}`, '_self')
				return false
			},
		})
		.data('ui-autocomplete')._renderItem = function (ul, item) {
		return $('<li>')
			.data('ui-autocomplete-item', item)
			.append('<a style="display:block;width:100%;"> ' + item.label + '</a>')
			.appendTo(ul)
	}
});
function changeCSSStyleofSelect() {
  $(".selection").addClass("form-select");
  $(".select2-selection.select2-selection--single").addClass("border-0");
}

// handler
var formTaxHandler = {
  id: 0,
  currentYear: new Date().getFullYear(),
  sendYear: 0,
  selectedGhasaraValue: [],
  yearCount: 0,
  userDetails: [],
  bahandkamPrakar: [],
  propertyDesc: {},
  propertySpecification: [],
  ghasaraRate: [],
  sendFinalData: {},
  arogyaDivaKar: [],
  finalTotalTaxArray: [],
  loadDataToSelect(id, arrayData, changeValue) {
    switch (changeValue) {
      case 1:
        $(id)
          .select2("destroy")
          .empty()
          .select2({ data: arrayData })
          .val("")
          .trigger("change");
        changeCSSStyleofSelect();
        break;

      default:
        $(id)
          .select2("destroy")
          .empty()
          .select2({ data: arrayData })
          .trigger("change");
        changeCSSStyleofSelect();
        break;
    }
  },
  calculateArea: function (h, w, sqArea, sqMeter) {
    var _h = Number($(h).val());
    var _w = Number($(w).val());
    $(sqArea).val((_h * _w).toFixed(2));
    // console.log(`${_h * _w}`)
    currentAreaSqFeet = _h * _w;
    console.log(`current are sq feet : ${currentAreaSqFeet}`);
    formTaxHandler.calculateSqMeter(sqArea, sqMeter);
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
    if (value == "") return 0;
    if (isNaN(value)) return 0;
    return (value / 3.2).toFixed(2);
  },

  calculateTaxData: function (taxMetaData, callback) {
    console.log(this, "---");
    console.log(taxMetaData, "tax meta data");
    let _this = this;
    var _finalData = {};

    /*
	  sendYear: 0,
	  selectedGhasaraValue: [],
	  yearCount: -1,
	  userDetails: [],
	  bahandkamPrakar: [],
	  propertyDesc: [],
	  propertySpecification: [],
	  ghasaraRate: [],
  */

    var _propDesc = _this.propertyDesc.filter((el) => {
      return el.id == taxMetaData._propDesc;
    });

    var _propSpec = _this.propertySpecification.filter((el) => {
      return el.id == taxMetaData._propSpec;
    });

    var _bahandkamPrakar = _this.bahandkamPrakar.filter((el) => {
      return el.id == taxMetaData._bahandkamPrakar;
    });

    var ghasara = 0;

    if (typeof _this.selectedGhasaraValue[0] !== "undefined") {
      if (taxMetaData._bahandkamPrakar > 2) {
        ghasara = _this.selectedGhasaraValue[0].gr_type_one;
      } else {
        ghasara = _this.selectedGhasaraValue[0].gr_type_two;
      }
      _finalData["ghasara_max"] = _this.selectedGhasaraValue[0].gr_max;
      _finalData["ghasara_min"] = _this.selectedGhasaraValue[0].gr_min;
      _finalData["ghasara_type_one"] =
        _this.selectedGhasaraValue[0].gr_type_one;
      _finalData["ghasara_type_two"] =
        _this.selectedGhasaraValue[0].gr_type_two;
      _finalData["ghasara_id"] = _this.selectedGhasaraValue[0].id;
      _finalData["ghasara_value"] = ghasara;
    } else {
      // undefined
      _finalData["ghasara_max"] = 0;
      _finalData["ghasara_min"] = 0;
      _finalData["ghasara_type_one"] = 0;
      _finalData["ghasara_type_two"] = 0;
      _finalData["ghasara_id"] = 0;
      _finalData["ghasara_value"] = 0;
    }

    //console.log(ghasara);
    //console.log(_this.selectedGhasaraValue);
    // console.log(_propDesc);
    // console.log(_propSpec);
    //console.log(_bahandkamPrakar);
    //  console.log(taxMetaData);

    _finalData["year_one"] = taxMetaData._year_one;
    _finalData["year_two"] = taxMetaData._year;
    _finalData["year_count"] = _this.yearCount;
    _finalData["bahandkamPrakar"] = taxMetaData._bahandkamPrakar;
    _finalData["height"] = taxMetaData._height;
    _finalData["propDesc"] = taxMetaData._propDesc;
    _finalData["propSpec"] = taxMetaData._propSpec;
    _finalData["sqArea"] = taxMetaData._sqArea;
    _finalData["sqMeterArea"] = taxMetaData._sqMeterArea;
    _finalData["width"] = taxMetaData._width;
    _finalData["meter_width"] = _this.convertToMeter(
      parseFloat(taxMetaData._width)
    );
    _finalData["meter_height"] = _this.convertToMeter(
      parseFloat(taxMetaData._height)
    );

    _finalData["prop_desc_id"] = _propDesc[0].id;
    _finalData["prop_desc_rate"] = _propDesc[0].rate;
    _finalData["prop_desc_text"] = _propDesc[0].text;

    _finalData["prop_space_id"] = _propSpec[0].id;
    _finalData["prop_space_land_rate"] = _propSpec[0].lnd_rate;
    _finalData["prop_space_skeep_tax"] = _propSpec[0].skeep_tax;
    _finalData["prop_space_pd_id"] = _propSpec[0].pd_id;
    _finalData["prop_space_text"] = _propSpec[0].text;

    _finalData["bahandkam_prakar_id"] = _bahandkamPrakar[0].id;
    _finalData["bahandkam_prakar_pd_id"] = _bahandkamPrakar[0].pd_id;

    if (_propSpec[0].skeep_tax == 1) {
      _finalData["bahandkam_prakar_ready_nater_rate"] = 0;
    } else {
      _finalData["bahandkam_prakar_ready_nater_rate"] =
        _bahandkamPrakar[0].ready_nakar_rate;
    }

    _finalData["bahandkam_prakar_tax_rate"] = _bahandkamPrakar[0].tax_rate;
    _finalData["bahandkam_prakar_text"] = _bahandkamPrakar[0].text;

    //---------------------------------------------------------------------
    // formula for nivash, vanijya , audyogic
    if (
      taxMetaData._propDesc == 1 ||
      taxMetaData._propDesc == 2 ||
      taxMetaData._propDesc == 3
    ) {
      console.log("here in // formula for nivash, vanijya , audyogic");
      var calc_1 = _propSpec[0].lnd_rate * taxMetaData._sqMeterArea;
      var calc_2 =
        _bahandkamPrakar[0].ready_nakar_rate * taxMetaData._sqMeterArea;
      var calc_3 = calc_2 * ghasara;
      var calc_3 = calc_1 + calc_3;
      var calc_4 = calc_3 * _propDesc[0].rate;
      var calc_5 = Math.round(calc_4); // imarati bhandvali mulya

      // kar akarni calcluaton
      var calc_6 = calc_5 / 1000;
      var calc_7 = calc_6 * _bahandkamPrakar[0].tax_rate;

      if (_propSpec[0].skeep_tax == 1) {
        console.log("setting tax zero");
        var calc_8 = 0; // kar akarni sarkari ani mandir set zero
      } else {
        var calc_8 = Math.round(calc_7); // kar akarni
      }

      _finalData["final_imarati_bhandvali_mullya"] = calc_5;
      _finalData["final_tax"] = calc_8;
    }

    //---------------------------------------------------------------------
    // manorega
    if (taxMetaData._propDesc == 4) {
      var calc_9 = _bahandkamPrakar[0].tax_rate * taxMetaData._sqArea;
      var calc_10 = Math.round(calc_9); // manorega kar kar akarni*/

      _finalData["final_imarati_bhandvali_mullya"] = 0;
      _finalData["final_tax"] = calc_10;
    }
    //---------------------------------------------------------------------

    // khuli_jaga,khula plot
    if (taxMetaData._propDesc == 5 || taxMetaData._propDesc == 6) {
      var calc_11 = _propSpec[0].lnd_rate * taxMetaData._sqMeterArea;

      // kar akarni calcluaton
      var calc_12 = calc_11 / 1000;
      var calc_13 = calc_12 * _bahandkamPrakar[0].tax_rate;
      var calc_14 = Math.round(calc_13); // khuli_jaga akarni
      _finalData["bahandkam_prakar_ready_nater_rate"] = 0;
      _finalData["final_imarati_bhandvali_mullya"] = Math.round(calc_11);
      _finalData["final_tax"] = calc_14;
    }
    //---------------------------------------------------------------------

    console.log(_finalData, "final tax data calulations, ------- 491 line");

    callback(_finalData);
    /* _propSpec
	_bahandkamPrakar
	_height
	_width
	_sqArea
	_sqMeterArea*/
  },

  printOverViewDetailsBeforeSaving: function (finalData) {
    console.log(finalData);
    $(".preCalculation").removeClass("d-none");
    var _tr = `<tbody>
              <tr>
                <th width="50%">मी.लांबी</th>
				<td width="50%">${finalData.meter_height}</td>
				</tr>
				<tr>
                <th width="50%">मी.रुंदी</th>
                <td width="50%">${finalData.meter_width}</td>
              </tr>
              <tr>
                <th>फुट</th>
                <td>${finalData.sqArea}</td>
              </tr>
                <tr>
                  <th>मीटर</th>
                  <td>${finalData.sqMeterArea}</td>
                </tr>
              </tbody>`;

    var _tr_2 = `<tbody>
                <tr>
                  <th>एकूण वर्ष</th>
                  <td>${finalData.year_count}</td>
                </tr>
                <tr>
                  <th>मुल्ल्याची टक्केवारी</th>
                  <td>${finalData.ghasara_value * 100}</td>
                </tr>
                <tr>
                  <th>जमिनीच्य वार्षिक मूल्य दर</th>
                  <td>${finalData.prop_space_land_rate}</td>
                </tr>
                <tr>
                  <th>रेडीनेटर दर</th>
                  <td>${finalData.bahandkam_prakar_ready_nater_rate}</td>
                </tr>
                
              </tbody>`;

    var _tr_3 = `<tbody>
              <tr>
                  <th>भारांक</th>
                  <td>${finalData.prop_desc_rate}</td>
                </tr>
              <tr>
                <th>इमारतीची भांडवली मूल्य</th>
                <td>${finalData.final_imarati_bhandvali_mullya}</td>
              </tr>
                <tr>
                  <th>कराचा दर</th>
                  <td>${finalData.bahandkam_prakar_tax_rate}</td>
                </tr>
                <tr>
                  <th>कर आकारणी</th>
                  <td>${finalData.final_tax}</td>
                </tr>
              </tbody>`;
    $(".preDetailsTableOne").html(_tr);
    $(".preDetailsTableTwo").html(_tr_2);
    $(".preDetailsTableThree").html(_tr_3);
  },
  returnFinalData: function (finalData) {
    return finalData;
  },
  getFormEightTax: function (id) {
    var data = {
      url: "/form-8/getFromEightTaxSampleData",
      method: "post",
      data: {
        id: formTaxHandler.userDetails[0].id,
      },
    };
    commonHandler.ajaxManager(data, function (type, data) {
      if (type == false) {
        alert("You Have An Error, PLease check Console");
        console.log(data);
        return false;
      }
      if (data.call == 1) {
        formTaxHandler.printFormEightSampleTax(data.data, data.data1);
      }
    });
  },
  printFormEightSampleTax: function (data, data1) {
    console.log(data1, "000");
    if (data.length == 0) {
      $(".taxSampleCol").addClass("d-none");
      return false;
    }
    $(".taxSampleCol").removeClass("d-none");
    $(".taxSampleTbody").html("");
    var _tr = "";

    $.each(data, function (index, value) {
      console.log(value);
      _tr += `
                <tr>
                  <td>${value.fet_prop_desc_text}</td>
                  <td>${value.fet_bahandkam_prakar_text}</td>
                  <td>${value.fet_prop_space_text}</td>
                  <td>${value.fet_year_two}</td>
                  <td>${value.fet_year_count}</td>
                  <td>${value.fet_height}</td>
                  <td>${value.fet_width}</td>
                  <td>${value.fet_sq_area}</td>
                  <td>${value.fet_sq_meter_area}</td>
                  <td>${value.fet_prop_space_land_rate}</td>
                  <td>${value.fet_bahandkam_prakar_ready_nater_rate}</td>
                  <td>${value.fet_ghasara_value}</td>
                  <td>${value.fet_prop_desc_rate}</td>
                  <td>${value.fet_final_imarati_bhandvali_mullya}</td>
                  <td>${value.fet_bahandkam_prakar_tax_rate}</td>
                  <td>${value.fet_final_tax}</td>
                  <td>
                    <span class="fa fa-edit d-none text-success ml-2 mr-2 hand"></span>
                    <span class="fa fa-trash text-danger ml-2 mr-2 hand removeTaxDetails" data-id="${value.id}"></span>
                  </td>
                </tr>
              `;
    });

    $(".taxSampleTbody").html(_tr);

    $.each(data1, function (index, calc) {
      console.log(calc, "calc-----");
      $("#textDetails").html("");
      var newTotalArea = Number($("#newTotalArea").val());

      if (newTotalArea < Number(calc.total_area.toFixed(2))) {
        $("#textDetails").html(
          `जुने चौ. फूट ${newTotalArea} आहे  आणि सदर चौ फूट ${calc.total_area.toFixed(2)} असून त्यात ${+calc.total_area.toFixed(2) - +newTotalArea} चौ फुटाची वाढ झाली आहे.`
        );
      }

      if (newTotalArea > Number(calc.total_area.toFixed(2))) {
        $("#textDetails").html(
          `जुने चौ. फूट ${newTotalArea} आहे  आणि सदर चौ फूट ${calc.total_area.toFixed(2)} असून त्यात ${+newTotalArea - +calc.total_area.toFixed(2)} चौ फुटाची कमी झाली आहे.`
        );
      }

      _tr = `
                <tr>
                  <td>${calc.total_building_work.toFixed(2)}</td>
                  <td>${calc.total_open_plot.toFixed(2)}</td>
                  <td>${calc.total_area.toFixed(2)}</td>
                  <td>${calc.building_tax}</td>
                  <td>${calc.open_area_tax}</td>
                  <td>${calc.other_tex}</td>
                  <td>${calc.dava_kar}</td>
                  <td>${calc.arogya_kar}</td>
                  <td>${calc.cleaning_tax}</td>
                  <td>${calc.education_tax}</td>
                  <td>${calc.tree_tax}</td>
                  <td>${calc.fireblegate_tax}</td>
                  <td>${calc.total_tax}</td>
                </tr>
              `;
      $(".totalTaxSampleTbody").html(_tr);
    });
  },
};
