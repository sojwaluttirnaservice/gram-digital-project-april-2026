$(function () {
	$(`[name='mbl_payment_date']`).datepicker({
		dateFormat: 'dd/mm/yy',
		changeMonth: true,
		changeYear: true,
		defaultDate: 'today',
	})

	function getYYYYMMDDFormat(DDMMYYYY) {
		if (!DDMMYYYY) return ''
		return DDMMYYYY.split('/').reverse().join('-')
	}

	const amountWithoutFine = $('[name="mbl_before_date_amt_to_fill"]').val()
	const amountWithFine = $('[name="mbl_after_date_amt_to_fill"]').val()

	let amountPayable = 0
	let maxAmountToPay = 0

	// console.log(_lastMeterTaxDetails)
	function setAmount(isToday = true) {
		if (
			typeof _lastMeterTaxDetails == 'undefined' ||
			_lastMeterTaxDetails == undefined ||
			_lastMeterTaxDetails == null ||
			(_lastMeterTaxDetails.mbl_amount_paid == 0 &&
				_lastMeterTaxDetails.mbl_amount_payable == 0)
		) {
			const [day, month, year] = $('[name="mbl_amt_diposite_till_date"]').val()
				? $('[name="mbl_amt_diposite_till_date"]').val().split('/')
				: ''
			let givenDate = new Date(
				parseInt(year),
				parseInt(month) - 1,
				parseInt(day)
			) // Month is 0-indexed, so 4 is May
			givenDate.setHours(0, 0, 0, 0) // Set time to 00:00:00.000

			// Get today's date

			let isChecked = $('#fine-relief-checkbox').is(':checked')
			if (isChecked) return
			let paymentDate
			if (isToday) {
				paymentDate = new Date()
			} else {
				let [day, month, year] = $(`[name='mbl_payment_date']`)
					.val()
					?.split('/')
				console.log('IN ohtwer')
				paymentDate = new Date(
					parseInt(year),
					parseInt(month) - 1,
					parseInt(day)
				) // Month is 0-indexed, so 4 is May
			}
			paymentDate.setHours(0, 0, 0, 0) // Set time to 00:00:00.000

			// console.log('Today:', today)
			// console.log('Given Date:', givenDate)
			// console.log('Amount Without Fine:', amountWithoutFine)
			// console.log('Amount With Fine:', amountWithFine)

			// Compare dates
			$('[name="mbl_amount_paid"]').val(
				paymentDate > givenDate ? amountWithFine : amountWithoutFine
			)

			amountPayable =
				paymentDate > givenDate ? amountWithFine : amountWithoutFine
			maxAmountToPay = amountPayable

			let amountPaying = +$('[name="mbl_amount_paid"]').val()
			if (amountPaying > maxAmountToPay) {
				$('[name="mbl_amount_paid"]').val(maxAmountToPay)
			}
			// console.log(amountPayable)
		} else {
			amountPayable = _lastMeterTaxDetails.mbl_amount_payable
			maxAmountToPay = _lastMeterTaxDetails._last_unpaid_amount

			let amountPaying = +$('[name="mbl_amount_paid"]').val()
			if (amountPaying > maxAmountToPay) {
				$('[name="mbl_amount_paid"]').val(maxAmountToPay)
			}
		}
	}

	setAmount()

	$(document).on('input change', `[name='mbl_payment_date']`, function (e) {
		e.preventDefault()
		let isToday = false
		setAmount(isToday)
	})

	$(document).on('input', `[name='mbl_amount_paid']`, function (e) {
		e.preventDefault()
		let val = +$(this).val()

		if (val > amountPayable) {
			$(this).val(amountPayable)
		}
	})
	function handlePaymentModeChange(mode) {
		if (mode == 'Offline') {
			$('#payment-details').css('display', 'none')
		} else {
			$('#payment-details').css('display', 'block')
		}
	}

	$(document).on('change', `[name='payment_mode']`, function (e) {
		e.preventDefault()
		let mode = $(this).val()
		handlePaymentModeChange(mode)
	})

	handlePaymentModeChange('Offline') // by default it willbe offline

	let isChecked = $('#fine-relief-checkbox').is(':checked')
	$('#fine-relief-checkbox').on('change', function () {
		// Set the value of mbl_amount_paid based on the checkbox status

		if (
			typeof _lastMeterTaxDetails == 'undefined' ||
			_lastMeterTaxDetails == undefined ||
			(_lastMeterTaxDetails.mbl_amount_paid == 0 &&
				_lastMeterTaxDetails.mbl_amount_payable == 0)
		) {
			let isChecked = $(this).is(':checked')
			$('[name="mbl_amount_paid"]').val(
				isChecked ? amountWithoutFine : amountWithFine
			)

			amountPayable = isChecked ? amountWithoutFine : amountWithFine

			// console.log(amountPayable)
		}
	})

	$(document).on('click', '#save-meter-tax-btn', function (e) {
		e.preventDefault()

		const formData = new FormData(document.getElementById('meter-tax-form'))

		formData.set(
			'mbl_payment_date',
			getYYYYMMDDFormat(formData.get('mbl_payment_date'))
		)

		// Set the value of mbl_amount_paid based on the checkbox status
		let isChecked = $('#fine-relief-checkbox').is(':checked') ? 1 : 0

		formData.set('mbl_is_fine_relief_given', isChecked)
		formData.set('mbl_amount_payable', amountPayable)

		formData.set('amount_paid', formData.get('mbl_amount_paid'))

		if (
			typeof _lastMeterTaxDetails != 'undefined' &&
			_lastMeterTaxDetails != undefined
		) {
			formData.set(
				'mbl_amount_paid',
				+formData.get('mbl_amount_paid') +
					_lastMeterTaxDetails.mbl_amount_paid ?? 0
			)
		}

		for (const [key, val] of formData.entries()) {
			console.log(key, val)
		}
		if (!formData.get('mbl_payment_date')) {
			alertjs.warning({
				t: 'कर भरणा दिनांक भरा',
			})
			return
		}
		handleSaveMeterTaxDetails(formData)
	})

	async function handleSaveMeterTaxDetails(formData) {
		try {
			const _url = '/meter/save-meter-tax-details'

			const _res = await fetch(_url, {
				method: 'POST',
				body: formData,
			})

			const { success } = await _res.json()

			if (success) {
				alertjs.success(
					{
						t: 'कर भरणा झाला',
					},
					() => location.reload()
				)
			}
		} catch (err) {
			console.log(`Error while saving the tax details : ${err}`)
		}
	}
})
