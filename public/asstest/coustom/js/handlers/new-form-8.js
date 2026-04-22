var image = ''
var image2 = ''
$(function () {
	function hasTouchSupport() {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0
	}

	const isMobileDevice = hasTouchSupport()

	var idArray = []
	$('#newAadharNo').mask('0000-0000-0000')

	$(document).on('click', '.getForm8', function (e) {
		window.location.assign('/form-8')
	})

	$(document).on('click', '.getForm8Tax', function (e) {
		homeManager.navigationType = Number($(this).data('id'))
		switch (homeManager.navigationType) {
			case 1:
				$('.modal-title').html('नमुना 8 दुरुस्ती')
				break

			default:
				break
		}
		$('#masterModal').modal({
			show: true,
		})
	})

	$(document).on('click', '#btnGetUserDetails', function (e) {
		e.preventDefault()
		console.log('Printing')
		var value = Number($('#homeId').val())
		if (isNaN(value) || value == null || value == 0) {
			return false
		}
		homeManager.getUserDetails(value)
	})

	$(document).on('blur', '#newMalmattaNo', function (e) {
		e.preventDefault()
		var malmmata = $(this).val()
		if (malmmata == '') {
			$('#newMalmattaNo').val('').focus()
			return false
		}
		var slitText = malmmata.split('/')

		if (slitText.length == 1) {
			var sendData = {
				mNumber: slitText[0],
				checkSub: 0,
			}
		}
		if (slitText.length !== 1) {
			var lastText = slitText[slitText.length - 1]
			if (lastText == '') {
				alert('Invalid Oblique Passed')
				$('#newMalmattaNo').val('').focus()
				return false
			}
		}

		if (slitText.length !== 1) {
			var lastTextIndex = slitText.length - 1
			var lastText = slitText[lastTextIndex]
			var mNumber = slitText[0]
			for (let index = 1; index < lastTextIndex; index++) {
				mNumber += '/' + slitText[index]
			}
			var sendData = {
				mNumber: mNumber,
				checkSub: 1,
			}
		}
		var data = {
			url: '/form-8/checkMalmattaDetails',
			method: 'post',
			data: sendData,
		}
		commonHandler.ajaxManager(data, function (type, data) {
			if (type == false) {
				alert('You Have An Error, PLease check Console')
				console.log(data)
				return false
			}
			console.log(data)
			if (data.call == 1) {
				if (data.subCheck == 0) {
					if (data.id == 0) {
						$('#newMalmattaNoOblique').val(0)
					} else {
						alertjs.warning(
							{
								t: 'सदर मालमत्ता क्रमांक पहिल्याच नोंदविला आहे.',
							},
							function () {
								$('#newMalmattaNo').val('').focus()
								$('#newMalmattaNoOblique').val(0)
							}
						)
					}
				} else {
					if (data.subCheck == 1) {
						if (data.id !== 0) {
							$('#newMalmattaNoOblique').val(data.id)
						} else {
							alertjs.warning(
								{
									t: `सदर मालमत्ता ${sendData.mNumber} क्रमांक माहिती मिळाली नाही.`,
								},
								function () {
									$('#newMalmattaNo').val('').focus()
									$('#newMalmattaNoOblique').val(0)
								}
							)
						}
					}
				}
			}
		})
	})

	let formData = new FormData()
	let homePhotoBlob
	let mapPhotoBlob
	// Function to calculate new width and height while maintaining proportions
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
									// if (previewImageId === 'home-photo-preview') {
									// 	homePhotoBlob = blob
									// } else {
									// 	mapPhotoBlob = blob
									// }
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
	// Attach event handlers
	$('#home-camera-capture-image').change(function () {
		compressAndDisplayImage(this, 'home-photo-preview', 'file1')
	})

	$('#map-camera-capture-image').change(function () {
		compressAndDisplayImage(this, 'map-photo-preview', 'file2')
	})

	$(document).on('click', '#saveNewUserForm', function (e) {
		e.preventDefault()
		console.log('--------------------', isMobileDevice)

		if ($('#newForm8').valid()) {
			// if (true) {
			// $('#saveNewUserForm').addClass('d-none')
			var detailsArray = $('#newForm8').serializeArray()
			details = {}
			$.each(detailsArray, function (index, value) {
				formData.set(value.name, value.value)
				console.log(value.name, ' ----- ', value.value)
			})

			let _date = $('#newPherfarDate').val().split('/')

			let _requiredFormat = [_date[0], _date[1], _date[2]].join('/')

			formData.set('newPherfarDate', _date && _date.length != 1 != '' ? _requiredFormat : '')

			// console.log("REquired format = ", _requiredFormat)
			// return;
			// formData.set('file1', homePhotoBlob);
			// formData.set('file2', mapPhotoBlob);

			// console.log('file1', homePhotoBlob);
			// console.log('file2', mapPhotoBlob)

			if (isMobileDevice) {
				if (!formData.has('file1') || !formData.has('file2')) {
					alertjs.warning({
						t: 'Please upload the photos',
					})
					return
				}
			}

			//Old code to upload file
			/*
			if (image !== '') {
				alert('in image')
				var ImageURL = image // 'photo' is your base64 image
				var block = ImageURL.split(';')
				var contentType = block[0].split(':')[1] // In this case "image/gif"
				var realData = block[1].split(',')[1]
				var blob = b64toBlob(realData, contentType)
				formData.setd('file1', blob)
			}

			if (image2 !== '') {
				var ImageURL = image2 // 'photo' is your base64 image
				var block = ImageURL.split(';')
				var contentType = block[0].split(':')[1] // In this case "image/gif"
				var realData = block[1].split(',')[1]
				var blob2 = b64toBlob(realData, contentType)
				formData.setd('file2', blob2)
			}
			*/

			// Using camera for desktop'

			/*
			if (homePhoto !== '') {
				let ImageURL = homePhoto // 'photo' is your base64 image
				let block = ImageURL.split(';')
				let contentType = block[0].split(':')[1] // In this case "image/gif"
				let realData = block[1].split(',')[1]
				let blob = b64toBlob(realData, contentType)
				formData.setd('file1', blob)
			}

			if (mapPhoto !== '') {
				let ImageURL = mapPhoto // 'photo' is your base64 image
				let block = ImageURL.split(';')
				let contentType = block[0].split(':')[1] // In this case "image/gif"
				let realData = block[1].split(',')[1]
				let blob2 = b64toBlob(realData, contentType)
				formData.setd('file2', blob2)
			}
			*/

			var data = {
				url: '/form-8/addNewFormEntry',
				method: 'post',
				processData: false,
				contentType: false,
				cache: false,
				data: formData,
			}
			$.ajax(data)
				.done(function (data) {
					// $('#saveNewUserForm').removeClass('d-none')
					alertjs.success(
						{
							t: 'नवीन मालमत्ताधाराकाची माहिती',
							m: 'यशस्वी रित्या जतन केली आहे.',
						},
						function () {
							window.location.assign('/form-8/preview/' + data.data, '_blank')
							window.location.reload()
						}
					)
				})
				.fail(function (data) {
					// $('#saveNewUserForm').removeClass('d-none')
					alert('You Have An Error, PLease check Console')
					console.log(data)
				})
		} else {
			alertjs.warning({
				t: 'सर्व  आवश्यक माहिती भरा ',
			})
		}
	})

	$(document).on('keyup', '.isNaN', function (e) {
		console.log('event')
		formHandler.calculateArea1(
			Number($('#newAreaHeightFoot').val()),
			Number($('#newAreaWidthFoot').val())
		)
	})

	$(document).on('keyup', '.isNaN2', function (e) {
		$('.isNaN').val('-')
		console.log(Number($('#newAreaHeightMeter').val()))

		formHandler.calculateFeet(
			Number($('#newAreaHeightMeter').val()),
			Number($('#newAreaWidthMeter').val())
		)
	})

	$(document).on('keyup', '#newTotalAreaSquareFoot', function (e) {
		if (e.which == 9) {
			return false
		}
		$('.isNaN').val('')
		$('.isNaN2').val('')
		var _value = Number($(this).val())
		if (isNaN(_value)) {
			$(this).val('')
			$('#newTotalAreaSquareFoot').val('')
			$('#newTotalAreaSquareMeter').val('')
			return false
		}
		formHandler.calculateSqMeter(
			'#newTotalAreaSquareFoot',
			'#newTotalAreaSquareMeter'
		)
	})

	$(document).on('keyup', '#newTotalAreaSquareMeter', function (e) {
		if (e.which == 9) {
			return false
		}
		$('.isNaN').val('')
		$('.isNaN2').val('')
		var _value = Number($(this).val())
		if (isNaN(_value)) {
			$(this).val('')
			$('#newTotalAreaSquareFoot').val('')
			$('#newTotalAreaSquareMeter').val('')
			return false
		}

		formHandler.calculateSqFeet(
			'#newTotalAreaSquareMeter',
			'#newTotalAreaSquareFoot'
		)
	})

	//File upload image change events
	/*
	$('#image1').on('change', function () {
		image = ''
		$('#image-1-preview').prop('src', '')
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
						image = e.target.result
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
	$('#image2').on('change', function () {
		image2 = ''
		$('#image-2-preview').prop('src', '')
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
						image2 = e.target.result
						$('#image-2-preview').prop('src', e.target.result)
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

	// New camera code
	/*
	let homePhoto = ''

	Webcam.set({
		height: 230,
		image_format: 'jpeg',
		jpeg_quality: 100,
	})

	Webcam.attach('#home-camera-capture-image')
	$(document).on('click', '#home-capture-image-btn', function (e) {
		Webcam.snap(function (data_uri) {
			homePhoto = data_uri
			$('#home-photo-preview').prop('src', data_uri)
		})
	})
	let mapPhoto = ''

	Webcam.attach('#map-camera-capture-image')
	$(document).on('click', '#map-capture-image-btn', function (e) {
		Webcam.snap(function (data_uri) {
			mapPhoto = data_uri
			$('#map-photo-preview').prop('src', data_uri)
		})
	})
	*/

	$('#newForm8').validate({
		rules: {
			spacialWaterTax: {
				number: true,
			},
			generalWaterTax: {
				number: true,
			},
			newMalmattaNo: {
				required: true,
			},
			oldHomeNo: {
				required: true,
			},
			newOwnerName: {
				required: true,
			},
			newSecondOwnerName: {
				required: true,
			},
			newGramPanchayet: {
				required: true,
			},
			newVillageName: {
				required: true,
			},
			gharkulYojna: {
				required: true,
			},
			havingToilet: {
				required: true,
			},
			newTotalAreaSquareFoot: {
				required: true,
			},
			newTotalAreaSquareMeter: {
				required: true,
			},
		},
	})
})
// handler
var homeManager = {
	navigationType: 0,
	getUserDetails(id) {
		var data = {
			url: '/form-8/getSingleUserDetails',
			method: 'post',
			data: {
				id: id,
			},
		}
		commonHandler.ajaxManager(data, function (type, data) {
			if (type == false) {
				alert('You Have An Error, PLease check Console')
				console.log(data)
				return false
			}
			if (data.call == 1) {
				// window.location.assign("/form-8/phase-2/" + data.data);
			} else {
				alertjs.warning(
					{
						t: 'माहिती',
						m: 'वरील अनु/घर क्रमांक सापडले नाही.',
					},
					function () {}
				)
			}
		})
	},
}

