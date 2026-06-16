$(document).ready(() => {

	// Populate year dropdowns dynamically
	const currentYear = new Date().getFullYear();

	// 1. Month-Year Dropdown: starting from 2017 to next 2 years (currentYear + 2)
	const startYear = 2017;
	const endYear = currentYear + 2;
	let yearOptions = '<option value="-1">--Select Year--</option>';
	for (let y = startYear; y <= endYear; y++) {
		yearOptions += `<option value="${y}">${y}</option>`;
	}
	$('#yearDropdown').html(yearOptions);

	// 2. Year-to-Year Dropdown: currentYear to nextYear (currentYear + 1) and previous 4 to 6 years (currentYear - 6)
	const startYearYearwise = currentYear - 6;
	const endYearYearwise = currentYear + 1;
	let yearwiseOptions = '<option value="-1">--Select Year--</option>';
	for (let y = startYearYearwise; y <= endYearYearwise; y++) {
		yearwiseOptions += `<option value="${y}">${y}</option>`;
	}
	$('#fromYearDropdownYearwise').html(yearwiseOptions);
	$('#toYearDropdownYearwise').html(yearwiseOptions);

	$('#newDharakAadhar').mask('0000-0000-0000')
	$('#newPherfarDate').datepicker({ dateFormat: 'dd/mm/yy' })

	$('#ferfarForm').validate({
		rules: {
			newMobileNo: {
				required: true,
			},
			newOldDharak: {
				required: true,
			},
			newNewDharak: {
				required: true,
			},
			newDharakAadhar: {
				required: true,
			},
			newPherfarDate: {
				required: true,
			},
			newPherfarTharav: {
				required: true,
			},
			newPherfarDocument: {
				required: true,
			},
			refistry_no: {
				required: true,
			},
		},
	})

	$('#addFerfar').on('click', function (e) {
		e.preventDefault()
		let formValid = $('#ferfarForm').valid()
		if (formValid) {
			let formInfo = $('#ferfarForm').serializeArray()
			let formData = new FormData()
			$.each(formInfo, function (index, value) {
				formData.append(value.name, value.value)
			})
			$.ajax({
				url: '/form-8/update-ferfar',
				method: 'POST',
				processData: false,
				contentType: false,
				data: formData,
				success: function (result) {
					console.log(result)
					if (result.call == 1) {
						alertjs.success(
							{
								t: 'Success',
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
	})

	//Edit ferfar
	const handleGetUserDetailsToEdit = async (malmattaNumber) => {
		// console.log(malmattaNumber)

		const response = await fetch('/form-8/fetch-data-to-edit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				malmattaNumber: malmattaNumber,
			}),
		})

		const data = await response.json()

		// console.log(data, 'fetching to edit')

		if (data.call === 1) {
			const details = data.details[0]

			console.log('data to edit = ', details)

			$('#ferfarFormCard').removeClass('d-none')
			$('#alertDiv').addClass('d-none')
			$('#newMalmattaNo').val(details.feu_malmattaNo)
			$('#userId').val(details.id)

			// if there are no ferfar then set newOldDharak to exsisting malmatta owner name
			$('#newOldDharak').val(
				details.feu_newOldDharak === ''
					? details.feu_ownerName
					: details.feu_newOldDharak
			)
			$('#newNewDharak').val(
				details.feu_newNewDharak.trim() === '' ? '-' : details.feu_newNewDharak
			)

			$('#newMobileNo').val(
				details.feu_mobileNo === '' ? '-' : details.feu_mobileNo
			)

			$('#newDharakAadhar').val(
				details.feu_aadharNo === '' ? '-' : details.feu_aadharNo
			)

			$('#newPherfarDate').val(
				details.ferfar_date === '' ? '-' : details.ferfar_date
			)
			$('#newPherfarTharav').val(
				details.tharav_no === '' ? '-' : details.tharav_no
			)
			$('#newPherfarDocument').val(
				details.dastavej === '' ? '-' : details.dastavej
			)
			$('#registryNo').val(
				details.registry_no === '' ? '-' : details.registry_no
			)
			$('#ferfarFormCard').removeClass('d-none')
		} else {
			$('#ferfarFormCard').addClass('d-none')
			alertjs.warning(
				{
					t: 'माहिती',
					m: 'वरील अनु/घर क्रमांक सापडले नाही.',
				},
				function () {}
			)
		}
	}

	$('#editFerfar').on('click', function (e) {
		e.preventDefault()
		$(this).addClass('d-none')
		$('#addFerfar').addClass('d-none')

		$('#saveEditedFerfar').removeClass('d-none')

		const malmattaNo = $('#newMalmattaNo').val()
		console.log(malmattaNo)

		handleGetUserDetailsToEdit(malmattaNo)
	})

	//Save edited Data

	const handleSaveEditedPherfarData = async (formData) => {
		const response = await fetch('/form-8/save-edited-data-ferfar', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})

		const data = await response.json()

		if (data.call === 1) {
			alertjs.success(
				{
					t: 'फेरफार अहवाल',
					m: 'माहिती अपडेट झाली',
				},
				() => {
					window.location.reload()
				}
			)
		} else if (data.call === 2) {
			alertjs.warning({
				t: 'फेरफार अहवाल',
				m: 'अपडेट करण्यासाठी माहिती डेटाबेसमध्ये उपलब्ध नाही',
			})
			//There is no such entry in database, thats why it cant be updated
		} else {
			alertjs.warning({
				t: 'फेरफार अहवाल',
				m: 'माहिती अपडेट नाही झाली',
			})
		}
	}

	$('#saveEditedFerfar').on('click', (e) => {
		e.preventDefault()
		let formValid = $('#ferfarForm').valid()
		if (formValid) {
			let formData = $('#ferfarForm')
				.serializeArray()
				.reduce((acc, field) => {
					acc[field.name] = field.value
					return acc
				}, {})

			let _date = formData['newPherfarDate'].split('/')

			console.log('first save data = ', formData)
			let requiredFormat = [_date[1], _date[0], _date[2]].join('/')

			formData['newPherfarDate'] = requiredFormat
			console.log('second save data = ', formData)

			handleSaveEditedPherfarData(formData)
		}
	})

	$('#searchMalmattaNo').on('click', function (e) {
		e.preventDefault()

		let malmattaNo = $('#malmattaNo').val()

		$.ajax({
			url: '/form-8/getFerfarDetails',
			method: 'POST',
			data: { malmattaNo },
			success: function (result) {
				console.log(result)
				let { data } = result
				console.log(data, 'data--')
				if (data != undefined) {
					$('#ferfarFormCard').removeClass('d-none')
					$('#alertDiv').addClass('d-none')
					$('#newMalmattaNo').val(data.feu_malmattaNo)
					$('#userId').val(data.id)

					// if there are no ferfar then set newOldDharak to exsisting malmatta owner name
					$('#newOldDharak').val(
						data.feu_newOldDharak === ''
							? data.feu_ownerName
							: data.feu_newOldDharak
					)
					$('#newNewDharak').val(
						data.feu_newNewDharak === '' ? '-' : data.feu_newNewDharak
					)
				} else {
					$('#ferfarFormCard').addClass('d-none')
					$('#alertDiv').removeClass('d-none')
				}
			},
			error: function (err) {
				console.log(err)
			},
		})
	})

	var searchType = 1

	$('#selectSearch').on('change', function () {
		$('#ferfarFormCard').addClass('d-none')
		searchType = Number($(this).val())
		$('#homeId1-type').val('')
		$('#homeId1').val('')
	})

	$('#homeId1-type')
		.autocomplete({
			minLength: 1,
			source: function (request, response) {
				$('#homeId1').val('')
				console.log(request)
				$('#previewDetails').addClass('d-none')
				$.ajax({
					url: '/get-user-info',
					method: 'post',
					data: {
						q: request.term,
						sType: searchType,
					},
					success: function (data) {
						console.log(data.call)
						response(data.call)
					},
				})
			},
			focus: function (event, ui) {
				// console.log(ui.item.label, 'label ')
				$('#homeId1-type').val(ui.item.label)

				return false
			},
			select: function (event, ui) {
				if (!$('#ferfar-avahal-list-year-wise-table').hasClass('d-none')) {
					$('#ferfar-avahal-list-year-wise-table').addClass('d-none')
				}
				if (!$('#ferfar-avahal-list-table').hasClass('d-none')) {
					$('#ferfar-avahal-list-table').addClass('d-none')
				}
				if (!$('#ferfar-avahal-list-date-to-date-table').hasClass('d-none')) {
					$('#ferfar-avahal-list-date-to-date-table').addClass('d-none')
				}
				if ($('#editFerfar').hasClass('d-none')) {
					$('#editFerfar').removeClass('d-none')
				}
				if (!$('#saveEditedFerfar').hasClass('d-none')) {
					$('#saveEditedFerfar').addClass('d-none')
				}
				if ($('#addFerfar').hasClass('d-none')) {
					$('#addFerfar').removeClass('d-none')
				}

				$('#homeId1-type').val(ui.item.label)
				$('#homeId1').val(ui.item.label)
				getUserDetails1(ui.item.label) // ui.item.label = malmattaNo
				return false
			},
		})
		.data('ui-autocomplete')._renderItem = function (ul, item) {
		return $('<li>')
			.data('ui-autocomplete-item', item)
			.append('<a style="display:block;width:100%;"> ' + item.label + '</a>')
			.appendTo(ul)
	}

	// $('#selectSearch-1').on('change', function () {
	//   searchType = Number($(this).val());
	//   $('#homeId-type').val('');
	//   $('#homeId').val('');
	// });

	function getUserDetails1(malmattaNumber) {
		if (malmattaNumber == null || malmattaNumber == 0) {
			return false
		}

		homeManager.getUserDetails(malmattaNumber, function (data) {
			if (data.call == 1) {
				homeManager.tempUserDetails = data.data
				data = data.data

				$('#ferfarFormCard').removeClass('d-none')
				$('#alertDiv').addClass('d-none')
				$('#newMalmattaNo').val(data.feu_malmattaNo)
				$('#userId').val(data.id)

				// if there are no ferfar then set newOldDharak to exsisting malmatta owner name
				$('#newOldDharak').val(
					data.feu_newOldDharak === ''
						? data.feu_ownerName
						: data.feu_newOldDharak
				)
				$('#newNewDharak').val(
					data.feu_newNewDharak.trim() === '' ? '-' : data.feu_newNewDharak
				)
				console.log(data)

				$('#newDharakAadhar').val('-')
				$('#newMobileNo').val('-')
				$('#newPherfarDate').val('-')
				// $('#newNewDharak').val('')
				$('#newPherfarTharav').val('-')
				$('#newPherfarDocument').val('-')
				$('#registryNo').val('-')

				$('#ferfarFormCard').removeClass('d-none')
			} else {
				$('#ferfarFormCard').addClass('d-none')
				alertjs.warning(
					{
						t: 'माहिती',
						m: 'वरील अनु/घर क्रमांक सापडले नाही.',
					},
					function () {}
				)
			}
		})
	}

	var homeManager = {
		tempUserDetails: {},
		navigationType: 0,

		getUserDetails(malmattaNumber, callback) {
			let data = {
				url: '/form-8/getFerfarDetails',
				method: 'POST',
				data: { malmattaNumber: malmattaNumber },
			}

			commonHandler.ajaxManager(data, function (type, data) {
				if (type == false) {
					alert('You Have An Error, PLease check Console')
					return false
				}
				callback(data)
			})
		},
	}

	// Ferfar month show

	$('#getFerfarAvahalBtn').on('click', () => {
		$('#ferfarFormCard').addClass('d-none')
		$('#getFerfarAvahalModal').modal('show')
	})

	$('.closeFerfarAvahalModal').on('click', () => {
		$('#getFerfarAvahalModal').modal('hide')
	})

	$('#getFerfarAvahalMonthwiseBtn').on('click', () => {
		const year = $('#yearDropdown').val()
		const month = $('#monthDropdown').val()
		if (year == -1 || month == -1) {
			alert('कृपया महिना आणि वर्ष निवडा')
			return
		}
		$('#getFerfarAvahalModal').modal('hide')
		$('#ferfar-avahal-list-table').removeClass('d-none')
		$('#ferfar-avahal-list-date-to-date-table').addClass('d-none')
		$('#ferfar-avahal-list-year-wise-table').addClass('d-none')

		let monthsList = [
			'जानेवारी',
			'फेब्रुवारी',
			'मार्च',
			'एप्रिल',
			'मे',
			'जून',
			'जुलै',
			'ऑगस्ट',
			'सप्टेंबर',
			'ऑक्टोबर',
			'नोव्हेंबर',
			'डिसेंबर',
		]

		const htmlString = `
            <tr class="" id='month-${month}-year-${year}'>
              <td>${monthsList[parseInt(month) - 1]} ${year}</td>
              <td>
                <button type='button' class='btn btn-success p-1 print-ferfar-avahal-btn' data-month="${month}" data-year="${year}">
                  <i class="fa fa-print fa-1x"></i>
                </button>
              </td>
              <td>
                <button type='button' class='btn btn-danger p-1 delete-ferfar-avahal-btn' data-month="${month}" data-year="${year}">
                  <i class="fa fa-trash fa-1x"></i>
                </button>
              </td>
          </tr>
          `
		$('#ferfarMonthList').html(htmlString)
	})

	//Print the avahal form
	$(document).on('click', '.print-ferfar-avahal-btn', function () {
		let month = $(this).attr('data-month')
		let year = $(this).attr('data-year')
		window.open(
			`/form-8/ferfar-avahal-print?month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}`
		)
	})

	//Delete the avahal on them month and year
	const handleDeleteFerfarAvahal = async (month, year) => {
		const response = await fetch(`/form-8/delete-ferfar-avahal`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				month: month,
				year: year,
			}),
		})
		const data = await response.json()

		if (data.call === 1) {
			alertjs.success(
				{
					t: 'फेरफार अहवाल',
					m: 'माहिती यशस्वी रित्या काढल्या गेली.',
				},
				function () {
					$(`#month-${month}-year-${year}`).addClass('d-none')
				}
			)
		} else {
			alertjs.warning({
				t: 'फेरफार अहवाल',
				m: 'माहिती यशस्वी रित्या काढली गेली नाही.',
			})
		}
	}

	$(document).on('click', '.delete-ferfar-avahal-btn', function (e) {
		e.preventDefault()
		const month = $(this).attr('data-month')
		const year = $(this).attr('data-year')
		handleDeleteFerfarAvahal(month, year)
	})

	// ==========================================

	// Year Wise btn

	$('#getFerfarAvahalYearWiseModalBtn').on('click', () => {
		$('#ferfarFormCard').addClass('d-none')
		$('#getFerfarAvahalYearwiseModal').modal('show')
	})

	$('#closeFerfarAvahalModal').on('click', () => {
		$('#getFerfarAvahalYearwiseModal').modal('hide')
	})

	$('#fromYearDropdownYearwise').on('change', function () {
		const selectedVal = parseInt($(this).val());
		if (selectedVal && selectedVal !== -1) {
			const nextYear = selectedVal + 1;
			if ($(`#toYearDropdownYearwise option[value="${nextYear}"]`).length > 0) {
				$('#toYearDropdownYearwise').val(nextYear);
			} else {
				$('#toYearDropdownYearwise').val(-1);
			}
		}
	})

	$('#getFerfarAvahalYearwiseBtn').on('click', () => {
		const fromYear = $('#fromYearDropdownYearwise').val()
		const toYear = $('#toYearDropdownYearwise').val()

		if (fromYear == -1 || toYear == -1) {
			alert('कृपया आर्थिक वर्ष निवडा')
			return
		}
		$('#getFerfarAvahalYearwiseModal').modal('hide')
		$('#ferfar-avahal-list-year-wise-table').removeClass('d-none')
		$('#ferfar-avahal-list-table').addClass('d-none')
		$('#ferfar-avahal-list-date-to-date-table').addClass('d-none')

		const htmlString = `
            <tr class="" id="year-wise-${fromYear}-${toYear}">
                <td id="selectedYearColumnData">${fromYear} ते ${toYear}</td>
                <td>
                    <button class="btn btn-success p-1 print-ferfar-avahal-year-wise-btn" type="button" data-from_year="${fromYear}" data-to_year="${toYear}">
                        <i class="fa fa-print fa-1x"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger p-1 delete-ferfar-avahal-year-wise-btn" type="button" data-from_year="${fromYear}" data-to_year="${toYear}">
                        <i class="fa fa-trash fa-1x"></i>
                    </button>
                </td>
            </tr>
            `
		$('#yearwise-body').html(htmlString)
	})

	//Print the avahal form
	$(document).on('click', '.print-ferfar-avahal-year-wise-btn', function () {
		let fromYear = $(this).attr('data-from_year')
		let toYear = $(this).attr('data-to_year')
		window.open(`/form-8/ferfar-avahal-print-year-wise?fromYear=${encodeURIComponent(fromYear)}&toYear=${encodeURIComponent(toYear)}`)
	})

	// delete-ferfar-avahal-year-ise-btn
	$(document).on('click', '.delete-ferfar-avahal-year-wise-btn', function (e) {
		e.preventDefault()
		const fromYear = $(this).attr('data-from_year')
		const toYear = $(this).attr('data-to_year')
		const date_from = `01/04/${fromYear}`
		const date_to = `31/03/${toYear}`
		handleDeleteFerfarDateToDateAvahal(date_from, date_to, `#year-wise-${fromYear}-${toYear}`)
	})

	// =======================================
	//Date to Date

	const handleDeleteFerfarDateToDateAvahal = async (date_from, date_to, rowSelector) => {
		const response = await fetch(`/form-8/delete-ferfar-avahal-date-to-date`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				date_from: date_from,
				date_to: date_to,
			}),
		})
		const data = await response.json()

		if (data.call === 1) {
			alertjs.success(
				{
					t: 'फेरफार अहवाल',
					m: 'माहिती यशस्वी रित्या काढल्या गेली.',
				},
				function () {
					if (rowSelector) {
						$(rowSelector).remove()
					} else {
						$(`#ferfar-avahal-list-date-to-date-table`).addClass('d-none')
					}
				}
			)
		} else {
			alertjs.warning({
				t: 'फेरफार अहवाल',
				m: 'माहिती यशस्वी रित्या काढली गेली नाही.',
			})
		}
	}

	$('#getFerfarAvahalDateToDateModalBtn').on('click', (e) => {
		e.preventDefault()
		$('#ferfarFormCard').addClass('d-none')
		$('#getFerfarAvahalDateToDateModal').modal('show')
	})

	$('#closeFerfarAvahalDateToDateModal').on('click', () => {
		$('#getFerfarAvahalDateToDateModal').modal('hide')
	})

	$('#getFerfarAvahalDateToDateModal').on('show.bs.modal', function () {
		flatpickr("input[name='this_date_from']", { dateFormat: 'd/m/Y' })
		flatpickr("input[name='this_date_to']", { dateFormat: 'd/m/Y' })
	})

	$('#getFerfarAvahalDateToDateBtn').on('click', (e) => {
		e.preventDefault()
		let date_from = $('#date-from').val()
		let date_to = $('#date-To').val()

		if (
			date_from == '' ||
			date_from.length !== 10 ||
			date_to == '' ||
			date_to.length !== 10
		) {
			alert('कृपया दिनांक निवडा')
			return
		}
		$('#getFerfarAvahalDateToDateModal').modal('hide')
		$('#ferfar-avahal-list-date-to-date-table').removeClass('d-none')
		$('#ferfar-avahal-list-year-wise-table').addClass('d-none')
		$('#ferfar-avahal-list-table').addClass('d-none')

		const rowId = `date-to-date-${date_from.replace(/\//g, '-')}-${date_to.replace(/\//g, '-')}`

		const htmlString = `
			<tr class="" id="${rowId}">
			<td id="">${date_from} ते ${date_to}</td>
			<td><button class="btn btn-success p-1 print-ferfar-avahal-date-to-date-btn" type="button" data-date_from="${date_from}" data-date_to="${date_to}"><i class="fa fa-print fa-1x"></i></button></td>
			<td><button class="btn btn-danger p-1 delete-ferfar-avahal-date-to-date-btn" type="button" data-date_from="${date_from}" data-date_to="${date_to}"><i class="fa fa-trash fa-1x"></i></button></td>
			</tr>
			`

		$('#date-to-date-body').html(htmlString)
	})

	//Print the avahal form
	$(document).on('click', '.print-ferfar-avahal-date-to-date-btn', function () {
		let date_from = $(this).attr('data-date_from')
		let date_to = $(this).attr('data-date_to')

		window.open(
			`/form-8/ferfar-avahal-print-date-to-date?date_from=${encodeURIComponent(date_from)}&date_to=${encodeURIComponent(date_to)}`
		)
	})

	$(document).on(
		'click',
		'.delete-ferfar-avahal-date-to-date-btn',
		function (e) {
			e.preventDefault()
			let date_from = $(this).attr('data-date_from')
			let date_to = $(this).attr('data-date_to')
			const rowId = `#date-to-date-${date_from.replace(/\//g, '-')}-${date_to.replace(/\//g, '-')}`
			handleDeleteFerfarDateToDateAvahal(date_from, date_to, rowId)
		}
	)
})
