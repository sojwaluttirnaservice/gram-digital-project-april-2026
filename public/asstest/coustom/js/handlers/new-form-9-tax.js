$(document).ready(function () {
	$(document).on('click', '#propertySpecification', function (e) { })
	$(document).on('click', '.isNaN', function (e) {
		$(this).select()
	})

	$('#lastYearTaxFineCheck').on('change', function () {
		if ($(this).prop('checked')) {
			$('#lastYearTaxFine').val('0')
		} else {
			$('#lastYearTaxFine').val($('#lastYearTaxFineClone').val())
		}
		form9TaxHandler.firstCalculationAllInOne(1)
	})


	$(document).on('keyup change', '.isNaN', function (e) {
		var _value = Math.round(Number($(this).val()))
		var case_choice = Number($(this).attr('data-i'))
		var currentId = $(this).prop('id')
		if (isNaN(_value) || _value == '') {
			$('#' + currentId).val('0')
		}

		form9TaxHandler.firstCalculationAllInOne(case_choice)
	})


	// 15_may_2025

	// Writing this event to handle to reset the मागील कर for all 
	$(document).on('change', '#resetTaxToZeroSamanyaCheckbox', function (e) {
		const isCheckedToHitZero = $(this).is(':checked');
		const taxesToIncludeInThisReset =
			['lastBuildingTax', 'lastDivaTax', 'lastArogyaTax',
				'lastCleaningTax', 'lastFireblegateTax', 'lastEducationTax',
				'lastTreeTax', 'lastYearTaxFine']

		taxesToIncludeInThisReset.forEach(inputIdName => {
			const cloneElement = $(`#${inputIdName}Clone`)
			let cloneVal = cloneElement.val();
			if (cloneElement) {
				$(`#${inputIdName}`).val(isCheckedToHitZero ? 0 : cloneVal)
			}
		})

		$('.isNaN').trigger('change');

	})


	// writing for water
	// 15_may_2025

	$(document).on('change', '#resetTaxToZeroWaterCheckbox', function (e) {
		const isCheckedToHitZero = $(this).is(':checked');
		const taxesToIncludeInThisReset =
			['lastSpacialWaterTax', 'lastGenealWaterTax']

		taxesToIncludeInThisReset.forEach(inputIdName => {
			const cloneElement = $(`#${inputIdName}Clone`)
			let cloneVal = cloneElement.val();
			if (cloneElement) {
				$(`#${inputIdName}`).val(isCheckedToHitZero ? 0 : cloneVal)
			}
		})

		$('.isNaN').trigger('change');

	})



	// saving namuna 9
	$(document).on('click', '#saveFormData', function (e) {
		e.preventDefault()
		if ($('#newForm9').valid()) {

			// Adding the data in the details form
			var detailsArray = $('#newForm9').serializeArray()

			details = {}
			$.each(detailsArray, function (index, value) {
				details[value.name] = value.value
			})
			details['user_id'] = form9TaxHandler.id

			// BELOW IS THE PAYLOAD
			var data = {
				url: '/form-9/addNewFormNineEntry',
				method: 'post',
				data: details,
			}

			// API CALLING
			commonHandler.ajaxManager(data, function (type, data) {

				// 
				if (type == false) {
					alert('You Have An Error, PLease check Console')
					console.log(data)
					return false
				}

				// THIS ONE BEING IS CALLED AFTER THE SUCCESSFULL SAVE
				if (data.call == 1) {
					alertjs.success(
						{
							t: 'नमुना ९ कर माहिती',
							m: 'यशस्वी  रित्या  जतन  केली आहे.',
						},
						// And after we click on the okay button of sweetalert, then move to the next
						function () {
							//-DONT DELETE THIS COMMENTED PART
							// form9TaxHandler.getNextUser()
							form9TaxHandler.getNextUserByMalmattaNumber()
						}
					)
				} else {
					if (data.call == 2) {
						alertjs.success(
							{
								t: 'नमुना ९ कर माहिती',
								m: 'यशस्वी  रित्या  बद्दल्या गेली आहे.',
							},
							function () {
								//-DONT DELETE THIS COMMENTED PART
								// form9TaxHandler.getNextUser()
								form9TaxHandler.getNextUserByMalmattaNumber()
							}
						)
					} else {
						alertjs.warning(
							{
								t: 'नमुना ९ कर',
								m: 'सदर कर पहिलाच प्रविष्ट केला आहे.',
							},
							function () { }
						)
					}
				}
			})
		}
	})
	// form validator
	$('#newForm9').validate({
		rules: {
			lastBuildingTax: {
				required: true,
			},
			currentBuildingTax: {
				required: true,
			},
			totalBuildingTax: {
				required: true,
				minStrict: -1,
				number: true,
			},
			lastDivaTax: {
				required: true,
			},
			currentDivaTax: {
				required: true,
			},
			totalDivaTax: {
				required: true,
				minStrict: -1,
				// number: true,
			},
			lastArogyaTax: {
				required: true,
			},
			currentArogyaTax: {
				required: true,
			},
			totalArogyaTax: {
				required: true,
				minStrict: -1,
				number: true,
			},
			lastTaxFine: {
				required: true,
			},
			lastTaxRelief: {
				required: true,
			},
			totalTax: {
				required: true,
				minStrict: -1,
				number: true,
			},
			totalSampurnaTax: {
				required: true,
				minStrict: -1,
				number: true,
			},
			lastSpacialWaterTax: {
				required: true,
			},
			currentSpacialWaterTax: {
				required: true,
			},
			totalSpacialWaterTax: {
				required: true,
				minStrict: -1,
				number: true,
			},
			lastGenealWaterTax: {
				required: true,
			},
			currentGenealWaterTax: {
				required: true,
			},
			totalGenealWaterTax: {
				required: true,
				minStrict: -1,
				number: true,
			},
			totalWaterTax: {
				required: true,
				minStrict: -1,
				number: true,
			},
		},
	})


	// Wrting this code for form_9.pug (original) and for temporaty copy (form_9_copy,pug) 
	const handleUpdateFormEightUser = async (e) => {
		e.preventDefault()

		try {
			const res = await fetch('/form-8/update', {
				method: 'PUT',
				body: new FormData(document.getElementById('namuna-8-user-form'))
			})

			let { success, message } = await res.json()

			if (success) {
				alertjs.success({
					t: 'SUCCESS',
					m: message
				}, () => {
					location.reload()
				})
			} else {
				alertjs.warning({
					t: 'WARNING',
					m: message
				})
			}
		} catch (err) {
			console.error('Error:', err);
			alertjs.warning({
				t: 'WARNING',
				m: err?.message || "काहीतरी चुकले"
			})
		}

	}
	$(document).on('click', '#update-form-8-user-btn', handleUpdateFormEightUser)
})




