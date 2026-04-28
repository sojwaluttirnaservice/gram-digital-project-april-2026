var image = ''
$(document).ready(function () {
	;(function () {
		$(`[name='mbl_deyak_date']`).focus()
	})()

	$('.my-datepicker').datepicker({
		dateFormat: 'mm/yy', // Set date format to display only month and year
		changeMonth: true, // Enable month dropdown
		changeYear: true, // Enable year dropdown
		showButtonPanel: true, // Show button panel for selecting month and year
		onClose: function (dateText, inst) {
			var month = $('#ui-datepicker-div .ui-datepicker-month :selected').val()
			var year = $('#ui-datepicker-div .ui-datepicker-year :selected').val()
			$(this).datepicker('setDate', new Date(year, month, 1))
		},
	})

	$('#mbl_deyak_date').datepicker({
		dateFormat: 'dd-mm-yy',
		changeMonth: true,
		changeYear: true,
	})

	$('#mbl_deyak_amt_fill_last_date').datepicker({
		dateFormat: 'dd-mm-yy',
		showOn: 'off',
	})
	$('#mbl_amt_diposite_till_date').datepicker({
		dateFormat: 'dd-mm-yy',
		showOn: 'off',
	})

	$('#image1').on('change', function () {
		image = ''
		$('#image-1-preview').prop('src', '')
		var input = $(this)[0]
		var fileName = $(this).val().split('\\').pop()

		extension = fileName.substring(fileName.lastIndexOf('.') + 1)
		if (
			extension == 'jpeg' ||
			extension == 'JPEG' ||
			extension == 'jpg' ||
			extension == 'JPG'
		) {
			if (input.files && input.files[0]) {
				if (input.files[0].size > 1048576) {
					alert('Try to upload file less than 1MB!')
					$(this).val('')

					e.preventDefault()
				} else {
					$(this)
						.siblings('.custom-file-label')
						.addClass('selected')
						.html(fileName)
					var reader = new FileReader()
					reader.onload = function (e) {
						image = e.target.result
						$('#image-1-preview').prop('src', e.target.result)
					}
					reader.readAsDataURL(input.files[0]) // convert to base64 string
				}
			}
		} else {
			alert('फक्त JPEG किंवा JPG फोटो पाहिजे आणि size 1 MB पर्यंत')
			$(this).val('')
		}
	})

	$('#mbl_deyak_date').on('change', function () {
		var date = $('#mbl_deyak_date').datepicker('getDate')
		date.setDate(date.getDate() + 30)
		$('#mbl_deyak_amt_fill_last_date').datepicker('setDate', new Date(date))
		$('#mbl_amt_diposite_till_date').datepicker('setDate', new Date(date))
	})

	$('#mbl_total_unit, #mbl_meter_reading_start').on('keyup input', function () {
		let readingStart = +$('#mbl_meter_reading_start').val()
		let readingEnd = +$('#mbl_total_unit').val()

		if (readingEnd - readingStart >= 0) {
			calcAllLogic()
		}
	})

	function calcAllLogic() {
		let unitStart = $(`#mbl_meter_reading_start`).val() || 0

		var unit = Number($('#mbl_total_unit').val())
		$('#mbl_total_unit').val(unit)
		$('#mbl_total_unit_2').val(unit - unitStart)
		if (isNaN(unit)) {
			return false
		}

		const unitDifference = +unit - +unitStart

		let meterRate = 2.4

		var extraUnit = 0
		if (unit > 126) {
			extraUnit = unit - rates[0].unit_to
			unit = rates[0].unit_to
		}

		// var payCalcTwo = extraUnit * rates[1].rate
		// payCalcOne += payCalcTwo

		rates.forEach((_rate, ind) => {
			if (
				unitDifference >= _rate.unit_form &&
				unitDifference <= _rate.unit_to
			) {
				meterRate = _rate.rate
				// console.log('unitDif', unitDifference)
			}
		})

		// console.log(rates)
		$('#mbl_rate').val(meterRate)

		$('#mbl_water_amt').val(Math.round(meterRate * unitDifference))
		// $('#mbl_water_unit').val(Math.round(payCalcOne))
		$('#mbl_water_unit').val(Math.round(meterRate * unitDifference))

		var lastUnpaidAmt = Number($(`#mbl_last_backlock`).val() || 0)
		$(this).val(lastUnpaidAmt)
		var water_amt = Number($('#mbl_water_amt').val())
		var final_amt = lastUnpaidAmt + water_amt
		var fine_amt = Math.round((final_amt * 2) / 100)
		$('#mbl_final_total_amt').val(final_amt)
		$('#mbl_before_date_amt_to_fill').val(final_amt)
		$('#mbl_after_date_amt_to_fill').val(final_amt + fine_amt)
		$('#mbl_amt_before_mudat').val(final_amt)
	}

	$('#mbl_last_backlock').on('focus keyup', function () {
		if ($('#mbl_total_unit').val() == '') {
			$('#mbl_total_unit').focus()
			return false
		}

		var lastUnpaidAmt = Number($(this).val())
		$(this).val(lastUnpaidAmt)
		var water_amt = Number($('#mbl_water_amt').val())
		var final_amt = lastUnpaidAmt + water_amt
		var fine_amt = Math.round((final_amt * 2) / 100)
		$('#mbl_final_total_amt').val(final_amt)
		$('#mbl_before_date_amt_to_fill').val(final_amt)
		$('#mbl_after_date_amt_to_fill').val(final_amt + fine_amt)
		$('#mbl_amt_before_mudat').val(final_amt)
	})

	$('.meter_owner_number, [name="owner_mobile"]').on(
		'keyup input',
		function (e) {
			e.preventDefault()
			if (isNaN($(this).val())) {
				$(this).val('')
			}
		}
	)

	$('#saveNewMeterUser').on('click', function (event) {
		event.preventDefault()

		var form = $('#formNewMeterUserDetails')[0]
		var formData = new FormData(form)
		var isValid = true
		formData.forEach(function (value, name) {
			if (value == '') {
				// if(name=='owner_mobile')
				// console.log(name, value)
				isValid = false
			}
		})

		if (!isValid) {
			alert('कृपया सर्व माहिती भरा.')
			return false
		}
		$('#saveNewMeterUser').html('जतन होत आहे...').prop('disabled', true)
		$.ajax({
			url: '/meter/save-update-new-user',
			method: 'POST',
			processData: false,
			contentType: false,
			cache: false,
			data: formData,
		})
			.done(function (data) {
				$('#saveNewMeterUser').html('जतन करा').prop('disabled', false)
				var id = formData.get('id')
				if (id == null || id == undefined) {
					alertjs.success({
						t: 'Record Added Successfully',
					},
                    () =>{
                        window.location.assign('/meter/add-new-user')
                    })
				} else {
					var cn = confirm(
						'Record Updated Successfully, want to add new record ?'
					)
					if (cn == true) {
						window.location.assign('/meter/add-new-user')
					} else {
						window.location.assign('/meter')
					}
				}
			})
			.fail(function (error) {
				$('#saveNewMeterUser').html('जतन करा').prop('disabled', false)
				alert('You have Server Error')
				console.log(error)
			})
	})

	$('#mbl_total_water_usage').on('keyup', function () {
		$('#mbl_total_unit').val($(this).val())
		calcAllLogic()
	})

	//HERE CODE STARTS

	function getYYYYMMDDFormat(MMYYYY, isFromDate) {
		if (!MMYYYY) return ''

		let fromDate = $(`[name="mbl_water_usage_from"]`).val()
		let tillDate = $(`[name="mbl_water_usage_to"]`).val()

		console.log(MMYYYY, isFromDate)
		if (isFromDate) {
			return MMYYYY.split('/').reverse().join('-') + '-01'
		} else {
			let [month, year] = tillDate.split('/')
			let lastDay = new Date(year, month, 0).getDate()
			return MMYYYY.split('/').reverse().join('-') + `-${lastDay}`
		}
	}

	$('#saveMeterUser').on('click', function (event) {
		event.preventDefault()
		// /*
		if ($('#mbl_deyak_date').val() == '') {
			alertjs.warning({ t: 'देयक दिनांक निवडा' })
			$('#mbl_deyak_date').focus()
			return false
		}
		if ($('#mbl_deyak_amt_fill_last_date').val() == '') {
			alertjs.warning({ t: 'देयक भरण्याची अंतिम तारीख निवडा' })
			$('#mbl_deyak_amt_fill_last_date').focus()
			return false
		}
		if ($('#mbl_nal_usage_type').val() == '') {
			alertjs.warning({ t: 'नळाचा वापर निवडा' })
			$('#mbl_nal_usage_type').focus()
			return false
		}

		if ($('#mbl_final_total_amt').val() == '') {
			$('#mbl_total_unit').focus()
			alertjs.warning({ t: 'अवैध रक्कम भरणा' })
			return false
		}
		if ($('#mbl_amt_diposite_till_date').val() == '') {
			$('#mbl_amt_diposite_till_date').focus()
			alertjs.warning({ t: 'मुदत दिनांक निवडा' })
			return false
		}
		// */

		var form = $('#newMeterUserDetails')[0]
		var formData = new FormData(form)
		var isValid = true

		let _water_usage_from_date = formData.get('mbl_water_usage_from')
		let _water_usage_to_date = formData.get('mbl_water_usage_to')
		formData.set(
			'mbl_water_usage_from',
			getYYYYMMDDFormat(_water_usage_from_date, true)
		)
		formData.set(
			'mbl_water_usage_to',
			getYYYYMMDDFormat(_water_usage_to_date, false)
		)

		let [fromMonth, fromYear] = _water_usage_from_date.split('/').map(Number)
		let [toMonth, toYear] = _water_usage_to_date.split('/').map(Number)

		// Perform validation
		if (toYear < fromYear || (toYear === fromYear && toMonth <= fromMonth)) {
			// Handle error, toDate is not greater than fromDate
			alertjs.warning(
				{
					t: 'संदेश',
					m: 'पाणी वापरायचा पर्यंतची दिनांक  ही पाणी वापरण्यापासूनच्या दिनांकापेक्षा कमी नको अथवा सारखी नको',
				},
				() => {
					$(`[name='mbl_water_usage_from']`).focus()
				}
			)
			return
		}

		// for (const [key, val] of formData.entries()) {
		// 	console.log(key, ' :::: ', val)
		// }
		// return

		formData.forEach(function (value, name) {
			if (value == '') {
				isValid = false
			}
		})
		if (!isValid) {
			alert('कृपया सर्व माहिती भरा.')
			return false
		}

		if (image !== '') {
			var ImageURL = image // 'photo' is your base64 image
			var block = ImageURL.split(';')
			var contentType = block[0].split(':')[1] // In this case "image/gif"
			var realData = block[1].split(',')[1]
			var blob = b64toBlob(realData, contentType)
			formData.set('file1', blob)
		}

		// $('#saveMeterUser').html('जतन होत आहे...').prop('disabled', true)

		$.ajax({
			url: '/meter/save-new-meter',
			method: 'POST',
			processData: false,
			contentType: false,
			cache: false,
			data: formData,
		})
			.done(function (data) {
				alertjs.success(
					{
						t: 'Record Added successfully',
					},
					() => {
						location.reload()
					}
				)
			})
			.fail(function (error) {
				$('#saveMeterUser').html('जतन करा').prop('disabled', false)
				alert('You have Server Error')
				console.log(error)
			})
	})

	function setNextDate() {
		var fromDate = $('#mbl_water_usage_from').val()

		// Split the date into month and year
		var parts = fromDate.split('/')
		var month = parseInt(parts[0])
		var year = parseInt(parts[1])

		// Calculate the end month
		var endMonth = month + 2
		var endYear = year

		// Adjust the year if necessary
		while (endMonth > 12) {
			endMonth -= 12
			endYear += 1
		}

		// Format the start and end dates MM/YYYY
		var toDate = (endMonth < 10 ? '0' : '') + endMonth + '/' + endYear

		// Update the value of $('#mbl_water_usage_to')
		$('#mbl_water_usage_to').val(toDate)
	}

	$('#mbl_water_usage_from').on('change input keyup', function (e) {
		if (e.type === 'keyup' && e.key !== 'Enter') {
			return // Do nothing if keyup event and not the "Enter" key
		}
		e.preventDefault()

		// Get the selected date value
		setNextDate()
	})

	if (typeof _lastMeterTaxDetails != 'undefined') {
		// console.log(_lastMeterTaxDetails)

		let [month, year] = _lastMeterTaxDetails._mbl_water_usage_to
			.split('/')
			.map(Number)

		month = (month % 12) + 1
		if (month === 1) year += 1

		$('#mbl_water_usage_from').val(
			`${month.toString().padStart(2, '0')}/${year}`
		)
		setNextDate()
	}

	$(document).on('click', '#updateMeterUser', async function (e) {
		e.preventDefault()

		// /*
		if ($('#mbl_deyak_date').val() == '') {
			alertjs.warning({ t: 'देयक दिनांक निवडा' })
			$('#mbl_deyak_date').focus()
			return false
		}
		if ($('#mbl_deyak_amt_fill_last_date').val() == '') {
			alertjs.warning({ t: 'देयक भरण्याची अंतिम तारीख निवडा' })
			$('#mbl_deyak_amt_fill_last_date').focus()
			return false
		}
		if ($('#mbl_nal_usage_type').val() == '') {
			alertjs.warning({ t: 'नळाचा वापर निवडा' })
			$('#mbl_nal_usage_type').focus()
			return false
		}

		if ($('#mbl_final_total_amt').val() == '') {
			$('#mbl_total_unit').focus()
			alertjs.warning({ t: 'अवैध रक्कम भरणा' })
			return false
		}
		if ($('#mbl_amt_diposite_till_date').val() == '') {
			$('#mbl_amt_diposite_till_date').focus()
			alertjs.warning({ t: 'मुदत दिनांक निवडा' })
			return false
		}
		// */

		var form = $('#newMeterUserDetails')[0]
		var formData = new FormData(form)
		var isValid = true

		let _water_usage_from_date = formData.get('mbl_water_usage_from')
		let _water_usage_to_date = formData.get('mbl_water_usage_to')
		formData.set(
			'mbl_water_usage_from',
			getYYYYMMDDFormat(_water_usage_from_date, true)
		)
		formData.set(
			'mbl_water_usage_to',
			getYYYYMMDDFormat(_water_usage_to_date, false)
		)

		let [fromMonth, fromYear] = _water_usage_from_date.split('/').map(Number)
		let [toMonth, toYear] = _water_usage_to_date.split('/').map(Number)

		// Perform validation
		if (toYear < fromYear || (toYear === fromYear && toMonth <= fromMonth)) {
			// Handle error, toDate is not greater than fromDate
			alertjs.warning(
				{
					t: 'संदेश',
					m: 'पाणी वापरायचा पर्यंतची दिनांक  ही पाणी वापरण्यापासूनच्या दिनांकापेक्षा कमी नको अथवा सारखी नको',
				},
				() => {
					$(`[name='mbl_water_usage_from']`).focus()
				}
			)
			return
		}

		for (const [key, val] of formData.entries()) {
			console.log(key, ' :::: ', val)
			if (val == '' && key != 'image_name') {
				isValid = false
			}
		}

		if (!isValid) {
			alert('कृपया सर्व माहिती भरा.')
			return false
		}

		if (image !== '') {
			var ImageURL = image // 'photo' is your base64 image
			var block = ImageURL.split(';')
			var contentType = block[0].split(':')[1] // In this case "image/gif"
			var realData = block[1].split(',')[1]
			var blob = b64toBlob(realData, contentType)
			formData.set('file1', blob)
		}

		try {
			const _response = await fetch('/meter/update-new-meter', {
				method: 'PUT',
				body: formData,
			})

			const { call } = await _response.json()

			if (call == 1) {
				alertjs.success({
					t: 'Upadted Successfully',
				})
			}
		} catch (err) {
			console.log(`Error while updating the meter user details: ${err}`)
		}
	})

	$('.mb_nal_connection_no').on('keyup input', function (event) {
		var value = $(this).val()
		$('.meter_owner_number').val(value)
		// $(".meter_connection_no").val(value);
	})

	//Search input fiedl

	$(document).on('click', '#find-customer-btn', function (e) {
		e.preventDefault()
		$('#searchModal').modal({
			show: true,
		})
	})

	let searchBy = 1
	let isFromAutocomplete = false
	let autocompleteUser = {
		id: 0,
	}
	$(document).on('change', '[name="search_by"]', function (e) {
		e.preventDefault()
		searchBy = $(this).val()
	})

	// $('[name="search_input"]').keypress(function (e) {
	// 	// Check if Enter key was pressed (key code 13)
	// 	if (e.which === 13) {
	// 		e.preventDefault() // Prevent form submission
	// 		$('#search-customer-btn').click() // Trigger search button click
	// 	}
	// })

	function giveWarning(msg) {
		alertjs.warning({
			t: msg,
		})
	}
	$(document).on('click', '#search-customer-btn', function (e) {
		e.preventDefault()
		let val = $(`[name='search_input']`).val()
		let redirectToMeterTaxForm = 0

		if (isFromAutocomplete) {
			val = autocompleteUser.id
			searchBy = 3
			$(`[name='search_input']`).val('')
		}

		let url = ''
		switch (+searchBy) {
			case 1:
				if (!val) {
					giveWarning('नळ क्रमांक भरा')
					return
				}
				url = `/meter/user-info-by-nal-connection/${+val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break
			case 2:
				if (!val) {
					giveWarning('मीटर क्रमांक भरा')
					return
				}
				url = `/meter/user-info-by-meter-number/${+val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break

			case 3:
				if (!val) {
					giveWarning('अर्ज क्रमांक भरा')
					return
				}
				url = `/meter/user-info-by-id/${+val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break

			case 4:
				if (!val) {
					giveWarning('नाव भरा')
					return
				}
				url = `/meter/user-info-by-name/${val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break
		}
	})

	$(document).on('click', '#update-customer-btn', function (e) {
		e.preventDefault()
		let val = $(`[name='search_input']`).val()
		let redirectToMeterTaxForm = -1

		if (isFromAutocomplete) {
			val = autocompleteUser.id
			searchBy = 3
			$(`[name='search_input']`).val('')
		}

		let url = ''
		switch (+searchBy) {
			case 1:
				if (!val) {
					giveWarning('नळ क्रमांक भरा')
					return
				}
				url = `/meter/user-info-by-nal-connection/${+val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break
			case 2:
				if (!val) {
					giveWarning('मीटर क्रमांक भरा')
					return
				}
				url = `/meter/user-info-by-meter-number/${+val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break

			case 3:
				if (!val) {
					giveWarning('अर्ज क्रमांक भरा')
					return
				}
				url = `/meter/user-info-by-id/${+val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break

			case 4:
				if (!val) {
					giveWarning('नाव भरा')
					return
				}
				url = `/meter/user-info-by-name/${val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break
		}
	})

	$(document).on('input', `[name='search_input']`, function (e) {
		e.preventDefault()

		let redirectToMeterTaxForm = -1
		let val = $(this).val()
		let searchMultiple = true

		// if (!val) return
		let url = ''
		switch (+searchBy) {
			case 1:
				url = `/meter/user-info-by-nal-connection/${+val}?searchMultiple=true`
				handleGetUserInformation(url, redirectToMeterTaxForm, searchMultiple)
				break

			case 2:
				url = `/meter/user-info-by-meter-number/${+val}?searchMultiple=true`
				handleGetUserInformation(url, redirectToMeterTaxForm, searchMultiple)
				break

			case 3:
				url = `/meter/user-info-by-id/${+val}?searchMultiple=true`
				handleGetUserInformation(url, redirectToMeterTaxForm, searchMultiple)
				break

			case 4:
				url = `/meter/user-info-by-name/${val}?searchMultiple=true`
				handleGetUserInformation(url, redirectToMeterTaxForm, searchMultiple)
				break
		}
	})

	$(document).on('click', '#show-meter-tax-form-btn', function (e) {
		e.preventDefault()
		let val = $(`[name='search_input']`).val()
		let redirectToMeterTaxForm = 1

		if (isFromAutocomplete) {
			val = autocompleteUser.id
			searchBy = 3
			$(`[name='search_input']`).val('')
		}

		let url = ''
		switch (+searchBy) {
			case 1:
				if (!val) {
					giveWarning('नळ क्रमांक भरा')
					return
				}
				url = `/meter/user-info-by-nal-connection/${+val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break
			case 2:
				if (!val) {
					giveWarning('मीटर क्रमांक भरा')
					return
				}
				url = `/meter/user-info-by-meter-number/${+val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break

			case 3:
				if (!val) {
					giveWarning('अर्ज क्रमांक भरा')
					return
				}
				url = `/meter/user-info-by-id/${+val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break

			case 4:
				if (!val) {
					giveWarning('नाव भरा')
					return
				}
				url = `/meter/user-info-by-name/${val}`
				handleGetUserInformation(url, redirectToMeterTaxForm)
				break
		}
	})

	function autocomplete(usersData) {
		let _label

		switch (+searchBy) {
			case 1:
				_label = 'mb_nal_connection_no'
				break
			case 2:
				_label = 'mb_meter_connection_no'
				break
			case 3:
				_label = 'id'
				break
			case 4:
				_label = 'mb_owner_name'
				break
		}

		$(`[name='search_input']`).autocomplete({
			source: function (request, response) {
				var term = request.term.toLowerCase()

				// Format the filtered data as per your requirement
				var formattedData = usersData.map(function (entry) {
					return {
						label: entry[_label], // What to show in the UI
						value: entry.id, // What to set in the input field when an item is selected
						otherProperty: entry.otherProperty, // You can include other properties if needed
					}
				})

				response(formattedData)
			},
			minLength: 0, // Show suggestions even when there's no user input
			select: function (event, ui) {
				const id = ui.item.value
				autocompleteUser.id = id
				$(this).val(ui.item.label)
				return false
			},
		})
	}

	async function handleGetUserInformation(
		url,
		redirectToMeterTaxForm,
		searchMultiple = false
	) {
		try {
			const _res = await fetch(url)

			const { success, userData, usersData } = await _res.json()

			if (success || success == 1) {
				isFromAutocomplete = false
				if (!searchMultiple && userData) {
					if (redirectToMeterTaxForm == 1) {
						window.open(`/meter/meter-tax-form/${userData.id}`, '_blank')
					} else if (redirectToMeterTaxForm == 0) {
						window.open(`/meter/add-new-meter/${userData.id}`, '_blank')
					} else if (redirectToMeterTaxForm == -1) {
						window.open(`/meter/edit-new-meter/${userData.id}`, '_blank')
					}
				} else {
					console.log(usersData)
					autocomplete(usersData)
				}
			}
		} catch (error) {
			console.log(`Error while getting information : ${error}`)
		}
	}
})

var meter = new Meter()
function Meter() {}
function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || ''
	sliceSize = sliceSize || 512
	var byteCharacters = atob(b64Data) // window.atob(b64Data)
	var byteArrays = []

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize)

		var byteNumbers = new Array(slice.length)
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i)
		}

		var byteArray = new Uint8Array(byteNumbers)

		byteArrays.push(byteArray)
	}

	var blob = new Blob(byteArrays, { type: contentType })
	return blob
}
