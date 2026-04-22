$(function () {
	console.log('krishi vidnyan handler')

	$('#link-upload-toggle').on('click', function (e) {
		e.preventDefault()
		$('.fa-toggle-on').toggleClass('d-none')
		$('.fa-toggle-off').toggleClass('d-none')

		toggleFileAndLinkUpload()
	})

	let linkUpload
	let fileUpload = true
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

	function showUploadFormModal() {
		$('#add-form-modal').modal('show')
	}

	$('#open-upload-form-btn').on('click', function (e) {
		e.preventDefault()
		showUploadFormModal()
	})

	async function postKrishiVidnyanData(formData) {
		console.log(formData, '-')
		await fetch('/master/upload-krishi-vidynan-file', {
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
				} else if (result.call === 3) {
					alertjs.warning({
						t: 'Failed',
						m: 'File with this name already exists.Choose another name',
					})
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Error', m: err }, () => {})
			})
	}

	//UPLOAD BUTTON
	$('#upload-details-btn').on('click', function (e) {
		e.preventDefault()

		let informationTitle = $('#information-title').val().trim()
		let informationData

		if (linkUpload) {
			informationData = $('#upload-link').val().trim()
		} else if (fileUpload) {
			informationData = document.querySelector('#upload-file').files[0]
		}

		let formData = new FormData()
		formData.set('informationTitle', informationTitle)
		formData.set('informationData', informationData)
		postKrishiVidnyanData(formData)
	})

	//DELETE BUTTON
	$(document).on(
		'click',
		'#delete-krishi-vidnyan-file-btn',
		async function (e) {
			e.preventDefault()
			let fileName = $(this).attr('data-fileName')
			let fileId = $(this).attr('data-id')
			let type = $(this).attr('data-type')

			await fetch('/master/delete-krishi-vidnyan-file', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ fileName, fileId, type }),
			})
				.then((result) => {
					return result.json()
				})
				.then((result) => {
					if (result.call === 1) {
						alertjs.success({ t: 'Successfully Deleted' }, () => {
							window.location.reload()
						})
					}
				})
				.catch((err) => {
					alertjs.warning({ t: 'Error', m: err }, () => {})
				})
		}
	)
})
