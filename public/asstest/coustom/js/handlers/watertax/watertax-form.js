$(function () {
	$('#tap-connection-id').on('input', function () {
		let id = $(this).val()
		if (!id) {
			document.getElementById('watertax-form').reset()
			$('#save-watertax-btn').css('display', 'block')
			$('#update-watertax-btn').css('display', 'none')
		}
	})

	$('#tap-connection-id').on('keydown', function (e) {
		// Check if the key pressed is the Enter key
		if (e.keyCode === 13) {
			// Prevent the default action (form submission)
			e.preventDefault()

			let id = $(this).val()
			if (!id) {
				alertjs.warning({
					t: 'नळ क्रमांक  निवडा',
				})
				return
			}
			handleFetchTapConnectionDetails(id)
		}
	})

	function fetchTapNumberListLike(id) {
		try {
		} catch (error) {}
	}

	$(document).on('click', '#search-btn', function (e) {
		e.preventDefault()

		const id = $('#tap-connection-id').val()

		if (!id) {
			alertjs.warning({
				t: 'नळ क्रमांक  निवडा',
			})
			return
		}
		handleFetchTapConnectionDetails(id)
	})

	async function handleFetchTapConnectionDetails(id) {
		try {
			const _url = '/meter/tap-connection-details'

			const _response = await fetch(_url, {
				method: 'POST',
				body: JSON.stringify({ id }),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const { success, data } = await _response.json()

			console.log(data)
			if (success) {
				const { alreadyExists, tapConnection, existingEntry } = data
				if (alreadyExists) {
					// alertjs.warning({
					// 	t: 'नळ क्रमांकाचा टॅक्स आधीच भरला आहे',
					// })

					$('#save-watertax-btn').css('display', 'none')
					$('#update-watertax-btn').css('display', 'block')

					insertTapConnectionDetails(tapConnection)
					insertWatertaxDetails(existingEntry)
					return
				}

				$('#save-watertax-btn').css('display', 'block')
				$('#update-watertax-btn').css('display', 'none')
				if (!tapConnection) {
					alertjs.warning({
						t: 'नळ क्रमांक सापडला नाही',
					})
					return
				}

				// console.log(tapConnection)

				insertTapConnectionDetails(tapConnection)
			}
		} catch (err) {
			console.error(`Error while fetching the tap connection details: ${err}`)
		}
	}

	function insertTapConnectionDetails(details) {
		$(`[name='tap_connection_id']`).val(details.id)
		$(`#malmatta-no`).val(details.malmatta_no)
		$(`#name`).val(details.name)
		$(`#mobile`).val(details.mobile)
		$(`#tap-owner-number`).val(details.tap_owner_number)
		$(`#address`).val(details.address)

		$(`[name='last_special_water_tax']`).val(details.last_special_water_tax)
		$(`[name='last_general_water_tax']`).val(details.last_general_water_tax)
	}

	function insertWatertaxDetails(details) {
		$(`[name='last_special_water_tax']`).val(details.last_special_water_tax)
		$(`[name='last_general_water_tax']`).val(details.last_general_water_tax)
		$(`[name='current_special_water_tax']`).val(
			details.current_special_water_tax
		)
		$(`[name='current_general_water_tax']`).val(details.total_general_water_tax)
		$(`[name='total_special_water_tax']`).val(details.total_special_water_tax)
		$(`[name='total_general_water_tax']`).val(details.total_general_water_tax)

		$(`[name='id']`).val(details.id)

		$('#total-water-tax').val(
			details.total_special_water_tax + details.total_general_water_tax
		)
	}

	$(document).on(
		'input',
		`[name='current_special_water_tax'], [name='current_general_water_tax']`,
		function (e) {
			// Calculate total general water tax
			const prevGeneralWaterTax = +$(`[name='last_general_water_tax']`).val()
			const currentGeneralWaterTax = +$(
				`[name='current_general_water_tax']`
			).val()
			const totalGeneralWaterTax = prevGeneralWaterTax + currentGeneralWaterTax
			$(`[name='total_general_water_tax']`).val(totalGeneralWaterTax)

			// Calculate total special water tax
			const prevSpecialWaterTax = +$(`[name='last_special_water_tax']`).val()
			const currentSpecialWaterTax = +$(
				`[name='current_special_water_tax']`
			).val()
			const totalSpecialWaterTax = prevSpecialWaterTax + currentSpecialWaterTax
			$(`[name='total_special_water_tax']`).val(totalSpecialWaterTax)

			$('#total-water-tax').val(totalGeneralWaterTax + totalSpecialWaterTax)
		}
	)

	$('#watertax-form').validate({
		rules: {
			tap_connection_id: {
				required: true,
			},

			last_special_water_tax: {
				required: true,
			},
			current_special_water_tax: {
				required: true,
			},
			total_special_water_tax: {
				required: true,
			},
			last_general_water_tax: {
				required: true,
			},
			current_general_water_tax: {
				required: true,
			},
			total_general_water_tax: {
				required: true,
			},
		},
		messages: {
			tap_connection_id: 'नळ क्रमांक भरा',
			last_special_water_tax: 'मागील विशेष पाणी कर प्रविष्ट करा',
			current_special_water_tax: 'सध्याचा विशेष पाणी कर प्रविष्ट करा',
			total_special_water_tax: 'एकूण विशेष पाणी कर प्रविष्ट करा',
			last_general_water_tax: 'मागील सामान्य पाणी कर प्रविष्ट करा',
			current_general_water_tax: 'सध्याचा सामान्य पाणी कर प्रविष्ट करा',
			total_general_water_tax: 'एकूण सामान्य पाणी कर प्रविष्ट करा',
		},
	})

	$(document).on('click', '#save-watertax-btn', function (e) {
		e.preventDefault()

		const taxData = new FormData(document.getElementById('watertax-form'))

		if (!$('#watertax-form').valid()) {
			alertjs.warning({
				t: 'सर्व माहिती भरा',
			})
			return
		}

		// for (const [key, val] of taxData.entries()) {
		// 	console.log(key, '---', val)
		// }

		handleSaveWaterTaxDetails(taxData, false)
	})

	$(document).on('click', '#update-watertax-btn', function (e) {
		e.preventDefault()

		const taxData = new FormData(document.getElementById('watertax-form'))

		if (!$('#watertax-form').valid()) {
			alertjs.warning({
				t: 'सर्व माहिती भरा',
			})
			return
		}

		// for (const [key, val] of taxData.entries()) {
		// 	console.log(key, '---', val)
		// }

		handleSaveWaterTaxDetails(taxData, true)
	})

	$(document).on('click', '#save-watertax-btn', function (e) {
		e.preventDefault()

		const taxData = new FormData(document.getElementById('watertax-form'))

		if (!$('#watertax-form').valid()) {
			alertjs.warning({
				t: 'सर्व माहिती भरा',
			})
			return
		}

		// for (const [key, val] of taxData.entries()) {
		// 	console.log(key, '---', val)
		// }

		handleSaveWaterTaxDetails(taxData)
	})

	async function handleSaveWaterTaxDetails(taxData, isUpdate) {
		try {
			const _url = !isUpdate
				? `/watertax/save-watertax`
				: `/watertax/update-watertax`

			const _response = await fetch(_url, {
				method: !isUpdate ? 'POST' : 'PUT',
				body: taxData,
			})

			const { success, data } = await _response.json()

			if (success) {
				const msg = !isUpdate
					? 'Tax saved successfully'
					: 'Tax updated successfully'
				$.notify(msg, {
					className: 'success',
					globalPosition: 'top center',
				})

				document.getElementById('watertax-form').reset()
				$('#save-watertax-btn').css('display', 'block')
				$('#update-watertax-btn').css('display', 'none')
			} else {
				alertjs.warning({
					t: 'Error: टॅक्स भरला जाऊ शकत नाही',
				})
			}
		} catch (err) {
			console.log(`Error while saving the tax Details ; ${err}`)
		}
	}
})
