$(document).ready(function () {
	let snapMale = ''
	let snapFemale = ''
	$('.aadharNo').mask('0000-0000-0000')
	// $('.marriageDate').mask('00/00/0000')
	$('.marriageDate').datepicker({
		dateFormat: 'dd/mm/yy',
	})

	// let paymentStatus;
	let params = new URLSearchParams(document.location.search)
	let status = params.get('paymentDone') ? params.get('paymentDone') : ''
	if (status === 'success') {
		setDataFromLocalStorage()
		$('#paymentModeModal').modal({ show: true })
		$('#pay-amount').attr('readonly', false)
		$('#pay-malmatta-no').val(localStorage.getItem('malmattaNo'))
		let payPersonName = localStorage.getItem('pay-person-name')
		$('#pay-person-name').val(payPersonName)
		paymentDetails.personName = payPersonName
	}


    const debouncedTranslate = commonjsDebounce(function (value, input) {
        commonHandler.translateWord(value, function (data) {
            $(input).val(data);
        });
    }, 200); // adjust delay if needed


	$(document).on('input change', '.mainText', function (e) {
		e.preventDefault()
		let value = $(this).val()
		let input = $(this).siblings('.secText')
        debouncedTranslate(value, input);
	})

	$(document).on('focus', '.secText', function (e) {
		window.getSelection().removeAllRanges()
	})

	$(document).on('click', '.search-pending-tax-btn', async function () {
		let malmattaNo = +$('.malmatta-no').val()
		paymentDetails.malmattaNo = malmattaNo
		paymentDetails.personName = $('input[name="marriageHusbandNameM"]').val()
		// paymentDetails.malmattaNo = $('#malmatta-no').val();
		let userId = await commonHandler.checkTaxPaidByMalmattaNo(malmattaNo)
		paymentDetails.userId = userId
	})

	$(document).on('click', '.button-offline-pay', function (e) {
        alert('hiiiiii')
		e.preventDefault()

		//common js
		if (!isPaymentModalMobileFilled()) return

		paymentDetails.amount = $('#pay-amount').val()
		// console.log(paymentDetails.amount, "(paymentDetails.amount")
		// alert('TRYING TO DO PAYMENT')
		// return;

		paymentDetails.malmattaNo = $('#pay-malmatta-no').val()
		paymentDetails.personName = $('#pay-person-name').val()
		paymentDetails.paymentFor = 3 // FOR MARRIAGE (SEE common.js FOR MORE DESCRIPTION)
        paymentDetails.tax_category = "SAMANYA"

		paymentMode.offline(paymentDetails, function (call, actualResult) {
            console.log('---------------')
            console.log(actualResult)
            console.log("--------------")
			if (call === 1) {
				const data = {
					paymentFor: 'विवाह नोंदणी',
					paymentMode: 0,
					sms: '', //if sms is undefined or '' i.e. empty Strring, we will use defaultSms format
					mobile: `${$('#pay-mobile-no').val()}`,
				}

                const paymentId = actualResult.reciptNumber

				handleSendGpSMS(data)
				saveMarriageRegistration(()=>{}, paymentId)
			}
		})
	})

	// PRINT PAYMENT RECIPT
	$(document).on('click', '.print-payment-recipt-btn', function (e) {
		e.preventDefault()
		console.log(paymentDetails.amount)
		commonHandler.translate(paymentDetails.amount, function (inWord) {
			paymentDetails.amountInwords = inWord
			printCertificatePaymentRecipt(paymentDetails)
			// window.open('/marriage', '_self')
			localStorage.clear()
		})
	})

	$(document).on('click', '#authorityToBypassBtn', function (e) {
		e.preventDefault()
		if (!isMarriageRegistrationFormValid()) {
			return
		}
		$('#paymentModeModal').modal('show')
		$('#pay-amount').attr('readonly', false)
		$('#pay-malmatta-no').attr('readonly', false)
		$('#pay-person-name').val($('#marriageHusbandNameM').val())
	})

	//Save Marriage
	$(document).on('click', '#saveMarriage', function (e) {
		e.preventDefault()

		if (!isMarriageRegistrationFormValid()) {
			return
		}


        // DIRECTLY SAVING THE MARRIAGE REGISTRATION, INSTEAD OF CHECKING THE TAX,

        saveMarriageRegistration(()=>{
            location.href = '/marriage/list'
        })

        // IF WE WANT TO RE-ENABLE THE PREVIOUS FEATURE, JUST UNCCOMENT THE BELOW CODE AND COMMENT THE ABOVE CODE LINE

        /**
         
		storeFormDataToLocalstorage()
		$('.check-tax-paid-modal').modal({ show: true })
        */
	})

	// REDICRECT TO TAX PAYMENT PAGE FOR PAYING TAX (taking id which is first column of form eight user table)
	$(document).on('click', '.pay-pending-tax-btn', function () {
		localStorage.setItem('malmattaNo', paymentDetails.malmattaNo)
		window.location.assign(
			`/tax-payer?malmattaNo=${paymentDetails.malmattaNo}&user_id=${paymentDetails.userId}`
		)
	})

	setDataFromLocalStorage()
	function setDataFromLocalStorage() {
		let localData = JSON.parse(localStorage.getItem('marriageFormData'))
		let localSnapMale = localStorage.getItem('snapMale')
		let localSnapFemale = localStorage.getItem('snapFemale')
		// THIS FOLLOWING CODE = CHECKS IF THERE IS ANY DATA IN LOCALSTORAGE AND MAPS TO THE INPUT FIELDS AS THEIR VALUES.
		if (localData !== null) {
			if (localData.length > 0) {
				for (let i = 0; i < localData.length; i++) {
					for (let j of Object.entries(localData[i])) {
						$(`[name=${j[0]}`).val(j[1])
					}
				}
			}
		}
		if (localSnapFemale !== null) {
			snapFemale = localSnapFemale
			$('#image-2-preview').prop('src', localSnapFemale)
		}

		if (localSnapMale !== null) {
			snapMale = localSnapMale
			$('#image-1-preview').prop('src', localSnapMale)
		}
	}

	function isMarriageRegistrationFormValid() {
		if ($('#newMarriageForm').valid()) {
			let file1 = $('#image_1')[0].files[0]
			let file2 = $('#image_2')[0].files[0]
			// console.log(snapMale)
			// console.log(typeof file1)
			// console.log(snapFemale)
			// console.log(typeof file2)
			if (snapMale == '' && typeof file1 == 'undefined') {
				alertjs.warning({
					t: 'पतीचा फोटो पाहिजे',
				})
				return false
			}
			if (snapFemale === '' && typeof file2 == 'undefined') {
				alertjs.warning({
					t: 'पत्नीचा फोटो पाहिजे',
				})
				return false
			}

            let formData = new FormData(document.getElementById('newMarriageForm'))

            if(!formData.get('registration_date')){
               alertjs.warning({
					t: 'नोंदणी दिनांक आवश्यक.',
				})
				return false 
            }
            
			return true
		}

		alertjs.warning({
			t: 'Fill all required fields',
		})
		return false
	}

	function storeFormDataToLocalstorage() {
		if (isMarriageRegistrationFormValid()) {
			let detailsArray = $('#newMarriageForm').serializeArray()
			details = {}
			let formData = new FormData($('#newMarriageForm')[0])
			localStorage.setItem(
				'pay-person-name',
				$('[name=marriageHusbandNameE]').val()
			)

			saveDataToLocalStorage(formData)
			if (snapMale !== '') {
				let ImageURL = snapMale
				localStorage.setItem('snapMale', ImageURL)
			} else {
				let file1 = $('#image_1')[0].files[0]
				if (typeof file1 == 'undefined') {
					alertjs.warning({ t: 'पतीचा फोटो पाहिजे' })
					return false
				}
				let reader = new FileReader()
				reader.readAsDataURL(file1)
				reader.onload = function (e) {
					localStorage.setItem('snapMale', e.target.result)
				}
			}

			if (snapFemale !== '') {
				let ImageURL = snapFemale // 'photo' is your base64 image
				localStorage.setItem('snapFemale', ImageURL)
			} else {
				let file2 = $('#image_2')[0].files[0]
				if (typeof file2 == 'undefined') {
					alertjs.warning({ t: 'पत्नीचा फोटो पाहिजे' })
					return false
				}
				let reader = new FileReader()
				reader.readAsDataURL(file2)
				reader.onload = function (e) {
					localStorage.setItem('snapFemale', e.target.result)
				}
				// here to make change
			}
			return true
		}
	}

	function saveDataToLocalStorage(formData) {
		let data = []
		for (let i of formData) {
			let _name = i[0]
			let _val = i[1]
			data.push({ [_name]: _val })
		}
		localStorage.setItem('marriageFormData', JSON.stringify(data))
	}

	function saveMarriageRegistration(callback= ()=>{}, paymentId = '') {
		if (isMarriageRegistrationFormValid()) {
			let detailsArray = $('#newMarriageForm').serializeArray()
			details = {}
			let formData = new FormData($('#newMarriageForm')[0])
			let file1
			let file2
			if (snapMale !== '') {
				// console.log(`snapMale : ${snapMale}`)
				let ImageURL = snapMale // 'photo' is your base64 image
				// console.log(`imageMale : ${ImageURL}`)
				let block = ImageURL.split(';')
				// console.log(`block male: ${block}`)
				let contentType = block[0].split(':')[1] // In this case "image/gif"
				// console.log(`Content Type male: ${contentType}`)
				let realData = block[1].split(',')[1]
				// console.log(`Real Data male: ${realData}`)
				let blob = b64toBlob(realData, contentType)
				formData.set('file1', blob)
			} else {
				file1 = $('#image_1')[0].files[0]
				if (typeof file1 == 'undefined') {
					alert('पतीचा फोटो पाहिजे')
					return false
				}
				formData.set('file1', file1)
			}

			if (snapFemale !== '') {
				// console.log(`snapFemale : ${snapFemale}`)
				let ImageURL = snapFemale // 'photo' is your base64 image
				// console.log(`imageFemale : ${ImageURL}`)
				let block = ImageURL.split(';')
				// console.log(`block : ${block}`)
				let contentType = block[0].split(':')[1] // In this case "image/gif"
				// console.log(`Content Type : ${contentType}`)
				let realData = block[1].split(',')[1]
				// console.log(`Real Data : ${realData}`)
				let blob = b64toBlob(realData, contentType)
				formData.set('file2', blob)
			} else {
				file2 = $('#image_2')[0].files[0]
				if (typeof file2 == 'undefined') {
					alert('पत्नीचा फोटो पाहिजे')
					return false
				}
				formData.set('file2', file2)
			}

            formData.set('ps_payment_information_id_fk', paymentId)

			let data = {
				url: '/marriage/saveNewDetails',
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
								t: 'नवीन विवाह नोंदणी',
								m: 'यशस्वी रित्या जतन केली आहे.',
							},
							function () {
								// window.location.assign('/marriage');
								localStorage.removeItem('marriageFormData')
                                callback()
							}
						)
					}
				})
				.fail(function (xhr) {
					alert('You Have An Error, PLease check Console')
					console.log(data)
					return false
				})
		}
	}

	$(document).on('click', '#editSaveMarriage', function (e) {
		e.preventDefault()
		if ($('#editMarriageForm').valid()) {
			let detailsArray = $('#editMarriageForm').serializeArray()
			details = {}
			let formData = new FormData($('#editMarriageForm')[0])
			if (snapMale !== '') {
				let ImageURL = snapMale // 'photo' is your base64 image
				let block = ImageURL.split(';')
				let contentType = block[0].split(':')[1] // In this case "image/gif"
				let realData = block[1].split(',')[1]
				let blob = b64toBlob(realData, contentType)
				formData.set('file1', blob)
			} else {
				let file1 = $('#image_1')[0].files[0]
				if (typeof file1 == 'undefined') {
					console.log('here')
					file1 = formId
				}
				formData.set('file1', file1)
			}

			if (snapFemale !== '') {
				let ImageURL = snapFemale // 'photo' is your base64 image
				let block = ImageURL.split(';')
				let contentType = block[0].split(':')[1] // In this case "image/gif"
				let realData = block[1].split(',')[1]
				let blob = b64toBlob(realData, contentType)
				formData.set('file2', blob)
			} else {
				let file2 = $('#image_2')[0].files[0]
				if (typeof file2 == 'undefined') {
					file2 = formId
				}
				formData.set('file2', file2)
			}
			formData.set('id', formId)
			let data = {
				url: '/marriage/update-edit-marriage',
				method: 'POST',
				enctype: 'multipart/form-data',
				processData: false, // Important!
				contentType: false,
				cache: false,
				data: formData,
			}
			$.ajax(data)
				.done(function (data) {
					if (data.call == 1) {
						alertjs.success(
							{
								t: 'नवीन विवाह नोंदणी',
								m: 'यशस्वी रित्या जतन केली आहे.',
							},
							function () {
								window.location.assign('/marriage/list')
							}
						)
					}
				})
				.fail(function (xhr) {
					alert('You Have An Error, PLease check Console')
					console.log(data)
					return false
				})
		}
	})

	$('#image_1').on('change', function (e) {
		snapMale = ''
		$('#image-1-preview').prop('src', snapMale)
		let input = $(this)[0]
		let fileName = $(this).val().split('\\').pop()

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
					let reader = new FileReader()
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

	$('#image_2').on('change', function (e) {
		snapFemale = ''
		$('#image-2-preview').prop('src', snapFemale)
		let input = $(this)[0]
		let fileName = $(this).val().split('\\').pop()
		if (input.files && input.files[0]) {
			// if (input.files[0].size > 1048576) {
			// 	alert('Try to upload file less than 1MB!')
			// 	$(this).val('')
			// 	e.preventDefault()
			// } else {
			$(this).siblings('.custom-file-label').addClass('selected').html(fileName)
			let reader = new FileReader()
			reader.onload = function (e) {
				$('#image-2-preview').prop('src', e.target.result)
			}
			reader.readAsDataURL(input.files[0]) // convert to base64 string
			// }
		}
	})

	$(document).on('click', '#marriage-register-report-print-btn', function (e) {
		e.preventDefault()
		let month = +$(`[name='month']`).val(),
			year = $(`[name='year']`).val()

		if (isNaN(month) || month > 12 || month < 0) {
			alertjs.warning({
				t: 'योग्य महिना भरा',
			})
			return
		}

		if (isNaN(year) || year.length != 4) {
			alertjs.warning({
				t: 'योग्य वर्ष भरा',
			})
			return
		}

		$(`#monthYearModal`).modal('hide')

		window.open(
			`/marriage/marriage-register-report-print?month=${month}&year=${year}`
		)
	})

	$(document).on('click', '.printModel', function (e) {
		e.preventDefault()
		console.log('print m certificate')
		$('#printPlace').val('')
		$('#date31').val('')
		let data = Number($(this).attr('data-id'))
		$('#idData').val(data)
		$('#marriageModel').modal({
			show: true,
		})
		$('.modal-title').html('विवाह नोंदणी प्रिंट')
	})

	$(document).on('click', '#btnPrintCertificate', function (e) {
		e.preventDefault()
		let printPlace = $('#printPlace').val()
		let date31 = $('#date31').val()

		window.open(
			`/print/marriage?p=${printPlace}&d=${date31}&i=${$('#idData').val()}`, '_blank'
		)
	})

	$(document).on('click', '#btnPrintMarriageCertificate', function (e) {
		e.preventDefault()
		let printPlace = $('#printPlace').val()
		let date31 = $('#date31').val()
		let format = $(this).attr('data-format')

		window.open(
			`/print/marriage?p=${printPlace}&d=${date31}&i=${$('#idData').val()}&format=${format}`,
			'_blank'
		)
	})


	$(document).on('click', '.editMarriage', function (e) {
		e.preventDefault()
		const id = $(this).attr('data-id')
		console.log(id, 'edit marriage id')
		window.open('/marriage/edit-marriage/' + id)
	})

	$(document).on('click', '.removeMarriage', function (e) {
		e.preventDefault()
		// console.log($(this).attr('data-id'))
		let certId = $(this).attr('data-certId')

		alertjs.delete(function (status) {
			if (status == true) {
				let data = {
					url: '/marriage/remove-marriage',
					method: 'post',
					data: {
						id: certId,
					},
				}
				commonHandler.ajaxManager(data, function (type, data) {
					if (type == false) {
						alert('You Have An Error, PLease check Console')
						console.log(data)
						return false
					}
					if (data.call == 1) {
						alertjs.success(
							{
								t: 'विवाह नोंदणी',
								m: 'यशस्वी रित्या काढल्या गेली.',
							},
							function () {
								window.location.reload()
							}
						)
					}
				})
			}
		})
	})

	//Payment

	$(document).on('click', '.closepaymentModeOptionsModal', (e) => {
		e.preventDefault()
		$('#paymentModeOptionsModal').modal('hide')
	})

	async function compressImage(imageData) {
		return new Promise((resolve, reject) => {
			let img = new Image()
			img.src = imageData

			img.onload = async function () {
				let canvas = document.createElement('canvas')
				let ctx = canvas.getContext('2d')

				// Set the target file size range in kilobytes (e.g., between 100 KB and 300 KB)
				const targetMinSizeKB = 100
				const targetMaxSizeKB = 200

				// Initial dimensions
				let maxWidth = 800
				let maxHeight = 1000

				// Maximum number of iterations to avoid an infinite loop
				let maxIterations = 10

				async function compress(iteration) {
					let [newWidth, newHeight] = calculateSize(img, maxWidth, maxHeight)

					canvas.width = newWidth
					canvas.height = newHeight
					ctx.drawImage(img, 0, 0, newWidth, newHeight)

					canvas.toBlob(
						async function (blob) {
							let compressedSizeKB = blob.size / 1024
							console.log(
								`Iteration ${iteration}: Compressed Size: ${compressedSizeKB} KB`
							)

							if (
								compressedSizeKB <= targetMaxSizeKB ||
								compressedSizeKB >= targetMinSizeKB
							) {
								resolve(URL.createObjectURL(blob))
							} else if (iteration < maxIterations) {
								maxWidth *= 0.9
								maxHeight *= 0.9
								await compress(iteration + 1)
							} else {
								console.log('Maximum iterations reached. Compression stopped.')
								reject('Compression failed')
							}
						},
						'image/jpeg',
						0.9
					)
				}

				compress(1)
			}
		})
	}

	Webcam.set({
		width: 220,
		height: 190,
		image_format: 'jpeg',
		jpeg_quality: 100,
	})

	Webcam.attach('#cameraMale')
	Webcam.set({
		width: 220,
		height: 190,
		image_format: 'jpeg',
		jpeg_quality: 100,
	})
	Webcam.attach('#cameraFemale')
	// SHOW THE SNAPSHOT.
	$(document).on('click', '#spanFemale', function (e) {
		Webcam.snap(function (data_uri) {
			snapFemale = data_uri
			$('#image-2-preview').prop('src', data_uri)
		})
	})

	$(document).on('click', '#spanMale', function (e) {
		Webcam.snap(function (data_uri) {
			snapMale = data_uri
			// console.log(snapMale)
			$('#image-1-preview').prop('src', data_uri)
		})
	})
})
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
