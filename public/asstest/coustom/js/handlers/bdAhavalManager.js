$(function () {
	// SETTING UP DATE PICKERS OF JQUERY UI
	$('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' })

	let el = {
		monthDropdown: $('#monthDropdown'),
		selectAvahalYear: $('#selectAvahalYear'),
		BDAvahalYear: $('#BDAvahalYear'),
		newBDAvahalButton: $('#newBDAvahalButton'),
		closeBDAvahalModal: $('.closeBDAvahalModal'),
		addNewBDAvahal: $('#addNewBDAvahal'),

		// form
		BDAvahalForm: $('#BDAvahalForm'),
		saveBDAvahalBtn: $('#saveBDAvahalBtn'),
	}

	function showBDModal() {
		$('#newBDAvahalModal').modal('show')
	}

	function hideBDModal() {
		$('#newBDAvahalModal').modal('hide')
	}

	// SETTING UP GP NAME AND VILLAGE NAME ON BOTH PLACES
	$('.gp-name1').keyup(function () {
		$('.gp-name2').val($(this).val())
	})

	$('.village-name1').keyup(function () {
		$('.village-name2').val($(this).val())
	})

	el.newBDAvahalButton.click(function () {
		showBDModal()
	})

	el.closeBDAvahalModal.click(function () {
		hideBDModal()
	})

	// ADD NEW BD AVAHAL
	el.addNewBDAvahal.click(function () {
		if (el.monthDropdown.val() === '-1') {
			alertjs.warning({
				t: 'कृपया महिना निवडा',
			})
			return false
		}

		if (el.BDAvahalYear.val() === '') {
			alertjs.warning({
				t: 'कृपया वर्ष निवडा',
			})
			return false
		}

		let data = {
			month: el.monthDropdown.val(),
			year: el.BDAvahalYear.val(),
		}

		checkAlreadyFilled(data.month, data.year)
	})

	function checkAlreadyFilled(month, year) {
		$.ajax({
			url: `/bd-avahal/check-already-filled?month=${month}&year=${year}`,
			method: 'GET',
			success: function (result) {
				console.log(result)
				if (result.call === 1) {
					alertjs.warning({
						t: 'निवडलेल्या महिना आणि वर्षाचा जन्म मृत्यू अहवाल आधीच भरला आहे.',
						m: 'नवीन भरयाचा असल्यास कृपया आधीचा डिलीट करा.',
					})
					return false
				}
				if (result.call === 2) {
					window.open(`/bd-avahal/new-bd-avahal?month=${month}&year=${year}`)
				}
			},
			error: function (err) {
				console.log(err)
			},
		})
	}

	$('#BDAvahalForm').validate({
		rules: {
			month: { required: true },
			year: { required: true },
			district_name: { required: true },
			village_name: { required: true },
			registration_center_name: { required: true },
			census_code_number: { required: true },
			birth_live_birth_recorded_in_a_year_male: { required: true },
			birth_live_birth_recorded_in_a_year_female: { required: true },
			birth_live_birth_recorded_in_a_year_total: { required: true },
			birth_live_birth_recorded_after_a_year_male: { required: true },
			birth_live_birth_recorded_after_a_year_female: { required: true },
			birth_live_birth_recorded_after_a_year_total: { required: true },
			birth_live_birth_recorded_total_male: { required: true },
			birth_live_birth_recorded_total_female: { required: true },
			birth_live_birth_recorded_total_total: { required: true },
			death_recorded_in_a_year_male: { required: true },
			death_recorded_in_a_year_female: { required: true },
			death_recorded_in_a_year_other: { required: true },
			death_recorded_in_a_year_total: { required: true },
			death_recorded_after_a_year_male: { required: true },
			death_recorded_after_a_year_female: { required: true },
			death_recorded_after_a_year_other: { required: true },
			death_recorded_after_a_year_total: { required: true },
			death_recorded_total_male: { required: true },
			death_recorded_total_female: { required: true },
			death_recorded_total_other: { required: true },
			death_recorded_total_total: { required: true },
			infant_mortality_count_out_of_total_deaths_male: { required: true },
			infant_mortality_count_out_of_total_deaths_female: { required: true },
			infant_mortality_count_out_of_total_deaths_total: { required: true },
			mother_death_count: { required: true },
			fetal_death_count_male: { required: true },
			fetal_death_count_female: { required: true },
			fetal_death_count_total: { required: true },
			date: { required: true },
		},
	})

	// Handling automatic addition:
	$(document).on('keyup input', '.number-input', function (e) {
		if (isNaN($(this).val())) {
			$(this).val('')
			// return;
		}

		// नमुना क्रमांक - ११ : जन्माचा संकलित अहवाल

		commonHandler.setValue(
			'#birth_live_birth_recorded_in_a_year_total',
			+commonHandler.getValue('#birth_live_birth_recorded_in_a_year_male') +
				+commonHandler.getValue('#birth_live_birth_recorded_in_a_year_female')
		)

		commonHandler.setValue(
			'#birth_live_birth_recorded_after_a_year_total',
			+commonHandler.getValue('#birth_live_birth_recorded_after_a_year_male') +
				+commonHandler.getValue(
					'#birth_live_birth_recorded_after_a_year_female'
				)
		)
		commonHandler.setValue(
			'#birth_live_birth_recorded_total_male',
			+commonHandler.getValue('#birth_live_birth_recorded_in_a_year_male') +
				+commonHandler.getValue('#birth_live_birth_recorded_after_a_year_male')
		)
		commonHandler.setValue(
			'#birth_live_birth_recorded_total_female',
			+commonHandler.getValue('#birth_live_birth_recorded_in_a_year_female') +
				+commonHandler.getValue(
					'#birth_live_birth_recorded_after_a_year_female'
				)
		)

		commonHandler.setValue(
			'#birth_live_birth_recorded_total_total',
			+commonHandler.getValue('#birth_live_birth_recorded_in_a_year_total') +
				+commonHandler.getValue('#birth_live_birth_recorded_after_a_year_total')
		)

		// नमुना क्रमांक - १२ : मृत्यूचा संकलित अहवाल
		commonHandler.setValue(
			'#death_recorded_in_a_year_total',
			+commonHandler.getValue('#death_recorded_in_a_year_male') +
				+commonHandler.getValue('#death_recorded_in_a_year_female') +
				+commonHandler.getValue('#death_recorded_in_a_year_other')
		)
		commonHandler.setValue(
			'#death_recorded_after_a_year_total',
			+commonHandler.getValue('#death_recorded_after_a_year_male') +
				+commonHandler.getValue('#death_recorded_after_a_year_female') +
				+commonHandler.getValue('#death_recorded_after_a_year_other')
		)
		commonHandler.setValue(
			'#death_recorded_total_total',
			+commonHandler.getValue('#death_recorded_total_male') +
				+commonHandler.getValue('#death_recorded_total_female') +
				+commonHandler.getValue('#death_recorded_total_other')
		)
		commonHandler.setValue(
			'#infant_mortality_count_out_of_total_deaths_total',
			+commonHandler.getValue(
				'#infant_mortality_count_out_of_total_deaths_male'
			) +
				+commonHandler.getValue(
					'#infant_mortality_count_out_of_total_deaths_female'
				) +
				+commonHandler.getValue(
					'#infant_mortality_count_out_of_total_deaths_other'
				)
		)

		// नमुना क्रमांक - १३ : मृत जन्म (उपजत मृत्यू) चा संकलित अहवाल
		commonHandler.setValue(
			'#fetal_death_count_total',
			+commonHandler.getValue('#fetal_death_count_male') +
				+commonHandler.getValue('#fetal_death_count_female')
		)
	})

	const searchParams = () => {
		return new URLSearchParams(window.location.search)
	}

	$('#bd-avahal-month').val(searchParams().get('month'))
	$('#bd-avahal-year').val(searchParams().get('year'))

	el.saveBDAvahalBtn.click(function (e) {
		e.preventDefault()

		let formValid = el.BDAvahalForm.valid()
		if (!formValid) {
			alertjs.warning({
				t: 'संपूर्ण माहिती भरा',
			})
			return false
		}
		// prettier-ignore
		let dataArray = $('#BDAvahalForm').serializeArray();
		let sendData = new FormData()
		$.each(dataArray, function (_, value) {
			sendData.set(value.name, value.value)
			console.log(value.name, value.value)
		})

		sendData.set('month', searchParams().get('month'))
		sendData.set('year', searchParams().get('year'))

		let _date = sendData.get('date').split('/').reverse().join('-')
		let requiredFormat = _date
		sendData.set('date', requiredFormat)

		$.ajax({
			url: '/bd-avahal/post-bd-avahal',
			method: 'POST',
			data: sendData,
			processData: false, // Ensure processData is set to false when using FormData
			contentType: false,
			success: function (result) {
				// console.log(result);
				alertjs.success(
					{
						t: 'जन्म-मृत्यू अहवाल यशस्वी रित्या भरला गेला आहे.',
					},
					function () {
						window.close()
					}
				)
			},
			error: function (err) {
				console.log('My eroor bro')
				console.log(err)
			},
		})
	})

	// GET BD AVAHAL DATA AS PER SELECTED YEAR

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
			$('#karVasuliList').html('')
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

		$.ajax({
			url: `/bd-avahal/list?year=${selectedYear}`,
			method: 'GET',
			success: function (result) {
				console.log(result)
				$('#BDList').html('')

				let html = result.yearWiseList
					.sort((a, b) => a.month - b.month)
					.map((el) => {
						const index = Number(el.month)
						const { monthName, monthNumber } = monthsMap[index - 1]
						return ` 
                      <tr> 
                          <td class='font-weight-bold'> ${monthName} (${monthNumber}) </td>
                          <td> <button type='button' class='btn btn-success print-bd-avahal-gramsevak' data-month=${el.month} data-year=${el.year}> <i class='fa fa-2xs fa-print'> </i> </button> </td>
                          <td> <button type='button' class='btn btn-info edit-bd-avahal-gramsevak' data-month=${el.month} data-year=${el.year}> <i class='fa fa-2xs fa-edit'> </i> </button> </td>
                          <td> <button type='button' class='btn btn-danger delete-bd-avahal-gramsevak' data-month=${el.month} data-year=${el.year}> <i class='fa fa-2xs fa-trash'> </i> </button> </td>
                      </tr>
                      `
					})
				$('table').removeClass('d-none')
				$('#BDList').append(html)
			},
			error: function (error) {
				console.log(error)
			},
		})
	}

	//UPDATE BD AVAHAL

	//Step 1 -- open new page for particular bd avahal

	$(document).on('click', '.edit-bd-avahal-gramsevak', function (e) {
		e.preventDefault()
		let month = $(this).attr('data-month')
		let year = $(this).attr('data-year')

		window.open(
			`/bd-avahal/edit-bd-avahal-view?month=${month}&year=${year}&isEdit=true`
		)
	})

	$(document).on('click', '#updateBDAvahalBtn', async function (e) {
		e.preventDefault()
		let month = $(this).attr('data-month')
		let year = $(this).attr('data-year')
		let id = $(this).attr('data-bdAvahalId')

		let formValid = el.BDAvahalForm.valid()
		if (!formValid) {
			alertjs.warning({
				t: 'संपूर्ण माहिती भरा',
			})
			return false
		}

		let dataArray = $('#BDAvahalForm').serializeArray()
		let sendData = new FormData()
		$.each(dataArray, function (_, value) {
			sendData.set(value.name, value.value)
			console.log(value.name, value.value)
		})

		sendData.set('month', searchParams().get('month'))
		sendData.set('year', searchParams().get('year'))

		let _date = sendData.get('date').split('/').reverse().join('-')
		let requiredFormat = _date
		sendData.set('date', requiredFormat)
		// console.log('Yo my updated send  send data', sendData)

		const url = `/bd-avahal/update-bd-avahal?month=${month}&year=${year}&id=${id}&isUpdate=true`

		try {
			const _res = await fetch(url, {
				method: 'PUT',
				body: sendData,
			})

			const { call } = await _res.json()

			if (call == 1) {
				alertjs.success(
					{
						t: 'जन्म-मृत्यू अहवाल यशस्वी रित्या अद्ययावत झाली.',
					},
					function () {
						window.location.reload()
					}
				)
			}
		} catch (error) {
			console.log(error)

			alertjs.warning({
				t: 'जन्म-मृत्यू अहवाल यशस्वी रित्या अद्ययावत झाली नाही.',
			})
		}
	})

	// DELETE BD AVAHAL
	$(document).on('click', '.delete-bd-avahal-gramsevak', function () {
		alertjs.delete((status) => {
			if (status === true) {
				deleteBDAvahal($(this))
			}
		})
	})

	function deleteBDAvahal(data) {
		let month = data.attr('data-month')
		let year = data.attr('data-year')

		$.ajax({
			url: `/bd-avahal/delete-avahal?month=${month}&year=${year}`,
			method: 'DELETE',
			success: function (result) {
				console.log(result)
				if (result.call === 1) {
					alertjs.success(
						{
							t: 'यशस्वी',
							m: 'जन्म-मृत्यू अहवाल डिलीट केला.',
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

	// PRINT BD AVAHAL
	$(document).on('click', '.print-bd-avahal-gramsevak', function () {
		console.log('printing')

		let data = {
			month: $(this).attr('data-month'),
			year: $(this).attr('data-year'),
		}

		window.open(`/bd-avahal/print?month=${data.month}&year=${data.year}`)
	})
})
