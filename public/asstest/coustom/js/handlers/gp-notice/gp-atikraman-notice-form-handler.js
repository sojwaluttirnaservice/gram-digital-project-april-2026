$(function () {
	function dateFormatYYYMMDD(_date) {
		if (_date && _date.trim())
			return _date.trim().split('/').reverse().join('-')

		return ''
	}

	$(`[name='date']`).datepicker({
		dateFormat: 'dd/mm/yy',
		changeMonth: true,
		changeYear: true,
	})

	$('#gp-atikraman-notice-form').validate({
		rules: {
			name: {
				required: true,
			},
			address: {
				required: true,
			},
			date: {
				required: true,
			},
			malmatta_no: {
				required: true,
			},
			east_landmark: {
				required: true,
			},
			west_landmark: {
				required: true,
			},
			north_landmark: {
				required: true,
			},
			south_landmark: {
				required: true,
			},
			road_name: {
				required: true,
			},
		},
		messages: {
			name: {
				required: 'कृपया नाव भरा',
			},
			address: {
				required: 'कृपया पत्ता भरा',
			},
			date: {
				required: 'कृपया दिनांक भरा',
			},
			malmatta_no: {
				required: 'कृपया मालमत्ता क्रमांक भरा',
			},
			east_landmark: {
				required: 'कृपया पूर्वेसचा खुण भरावा',
			},
			west_landmark: {
				required: 'कृपया पच्छिमेसचा खुण भरावा',
			},
			north_landmark: {
				required: 'कृपया उत्त्तरेसचा खुण भरावा',
			},
			south_landmark: {
				required: 'कृपया दक्षिणेसचा खुण भरावा',
			},
			road_name: {
				required: 'कृपया रोडचे नाव भरा',
			},
		},
	})

	const handleSaveGpAtikramanNotice = async (sendData) => {
		try {
			const isUpdate = !!sendData.get('id')

			const _url = isUpdate
				? '/gp-notice/update-gp-atikraman-notice'
				: '/gp-notice/save-gp-atikraman-notice'

			const _res = await fetch(_url, {
				method: isUpdate ? 'PUT' : 'POST',
				body: sendData,
			})

			const { success } = await _res.json()

			if (success) {
				alertjs.success(
					{
						t: isUpdate ? 'Updated successfully' : 'Saved Successfully',
					},
					() => {
						if (isUpdate) {
							window.location.reload()
						} else {
							window.location.href = `/gp-notice/gp-atikraman-notice-list`
						}
					}
				)
			}
		} catch (err) {
			console.log(`Error while saving the gp atikraman notice : ${err}`)
		}
	}

	$(document).on('click', '#save-gp-atikraman-notice-btn', function (e) {
		e.preventDefault()

		let isValid = $('#gp-atikraman-notice-form').valid()

		if (!isValid) {
			alertjs.warning({
				t: 'सर्व माहिती भरा ',
			})
			return
		}
		const sendData = new FormData(
			document.getElementById('gp-atikraman-notice-form')
		)
		sendData.set('date', dateFormatYYYMMDD(sendData.get('date')))
		handleSaveGpAtikramanNotice(sendData)
	})

	$(document).on('click', '#update-gp-atikraman-notice-btn', function (e) {
		e.preventDefault()

		let isValid = $('#gp-atikraman-notice-form').valid()

		if (!isValid) {
			alertjs.warning({
				t: 'सर्व माहिती भरा ',
			})
			return
		}
		const sendData = new FormData(
			document.getElementById('gp-atikraman-notice-form')
		)
		sendData.set('date', dateFormatYYYMMDD(sendData.get('date')))
		handleSaveGpAtikramanNotice(sendData)
	})

	const handleDeleteGpAtikramanNotice = async (id) => {
		const _url = `/gp-notice/delete-gp-atikraman-notice`

		const _res = await fetch(_url, {
			method: 'DELETE',
			body: JSON.stringify({ id }),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const { success } = await _res.json()

		if (success) {
			alertjs.success(
				{
					t: 'Deleted Successfully',
				},
				() => location.reload()
			)
		}
	}

	$(document).on('click', '.delete-gp-atikraman-notice-btn', function (e) {
		e.preventDefault()

		const id = $(this).attr('data-noticeId')
		alertjs.deleteSpl('Confirm Delete ?', (_status) => {
			if (_status) {
				handleDeleteGpAtikramanNotice(+id)
			}
		})
	})
})
