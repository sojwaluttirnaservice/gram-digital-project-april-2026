$(function () {
	console.log('Ahaval uploads')

	$('#upload-gram-ahaval-document-btn').on('click', function (e) {
		e.preventDefault()
		$('#gram-ahaval-document-modal').modal('show')
	})

	$('#gram-ahaval-document-form').validate({
		rules: {
			document_name: {
				required: true,
			},
			document_file: {
				required: true,
			},
		},
	})

	const handleUploadGramAhavalDocument = async (formData) => {
		try {
			let url = '/master/upload-gram-ahaval-document'

			const response = await fetch(url, {
				method: 'POST',
				body: formData,
			})

			const data = await response.json()

			if (data.call === 1) {
				alertjs.success(
					{
						t: ' ग्राम अहवाल अपलोड झाला.',
					},
					() => {
						window.location.reload()
					}
				)
			}
		} catch (err) {
			console.log(`Error while uploading the file : ${err}`)
			alertjs.warning({
				t: ' ग्राम अहवाल अपलोड झाला नाही.',
			})
		}
	}
	const handleDeleteGramAhavalDocument = async (_data) => {
		try {
			let url = '/master/delete-gram-ahaval-document'

			const response = await fetch(url, {
				method: 'DELETE',
				body: JSON.stringify(_data),
                headers: {
                    'Content-Type': 'application/json'
                }
			})

			const data = await response.json()

			if (data.call === 1) {
				alertjs.success(
					{
						t: ' ग्राम अहवाल काढला गेला.',
					},
					() => {
						window.location.reload()
					}
				)
			}
		} catch (err) {
			console.log(`Error while uploading the file : ${err}`)
			alertjs.warning({
				t: ' ग्राम अहवाल काढला गेला नाही.',
			})
		}
	}

	$('#uploadGramAhavalDocumentBtn').on('click', function (e) {
		e.preventDefault()

		if (!$('#gram-ahaval-document-form').valid()) {
			alertjs.warning({
				t: 'सर्व माहिती भरा',
			})
			return
		}
		const form = document.getElementById('gram-ahaval-document-form')
		const formData = new FormData(form)

		handleUploadGramAhavalDocument(formData)
	})

	$(document).on('click', '.delete-gram-ahaval-document-btn', function (e) {
		e.preventDefault()
		let _data = {
			id: $(this).attr('data-id'),
			fileName: $(this).attr('data-fileName'),
		}

		alertjs.deleteSpl('सदर ग्राम अहवाल काढायचा आहे का?', (status) => {
			if (status) {
				handleDeleteGramAhavalDocument(_data)
			}
		})
	})
})
