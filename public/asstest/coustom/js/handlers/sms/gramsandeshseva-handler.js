$(function () {
	$('#formEightUsersBtn').hide()

	let sendTo
	function setSendTo(value) {
		sendTo = value
	}

	/*
	setTimeout(() => {
		$('.btn-primary.toggle-on').text('नागरिक')
		$('.btn-secondary.toggle-off').text('नमुना ८')
	}, 300)

	$('.toggle').change(function () {
		// Toggle visibility of the buttons
		$('#nagrikNondaniBtn, #formEightUsersBtn').toggle()

		// Optionally, you can conditionally show/hide based on the checkbox state
		if ($(this).is(':checked')) {
			$('#nagrikNondaniBtn').show()
			$('#formEightUsersBtn').hide()
			setSendTo('nagrik')
		} else {
			$('#nagrikNondaniBtn').hide()
			$('#formEightUsersBtn').show()
			setSendTo('form8users')
		}
		// console.log('sned to = ', sendTo)
	})
	// console.log('sned to = ', sendTo);

	*/

	const getUrl = (data) => {
		let endPoint = ''
		let sendTo = +data.get('send_to')
		switch (sendTo) {
			case 1:
				endPoint = `send-gp-sms-to-nagrik`
				break
			case 2:
				endPoint = `send-gp-sms-to-form-8-users`
				break
			case 3:
				endPoint = `send-gp-sms-to-gp-members`
				break
		}
		return `/sms/${endPoint}`
	}

	const handleSendSms = async (data) => {
		try {
			let url = getUrl(data)
			const _response = await fetch(url, {
				method: 'POST',
				body: data,
			})

			const _responseData = await _response.json()

			if (_responseData.call == 1) {
				alertjs.success(
					{
						t: 'संदेश पाठवले गेले',
					},
					() => {
						window.location.reload()
					}
				)
			}
		} catch (err) {
			console.log(`Error while sending the sms : ${err}`)
		}
	}

	$('#smsForm').on('submit', function (e) {
		e.preventDefault()

		let message = $('#message').val().trim()
		let sendTo = $('#sendTo').val()

		console.log('send to = ', sendTo)
		if (!message) {
			alertjs.warning({
				t: 'वैध संदेश भरा.',
			})
			return
		}

		if (!sendTo) {
			alertjs.warning({
				t: 'संदेश कोणाला पाठवायचा निवडा.',
			})
			return
		}

		const messageForm = document.getElementById('smsForm')
		const formData = new FormData(messageForm)
		handleSendSms(formData)
	})
})
