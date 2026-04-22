var snapMale = ''
$(document).ready(function () {
	$('#image_1').on('change', function (e) {
		snapMale = ''
		$('#image-1-preview').prop('src', snapMale)
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
						// uploadImage()
					}
					reader.readAsDataURL(input.files[0]) // convert to base64 string
				}
			}
		} else {
			alert('फक्त JPEG किंवा JPG फोटो पाहिजे आणि size 1 MB पर्यंत')
			$(this).val('')
		}
	})

	$(document).on('click', '.galleryAddModel', function (e) {
		e.preventDefault()
		var data = Number($(this).attr('data-id'))
		$('#image_1').val('')
		$('#image-1-preview').prop('src', '')
		$('#progress').addClass('d-none')
		$('#marriageModel').modal({
			show: true,
		})
		$('.modal-title').html('नवीन छायाचित्र जोडा')
	})

	$(document).on('click', '.removeImage', function (e) {
		e.preventDefault()
		var data = {
			url: '/gallery/remove-image',
			method: 'post',
			data: {
				id: $(this).attr('data-id'),
				image: $(this).attr('data-image'),
			},
		}
		alertjs.deleteSpl('सरद छायाचीत्र काढायचे आहे का', function (status) {
			if (status) {
				commonHandler.ajaxManager(data, function (type, data) {
					if (type == false) {
						alert('You Have An Error, PLease check Console')
						console.log(data)
						return false
					}
					if (data.call == 1) {
						alertjs.success(
							{
								t: 'छायाचीत्र',
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


    $(document).on('click', '#submit-gallery-img-btn', uploadImage)

	function uploadImage(e) {
        e.preventDefault()
		let formData = new FormData(document.getElementById('gallery-form'))
		$.ajax({
			url: '/gallery',
			enctype: 'multipart/form-data',
			processData: false, // Important!
			contentType: false,
			cache: false,
			method: 'POST',
			data: formData,
			beforeSend: function () {
				$('#progress').removeClass('d-none')
				$('#progress-bar').prop('value', 0)
			},
			xhr: function () {
				var xhr = new window.XMLHttpRequest()
				xhr.upload.addEventListener(
					'progress',
					function (evt) {
						if (evt.lengthComputable) {
							var percentComplete = (evt.loaded / evt.total) * 100
							$('#progress-bar').prop('value', percentComplete)
						}
					},
					false
				)
				return xhr
			},
			error: function () {
				alert('Your are having server issue')
				window.location.reload()
			},
			success: function (data) {
				if (data.call == 1) {
					alertjs.success(
						{
							t: 'नवीन छायाचित्रे ',
							m: 'यशस्वी रित्या जतन केली आहे.',
						},
						function () {
							$('#marriageModel').modal('hide')
							window.location.reload()
						}
					)
				}
			},
		})
	}
})
