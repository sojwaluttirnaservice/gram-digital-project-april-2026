$(document).ready(() => {
	console.log('bleaching avahal js loaded')

	$('#month-year').datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: 'mm/yy',
		onClose: function (dateText, inst) {
			function isLeapYear(year) {
				return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
			}

			var selectedMonthYear = $('#month-year').val()
			var parts = selectedMonthYear.split('/')
			var month = parseInt(parts[0])
			var year = parseInt(parts[1])

			var startDate = '01/' + selectedMonthYear
			var endDate

			if (month === 2) {
				endDate = (isLeapYear(year) ? '29' : '28') + '/02/' + year
			} else if ([4, 6, 9, 11].includes(month)) {
				endDate = '30/' + selectedMonthYear
			} else {
				endDate = '31/' + selectedMonthYear
			}

			$('#date_from').val(startDate)
			$('#date_to').val(endDate)
		},
		beforeShow: function (input, inst) {
			$(inst.dpDiv).addClass('month-year-only')
		},
	})

	// Remove the calendar and just show month/year picker
	$.datepicker._defaults.onAfterUpdate = function (inst) {
		if (inst.dpDiv.hasClass('month-year-only')) {
			$('.ui-datepicker-calendar').hide()
			$('.ui-datepicker-close')
				.unbind('click')
				.bind('click', function () {
					$.datepicker._hideDatepicker()
				})
		}
	}

	let el = {
		monthDropdown: $('#monthDropdown'),
		selectAvahalYear: $('#selectAvahalYear'),
		bleachingAvahalYear: $('#bleachingAvahalYear'),
		newBleachingAvahalButton: $('#newBleachingAvahalButton'),
		closeBleachingAvahalModal: $('.closeBleachingAvahalModal'),
		addNewBleachingAvahal: $('#addNewBleachingAvahal'),

		// form
		bleachingAvahalForm: $('#bleachingAvahalForm'),
		saveBleachingAvahalBtn: $('#saveBleachingAvahalBtn'),
		updateBleachingAvahalBtn: $('#updateBleachingAvahalBtn'),
	}

	function showBleachingModal() {
		$('#newBleachingAvahalModal').modal('show')
	}

	function hideBleachingModal() {
		$('#newBleachingAvahalModal').modal('hide')
	}

	// SETTING UP GP NAME AND VILLAGE NAME ON BOTH PLACES
	$('.gp-name1').on('input', function () {
		$('.gp-name2').val($(this).val())
	})

	$('.village-name1').on('input', function () {
		$('.village-name2').val($(this).val())
	})

	el.newBleachingAvahalButton.click(function () {
		showBleachingModal()
	})

	el.closeBleachingAvahalModal.click(function () {
		hideBleachingModal()
	})

	// ADD NEW BLEACHING AVAHAL
	el.addNewBleachingAvahal.click(function () {
		console.log('clicked')

		if (el.monthDropdown.val() === '-1') {
			alertjs.warning({
				t: 'कृपया महिना निवडा',
			})
			return false
		}

		if (el.bleachingAvahalYear.val() === '') {
			alertjs.warning({
				t: 'कृपया वर्ष निवडा',
			})
			return false
		}

		let data = {
			month: el.monthDropdown.val(),
			year: el.bleachingAvahalYear.val(),
		}

		checkAlreadyFilled(data.month, data.year)
	})

	function checkAlreadyFilled(month, year) {
		$.ajax({
			url: `/bleaching-avahal/check-already-filled?month=${month}&year=${year}`,
			method: 'GET',
			success: function (result) {
				console.log(result)
				if (result.call === 1) {
					alertjs.warning({
						t: 'निवडलेल्या महिना आणि वर्षाचा ब्लिचिंग अहवाल आधीच भरला आहे.',
						m: 'नवीन भारयाचा असल्यास कृपया आधीचा डिलीट करा.',
					})
					return false
				}
				if (result.call === 2) {
					window.open(
						`/bleaching-avahal/new-bleaching-avahal?month=${month}&year=${year}`
					)
				}
			},
			error: function (err) {
				console.log(err)
			},
		})
	}

	$('.is-number').on('input', function (e) {
		const val = $(this).val()
		// Regular expression to match valid integers and floating-point numbers
		const validNumber = /^-?\d*\.?\d*$/
		// Test if the value matches the regular expression
		if (validNumber.test(val)) {
			$(this).val(val)
		} else {
			$(this).val('')
		}
	})

	$('#bleachingAvahalForm').validate({
		rules: {
			month_year: { required: true },
			date_from: { required: true },
			date_to: { required: true },
			gp_name: { required: true },
			village_name: { required: true },
			total_public_well_count: { required: true },
			cleaned_well_count: { required: true },
			well_cleaning_day: { required: true },
			well_cleaner_name: { required: true },
			hudda: { required: true },
			well_cleaning_shera: { required: true },

			gp_name2: { required: true },
			village_name2: { required: true },
			month_start_quantity: { required: true },
			month_purchased_quantity: { required: true },
			current_month_used_quantity: { required: true },
			month_last_remaining_quantity: { required: true },
			bleaching_storage_shera: { required: true },
		},
		messages: {
			month_year: 'महिना व वर्ष निवडा',
			date_from: 'सुरवातीचा दिनांक निवडा',
			date_to: 'अखेरचा दिनांक निवडा',
			gp_name: 'ग्रामपंचायत नाव लिहा',
			village_name: 'गावाचे नाव लिहा',
			total_public_well_count: 'गावातील एकून सार्वजनिक विहिरींची संख्या लिहा',
			cleaned_well_count: 'निर्जंतुक केलेल्या विहिरींची संख्या लिहा',
			well_cleaning_day: 'विहिरी निर्जंतुक करण्याचा दिवस लिहा',
			well_cleaner_name: 'निर्जंतुक करणाराचे नाव लिहा',
			hudda: 'हुद्द लिहा',
			well_cleaning_shera: 'शेरा लिहा',
			month_start_quantity: 'महिन्याचा सुरुवातीस साठ लिहा (कि.ग्राम)',
			month_purchased_quantity: 'महिन्यात विकत घेतेलेला साठ लिहा (कि.ग्राम)',
			current_month_used_quantity:
				'चालू महिन्यात खर्च झालेला साठ लिहा (कि.ग्राम)',
			month_last_remaining_quantity: 'महिना अखेर शिल्लक साठ लिहा (कि.ग्राम)',
			bleaching_storage_shera: 'शेरा लिहा',
		},
	})

	function getYYYYMMDDFormat(_date) {
		if (!_date || !_date.trim()) return ''
		return _date.split('/').reverse().join('-')
	}

	//SAVE
	el.saveBleachingAvahalBtn.click(async function (e) {
		e.preventDefault()

		let formValid = el.bleachingAvahalForm.valid()
		// console.log('submitted', formValid);
		if (!formValid) {
			let firstInvalidField = $('.error:visible').first()

			// Get the field's label or name to show in the alert
			let fieldLabel = firstInvalidField.attr('name')
			let validationMessage = firstInvalidField.siblings('label.error').text()

			alertjs.warning({
				t: `${validationMessage}`,
			})
			// Focus on the first invalid field
			// firstInvalidField.focus()
			return false
		}

		const sendData = new FormData(
			document.getElementById('bleachingAvahalForm')
		)

		sendData.set('date_from', getYYYYMMDDFormat(sendData.get('date_from')))
		sendData.set('date_to', getYYYYMMDDFormat(sendData.get('date_to')))

		const [_month, _year] = $('#month-year').val().split('/')
		sendData.set('month', _month)
		sendData.set('year', _year)
		for (const [key, val] of sendData) {
			console.log(key, val)
		}

		try {
			const _url = '/bleaching-avahal/post-bleaching-avahal'

			const _res = await fetch(_url, {
				method: 'POST',
				body: sendData,
			})

			const { call } = await _res.json()

			if (call == 1) {
				alertjs.success(
					{
						t: 'ब्लिचिंग अहवाल यासास्वी रित्या भरला गेला आहे.',
					},
					function () {
						window.close()
					}
				)
			} else if (call == 3) {
				alertjs.warning(
					{
						t: ' ह्या महिन्याचा ब्लिचिंग अहवाल आधीच भरलेला आहे',
					},
					function () {
						window.close()
					}
				)
			}
		} catch (err) {
			console.log(`Error while saving the bleaching ahaval: ${err}`)
			alertjs.warning(
				{
					t: 'Error',
				},
				function () {
					window.close()
				}
			)
		}
	})

	// GET BLEACHING AVAHAL DATA AS PER SELECTED YEAR

	let selectedYear
	if (localStorage.getItem('selectedYear') === null) {
		selectedYear = ''
		$('#selectAvahalYear').val()
	} else {
		selectedYear = localStorage.getItem('selectedYear')
		el.selectAvahalYear.val(selectedYear)
	}

	el.selectAvahalYear.change(function () {
		selectedYear = $(this).val()
		localStorage.setItem('selectedYear', selectedYear)
		getAvahalData(selectedYear)
	})

	if ($('#selectAvahalYear').val() !== -1) {
		getAvahalData(selectedYear)
	}

	function getAvahalData(selectedYear) {
		// CHECK SELECTED EMPTY
		if (selectedYear === '-1') {
			$('#bleachingList').html('')
			$('.avahal-list-table').addClass('d-none')
			return false
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
			{ monthName: 'डिसेंबर', monthNumber: '१2' },
		]

		// GET VASULI DATA
		$.ajax({
			url: `/bleaching-avahal/list?year=${selectedYear}`,
			method: 'GET',
			success: function (result) {
				console.log(result)
				$('#bleachingList').html('')

				let html = result.yearWiseList
					.sort((a, b) => a.month - b.month)
					.map((el) => {
						const index = Number(el.month)
						const { monthName, monthNumber } = monthsMap[index - 1]
						return ` 
                    <tr> 
                        <td class='font-weight-bold'> ${monthName} (${monthNumber})  </td>
                        <td> <button type='button' class='btn btn-success print-bleaching-avahal-gramsevak' data-month=${el.month} data-year=${el.year}> <i class='fa fa-print'> </i> </button> </td>
                        <td> <button type='button' class='btn btn-info edit-bleaching-avahal-gramsevak' data-month=${el.month} data-year=${el.year} data-id=${el.id}> <i class='fa fa-edit'> </i> </button> </td>
                        <td class='d-none'> <button type='button' class='btn btn-danger delete-bleaching-avahal-gramsevak' data-month=${el.month} data-year=${el.year}> <i class='fa fa-trash'> </i> </button> </td>
                    </tr>
                    `
					})
				$('table').removeClass('d-none')
				$('#bleachingList').html(html)
			},
			error: function (error) {
				console.log(error)
			},
		})
	}

	function doCalc() {
		let previous = $(`[name='month_start_quantity']`).val() || 0
		let purchased = $(`[name="month_purchased_quantity"]`).val() || 0
		let used = $(`[name="current_month_used_quantity"]`).val() || 0
		$(`[name="month_last_remaining_quantity"]`).val((previous + purchased - used).toFixed(2))
	}

	
	$(document).on('input', '[name="month_purchased_quantity"]', function (e) {
		e.preventDefault()
		doCalc()
	})

	$(document).on('input', '[name="current_month_used_quantity"]', function (e) {
		e.preventDefault()
		doCalc()
	})

	// DELETE BLEACHING AVAHAL
	$(document).on('click', '.delete-bleaching-avahal-gramsevak', function () {
		alertjs.delete((status) => {
			if (status === true) {
				deleteBleachingAvahal($(this))
			}
		})
	})

	function deleteBleachingAvahal(data) {
		let month = data.attr('data-month')
		let year = data.attr('data-year')

		$.ajax({
			url: `/bleaching-avahal/delete-avahal?month=${month}&year=${year}`,
			method: 'POST',
			success: function (result) {
				console.log(result)
				if (result.call === 1) {
					alertjs.success(
						{
							t: 'यशस्वी',
							m: 'ब्लिचिंग अहवाल डिलीट केला.',
						},
						function () {
							window.location.reload()
						}
					)
				}
			},
			error: function (err) {
				console.log(err)
			},
		})
	}

	// PRINT BLEACHING AVAHAL
	$(document).on('click', '.print-bleaching-avahal-gramsevak', function () {
		let data = {
			month: $(this).attr('data-month'),
			year: $(this).attr('data-year'),
		}

		window.open(`/bleaching-avahal/print?month=${data.month}&year=${data.year}`)
	})

	//EDIT and UPDATE

	$(document).on('click', '.edit-bleaching-avahal-gramsevak', function () {
		let data = {
			month: $(this).attr('data-month'),
			year: $(this).attr('data-year'),
			id: $(this).attr('data-id'),
		}

		console.log(data)
		window.open(
			`/bleaching-avahal/edit-bleaching-avahal-view?month=${data.month}&year=${data.year}&id=${data.id}`
		)
	})

	//UPDATE
	el.updateBleachingAvahalBtn.click(async function (e) {
		e.preventDefault()

		const month = $(this).attr('data-month')
		const year = $(this).attr('data-year')
		const id = $(this).attr('data-id')

		let formValid = el.bleachingAvahalForm.valid()
		// console.log('submitted', formValid);
		if (!formValid) {
			let firstInvalidField = $('.error:visible').first()

			// Get the field's label or name to show in the alert
			let fieldLabel = firstInvalidField.attr('name')
			let validationMessage = firstInvalidField.siblings('label.error').text()

			alertjs.warning({
				t: `${validationMessage}`,
			})
			// Focus on the first invalid field
			// firstInvalidField.focus()
			return false
		}

		const sendData = new FormData(
			document.getElementById('bleachingAvahalForm')
		)

		sendData.set('date_from', getYYYYMMDDFormat(sendData.get('date_from')))
		sendData.set('date_to', getYYYYMMDDFormat(sendData.get('date_to')))

		const [_month, _year] = $('#month-year').val().split('/')
		sendData.set('month', _month)
		sendData.set('year', _year)
		for (const [key, val] of sendData) {
			console.log(key, val)
		}

		try {
			const _url = `/bleaching-avahal/update-bleaching-avahal?month=${month}&year=${year}&id=${id}`

			const _res = await fetch(_url, {
				method: 'POST',
				body: sendData,
			})

			const { call } = await _res.json()
			if (call === 1) {
				alertjs.success(
					{
						t: 'ब्लिचिंग अहवाल यशस्वीरीत्या रित्या अपडेट झाला आहे.',
					},
					function () {
						window.location.reload()
					}
				)
			} else if (call == 3) {
				alertjs.warning(
					{
						t: ' ह्या महिन्याचा ब्लिचिंग अहवाल आधीच भरलेला आहे',
					},
					function () {
						// window.location.reload();
					}
				)
			} else {
				alertjs.warning(
					{
						t: 'ब्लिचिंग अहवाल अपडेट झाला नाही.',
					},
					function () {
						// window.location.reload();
					}
				)
			}
		} catch (err) {
			console.log(`Error while updating the bleaching ahaval: ${err}`)
			alertjs.warning(
				{
					t: 'ब्लिचिंग अहवाल अपडेट झाला नाही.',
				},
				function () {}
			)
		}
	})
})
