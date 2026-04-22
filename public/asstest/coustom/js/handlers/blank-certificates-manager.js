$(document).ready(() => {
	console.log('blank certificates manager loaded')

	let navigationType = 0

	$(document).on('click', '.blankCertificates', function () {
		let _id = +$(this).attr('data-id')
		$('#from-date').val('')
		$('#to-date').val('')

		switch (_id) {
			case 1:
				openLinkToNewTab('/print/blankCertificate/form-8-blank-print')
				break
			case 2:
				openLinkToNewTab('/print/blankCertificate/formEightPratidnayaPatra')
				break
			case 3:
				openLinkToNewTab('/print/blankCertificate/formNineSamanya')
				break
			case 4:
				openLinkToNewTab('/print/blankCertificate/formNinePani')
				break
			case 5:
				openLinkToNewTab('/print/blankCertificate/magniBill')
				break
			case 6:
				openLinkToNewTab('/print/blankCertificate/magniLekh')
				break
			case 7:
				openLinkToNewTab('/print/blankCertificate/nal-connection-notice')
				break
			case 8:
				navigationType = 8
				openModal('#select-year-modal')
				break
			case 9:
				navigationType = 9
				openModal('#select-year-modal')
				break
			case 10:
				openLinkToNewTab('/print/blankCertificate/blankHeaderPrint')
				break

			case 11:
				navigationType = 11
				openModal('#select-year-modal')
				break
			case 12:
				navigationType = 12
				openModal('#select-year-modal')
				// Code for case 12
				break
			case 13:
				navigationType = 13
				openModal('#select-year-modal')
				// Code for case 13
				break
			case 14:
				navigationType = 14
				openModal('#select-year-modal')
				// Code for case 14
				break
			case 15:
				navigationType = 15
				openModal('#select-year-modal')
				// Code for case 15
				break
			case 16:
				navigationType = 16
				window.open('/print/blankCertificate/n-9-pending-taxes')
			default:
				// Default case if navigationType does not match any of the cases above
				break
		}
	})

	$(document).on('click', '#print-with-years-btn', function (e) {
		e.preventDefault()
		let y1 = $('#from-date').val()
		let y2 = $('#to-date').val()

		switch (navigationType) {
			case 8:
				openLinkToNewTab(
					`/print/blankCertificate/darpatrak-pramanpatra?y1=${y1}&y2=${y2}`
				)
				break
			case 9:
				openLinkToNewTab(
					`/print/blankCertificate/tharav-pramanpatra?y1=${y1}&y2=${y2}`
				)
				break

			case 11:
				openLinkToNewTab(
					`/print/blankCertificate/namuna-9-samanya-header?y1=${y1}&y2=${y2}`
				)
				break
			case 12:
				openLinkToNewTab(
					`/print/blankCertificate/namuna-9-panipatti-tharav?y1=${y1}&y2=${y2}`
				)
				break
			case 13:
				openLinkToNewTab(
					`/print/blankCertificate/namuna-9-pani-header?y1=${y1}&y2=${y2}`
				)
				break
			case 14:
				openLinkToNewTab(
					`/print/blankCertificate/namuna-9-samanya-kar-pramanpatra-tharav?y1=${y1}&y2=${y2}`
				)
				break
			case 15:
				openLinkToNewTab(
					`/print/blankCertificate/namuna-8-header?y1=${y1}&y2=${y2}`
				)
				break
		}
	})
})
