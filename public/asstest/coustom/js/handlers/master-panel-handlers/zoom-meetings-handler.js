$(function () {
	console.log('Zoom meeting handler master')
	let isEditMode = false
	function setIsEditMode(status) {
		isEditMode = status
	}

	let addingRecordingLink = false
	function setAddingRecordingLink(status) {
		addingRecordingLink = status
	}

	let onlineVillageGuideImage
	let fileExtension

	function setOnlineVillageGuideImage(blob) {
		onlineVillageGuideImage = blob
	}

	function setFileExtension(ext) {
		fileExtension = ext
	}

	const formData = new FormData()
	const elementsToHide = [
		'meeting-title',
		'meeting-date',
		'meeting-time',
		'meeting-description',
		'meeting-link',
		'online-guide-name',
		'online-guide-photo',
	]

	function makeFieldsVisible() {
		elementsToHide.forEach((id) => {
			if ($(`#${id}, label[for="${id}"]`).hasClass('d-none')) {
				$(`#${id}, label[for="${id}"]`).removeClass('d-none')
			}
		})
	}

	$('#add-new-zoom-meeting-btn').on('click', function (e) {
		e.preventDefault()
		makeFieldsVisible()
		$('#add-zoom-meeting-modal').modal('show')
	})

	$('#meetingRecordForm').validate({
		rules: {
			meeting_title: {
				required: true,
			},
			meeting_date: {
				required: true,
			},
			meeting_time: {
				required: true,
			},
			meeting_description: {
				required: true,
			},
			meeting_link: {
				required: true,
			},
			online_guide_name: {
				required: true,
			},
			recording_link: {
				// Exclude the required rule for recording link
			},
		},
	})

	// Image Compression
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

	async function compressAndDisplayImage(
		fileInput,
		previewImageId,
		formDataKey
	) {
		if (fileInput.files && fileInput.files[0]) {
			let reader = new FileReader()
			reader.onload = function (e) {
				let img = new Image()
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

								// console.log(
								// 	`Iteration ${iteration}: Compressed ${formDataKey} Size: ${compressedSizeKB} KB`
								// )

								// Display the compressed image in the preview
								// $('#' + previewImageId).attr('src', URL.createObjectURL(blob))

								// If the compressed size is within the target range, stop
								if (
									compressedSizeKB <= targetMaxSizeKB ||
									compressedSizeKB >= targetMinSizeKB
								) {
									// Add the compressed image to FormData
									// console.log(
									// 	`Final Compressed ${formDataKey} Size: ${compressedSizeKB} KB`
									// )
									console.log('blob')
									formData.set(formDataKey, blob)
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

	$(document).on('change', '#online-guide-photo', function (e) {
		let fileInput = document.querySelector('#online-guide-photo')

		compressAndDisplayImage(
			fileInput,
			'online-guide-image-preview',
			'online_guide_photo'
		)
		setFileExtension(
			fileInput.files && fileInput.files[0]
				? fileInput.files[0].name.split('.').pop()
				: ''
		)
	})

	async function saveForm() {
		if (!$('#meetingRecordForm').valid()) {
			alertjs.warning({
				t: 'Fill all information',
			})
			return false
		}

		if (!isEditMode && !formData.has('online_guide_photo')) {
			alertjs.warning({
				t: 'Upload the image',
			})
			return false
		}

		let formDataArray = $('#meetingRecordForm').serializeArray()

		// Iterate over the serialized array and add non-empty values to FormData
		$.each(formDataArray, function (index, field) {
			formData.set(field.name, field.value.trim())
			// console.log(field.name, field.value.trim())
		})
		formData.set('fileExtension', fileExtension)

		if (isEditMode) {
			formData.set(
				'oldFileName',
				$('#submitMeetingRecordBtn').attr('data-oldFileName')
			)
		}

		// for (const pair of formData.entries()) {
		// 	console.log(pair[0], pair[1])
		// }
		return true
	}

	const handleSubmitMeetingRecord = async () => {
		try {
			let url = !isEditMode
				? `/master/create-zoom-meeting-record`
				: '/master/update-zoom-meeting-record'
			let response = await fetch(url, {
				method: 'POST',
				body: formData,
			})

			let data = await response.json()

			if (data.call === 1) {
				alertjs.success(
					{
						t: `Record ${isEditMode ? 'updated' : 'saved'} successfully`,
					},
					() => {
						window.location.reload()
					}
				)
				if (isEditMode) {
					setIsEditMode(false)
				}
			}
		} catch (err) {
			console.log('Error while saving the record')
			alertjs.warning({
				t: `Error while ${isEditMode ? 'updating' : 'saving'} the record`,
			})
		}
	}

	const handleAddRecordingLink = async (formData) => {
		try {
			let url = `/master/add-recording-link`
			let response = await fetch(url, {
				method: 'POST',
				body: formData,
			})

			let data = await response.json()

			if (data.call === 1) {
				alertjs.success(
					{
						t: `Link Added Succesfully`,
					},
					() => {
						window.location.reload()
					}
				)
				if (addingRecordingLink) {
					setAddingRecordingLink(false)
				}
			}
		} catch (err) {
			console.log('Error while saving the record')
			alertjs.warning({
				t: `Error while adding  the link`,
			})
		}
	}

	const handleDeleteMeetingRecord = async (id, fileName) => {
		try {
			let url = `/master/delete-zoom-meeting-record?id=${id}&fileName=${fileName}`
			let response = await fetch(url, {
				method: 'DELETE',
			})

			let data = await response.json()

			if (data.call === 1) {
				alertjs.success(
					{
						t: `Record Deleted  Succesfully`,
					},
					() => {
						window.location.reload()
					}
				)
			}
		} catch (err) {
			console.log('Error while Deleting the reocrd', err)
			alertjs.warning({
				t: `Error while adding  the link`,
			})
		}
	}

	$('#submitMeetingRecordBtn').on('click', async function (e) {
		e.preventDefault()

		if (addingRecordingLink) {
			if ($('#recording-link').val().trim() === '') {
				alertjs.warning({
					t: 'Add recording link',
				})
				return
			}
			formData.set('recording_link', $('#recording-link').val().trim())
			formData.set('id', $(this).attr('data-id'))
			handleAddRecordingLink(formData)
		} else if (await saveForm()) {
			if (isEditMode) formData.set('id', $(this).attr('data-id'))
			console.log(333333333333333)
			handleSubmitMeetingRecord(formData)
		}
	})

	$('.add-recording-link-btn').on('click', function (e) {
		e.preventDefault()
		let data = JSON.parse($(this).attr('data-data'))
		let id = data.id

		// Hide input elements and their corresponding labels
		elementsToHide.forEach((id) => {
			$(`#${id}, label[for="${id}"]`).addClass('d-none')
		})
		$('#submitMeetingRecordBtn').attr('data-id', id)
		setAddingRecordingLink(true)
		setIsEditMode(false)
		$('#add-zoom-meeting-modal').modal('show')
	})

	$('.edit-meeting-record-btn').on('click', async function (e) {
		e.preventDefault()
		let data = JSON.parse($(this).attr('data-data'))
		let id = data.id
		let oldFileName = data.online_guide_image_name

		makeFieldsVisible()

		const fieldMappings = {
			'meeting-title': 'meeting_title',
			'meeting-date': 'meeting_date',
			'meeting-time': 'meeting_time',
			'meeting-description': 'meeting_description',
			'meeting-link': 'meeting_link',
			'recording-link': 'recording_link',
			'online-guide-name': 'online_guide_name',
		}
		// Set values for input fields
		Object.keys(fieldMappings).forEach((fieldId) => {
			$(`#${fieldId}`).val(data[fieldMappings[fieldId]])
		})

		$('#submitMeetingRecordBtn').attr('data-id', id)
		$('#submitMeetingRecordBtn').attr('data-oldFileName', oldFileName)

		// Show the modal
		setAddingRecordingLink(false)
		setIsEditMode(true)
		$('#add-zoom-meeting-modal').modal('show')
	})

	$('.delete-meeting-record-btn').on('click', async function (e) {
		e.preventDefault()
		let id = $(this).attr('data-id')
		let fileName = $(this).attr('data-fileName')
		makeFieldsVisible()

		setAddingRecordingLink(false)
		setIsEditMode(false)

		alertjs.deleteSpl('Confirm Delete ?', (status) => {
			if (status) {
				handleDeleteMeetingRecord(id, fileName)
			}
		})
	})
})
