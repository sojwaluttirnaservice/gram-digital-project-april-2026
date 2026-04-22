$(function () {
	let baseUrl
	const setBaseUrl = (_url) => (baseUrl = _url)

	$(document).on('click', '#print-btn', function (e) {
		e.preventDefault()
		let _url = `${baseUrl}?year1=${$('#date11').val()}&year2=${$('#date21').val()}&date=${$('#date31').val()}&p=0&tp=100${baseUrl == '/magni-bill/print-9-c-bank-magni-bill' ? `&printFormat=${$('#printFormat').val()}` : ''}`
		window.open(_url, '_blank')
	})

	$(document).on('click', '#print-samanya-kar-btn', function (e) {
		e.preventDefault()
		$('#yearModal1').modal({
			show: true,
		})
		$('.modal-title').html('वर्ष निवडा')

		setBaseUrl('/print/magni-bill')
	})

	$(document).on('click', '#print-watertax-btn', function (e) {
		$('#yearModal1').modal({
			show: true,
		})
		$('.modal-title').html('वर्ष निवडा')
		e.preventDefault()
		setBaseUrl('/magni-bill/print-watertax-magni-bill')
	})

	$(document).on('click', '#print-magni-bill-other-btn', function (e) {
		$('#yearModal1').modal({
			show: true,
		})
		$('.modal-title').html('वर्ष निवडा')
		e.preventDefault()
		setBaseUrl('/magni-bill/print-magni-bill-other')
	})

	$(document).on('click', '#print-bank-qr-code-samanya-kar-btn', function (e) {
		$('#yearModal1').modal({
			show: true,
		})
		$('.modal-title').html('वर्ष निवडा')
		e.preventDefault()
		setBaseUrl('/print/bank-qr-code-magni-bill')
	})

	$(document).on('click', '#print-bank-qr-code-magni-bill-other-btn', function (e) {
		$('#yearModal1').modal({
			show: true,
		})
		$('.modal-title').html('वर्ष निवडा')
		e.preventDefault()
		setBaseUrl('/magni-bill/print-bank-qr-code-magni-bill-other')
	})

	$(document).on('click', '#print-9-c-bank-magni-bill-btn', function (e) {
		$('#yearModal1').modal({
			show: true,
		})
		$('.modal-title').html('वर्ष निवडा (9 क bank मागणी बील)')
		e.preventDefault()
		setBaseUrl('/magni-bill/print-9-c-bank-magni-bill')
	})

	$(document).on('click', '#print-9-c-magni-bill-btn', function (e) {
		$('#yearModal1').modal({
			show: true,
		})
		$('.modal-title').html('वर्ष निवडा (9 क मागणी बील)')
		e.preventDefault()
		setBaseUrl('/magni-bill/print-9-c-magni-bill')
	})
})