var formHandler = {
	id: 0,
	userDetails: {
		malmattaNo: '',
		wardNo: '',
		homeNo: '',
		aadharNo: '',
		ownerName: '',
		secondOwnerName: '',
		mobileNo: '',
		gramPanchayet: '',
		villageName: '',
		gaatNo: '',
		gharkulYojna: '',
		havingToilet: '',
		areaHeight: 0,
		areaWidth: 0,
		totalArea: 0,
		totalAreaSquareMeter: 0,
		eastLandmark: '',
		westLandmark: '',
		northLandmark: '',
		southLandmark: '',
	},
	calculateArea1: function (heightFoot, widthFoot) {
		let sqAreaFoot = heightFoot * widthFoot
		let sqAreaMeter = sqAreaFoot / 10.76

		let areaHeightMeter = heightFoot / 3.28
		let areaWidthMeter = widthFoot / 3.28

		$('#newAreaHeightMeter').val(areaHeightMeter.toFixed(2))
		$('#newAreaWidthMeter').val(areaWidthMeter.toFixed(2))

		$('#newTotalAreaSquareFoot').val(sqAreaFoot.toFixed(2))
		$('#newTotalAreaSquareMeter').val(sqAreaMeter.toFixed(2))
	},
	calculateFeet: function (hM, wM) {
		let hF = Number(hM) * 3.28
		let wF = Number(wM) * 3.28
		$('#newAreaHeightFoot').val(hF.toFixed(2))
		$('#newAreaWidthFoot').val(wF.toFixed(2))

		let areaSqFoot = hF * wF
		let areaSqMeter = hM * wM

		$('#newTotalAreaSquareFoot').val(areaSqFoot.toFixed(2))
		$('#newTotalAreaSquareMeter').val(areaSqMeter.toFixed(2))
	},
	calculateArea: function (h, w, sqArea, sqMeter) {
		console.log(h, w)
		var _h = Number($(h))
		var _w = Number($(w))
		$(sqArea).val(Math.round(_h * _w))
		formHandler.calculateSqMeter(sqArea, sqMeter)
	},
	calculateSqMeter: function (sqArea, sqMeter) {
		var _sqArea = Number($(sqArea).val())
		$(sqMeter).val((_sqArea / 10.76).toFixed(2))
	},

	calculateSqFeet: function (sqArea, sqMeter) {
		var _sqArea = Number($(sqArea).val())
		$(sqMeter).val((_sqArea * 10.76).toFixed(2))
	},
	convertToMeter: function (value) {
		if (value == '') return 0
		if (isNaN(value)) return 0

		return (value / 3.2).toFixed(2)
	},
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
