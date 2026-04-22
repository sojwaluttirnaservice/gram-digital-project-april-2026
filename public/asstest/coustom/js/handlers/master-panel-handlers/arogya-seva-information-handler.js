$(document).ready(function () {
	console.log('arogya seva information js laoded')

	$('#arogyaSevaKendraForm').validate({
		rules: {
			arogya_seva_kendra_name: {
				required: true,
			},
			arogya_seva_kendra_description: {
				required: false,
			},
			arogya_seva_kedra_address: {
				required: true,
			},
			arogya_seva_kendra_mobile: {
				required: true,
			},
			arogya_seva_kedra_time_from: {
				required: true,
			},
			arogya_seva_kedra_time_to: {
				required: true,
			},
		},
	})

	$('#add-new-arogya-sevak-btn').on('click', function (e) {
		e.preventDefault()
		$('#add-new-arogya-sevak-modal').modal('show')
	})

	$('#add-new-arogya-camp-photo-btn').on('click', function (e) {
		e.preventDefault()
		$('#add-new-camp-photo-modal').modal('show')
	})

	$('#upload-arogya-sevak-information-btn').on('click', function (e) {
		e.preventDefault()
		$('.arogya-sevak-information-container').removeClass('d-none')
		$('.arogya-camp-photo-upload-container').addClass('d-none')
	})

	$('#upload-arogya-camp-photos').on('click', function (e) {
		e.preventDefault()
		$('.arogya-sevak-information-container').addClass('d-none')
		$('.arogya-camp-photo-upload-container').removeClass('d-none')
	})

	// upload arogay sevak information to db

	$('#submit-arogya-sevak-information-btn').on('click', function (e) {
		e.preventDefault()
		get_arogay_sevak_form_data((form_data) => {
			post_arogay_sevak_information(form_data)
		})
	})

	$(
		'#arogya-person-time-from, #arogya-person-time-to, #arogya-seva-kendra-time-from, #arogya-seva-kendra-time-to'
	).on('input', function () {
		// alert("hi")
		formatTime(this)
	})

	function formatTime(input) {
		// Remove non-numeric characters
		let sanitizedInput = input.value.replace(/[^0-9]/g, '')
		// Limit to the first 4 characters
		sanitizedInput = sanitizedInput.substring(0, 4)
		// Check if the input is not empty
		if (sanitizedInput.length > 0) {
			// Format the time as HH:MM
			sanitizedInput = sanitizedInput.match(/.{1,2}/g).join(':')
		}
		// Set the formatted value back to the input
		input.value = sanitizedInput
	}

	function get_arogay_sevak_form_data(cb) {
		let data = $('#upload-arogya-sevak-information').serializeArray()
		let formData = new FormData()

		$.each(data, function (index, value) {
			formData.append(value.name, value.value)
		})

		let arogya_person_photo = document.querySelector('#arogya-person-photo')
			.files[0]

		console.log(arogya_person_photo)
		formData.append('person_photo', arogya_person_photo)
		cb(formData)
	}

	function post_arogay_sevak_information(form_data) {

		let request_data = {
			url: '/master/post-arogya-sevak-information',
			method: 'POST',
			data: form_data,
		}

		commonHandler.fetchPromiseRequest(request_data, (data) => {
			if (data.call === 1) {
				alertjs.success({ t: 'Successful' }, () => {
					window.location.reload()
				})
			}
		})
	}

	// delte 
	$(document).on('click', '.delete-arogya_seva_person_info_btn', function (e) {
		e.preventDefault()
		let fileName = $(this).attr('data-sevakImage')
		let delete_id = $(this).attr('data-id')

		alert(`${fileName} - ${delete_id}`)

		fetch('/master/delete-arogya-sevak-information', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fileName, delete_id }),
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				if (result.call === 1) {
					alertjs.success({ t: 'Successful' }, () => {
						window.location.reload()
					})
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Error', m: err }, () => {})
			})
	})

	// camp photo upload
	let file = document.querySelector('#camp-photo-file')
	$('#upload-camp-photo').on('click', function (e) {
		e.preventDefault()

		let currentLocationUrl = window.location.href
		let arogya_seva_kendra_id
		if (currentLocationUrl.includes('/master/arogya-seva-information')) {
			arogya_seva_kendra_id = new URLSearchParams(window.location.search).get(
				'id'
			)
		}

		let fileName = $('#camp-photo-file-name').val().trim()

		if (fileName === '') {
			alertjs.warning({ t: 'Please enter file name' }, () => {})
			return
		}

		if (file.files[0] === undefined || file.files[0] === null) {
			alertjs.warning({ t: 'Please select file' }, () => {})
			return
		}

		let formData = new FormData()
		formData.set('file', file.files[0])
		formData.set('fileName', fileName)
		formData.set('arogya_seva_kendra_id', arogya_seva_kendra_id)

		post_file_data(formData)
	})

	function post_file_data(formData) {
		fetch('/master/upload-arogya-camp-photos', {
			method: 'POST',
			body: formData,
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				if (result.call === 1) {
					alertjs.success({ t: 'Successful' }, () => {
						window.location.reload()
					})
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Error', m: err }, () => {})
			})
	}

	// delte arogya camp photos
	$(document).on('click', '.delete-arogya-camp-photos-btn', function (e) {
		e.preventDefault()

		alertjs.deleteSpl('Confirm Delete ? ', (status) => {
			if (!status) return
		})
		let fileName = $(this).attr('data-fileName')
		let delete_id = $(this).attr('data-id')

		// console.log(fileName, delete_id)

		fetch('/master/delete-arogya-camp-photos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fileName, delete_id }),
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				if (result.call === 1) {
					alertjs.success({ t: 'Successful' }, () => {
						window.location.reload()
					})
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Error', m: err }, () => {})
			})
	})

	//=================================================================================

	//AROGYA SEVA KENDRA HANDLING BELOW ALL

	// alert('Loding')

	$(document).on('click', '#createNewArogyaSevaKendraBtn', function (e) {
		e.preventDefault()
		$('#arogyaSevaKendraModal').modal('show')
	})

	let isArogyaSevaKendraFormEditMode = false
	let arogyaKendraFormData = new FormData()

	function saveArogyaKendraForm() {
		if (!$('#arogyaSevaKendraForm').valid()) {
			return false
		}

		let formDataArray = $('#arogyaSevaKendraForm').serializeArray()

		// Create a FormData object

		// Convert the array to a FormData object
		$.each(formDataArray, function (i, field) {
			arogyaKendraFormData.set(field.name, field.value)
		})

		let imageFile
		if (!isArogyaSevaKendraFormEditMode) {
			imageFile = document.getElementById('arogya-seva-kendra-photo')
			if (!imageFile.files[0]) {
				alertjs.warning({ t: 'Upload the photo' })
				return false
			}

			// Check if a file is selected
			if (imageFile.files && imageFile.files[0]) {
				arogyaKendraFormData.set('arogya_seva_kendra_photo', imageFile.files[0])
			}
			return true
		} else {
			imageFile = document.getElementById('arogya-seva-kendra-photo')
			// Check if a file is selected
			if (imageFile.files && imageFile.files[0]) {
				arogyaKendraFormData.set('arogya_seva_kendra_photo', imageFile.files[0])
			}

			arogyaKendraFormData.set(
				'oldImageName',
				$('#submitArogyaSevaKendraInfoBtn').attr('data-oldImageName')
			)
			arogyaKendraFormData.set(
				'id',
				$('#submitArogyaSevaKendraInfoBtn').attr('data-id')
			)
			// console.log($('#submitArogyaSevaKendraInfoBtn').attr('data-oldImageName'))
			return true
		}
	}
	async function handleSubmitArogyaSevaKendraForm(data) {
		try {
			let url = !isArogyaSevaKendraFormEditMode
				? '/master/save-arogya-seva-kendra-details'
				: '/master/update-arogya-seva-kendra-details'
			const response = await fetch(url, {
				method: 'POST',
				body: data,
			})

			const res = await response.json()

			if (res.call === 1) {
				alertjs.success({
					t: `Successfully ${
						!isArogyaSevaKendraFormEditMode ? 'Submitted' : 'Updated'
					}`,
				})
				isArogyaSevaKendraFormEditMode = false
				window.location.reload()
			} else {
				alertjs.warning({
					t: `Error while ${
						!isArogyaSevaKendraFormEditMode ? 'submission' : 'updation'
					}`,
				})
			}
		} catch (err) {
			console.log('Error while submitting the Arogya seva kendra form : ', err)
		}
	}

	$('#submitArogyaSevaKendraInfoBtn').on('click', async function (e) {
		e.preventDefault()
		if (saveArogyaKendraForm()) {
			handleSubmitArogyaSevaKendraForm(arogyaKendraFormData)
		}
	})

	$('.edit-arogya-seva-kendra-btn').on('click', async function (e) {
		e.preventDefault()
		let id = +$(this).attr('data-id')
		let oldImageName = $(this).attr('data-arogyaSevaKendraImage')
		isArogyaSevaKendraFormEditMode = true

		let requiredKendra = arogyaSevaKendraList.find(
			(kendraObj) => kendraObj.id === id
		)

		console.log(requiredKendra)

		$('#arogya-seva-kendra-name').val(requiredKendra.arogya_seva_kendra_name)
		let time = requiredKendra.arogya_seva_kendra_time.split('-')
		let timeFrom = time[0]
			?.split(':')
			.map((part) => part.padStart(2, '0'))
			.join(':')
		let timeTo = time[1]
			?.split(':')
			.map((part) => part.padStart(2, '0'))
			.join(':')

		if (time.length !== 0 && time[0].trim() !== '') {
			$('#arogya-seva-kendra-time-from').val(timeFrom)
			$('#arogya-seva-kendra-time-to').val(timeTo)
		}
		$('#arogya-seva-kendra-description').val(
			requiredKendra.arogya_seva_kendra_description
		)
		$('#arogya-seva-kendra-address').val(
			requiredKendra.arogya_seva_kendra_address
		)
		$('#arogya-seva-kendra-adhikari-name').val(
			requiredKendra.arogya_seva_kendra_adhikari_name
		)
		$('#arogya-seva-kendra-mobile').val(
			requiredKendra.arogya_seva_kendra_mobile
		)
		$('#arogya-seva-kendra-email').val(requiredKendra.arogya_seva_kendra_email)

		$('#submitArogyaSevaKendraInfoBtn').attr(
			'data-oldImageName',
			requiredKendra.arogya_seva_kendra_image_name
		)
		$('#submitArogyaSevaKendraInfoBtn').attr('data-id', requiredKendra.id)

		$('#arogyaSevaKendraModal').modal('show')
	})

	async function handleDeleteArogyaSevaKendra(values) {
		try {
			let url = '/master/delete-arogya-seva-kendra'
			const response = await fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})

			const res = await response.json()

			if (res.call === 1) {
				alertjs.success({
					t: `Successfully Deleted`,
				})
				isArogyaSevaKendraFormEditMode = false
				window.location.reload()
			} else {
				alertjs.warning({
					t: `Error while Deleting`,
				})
			}
		} catch (err) {
			console.log('Error while deleting the kendra details : ', err)
		}
	}

	$('.delete-arogya-seva-kendra-btn').on('click', async function (e) {
		e.preventDefault()
		let id = $(this).attr('data-id')
		let oldImageName = $(this).attr('data-arogyaSevaKendraImage')

		let values = { id, oldImageName }

		alertjs.deleteSpl('Confirm Deletion', (status) => {
			if(status) {
				handleDeleteArogyaSevaKendra(values)
			}
		})
	})

	$(document).on('click', '.show-arogya-seva-kendra-gallery-btn', function (e) {
		e.preventDefault()
		let id = $(this).attr('data-id')
		let arogyaSevaKendraName = $(this).attr('data-arogyaSevaKendraName')
		window.location.href = `/master/arogya-seva-kendra-gallery-view?id=${id}&arogyaSevaKendraName=${arogyaSevaKendraName}`
	})

	$(document).on('click', '.show-arogya-seva-kendra-btn', function (e) {
		e.preventDefault()
		let id = $(this).attr('data-id')
		let arogyaSevaKendraName = $(this).attr('data-arogyaSevaKendraName')
		// alert('data')
		//New i am working on
		// window.location.href = `/master/master-arogya-kendra-details-view?id=${id}&arogyaSevaKendraName=${arogyaSevaKendraName}`
		//Below prevbious code
		window.location.href = `/master/arogya-seva-information?id=${id}&arogyaSevaKendraName=${arogyaSevaKendraName}`
	})
})
