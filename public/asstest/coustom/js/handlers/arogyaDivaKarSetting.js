$(document).ready(function () {
	console.log('js loaded')
	let arogyaDivaKarSettingForm = $('#arogyaDivaKarSettingForm')
	arogyaDivaKarSettingForm.validate({
		rules: {
			adkArogya1: {
				required: true,
			},
			adkDiva1: {
				required: true,
			},
			adkArogya2: {
				required: true,
			},
			adkDiva2: {
				required: true,
			},
			adkArogya3: {
				required: true,
			},
			adkDiva3: {
				required: true,
			},
			cleaningTax: {
				required: true,
			},
			treeTax: {
				required: true,
			},
			fireblegateTax: {
				required: true,
			},
			educationTax: {
				required: true,
			},
		},
	})

	let submitAdkForm = $('#submitAdkForm')

	submitAdkForm.on('click', function (e) {
		e.preventDefault()
		console.log('submit')
		if (arogyaDivaKarSettingForm.valid()) {
			let adkData = {
				adk1: {
					adkDiva: $('#adkArogya1').val(),
					adkArogya: $('#adkDiva1').val(),
					cleaningTax: $('#cleaningTax1').val(),
					treeTax: $('#treeTax1').val(),
					fireblegateTax: $('#fireblegateTax1').val(),
					educationTax: $('#educationTax1').val(),
				},
				adk2: {
					adkDiva: $('#adkArogya2').val(),
					adkArogya: $('#adkDiva2').val(),
					cleaningTax: $('#cleaningTax2').val(),
					treeTax: $('#treeTax2').val(),
					fireblegateTax: $('#fireblegateTax2').val(),
					educationTax: $('#educationTax2').val(),
				},
				adk3: {
					adkDiva: $('#adkArogya3').val(),
					adkArogya: $('#adkDiva3').val(),
					cleaningTax: $('#cleaningTax3').val(),
					treeTax: $('#treeTax3').val(),
					fireblegateTax: $('#fireblegateTax3').val(),
					educationTax: $('#educationTax3').val(),
				},
			}

			$.ajax({
				url: '/master/arogyaDivabattiKarSetting',
				method: 'POST',
				data: adkData,
				success: function (result) {
					if (result.call == 1) {
						alertjs.success(
							{
								t: 'आरोग्य व दिवा',
								m: 'कर यशस्वी रित्या बदल झाला आहे.',
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
})
