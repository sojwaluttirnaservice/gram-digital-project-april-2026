let newSelfDeclarationList = []
let imageData = ''
let gp = ''
$(document).ready(function () {



    // we might use it somewhwere






    // COMMENTED ON 06 Feb 2026 12:01 by sj
    // THE CODE PRESENTED BELOW IS SOMEWHAT WORKING
    // IT MEANS WE MIGHT NEED IT LATER, OR MIGHT NOT, NOT SURE

    // DON'T DELETE THIS CODE OR REMOVE IT UNLESS VERIFIED
    // ESPECIALLY THAT ONLINE/OFFILE PAY FEATURE,

    // SOME WOKRING (CURRENTLY USEFUL CODE MIGHT BE DOWNWARDS)


	// display the samanya qr as soon as the page loads
	$('.samanya-qr-holder').css('display', 'block')
	let formData = new FormData()

	$('#applicantAadharE').mask('0000-0000-0000')



    // This one is used in the form
	$(document).on('blur', '.mainText', function (e) {
		e.preventDefault()
		let value = $(this).val()
		var input = $(this).siblings('.secText')
		commonHandler.translateWord(value, function (data) {
			console.log(data)
			$(input).val(data)
		})
	})

	//Removing this as per now
	/* 
    $(document).on('click', '.search-pending-tax-btn', async function () {
        let malmattaNo = +$('.malmatta-no').val();
        paymentDetails.personName = $('input[name=applicantFullSelfNameM]').val();
        paymentDetails.malmattaNo = $('#malmatta-no').val();
        commonHandler.checkTaxPaidByMalmattaNo(malmattaNo);
    });
    */

	//User can directly pay the amount
	
    $(document).on('click', '.button-offline-pay', async function (e) {
		e.preventDefault()

		if (!isPaymentModalMobileFilled()) return

		paymentDetails.personName = $('input[name=applicantFullSelfNameM]').val()
		paymentDetails.malmattaNo = $('#pay-malmatta-no').val()
		paymentDetails.amount = Number($('#pay-amount').val())
		paymentDetails.paymentFor = 4 // FOR swayam ghoshna patra payment
		await paymentMode.offline(paymentDetails, function (result, actualResult) {
			if (result === 1) {
				const data = {
					paymentFor: 'नवीन रहिवासी स्वयंघोषितपत्र',
					paymentMode: 0,
					sms: '', //if sms ifs undefined or '' i.e. empty Strring, we will use defaultSms format
					mobile: `${$('#pay-mobile-no').val()}`,
				}
				handleSendGpSMS(data)

                let paymentId = actualResult.reciptNumber

				submitSelfDeclaration(paymentId)
			}
		})
	})




	$(document).on('click', '.button-online-pay', function (e) {

		e.preventDefault();
		paymentDetails.paymentMode = 1;
		paymentDetails.transactionNumber = $('#transaction_number').val()

		let fileInput = $('#paymentScreenshot')[0]
		if (!fileInput?.files?.length) {
			alertjs.warning({
				t: 'WARNING',
				m: 'पेमेंटचा स्क्रीनशॉट जोडा.'
			})
			return
		}
		let paymentScreenshot = fileInput.files[0]


		//common js
		if (!isPaymentModalMobileFilled()) {
			return false;
		}

        paymentDetails.tax_category = "SAMANYA"
		if (paymentDetails.transactionNumber?.trim() == '') {
			alertjs.warning({
				t: 'WARNING',
				m: 'Transaction Number भरा.'
			})
			return;
		}

		let paymentData = new FormData()
		for (let key in paymentDetails) {
			if (paymentDetails.hasOwnProperty(key)) {
				paymentData.set(key, paymentDetails[key]);
			}
		}
		paymentData.set('paymentScreenshot', paymentScreenshot)

		$.ajax({
			url: '/payment/save',
			method: 'POST',
			processData: false, // prevent jQuery from processing the data
			// contentType: 'application/json',
			contentType: false, // let the browser set the correct multipart/form-data boundary
			dataType: 'json',
			data: paymentData,
			success: function (result) {
				console.log(result, 'result after payment');
				if (result.call === 1) {
					alertjs.success(
						{
							t: 'Payment successfully done',
						},
						function () {
							//Send SMS functionality needed to implement here

							const data = {
								paymentFor: 4,
								paymentMode: 1,
								sms: '', //if sms is undefined or '' i.e. empty Strring, we will use defaultSms format
								mobile: `${$('#pay-mobile-no').val()}`,
							};
							// handleSendGpSMS(data);

							submitSelfDeclaration()
							$('#paymentModeModal').modal('hide');

							// const searchParams = new URLSearchParams(window.location.search);
						}
					);
				}
				else if (result.call == 0) {
					alertjs.warning({
						t: 'WARNING',
						m: result.message
					})
				}
				else {
					throw new Error('Something went wrong');
				}
			},
			error: function (error) {
				// console.log('innnnnnnnnnnnn error')
				// console.log(error)
				alertjs.warning({
					t: 'Something went wrong',
					m: error?.responseJSON?.message || 'Payment not done, please try again later',
				});
			},
		});
	})

	// PRINT PAYMENT RECIPT
	$(document).on('click', '.print-payment-recipt-btn', function (e) {
		e.preventDefault()
		console.log(paymentDetails.amount)
		commonHandler.translate(paymentDetails.amount, function (inWord) {
			paymentDetails.amountInwords = inWord
			printCertificatePaymentRecipt(paymentDetails)
		})
	})

	$(document).on('click', '#saveSelfDecleration', function (e) {
		e.preventDefault()
		if (!isSelfDeclartionFormFilled()) {
			return
		}

		// var f
		// $('.check-tax-paid-modal').modal({ show: true });
		$('#paymentModeModal').modal('show')
		$('#pay-malmatta-no').attr('readonly', false)
		$('#pay-amount').attr('readonly', false)

		// $('#pay-person-name').attr('readonly', false)
		$('#pay-person-name').val($('#applicantFullSelfNameM').val())
	})

	function isSelfDeclartionFormFilled() {
		if ($('#newSelfDeclerationForm').valid()) {
			// let file1 = $('#image_1')[0].files[0]

			// if (imageData === '' && typeof file1 == 'undefined') {
			if (!formData.has('file1')) {
				alertjs.warning({
					t: 'फोटो अव्वषक आहे',
				})
				return false
			}
			return true
		}
		alertjs.warning({
			t: 'Fill all input fields',
		})
		return false
	}

	function submitSelfDeclaration(paymentId) {
		details = {}

		let detailsArray = $('#newSelfDeclerationForm').serializeArray()

		$.each(detailsArray, function (index, value) {
			formData.set(value.name, value.value)
		})
        formData.set("ps_payment_information_id_fk", paymentId)

		/*

		if (imageData !== '') {
			let ImageURL = imageData // 'photo' is your base64 image
			let block = ImageURL.split(';')
			let contentType = block[0].split(':')[1] // In this case "image/gif"
			let realData = block[1].split(',')[1]
			let blob = b64toBlob(realData, contentType)
			formData.set('file1', blob)
		} else {
			let file1 = $('#image_1')[0].files[0]
			if (typeof file1 == 'undefined') {
				alert('फोटो अव्वषक आहे')
				return false
			}
			formData.set('file1', file1)
		}

		*/

		// for (const [key, value] of formData.entries()) {
		// 	console.log(`${key} ::: ${formData.get(key)}`)
		// }

		var data = {
			url: '/self-declaration/save-details',
			enctype: 'multipart/form-data',
			processData: false, // Important!
			contentType: false,
			cache: false,
			method: 'post',
			data: formData,
		}
		$.ajax(data)
			.done(function (data) {
				if (data.call == 1) {
					alertjs.success(
						{
							t: 'नवीन रहिवासी स्वयंघोषितपत्र',
							m: 'यशस्वी रित्या जतन केली आहे.',
						},
						function () {
							document.getElementById("newSelfDeclerationForm").reset();
							$('#image-1-preview').prop('src', '')
							// window.location.assign('/self-declaration')
						}
					)
				}
			})
			.fail(function (xhr) {
				// alert('You Have An Error, PLease check Console');
				console.log(data)
				return false
			})
	}

	function hasTouchSupport() {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0
	}

	const isMobileDevice = hasTouchSupport()

	if (!isMobileDevice) {
		Webcam.set({
			width: 220,
			height: 190,
			image_format: 'jpeg',
			jpeg_quality: 100,
		})
		Webcam.attach('#camera')

		// SHOW THE SNAPSHOT.
		takeSnapShot = function () {
			Webcam.snap(function (data_uri) {
				imageData = data_uri
				let ImageURL = imageData // 'photo' is your base64 image
				let block = ImageURL.split(';')
				let contentType = block[0].split(':')[1] // In this case "image/gif"
				let realData = block[1].split(',')[1]
				let blob = b64toBlob(realData, contentType)
				formData.set('file1', blob)
				$('#image-1-preview').prop('src', data_uri)
			})
		}
	}

	if (isMobileDevice) {
		$('#webcam-preview-btn').addClass('d-none')
		$('#webcam-preview-div').addClass('d-none')
	}

	/*
	$('#image_1').on('change', function (e) {
		imageData = ''
		$('#image-1-preview').prop('src', imageData)
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

	*/

	//-Added new Code

	$('#image_1').change(function () {
		compressAndDisplayImage(this, 'image-1-preview', 'file1')
	})

	$(document).on('click', '.printModel', function (e) {
		e.preventDefault()
		$('#printPlace').val('')
		$('#date31').val('')
		var data = Number($(this).attr('data-id'))
		$('#idData').val(data)
		$('#marriageModel').modal({
			show: true,
		})
		$('.modal-title').html('विवाह नोंदणी प्रिंट')
	})

	$(document).on('click', '#btnPrintCertificate', function (e) {
		e.preventDefault()
		var printPlace = $('#printPlace').val()
		var date31 = $('#date31').val()

		window.open(
			`/print/marriage?p=${printPlace}&d=${date31}&i=${$('#idData').val()}`
		)
	})
	$('#newSelfDeclerationForm').validate({
		rules: {
			applicantFullSelfNameE: {
				required: true,
			},
			applicantFullParentNameE: {
				required: true,
			},
			applicantAadharE: {
				required: true,
			},
			applicantGender: {
				required: true,
			},
			applicantOccupationE: {
				required: true,
			},
			applicantAddressE: {
				required: true,
			},
			applicantVillage: {
				required: true,
			},
			applicantTaluka: {
				required: true,
			},
			applicantState: {
				required: true,
			},
		},
	})
	function compressAndDisplayImage(fileInput, previewImageId, formDataKey) {
		if (fileInput.files && fileInput.files[0]) {
			var reader = new FileReader()
			reader.onload = function (e) {
				var img = new Image()
				img.src = e.target.result

				img.onload = function () {
					const canvas = document.createElement('canvas')
					const ctx = canvas.getContext('2d')

					// Set the target file size range in kilobytes (e.g., between 100 KB and 300 KB)
					const targetMinSizeKB = 100
					const targetMaxSizeKB = 200

					// Initial dimensions
					let maxWidth = 800
					let maxHeight = 1000

					// Maximum number of iterations to avoid an infinite loop
					const maxIterations = 10

					function compress(iteration) {
						// Calculate new width and height while maintaining proportions
						let [newWidth, newHeight] = calculateSize(img, maxWidth, maxHeight)

						canvas.width = newWidth
						canvas.height = newHeight
						ctx.drawImage(img, 0, 0, newWidth, newHeight)

						// Convert the canvas content to a blob (compressed image)
						canvas.toBlob(
							function (blob) {
								const compressedSizeKB = blob.size / 1024

								console.log(
									`Iteration ${iteration}: Compressed ${formDataKey} Size: ${compressedSizeKB} KB`
								)

								// Display the compressed image in the preview
								$('#' + previewImageId).attr('src', URL.createObjectURL(blob))

								// If the compressed size is within the target range, stop
								if (
									compressedSizeKB <= targetMaxSizeKB ||
									compressedSizeKB >= targetMinSizeKB
								) {
									// Add the compressed image to FormData
									formData.set(formDataKey, blob)
									console.log(
										`Final Compressed ${formDataKey} Size: ${compressedSizeKB} KB`
									)
								} else if (iteration < maxIterations) {
									// Adjust the dimensions for the next iteration
									maxWidth *= 0.9 // Decrease by 10%
									maxHeight *= 0.9 // Decrease by 10%

									// Continue to the next iteration
									compress(iteration + 1)
								} else {
									console.log(
										'Maximum iterations reached. Compression stopped.'
									)
								}
							},
							'image/jpeg',
							0.9
						) // Adjust the quality as needed
					}

					// Start the iterative compression process
					compress(1)
				}
			}
			reader.readAsDataURL(fileInput.files[0])
		}
	}
})

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

function calculateSize(img, maxWidth, maxHeight) {
	let width = img.width
	let height = img.height

	if (width > height) {
		if (width > maxWidth) {
			height = Math.round((height * maxWidth) / width)
			width = maxWidth
		}
	} else {
		if (height > maxHeight) {
			width = Math.round((width * maxHeight) / height)
			height = maxHeight
		}
	}

	return [width, height]
}
