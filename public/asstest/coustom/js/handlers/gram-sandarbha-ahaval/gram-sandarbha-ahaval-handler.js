$(function () {
	let formData

	$('.isNumber').on('input', function () {
		if (isNaN($(this).val())) {
			$(this).val('')
		}

		$('#year-difference').val($('#year-to').val() - $('#year-from').val())

		$('#taxation').val($('#area-sq-feet').val() * $('#tax-rate').val())

		$('#total-taxation').val($('#taxation').val() * $('#year-difference').val())
	})

	$('#area-sq-feet').on('input', function () {
		let sqFeet = $('#area-sq-feet').val()
		let sqMeeter = (sqFeet * 0.092903).toFixed(2)
		$('#area-sq-meeter').val(sqMeeter)
	})

	$('#area-sq-meeter').on('input', function () {
		let sqMeeter = $('#area-sq-meeter').val()
		let sqFeet = (sqMeeter * 10.7639).toFixed(2)
		$('#area-sq-feet').val(sqMeeter)
	})

	$('#addNewGramSandarbhaAhavalForm').validate({
		rules: {
			malmatta_owner_name: {
				required: true,
			},
			malmatta_no: {
				required: true,
			},
			survey_number: {
				required: true,
			},
			year_from: {
				required: true,
			},
			year_to: {
				required: true,
			},
			area_sq_feet: {
				required: true,
			},
			area_sq_meter: {
				required: true,
			},
			tax_rate: {
				required: true,
			},
			taxation: {
				required: true,
			},
			year_difference: {
				required: true,
			},
			total_taxation: {
				required: true,
			},
			shera: {
				required: true,
			},
		},
	})

	const handleSubmitGramAhavalDetails = async (formData, isEdit = false) => {
		try {
			let url = !isEdit
				? '/gram-sandarbha-ahaval/save-gram-sandarbha-ahaval'
				: '/gram-sandarbha-ahaval/update-gram-sandarbha-ahaval'
			const _response = await fetch(url, {
				method: `${isEdit ? 'PUT' : 'POST'}`,
				body: formData,
			})

			const _responseData = await _response.json()

			if (_responseData.call === 1) {
				let successMessage = `यशस्वीरीत्या ${!isEdit ? 'जतन' : 'अपडेट'} झाले`
				alertjs.success(
					{
						t: successMessage,
					},
					() => {
						window.history.back()
					}
				)
			}
		} catch (err) {
			console.error(
				`Error while ${isEdit ? 'updating' : 'saving '}   the detail`
			)
			let failureMessage = ` ${!isEdit ? 'जतन' : 'अपडेट'} नाही झाले`
			alertjs.warning({
				t: failureMessage,
			})
		}
	}

	const handleDeleteGramAhaval = async (id) => {
		try {
			let url = `/gram-sandarbha-ahaval/delete-gram-sandarbha-ahaval?id=${id}`
			const _response = await fetch(url, {
				method: `DELETE`,
			})

			const _responseData = await _response.json()

			if (_responseData.call === 1) {
				let successMessage = `अहवाल यशस्वीरीत्या काढला गेला `
				alertjs.success(
					{
						t: successMessage,
					},
					() => {
						window.location.reload()
					}
				)
			}
		} catch (err) {
			console.error(`Error while delelting the detail`)
			let failureMessage = `अहवाल काढला गेला नाही`
			alertjs.warning({
				t: failureMessage,
			})
		}
	}
	function isValidForm() {
		let isValidForm = $('#addNewGramSandarbhaAhavalForm').valid()
		if (!isValidForm) {
			alertjs.warning({
				t: 'सर्व माहिती भरा',
			})
			return false
		}

		if ($('#year-to').val() <= $('#year-from').val()) {
			alertjs.warning({
				t: 'मागील वर्ष पुढील वर्षापेक्षा मोठे आहे.',
			})
			return false
		}
		return true
	}

	$('#addNewGramSandarbhaAhavalForm').on('submit', function (e) {
		e.preventDefault()
		if (!isValidForm()) return
		formData = new FormData(
			document.getElementById('addNewGramSandarbhaAhavalForm')
		)
		handleSubmitGramAhavalDetails(formData)
	})

	$('#addNewGramSandarbhaAhavalForm').on('submit', function (e) {
		e.preventDefault()
		if (!isValidForm()) return
		formData = new FormData(
			document.getElementById('addNewGramSandarbhaAhavalForm')
		)
		formData.set('id', $('#updateGramSandarbhaAhavalBtn').attr('data-id'))
		handleSubmitGramAhavalDetails(formData, true)
	})

	$(document).on('click', '.deleteGramAhavalBtn', function (e) {
		e.preventDefault()
		let id = $(this).attr('data-id')

		alertjs.deleteSpl('सदर अहवाल काढायचा आहे का?', (status) => {
			if (status) {
				handleDeleteGramAhaval(id)
			}
		})
	})

	$('.editGramAhavalBtn')
})
