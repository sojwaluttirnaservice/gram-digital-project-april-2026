$(document).ready(() => {
	console.log('job yojna e js laoded')

	//REquied vars
	let linkUpload
	let fileUpload = true
	let isEditMode = false
	let formData = new FormData()

	$('#link-upload-toggle').on('click', function (e) {
		e.preventDefault()
		$('.fa-toggle-on').toggleClass('d-none')
		$('.fa-toggle-off').toggleClass('d-none')

		toggleFileAndLinkUpload()
	})

	function toggleFileAndLinkUpload() {
		linkUpload = $('.fa-toggle-off').hasClass('d-none')
		fileUpload = $('.fa-toggle-on').hasClass('d-none')
		if (linkUpload) {
			$('.link-upload-container').removeClass('d-none')
			$('.file-upload-container').addClass('d-none')
		}
		if (fileUpload) {
			$('.file-upload-container').removeClass('d-none')
			$('.link-upload-container').addClass('d-none')
		}
	}

	function showJobRelatedUploadModal() {
		$('#add-job-related-modal').modal('show')
	}
	$('#upload-job-related-information-btn').on('click', function (e) {
		e.preventDefault()
		showJobRelatedUploadModal()
		isEditMode = false
	})

	function saveForm() {
		let jobRelatedTitle = $('#job-related-title').val().trim()
		let jobRelatedDescription = $('#job-related-description').val().trim()
		let jobRelatedExpiryDate = $('#job-related-expiry-date').val()

		let jobRelatedData

		if (linkUpload) {
			jobRelatedData = $('#job-related-link').val().trim()
		} else if (fileUpload) {
			jobRelatedData = document.querySelector('#job-related-file').files[0]
		}

		formData.set('jobRelatedTitle', jobRelatedTitle)
		formData.set('jobRelatedDescription', jobRelatedDescription)
		formData.set('jobRelatedExpiryDate', jobRelatedExpiryDate)
		formData.set('jobRelatedData', jobRelatedData)
		if (isEditMode) {
			formData.set(
				'oldFileName',
				$('#upload-job-related-details').attr('data-fileName')
			)
			formData.set('id', +$('#upload-job-related-details').attr('data-id'))
		}
		return true
	}

	function getCurrentDateFormatted() {
		return new Date().toISOString().split('T')[0];
	}

	console.log(getCurrentDateFormatted())

	$('#upload-job-related-details').on('click', function (e) {
		e.preventDefault()
		if (saveForm()) {
			post_file_data(formData)
		}
	})

	function post_file_data(formData) {
		let url = isEditMode
			? `/master/update-job-related-file`
			: '/master/upload-job-related-file'
		fetch(url, {
			method: 'POST',
			body: formData,
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				if (result.call === 1) {
					alertjs.success(
						{ t: `Successfull ${isEditMode ? 'updation' : 'submission'}` },
						() => {
							window.location.reload()
						}
					)
				}
			})
			.catch((err) => {
				alertjs.warning(
					{
						t: `Error while ${isEditMode ? 'submitting' : 'updating'}`,
						m: err,
					},
					() => {}
				)
			})
	}

	// delte gov-yojna file
	$(document).on('click', '.delete-job-related-btn', function (e) {
		e.preventDefault()
		let id = $(this).attr('data-id')
		let fileName = $(this).attr('data-fileName')

		fetch('/master/delete-job-related-details', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, fileName }),
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				if (result.call === 1) {
					alertjs.success({ t: 'Successful Deletion' }, () => {
						window.location.reload()
					})
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Error', m: err }, () => {})
			})
	})

	//Edit

	$(document).on('click', '.edit-job-related-btn', function (e) {
		e.preventDefault()
		isEditMode = true

		let thisBtn = $(this)
		let job = JSON.parse(thisBtn.attr('data-job'))

		console.log(job)
		let id = thisBtn.attr('data-id')
		let fileName = thisBtn.attr('data-fileName')

		$('#job-related-title').val(job.job_title)
		$('#job-related-link').val(job.link)
		$('#job-related-expiry-date').val(job.expiry_date)
		$('#job-related-description').val(job.job_description)

		$('#upload-job-related-details').attr('data-id', id)
		$('#upload-job-related-details').attr('data-fileName', fileName)
		showJobRelatedUploadModal()
	})
})
