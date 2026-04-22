$(function () {
	console.log('update view handler ')
	function hasTouchSupport() {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0
	}

	const isMobileDevice = hasTouchSupport()

	let searchType = 1

	// let homePhoto = ''
	// let mapPhoto = ''

	// function attachWebcam() {
	// 	Webcam.set({
	// 		height: 230,
	// 		image_format: 'jpeg',
	// 		jpeg_quality: 100,
	// 	})

	// 	Webcam.attach('#home-camera-capture-image')
	// 	Webcam.attach('#map-camera-capture-image')
	// }

	// attachWebcam()

	// $(document).on('click', '#home-capture-image-btn', function (e) {
	// 	Webcam.snap(function (data_uri) {
	// 		homePhoto = data_uri
	// 		$('#home-photo-preview').prop('src', data_uri)
	// 	})
	// })

	// // Webcam.attach('#map-camera-capture-image')
	// $(document).on('click', '#map-capture-image-btn', function (e) {
	// 	Webcam.snap(function (data_uri) {
	// 		mapPhoto = data_uri
	// 		$('#map-photo-preview').prop('src', data_uri)
	// 	})
	// })

	/*

	$('#home-camera-capture-image').change(function (e) {
		var fileInput = e.target
		var previewImage = $('#home-photo-preview')[0]

		if (fileInput.files && fileInput.files[0]) {
			var reader = new FileReader()

			reader.onload = function (e) {
				previewImage.src = e.target.result
			}

			reader.readAsDataURL(fileInput.files[0])
		}
	})

	$('#map-camera-capture-image').change(function (e) {
		var fileInput = e.target
		var previewImage = $('#map-photo-preview')[0]

		if (fileInput.files && fileInput.files[0]) {
			var reader = new FileReader()

			reader.onload = function (e) {
				previewImage.src = e.target.result
			}

			reader.readAsDataURL(fileInput.files[0])
		}
	})
	*/

	$(document).on('input keyup', '.isNaN', function (e) {
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

	$(`[name='newPherfarDate']`).datepicker({
		dateFormat: 'dd/mm/yy',
		changeMonth: true,
		changeYear: true,
	})

	function getUserDetails() {
		var value = Number($('#homeId').val())
		if (isNaN(value) || value == null || value == 0) {
			return false
		}
		homeManager.getUserDetails(value, function (data) {
			//Added comment here

			// console.log("DATATATAA= ", data)
			// console.log(data.allOldOwnerList);

			// let oldOwnerList = data.allOldOwnerList ? data.allOldOwnerList.join(', ') : '';
			// image = ''
			// image2 = ''
			if (data.call == 1) {
				let oldOwnerList = data.allOldOwnerList.join(', ')
				homeManager.tempUserDetails = data.data
				data = data.data
				console.log(data)

				$('.myMainId').val(data.id)
				$('#newMalmattaNo').val(data.feu_malmattaNo)
				$('#newWardNo').val(data.feu_wardNo)
				$('#oldHomeNo').val(data.feu_homeNo)
				$('#newOwnerName').val(data.feu_ownerName)
				$('#newSecondOwnerName').val(data.feu_secondOwnerName)
				$('#newMobileNo').val(data.feu_mobileNo)
				$('#newAadharNo').val(data.feu_aadharNo)
				$('#newGramPanchayet').val(data.feu_gramPanchayet)
				$('#newVillageName').val(data.feu_villageName)
				$('#newGaatNo').val(data.feu_gaatNo)
				$('#gharkulYojna').val(data.feu_gharkulYojna)
				$('#havingToilet').val(data.feu_havingToilet)

				$('#newAreaHeightMeter').val((data.feu_areaHeight / 3.281).toFixed(2))
				$('#newAreaWidthMeter').val((data.feu_areaWidth / 3.281).toFixed(2))

				$('#newAreaHeightFoot').val(data.feu_areaHeight)
				$('#newAreaWidthFoot').val(data.feu_areaWidth)
				$('#newTotalAreaSquareFoot').val(data.feu_totalArea)
				$('#newTotalAreaSquareMeter').val(data.feu_totalAreaSquareMeter)
				$('#newEastLandmark').val(data.feu_eastLandmark)
				$('#newWestLandmark').val(data.feu_westLandmark)
				$('#newNorthLandmark').val(data.feu_northLandmark)
				$('#newSouthLandmark').val(data.feu_southLandmark)
				$('#newBojaShera').val(data.feu_bojaShera)
				$('#newOldDharak').val(
					oldOwnerList ? oldOwnerList : data.feu_newOldDharak
				)
				$('#newNewDharak').val(data.feu_newNewDharak)

				let _fetchedDate = data.feu_newPherfarDate.split('/')
				let _showFormatDate =
					_fetchedDate.length !== 1
						? [_fetchedDate[0], _fetchedDate[1], _fetchedDate[2]].join('/')
						: '-'

				$('#newPherfarDate').val(_showFormatDate)
				$('#newPherfarTharav').val(data.feu_newPherfarTharav)
				$('#newPherfarDocument').val(data.feu_newPherfarDocument)
				$('#waterTax').val(data.feu_water_tax)
				$('#divUserDetails').removeClass('d-none')
				$('.pherfar-text').val(
					`${data.feu_newOldDharak} मासिक सभा दिनांक ${data.feu_newPherfarDate} ठराव क्र ${data.feu_newPherfarTharav} नुसार ${data.feu_newNewDharak} ${data.feu_newPherfarDocument} नुसार फेरफार घेण्यात आला`
				)
				// $('#image-1-preview').prop(
				// 	'src',
				// 	`/home_map_image/home_photo/${data.feu_malmattaNo}.jpeg`
				// )
				// $('#image-2-preview').prop(
				// 	'src',
				// 	`/home_map_image/map_photo/${data.feu_malmattaNo}_map.jpeg`
				// )
				$('#home-photo-preview').prop(
					'src',
					`/home_map_image/home_photo/${data.feu_image || `${data.feu_malmattaNo}.jpeg`}`
				)
				$('#map-photo-preview').prop(
					'src',
					`/home_map_image/map_photo/${data.feu_image_map || `${data.feu_malmattaNo}_map.jpeg`}`
				)
			} else {
				$('#divUserDetails').addClass('d-none')

				alertjs.warning(
					{
						t: 'माहिती',
						m: 'वरील अनु/घर क्रमांक सापडले नाही.',
					},
					function () {}
				)
			}
		})
	}

	//Old image file upload code

	/*
    $('#image1').on('change', function () {
        image = '';
        $('#image-1-preview').prop('src', '');
        var input = $(this)[0];
        var fileName = $(this).val().split('\\').pop();

        extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        if (
            extension == 'jpeg' ||
            extension == 'JPEG' ||
            extension == 'jpg' ||
            extension == 'JPG'
        ) {
            if (input.files && input.files[0]) {
                if (input.files[0].size > 1048576) {
                    alert('Try to upload file less than 1MB!');
                    $(this).val('');

                    e.preventDefault();
                } else {
                    $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        image = e.target.result;
                        $('#image-1-preview').prop('src', e.target.result);
                    };
                    reader.readAsDataURL(input.files[0]); // convert to base64 string
                }
            }
        } else {
            alert('फक्त JPEG किंवा JPG फोटो पाहिजे आणि size 1 MB पर्यंत');
            $(this).val('');
        }
    });
    $('#image2').on('change', function () {
        image2 = '';
        $('#image-2-preview').prop('src', '');
        var input = $(this)[0];
        var fileName = $(this).val().split('\\').pop();

        extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        if (
            extension == 'jpeg' ||
            extension == 'JPEG' ||
            extension == 'jpg' ||
            extension == 'JPG'
        ) {
            if (input.files && input.files[0]) {
                if (input.files[0].size > 1048576) {
                    alert('Try to upload file less than 1MB!');
                    $(this).val('');

                    e.preventDefault();
                } else {
                    $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        image2 = e.target.result;
                        $('#image-2-preview').prop('src', e.target.result);
                    };
                    reader.readAsDataURL(input.files[0]); // convert to base64 string
                }
            }
        } else {
            alert('फक्त JPEG किंवा JPG फोटो पाहिजे आणि size 1 MB पर्यंत');
            $(this).val('');
        }
    });

    */

	$('#selectSearch-1').on('change', function () {
		searchType = Number($(this).val())
		$('#homeId-type').val('')
		$('#homeId').val('')
	})


	$('#homeId-type')
		.autocomplete({
			minLength: 1,
			source: function (request, response) {
				$('#homeId').val('')
				$('#divUserDetails').addClass('d-none')
				$.ajax({
					url: '/get-user-info',
					method: 'post',
					data: {
						q: request.term,
						sType: searchType,
					},
					success: function (data) {
						console.log(data.call)
						// console.log("I am in homeid 201")
						response(data.call)
					},
				})
			},
			focus: function (event, ui) {
				$('#homeId-type').val(ui.item.label)
				return false
			},
			select: function (event, ui) {
				$('#homeId-type').val(ui.item.label)
				$('#homeId').val(ui.item.id)
				getUserDetails()
				return false
			},
		})
		.data('ui-autocomplete')._renderItem = function (ul, item) {
		return $('<li>')
			.data('ui-autocomplete-item', item)
			.append('<a style="display:block;width:100%;"> ' + item.label + '</a>')
			.appendTo(ul)
	}

	let formData = new FormData()
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

	$(document).on('click', '#updateUserForm', function (e) {
		e.preventDefault()
		if ($('#divUserDetails').valid()) {
			var detailsArray = $('#divUserDetails').serializeArray()
			details = {}

			$.each(detailsArray, function (index, value) {
				formData.set(value.name, value.value)
				console.log(value.name, value.value)
			})

			formData.set('id', homeManager.tempUserDetails.id)

			let _date = $('#newPherfarDate').val().split('/')
			let _requiredFormat = [_date[0], _date[1], _date[2]].join('/')
			formData.set(
				'newPherfarDate',
				_date && _date.length != 1 ? _requiredFormat : ''
			)

			//Old code to upload file
			/*
            if (image !== '') {
                var ImageURL = image; // 'photo' is your base64 image
                var block = ImageURL.split(';');
                var contentType = block[0].split(':')[1]; // In this case "image/gif"
                var realData = block[1].split(',')[1];
                var blob = b64toBlob(realData, contentType);
                formData.set('file1', blob);
            }

            if (image2 !== '') {
                var ImageURL = image2; // 'photo' is your base64 image
                var block = ImageURL.split(';');
                var contentType = block[0].split(':')[1]; // In this case "image/gif"
                var realData = block[1].split(',')[1];
                var blob2 = b64toBlob(realData, contentType);
                formData.set('file2', blob2);
            }
	        */

			// Using camera on desktop

			/*
			if (homePhoto !== '') {
				let ImageURL = homePhoto // 'photo' is your base64 image
				let block = ImageURL.split(';')
				let contentType = block[0].split(':')[1] // In this case "image/gif"
				let realData = block[1].split(',')[1]
				let blob = b64toBlob(realData, contentType)
				formData.set('file1', blob)
			}

			if (mapPhoto !== '') {
				let ImageURL = mapPhoto // 'photo' is your base64 image
				let block = ImageURL.split(';')
				let contentType = block[0].split(':')[1] // In this case "image/gif"
				let realData = block[1].split(',')[1]
				let blob2 = b64toBlob(realData, contentType)
				formData.set('file2', blob2)
			}

            */

			// for mobile

			/*
			let fileInput1 = $('#home-camera-capture-image')[0]

			// Check if a file is selected
			if (fileInput1.files && fileInput1.files[0]) {
				let fileData = fileInput1.files[0]
				formData.set('file1', fileData)
			}

			let fileInput2 = $('#map-camera-capture-image')[0]

			// Check if a file is selected
			if (fileInput2.files && fileInput2.files[0]) {
				let fileData = fileInput2.files[0]
				formData.set('file2', fileData)
			}

			*/

			// console.log("berofer reutrn");
			// return;

			var data = {
				url: '/form-8/updateFormEntry',
				method: 'post',
				processData: false,
				contentType: false,
				cache: false,
				data: formData,
			}

			$.ajax(data)
				.done(function (data) {
					if (data.call == 1) {
						alertjs.success(
							{
								t: 'मालमत्ताधाराकाची माहिती',
								m: 'यशस्वी रित्या बद्दली आहे.',
							},
							function () {
								// window.location.reload()
							}
						)
					}
				})
				.fail(function (data) {
					alert('You Have An Error, PLease check Console')
					console.log(data, 'here')
					return false
				})
		}
	})

	$(document).on('click', '#moveMore', function (e) {
		e.preventDefault()
		window.location.assign('/form-8/phase-2/' + homeManager.tempUserDetails.id)
	})

	if (isMobileDevice) {
		$('#removeUserDetails').addClass('d-none')
	}

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

	$(document).on('click', '#removeUserDetails', function (e) {
		e.preventDefault()

		alertjs.deleteSpl('Confirm Delete ?', (status) => {
			if (!status) return
		})

		alertjs.delete(function (status) {
			if (status == false) {
				return false
			} else {
				formData = new FormData()
				formData.set('id', homeManager.tempUserDetails.id)
				formData.set(
					'feu_malmattaNo',
					homeManager.tempUserDetails.feu_malmattaNo
				)
				var data = {
					url: '/form-8/deleteUserDetails',
					method: 'post',
					processData: false,
					contentType: false,
					cache: false,
					data: formData,
				}
				$.ajax(data)
					.done(function (data) {
						if (data.call == 1) {
							alertjs.success(
								{
									t: 'मालमत्ताधाराकाची माहिती',
									m: 'यशस्वी रित्या काढल्या गेली आहे.',
								},
								function () {
									window.location.reload()
								}
							)
						}
					})
					.fail(function (data) {
						alert('You Have An Error, PLease check Console 11')
						console.log(data)
						return false
					})
			}
		})
	})
})

var homeManager = {
	// these d1, d2, pavatiName,rupee are for form eight print
	d1: $('#d1').val(),
	d2: $('#d2').val(),
	pavtiName: $('#pavtiName').val(),
	ruppe: $('#pavtiRuppe').val(),

	tempUserDetails: {},
	navigationType: 0,
	openPrintToNewTab: function (url) {
		w = window.open(url)
		w.onunload = function () {
			console.log('closed!')
		}
	},

	getUserDetails(id, callback) {
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
			callback(data)
		})
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
		homeManager.calculateSqMeter(sqArea, sqMeter)
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