// handler
var form9TaxHandler = {


	id: 0,
	userDetails: [],
	totalTaxData: [],


	addWaterTax: function () {
		var value =
			Number($('#totalSpacialWaterTax').val()) +
			Number($('#totalGenealWaterTax').val())
		$('#totalWaterTax').val(Math.round(value))
	},

	addGeneralTax: function () {
		var value =
			Number($('#totalBuildingTax').val()) +
			Number($('#totalDivaTax').val()) +
			Number($('#totalArogyaTax').val()) +
			Number($('#totalTax').val()) +
			Number($('#totalEducationTax').val()) +
			Number($('#totalFireblegateTax').val()) +
			Number($('#totalCleaningTax').val()) +
			Number($('#totalTreeTax').val())
		console.log($('#totalTax').val())
		$('#totalSampurnaTax').val(Math.round(value))
	},


	addLastTax: function () {
		var value = Number($('#lastBuildingTax').val())
		$('#lastTaxFine').val(Math.round(value * (5 / 100)))

		var value =
			Number($('#lastTaxFine').val()) +
			Number($('#lastTaxRelief').val()) +
			Number($('#lastYearTaxFine').val())
		$('#totalTax').val(Math.round(value))
	},


	firstCalculationAllInOne: function (case_choice) {

		let totalLastSamanyaTax = 0;
		let totalCurrentSamanyaTax = 0;


		let totalLastWaterTax = 0, totalCurrentWaterTax = 0;




		// building
		let lastBuildingTax = Number($('#lastBuildingTax').val())
		let currentBuildingTax = Number($('#currentBuildingTax').val())

		totalLastSamanyaTax += lastBuildingTax
		totalCurrentSamanyaTax += currentBuildingTax


		// diva

		let lastDivaTax = Number($('#lastDivaTax').val())
		let currentDivaTax = Number($('#currentDivaTax').val())

		totalLastSamanyaTax += lastDivaTax
		totalCurrentSamanyaTax += currentDivaTax



		// arogya 


		let lastArogyaTax = Number($('#lastArogyaTax').val())
		let currentArogyaTax = Number($('#currentArogyaTax').val())

		totalLastSamanyaTax += lastArogyaTax
		totalCurrentSamanyaTax += currentArogyaTax




		// Education 

		let lastEducationTax = Number($('#lastEducationTax').val())
		let currentEducationTax = Number($('#currentEducationTax').val())

		totalLastSamanyaTax += lastEducationTax
		totalCurrentSamanyaTax += currentEducationTax



		// fire tax


		let lastFireblegateTax = Number($('#lastFireblegateTax').val())
		let currentFireblegateTax = Number($('#currentFireblegateTax').val())

		totalLastSamanyaTax += lastFireblegateTax
		totalCurrentSamanyaTax += currentFireblegateTax



		// cleaning 

		let lastCleaningTax = Number($('#lastCleaningTax').val())
		let currentCleaningTax = Number($('#currentCleaningTax').val())

		totalLastSamanyaTax += lastCleaningTax
		totalCurrentSamanyaTax += currentCleaningTax


		// tree tax


		let lastTreeTax = Number($('#lastTreeTax').val())
		let currentTreeTax = Number($('#currentTreeTax').val())

		totalLastSamanyaTax += lastTreeTax
		totalCurrentSamanyaTax += currentTreeTax



		// मागील दंड कर

		totalLastSamanyaTax += Number($('#lastTaxFine').val())

		// जुना उर्वरित कर
		totalLastSamanyaTax += Number($('#lastYearTaxFine').val())



		$('#totalLastSamanyaTax').val(totalLastSamanyaTax)
		$('#totalCurrentSamanyaTax').val(totalCurrentSamanyaTax)


		// --------------------------------------------------------------------------

		/// water -- spacial

		let lastSpacialWaterTax = Number($('#lastSpacialWaterTax').val())
		let currentSpacialWaterTax = Number($('#currentSpacialWaterTax').val())

		totalLastWaterTax += lastSpacialWaterTax
		totalCurrentWaterTax += currentSpacialWaterTax


		// water general tax


		let lastGenealWaterTax = Number($('#lastGenealWaterTax').val())
		let currentGenealWaterTax = Number($('#currentGenealWaterTax').val())

		totalLastWaterTax += lastGenealWaterTax
		totalCurrentWaterTax += currentGenealWaterTax



		$('#totalLastWaterTax').val(totalLastWaterTax)
		$('#totalCurrentWaterTax').val(totalCurrentWaterTax)

		switch (+case_choice) {
			case 1:
				let totalBuildingTax = lastBuildingTax + currentBuildingTax

				$('#totalBuildingTax').val(Math.round(totalBuildingTax))
				break
			case 2:


				let totalDivaTax = lastDivaTax + currentDivaTax

				$('#totalDivaTax').val(Math.round(totalDivaTax))
				break
			case 3:

				let totalArogyaTax = lastArogyaTax + currentArogyaTax

				$('#totalArogyaTax').val(Math.round(totalArogyaTax))
				break
			case 4:
				// var value =
				//   Number($("#lastTaxFine").val()) + Number($("#lastTaxRelief").val());
				// $("#totalTax").val(value.toFixed(2));
				break



			// WATEr case special water tax
			case 5:



				let totalSpacialWaterTax = lastSpacialWaterTax + currentSpacialWaterTax

				$('#totalSpacialWaterTax').val(Math.round(totalSpacialWaterTax))
				break


			// WATEr case genearl water tax

			case 6:


				let totalGenealWaterTax = lastGenealWaterTax + currentGenealWaterTax

				$('#totalGenealWaterTax').val(Math.round(totalGenealWaterTax))
				break



			// samanya
			case 7:

				let totalEducationTax = lastEducationTax + currentEducationTax
				$('#totalEducationTax').val(Math.round(totalEducationTax))
				break
			case 8:



				let totalFireblegateTax = lastFireblegateTax + currentFireblegateTax

				$('#totalFireblegateTax').val(Math.round(totalFireblegateTax))
				break


			case 9:


				let totalCleaningTax = lastCleaningTax + currentCleaningTax

				$('#totalCleaningTax').val(Math.round(totalCleaningTax))

				break
			case 10:

				let totalTreeTax = lastTreeTax + currentTreeTax

				$('#totalTreeTax').val(Math.round(totalTreeTax))
				break
			default:
				alert('invalid')
				break
		}


		// console.log(' total last samanya = ' + totalLastSamanyaTax +
		// 	', totalCurrentSamanya' + totalCurrentSamanyaTax + "== " + (totalLastSamanyaTax + totalCurrentSamanyaTax))

		form9TaxHandler.addLastTax()
		form9TaxHandler.addWaterTax()
		form9TaxHandler.addGeneralTax()
	},


	getNextUserByMalmattaNumber: async function () {



		try {


			let payload = JSON.stringify({ id: form9TaxHandler.id, malmattaNumber: form9TaxHandler.malmattaNumber })

			let res = await fetch('/form-8/checkNextUserByMalmatta', {
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json'
				}
			})

			let { success, message, data } = await res.json()

			if (success) {
				window.location.assign(`/form-9/${data?.nextUser?.id}`)
			} else {
				alertjs.warning({
					t: 'WARNING',
					m: message
				})
			}
		} catch (err) {
			console.error('Error:', err);
			alertjs.warning({
				t: 'WARNING',
				m: 'काहीतरी चुकले.'
			})
		}

	},

	getNextUser: function () {
		var data = {
			url: '/form-8/checkNextUser',
			method: 'post',
			data: {
				id: form9TaxHandler.id,
			},
		}
		commonHandler.ajaxManager(data, function (type, data) {
			if (type == false) {
				alert('You Have An Error, PLease check Console')
				console.log(data)
				return false
			}
			if (data.call == 1) {
				window.location.assign('/form-9/' + data.data)
			} else {
				alertjs.warning(
					{
						t: 'नमुना ९ कर',
						m: 'वरील हि माहिती शिवाटची होती.',
					},
					function () {
						window.location.assign('/')
					}
				)
			}
		})
	},
}
