$(function () {
	$('.is-number').on('input', function () {
		const val = $(this).val()
		$(this).val(isNaN(val) ? '' : +val)
	})

	$('#tap-connection-form').validate({
		rules: {
			zone_number: {
				required: true,
			},
			tap_owner_number: {
				required: true,
			},
			malmatta_no: {
				required: true,
			},
			name: {
				required: true,
			},
			mobile: {
				required: true,
			},
			address: {
				required: true,
			},
			valve_number: {
				required: true,
			},
			last_special_water_tax: {
				required: true,
			},
			last_general_water_tax: {
				required: true,
			},
		},

		messages: {
			tap_number: 'नळ क्रमांक भरा',
			zone_number: 'झोन नंबर भरा',
			name: 'नाव भरा',

			mobile: 'नळ धारकाचा मोबाईल क्रमांक भरा',
			tap_owner_number: 'नळ धारकाचा क्रमांक भरा',
			address: 'पत्ता भरा ',

			valve_number: 'वॉल्व्ह नंबर भरा',
			last_special_water_tax: 'मागील विशेष पाणी कर भरा',
			last_general_water_tax: 'मागील सामान्य पाणी कर भरा',
		},
	})

	$('[name="mobile"]').on('input', function (e) {
		e.preventDefault()
		let val = $(this).val()
		if (isNaN(val)) $(this).val('')
	})

	$('[name="name"]').on('input', function (e) {
		e.preventDefault()
		let val = $(this).val()
		if (/\d/.test(val)) {
			// Check if the value contains a number
			$(this).val('') // If it contains a number, reset the input field
		}
	})

	const handleSaveTapConnection = async (sendData) => {
		const isUpdate = sendData.get('id') ? true : false
		try {
			const _url = isUpdate
				? `/meter/update-tap-connection`
				: `/meter/save-tap-connection`
			const _response = await fetch(_url, {
				method: isUpdate ? 'PUT' : 'POST',
				body: sendData,
			})

			const { success, data } = await _response.json()

			if (success) {
				alertjs.success(
					{
						t: `${isUpdate ? 'Updated Successfully' : `Saved Successfully , नळ क्रमांक: ${data.insertId}`}`,
					},
					() => {
						if (isUpdate) {
							location.reload()
						} else {
							document.getElementById('tap-connection-form').reset()
						}
					}
				)
			}
		} catch (err) {
			console.error(
				`Error while ${isUpdate ? 'updating' : 'saving'} the tap connection: ${err}`
			)
		}
	}

	$(document).on('click', '#save-tap-connection-btn', function (e) {
		e.preventDefault()

		if (!$('#tap-connection-form').valid()) {
			alertjs.warning({
				t: 'सर्व माहिती भरा',
			})
			return
		}

		const sendData = new FormData(
			document.getElementById('tap-connection-form')
		)

		handleSaveTapConnection(sendData)
	})

	$(document).on('click', '#update-tap-connection-btn', function (e) {
		e.preventDefault()

		if (!$('#tap-connection-form').valid()) {
			alertjs.warning({
				t: 'सर्व माहिती भरा',
			})
			return
		}

		const sendData = new FormData(
			document.getElementById('tap-connection-form')
		)

		handleSaveTapConnection(sendData)
	})
})
