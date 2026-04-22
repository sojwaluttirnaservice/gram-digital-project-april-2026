$(function () {
	console.log("AROGYA SEVA KDNRA gallery handler")

	$('#add-new-arogya-seva-kendra-gallery-image-btn').on('click', function (e) {
		e.preventDefault()
		$('#upload-institute-gallery-image-modal').modal('show')
	})

	function previewImage(input) {
		const preview = document.getElementById('arogya-seva-kendra-gallery-image-preview')
		const file = input.files[0]

		if (file) {
			const reader = new FileReader()

			reader.onload = function (e) {
				preview.src = e.target.result
				preview.style.display = 'block'
			}

			reader.readAsDataURL(file)
		} else {
			preview.style.display = 'none'
		}
	}

	$('#arogya-seva-kendra-gallery-photo').on('change', function () {
		previewImage(this)
	})

	document
		.getElementById('upload-arogya-seva-kendra-gallery-image-btn')
		.addEventListener('click', function (e) {
			e.preventDefault()

			const fileInput = document.getElementById('arogya-seva-kendra-gallery-photo')
			const file = fileInput.files[0]

			if (!file) {
				alertjs.warning({ t: 'Please select a file' })
				return
			}

			const formData = new FormData()
			formData.set('arogya_seva_kendra_gallery_photo', file)

			let id = $('#upload-arogya-seva-kendra-gallery-image-btn').attr('data-id')

			fetch(`/master/upload-arogya-seva-kendra-gallery-photo?arogyaSevaKendraId=${id}`, {
				method: 'POST',
				body: formData,
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.call == 1) {
						alertjs.success({
							t: 'Successfully Uploaded',
						})
						window.location.reload()
					}
				})
				.catch((error) => {
					console.error('Error uploading file:', error)
				})
		})

	async function handleDeleteGalleryPhoto(values) {
		try {
			const response = await fetch(
				'/master/delete-arogya-seva-kendra-gallery-photo',
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				}
			)

			const data = await response.json()

			if (data.call == 1) {
				alertjs.success({
					t: 'Successfully Deleted',
				})
				window.location.reload()
			} else {
				alertjs.warning({
					t: 'Failed to delete photo',
				})
			}
		} catch (error) {
			console.error('Error deleting file:', error)
			alertjs.warning({
				t: 'An error occurred while deleting the photo',
			})
		}
	}

	$('.delete-arogya-seva-kendra-gallery-image-btn').on('click', function (e) {
		e.preventDefault()

		const imageId = $(this).attr('data-id')
		const imageName = $(this).attr('data-imageName')

		const values = {
			imageId: imageId,
			imageName: imageName,
		}

		alertjs.deleteSpl('सरद छायाचीत्र काढायचे आहे का', function (status) {
			if (status) {
				handleDeleteGalleryPhoto(values)
			}
		})
	})
})
